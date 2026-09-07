import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { eventCreateSchema } from "@/lib/validations";
import { FALLBACK_EVENTS } from "@/lib/fallbackEvents";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const events = await prisma.event.findMany({
      include: {
        _count: { select: { registrations: true } },
      },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json({
      events: events.map((ev) => ({
        ...ev,
        registeredCount: ev._count.registrations,
        remainingSpots: Math.max(0, ev.capacity - ev._count.registrations),
      })),
    });
  } catch (error: any) {
    console.warn("GET /api/admin/events DB offline; returning fallback events:", error?.message);
    return NextResponse.json({
      events: FALLBACK_EVENTS.map((ev) => ({
        ...ev,
        registeredCount: ev.registeredCount,
        remainingSpots: ev.remainingSpots,
      })),
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const parseResult = eventCreateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Invalid event data", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Check slug uniqueness
    const existing = await prisma.event.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ message: "Event slug already in use." }, { status: 409 });
    }

    const newEvent = await prisma.event.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline || null,
        category: data.category,
        venue: data.venue,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        capacity: data.capacity,
        registrationOpen: data.registrationOpen,
        posterImage: data.posterImage || null,
        description: data.description,
        rules: data.rules,
        maxTeamSize: data.maxTeamSize,
        isTeamEvent: data.isTeamEvent,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "EVENT_CREATED",
        adminId: session.adminId,
        targetType: "EVENT",
        targetId: newEvent.id,
        details: JSON.stringify({ name: newEvent.name, capacity: newEvent.capacity }),
      },
    });

    return NextResponse.json({ message: "Event created successfully.", event: newEvent }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/events error:", error);
    return NextResponse.json({ message: "Failed to create event." }, { status: 500 });
  }
}
