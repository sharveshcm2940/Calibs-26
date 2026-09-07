import { describe, it, expect, beforeEach } from "vitest";
import { registrationSchema } from "../src/lib/validations";
import { generateRegistrationNumber } from "../src/lib/registrationNumber";

describe("Registration Number & Payload Validation", () => {
  it("generates unique human-friendly registration numbers matching CAL-26-XXXXXX", () => {
    const reg1 = generateRegistrationNumber();
    const reg2 = generateRegistrationNumber();
    expect(reg1).toMatch(/^CAL-26-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
    expect(reg2).toMatch(/^CAL-26-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
    expect(reg1).not.toBe(reg2);
  });

  it("accepts valid registration payload", () => {
    const payload = {
      name: "Dhanush Raj",
      email: "dhanush@ceg.edu",
      phone: "9840123456",
      department: "Mechanical Engineering",
      year: "1st Year",
      college: "College of Engineering, Guindy",
      members: [],
    };
    const result = registrationSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email and invalid phone formats", () => {
    const invalidEmail = {
      name: "Dhanush Raj",
      email: "not-an-email",
      phone: "9840123456",
      department: "Mechanical",
      year: "1st Year",
    };
    expect(registrationSchema.safeParse(invalidEmail).success).toBe(false);

    const invalidPhone = {
      name: "Dhanush Raj",
      email: "dhanush@svce.ac.in",
      phone: "12345", // not 10 digits
      department: "Mechanical",
      year: "1st Year",
    };
    expect(registrationSchema.safeParse(invalidPhone).success).toBe(false);
  });

  it("strictly rejects non-first-year students from registering", () => {
    const secondYearPayload = {
      name: "Siva Karthik",
      email: "siva@svce.ac.in",
      phone: "9840123456",
      department: "ECE",
      year: "2nd Year",
      college: "Sri Venkateswara College of Engineering (SVCE)",
      members: [],
    };
    const result = registrationSchema.safeParse(secondYearPayload);
    expect(result.success).toBe(false);
  });
});

describe("Capacity & Concurrency Atomic Logic Simulation", () => {
  // In-memory atomic store simulating Prisma transaction logic
  interface MockEvent {
    id: string;
    name: string;
    capacity: number;
    registrationOpen: boolean;
    registrations: Array<{ email: string; phone: string; regNumber: string }>;
  }

  let event: MockEvent;

  beforeEach(() => {
    event = {
      id: "event-dance",
      name: "Mass Dance",
      capacity: 3,
      registrationOpen: true,
      registrations: [],
    };
  });

  async function atomicRegister(data: { name: string; email: string; phone: string }) {
    // Simulates Prisma $transaction
    if (!event.registrationOpen) {
      throw new Error("REGISTRATION_CLOSED");
    }

    if (event.registrations.length >= event.capacity) {
      throw new Error("HOUSEFULL");
    }

    const duplicate = event.registrations.find(
      (r) => r.email === data.email || r.phone === data.phone
    );
    if (duplicate) {
      throw new Error("DUPLICATE_REGISTRATION");
    }

    const regNumber = generateRegistrationNumber();
    event.registrations.push({
      email: data.email,
      phone: data.phone,
      regNumber,
    });

    return {
      regNumber,
      remaining: event.capacity - event.registrations.length,
      isHousefull: event.registrations.length >= event.capacity,
    };
  }

  it("registration succeeds below capacity", async () => {
    const res = await atomicRegister({
      name: "Student 1",
      email: "s1@test.com",
      phone: "9840000001",
    });
    expect(res.remaining).toBe(2);
    expect(res.isHousefull).toBe(false);
  });

  it("registration fails with HOUSEFULL once capacity is reached", async () => {
    await atomicRegister({ name: "S1", email: "s1@test.com", phone: "9840000001" });
    await atomicRegister({ name: "S2", email: "s2@test.com", phone: "9840000002" });
    const res3 = await atomicRegister({ name: "S3", email: "s3@test.com", phone: "9840000003" });

    expect(res3.remaining).toBe(0);
    expect(res3.isHousefull).toBe(true);

    // 4th registration attempt must fail
    await expect(
      atomicRegister({ name: "S4", email: "s4@test.com", phone: "9840000004" })
    ).rejects.toThrow("HOUSEFULL");
  });

  it("concurrent requests cannot exceed capacity", async () => {
    // Start with 1 spot remaining
    await atomicRegister({ name: "S1", email: "s1@test.com", phone: "9840000001" });
    await atomicRegister({ name: "S2", email: "s2@test.com", phone: "9840000002" });

    // 5 concurrent attempts for the final 1 spot
    const attempts = Array.from({ length: 5 }).map((_, i) =>
      atomicRegister({
        name: `Candidate ${i}`,
        email: `candidate${i}@test.com`,
        phone: `984000001${i}`,
      })
        .then((r) => ({ success: true as const, res: r, error: undefined }))
        .catch((err) => ({ success: false as const, res: undefined, error: err.message as string }))
    );

    const results = await Promise.all(attempts);
    const successful = results.filter((r) => r.success);
    const rejected = results.filter((r) => !r.success && r.error === "HOUSEFULL");

    expect(successful.length).toBe(1);
    expect(rejected.length).toBe(4);
    expect(event.registrations.length).toBe(3); // Exactly matches capacity
  });

  it("rejects duplicate registration with same email or phone", async () => {
    await atomicRegister({ name: "User 1", email: "unique@test.com", phone: "9840111111" });

    // Duplicate email
    await expect(
      atomicRegister({ name: "User 2", email: "unique@test.com", phone: "9840222222" })
    ).rejects.toThrow("DUPLICATE_REGISTRATION");

    // Duplicate phone
    await expect(
      atomicRegister({ name: "User 3", email: "other@test.com", phone: "9840111111" })
    ).rejects.toThrow("DUPLICATE_REGISTRATION");
  });
});
