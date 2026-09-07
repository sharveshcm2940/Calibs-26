import { describe, it, expect } from "vitest";
import { hashIP, checkRateLimit } from "../src/lib/rateLimit";

describe("Rate Limiting & Privacy Hash", () => {
  it("anonymizes IP address with SHA-256 hash without exposing raw IP", () => {
    const rawIp1 = "192.168.1.100";
    const rawIp2 = "203.0.113.195";

    const hash1 = hashIP(rawIp1);
    const hash2 = hashIP(rawIp2);

    expect(hash1).toBeDefined();
    expect(hash1.length).toBe(16);
    expect(hash1).not.toContain("192");
    expect(hash1).not.toBe(hash2);

    // Consistency: same IP gives identical hash
    expect(hashIP(rawIp1)).toBe(hash1);
  });

  it("permits initial requests and rejects with 429 status once threshold exceeded", async () => {
    const testIp = `test-ip-${Date.now()}`;
    const endpoint = "/api/events/test-event/register";

    // First 10 requests allowed
    for (let i = 1; i <= 10; i++) {
      const result = await checkRateLimit(testIp, endpoint);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(10 - i);
    }

    // 11th request must be rejected
    const blockedResult = await checkRateLimit(testIp, endpoint);
    expect(blockedResult.allowed).toBe(false);
    expect(blockedResult.remaining).toBe(0);
    expect(blockedResult.resetInSeconds).toBeGreaterThan(0);
  });
});
