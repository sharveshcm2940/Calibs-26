import crypto from "crypto";
import { prisma } from "./prisma";

// Sliding window in-memory store for rate limiting
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitEntry>();

// Purge expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memoryStore.entries()) {
      if (now > entry.resetAt) {
        memoryStore.delete(key);
      }
    }
  }, 60000);
}

/**
 * Creates an anonymized SHA-256 hash of the client IP address.
 * Never stores raw IP addresses in the database for privacy compliance.
 */
export function hashIP(ip: string): string {
  const salt = process.env.JWT_SECRET || "calibrations-ip-salt-2026";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex").substring(0, 16);
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Enforces rate limiting on sensitive routes (e.g., event registration).
 * Default: 10 attempts per 10 minutes per hashed IP.
 */
export async function checkRateLimit(
  ip: string,
  endpoint: string,
  eventId?: string
): Promise<RateLimitResult> {
  const maxAttempts = parseInt(process.env.RATE_LIMIT_MAX_ATTEMPTS || "10", 10);
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "600000", 10); // 10 minutes default

  const ipHashed = hashIP(ip);
  const key = `${ipHashed}:${endpoint}`;
  const now = Date.now();

  let record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    record = { count: 1, resetAt: now + windowMs };
    memoryStore.set(key, record);
    return {
      allowed: true,
      limit: maxAttempts,
      remaining: maxAttempts - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  record.count += 1;
  const remaining = Math.max(0, maxAttempts - record.count);
  const resetInSeconds = Math.ceil((record.resetAt - now) / 1000);

  if (record.count > maxAttempts) {
    // Record rate limit violation to DB for admin monitoring
    try {
      await prisma.rateLimitLog.create({
        data: {
          endpoint,
          ipHash: ipHashed,
          eventId: eventId || null,
          requestCount: record.count,
          reason: `Exceeded threshold of ${maxAttempts} requests per ${windowMs / 60000} minutes`,
        },
      });
    } catch (err) {
      console.error("Failed to record rate limit violation:", err);
    }

    return {
      allowed: false,
      limit: maxAttempts,
      remaining: 0,
      resetInSeconds,
    };
  }

  return {
    allowed: true,
    limit: maxAttempts,
    remaining,
    resetInSeconds,
  };
}

export function extractClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
