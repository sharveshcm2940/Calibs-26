import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations";
import { checkRateLimit, extractClientIp } from "@/lib/rateLimit";
import { generateRegistrationNumber } from "@/lib/registrationNumber";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id = "";
  let body: any = {};

  try {
    const resolvedParams = await params;
    id = resolvedParams.id;

    // 1. IP-based sliding-window rate limiting
    const clientIp = extractClientIp(request.headers);
    const rateLimit = await checkRateLimit(clientIp, `/api/events/${id}/register`, id);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: "Too many registration attempts. Please try again shortly.",
          code: "RATE_LIMITED",
          resetInSeconds: rateLimit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Body Payload Parsing & Validation with Zod
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Malformed JSON payload in request body.", code: "INVALID_JSON" },
        { status: 400 }
      );
    }
    const parseResult = registrationSchema.safeParse(body);

    if (!parseResult.success) {
      const issues = parseResult.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
      return NextResponse.json(
        { message: "Invalid registration details", errors: issues, code: "VALIDATION_FAILED" },
        { status: 400 }
      );
    }

    const { name, email, phone, department, year, college, members } = parseResult.data;

    // 3. Concurrency Protection & Atomic Database Transaction
    // Ensures two simultaneous requests cannot exceed event capacity
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Find event
      const event = await tx.event.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });

      if (!event) {
        throw new Error("EVENT_NOT_FOUND");
      }

      if (!event.registrationOpen) {
        throw new Error("REGISTRATION_CLOSED");
      }

      // Count current registrations atomically inside transaction
      const currentCount = await tx.registration.count({
        where: { eventId: event.id },
      });

      // Strict Capacity Enforcement Check
      if (currentCount >= event.capacity) {
        throw new Error("HOUSEFULL");
      }

      // Duplicate Registration Prevention by Email or Phone
      const duplicate = await tx.registration.findFirst({
        where: {
          eventId: event.id,
          OR: [{ email }, { phone }],
        },
      });

      if (duplicate) {
        throw new Error("DUPLICATE_REGISTRATION");
      }

      // Generate unique registration number (CAL-26-XXXXXX)
      let regNumber = generateRegistrationNumber();
      // Ensure absolute uniqueness
      let existingReg = await tx.registration.findUnique({
        where: { registrationNumber: regNumber },
      });
      while (existingReg) {
        regNumber = generateRegistrationNumber();
        existingReg = await tx.registration.findUnique({
          where: { registrationNumber: regNumber },
        });
      }

      // Create Registration Record
      const newRegistration = await tx.registration.create({
        data: {
          registrationNumber: regNumber,
          eventId: event.id,
          name,
          email,
          phone,
          department,
          year,
          college: college || "Sri Venkateswara College of Engineering (SVCE)",
          members: {
            create: (members || []).map((m) => ({
              name: m.name,
              email: m.email || null,
              phone: m.phone || null,
            })),
          },
        },
        include: {
          members: true,
        },
      });

      const updatedCount = currentCount + 1;
      const remaining = Math.max(0, event.capacity - updatedCount);
      const isNowHousefull = updatedCount >= event.capacity;

      return {
        registration: newRegistration,
        updatedEvent: {
          id: event.id,
          name: event.name,
          slug: event.slug,
          category: event.category,
          venue: event.venue,
          startTime: event.startTime.toISOString(),
          endTime: event.endTime.toISOString(),
          capacity: event.capacity,
          registrationOpen: event.registrationOpen,
          registeredCount: updatedCount,
          remainingSpots: remaining,
          status: isNowHousefull
            ? "HOUSEFULL"
            : remaining <= 3
            ? "ALMOST_FULL"
            : remaining <= 6
            ? "LIMITED"
            : "OPEN",
        },
      };
    });

    return NextResponse.json(
      {
        message: "Registration confirmed! Your cinema pass is ready.",
        registration: transactionResult.registration,
        updatedEvent: transactionResult.updatedEvent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === "HOUSEFULL") {
      return NextResponse.json(
        {
          message: "This show has sold out. Hall capacity reached.",
          code: "HOUSEFULL",
        },
        { status: 409 }
      );
    }

    if (error.message === "DUPLICATE_REGISTRATION") {
      return NextResponse.json(
        {
          message: "You have already registered for this event with this email or phone.",
          code: "DUPLICATE",
        },
        { status: 409 }
      );
    }

    if (error.message === "REGISTRATION_CLOSED") {
      return NextResponse.json(
        { message: "Registration is currently closed for this show.", code: "CLOSED" },
        { status: 400 }
      );
    }

    if (error.message === "EVENT_NOT_FOUND") {
      return NextResponse.json(
        { message: "Event not found.", code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    if (
      error.name === "PrismaClientInitializationError" ||
      error.message?.includes("Can't reach database server")
    ) {
      console.warn("Database server unavailable during registration attempt.");
      return NextResponse.json(
        {
          message: "Database service is currently unreachable. Please try again later or contact the organizing desk.",
          code: "DATABASE_UNAVAILABLE",
        },
        { status: 503 }
      );
    }

    console.error("POST /api/events/[id]/register unexpected error:", error);
    return NextResponse.json(
      { message: "Internal server error processing registration.", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
