import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, signAdminToken, verifyAdminToken } from "../src/lib/auth";

describe("Admin Authentication & Security", () => {
  it("correctly hashes password with bcrypt and verifies matching password", async () => {
    const rawPass = "super-secret-admin-pass-2026!";
    const hash = await hashPassword(rawPass);

    expect(hash).not.toBe(rawPass);
    expect(await verifyPassword(rawPass, hash)).toBe(true);
    expect(await verifyPassword("wrong-password", hash)).toBe(false);
  });

  it("signs and verifies valid admin JWT token", async () => {
    const payload = {
      adminId: "admin-123",
      username: "director",
      role: "SUPER_ADMIN",
    };

    const token = await signAdminToken(payload);
    expect(typeof token).toBe("string");

    const decoded = await verifyAdminToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.adminId).toBe("admin-123");
    expect(decoded?.username).toBe("director");
  });

  it("rejects forged or tampered tokens", async () => {
    const forgedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature";
    const result = await verifyAdminToken(forgedToken);
    expect(result).toBeNull();
  });
});
