import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { FALLBACK_EVENTS } from "@/lib/fallbackEvents";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized. Admin login required." }, { status: 401 });
    }

    // 1. Total registrations
    const totalRegistrations = await prisma.registration.count();

    // 2. Registrations today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const registrationsToday = await prisma.registration.count({
      where: {
        createdAt: { gte: startOfToday },
      },
    });

    // 3. Events with registration counts
    const events = await prisma.event.findMany({
      include: {
        _count: { select: { registrations: true } },
      },
      orderBy: { startTime: "asc" },
    });

    let totalCapacity = 0;
    let openEvents = 0;
    let almostFullEvents = 0;
    let housefullEvents = 0;

    const eventSummaries = events.map((ev) => {
      const registered = ev._count.registrations;
      const remaining = Math.max(0, ev.capacity - registered);
      totalCapacity += ev.capacity;

      let status = "OPEN";
      if (!ev.registrationOpen) {
        status = "CLOSED";
      } else if (registered >= ev.capacity) {
        status = "HOUSEFULL";
        housefullEvents++;
      } else if (remaining <= Math.max(3, Math.floor(ev.capacity * 0.15))) {
        status = "ALMOST_FULL";
        almostFullEvents++;
      } else if (remaining <= Math.max(5, Math.floor(ev.capacity * 0.35))) {
        status = "LIMITED";
      }

      if (ev.registrationOpen && registered < ev.capacity) {
        openEvents++;
      }

      return {
        id: ev.id,
        name: ev.name,
        category: ev.category,
        venue: ev.venue,
        capacity: ev.capacity,
        registered,
        remaining,
        status,
        fillRate: Math.round((registered / ev.capacity) * 100),
        registrationOpen: ev.registrationOpen,
      };
    });

    const overallPercentage = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

    // 4. Recent registrations
    const recentRegistrations = await prisma.registration.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        event: {
          select: { name: true, category: true },
        },
      },
    });

    // 5. Total rate-limit blocks
    const totalRateLimitBlocks = await prisma.rateLimitLog.count();

    return NextResponse.json({
      metrics: {
        totalRegistrations,
        registrationsToday,
        totalEvents: events.length,
        openEvents,
        almostFullEvents,
        housefullEvents,
        totalCapacity,
        overallPercentage,
        totalRateLimitBlocks,
      },
      events: eventSummaries,
      recentRegistrations: recentRegistrations.map((r) => ({
        id: r.id,
        registrationNumber: r.registrationNumber,
        name: r.name,
        email: r.email,
        phone: r.phone,
        department: r.department,
        year: r.year,
        eventName: r.event.name,
        eventCategory: r.event.category,
        createdAt: r.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.error("GET /api/admin/dashboard error:", error);

    // Graceful fallback when database is offline
    if (
      error.name === "PrismaClientInitializationError" ||
      error.message?.includes("Can't reach database server")
    ) {
      const eventSummaries = FALLBACK_EVENTS.map((ev) => ({
        id: ev.id,
        name: ev.name,
        category: ev.category,
        venue: ev.venue,
        capacity: ev.capacity,
        registered: 0,
        remaining: ev.capacity,
        status: "OPEN",
        fillRate: 0,
        registrationOpen: ev.registrationOpen,
      }));
      const totalCapacity = FALLBACK_EVENTS.reduce((sum, e) => sum + e.capacity, 0);

      return NextResponse.json({
        metrics: {
          totalRegistrations: 0,
          registrationsToday: 0,
          totalEvents: FALLBACK_EVENTS.length,
          openEvents: FALLBACK_EVENTS.length,
          almostFullEvents: 0,
          housefullEvents: 0,
          totalCapacity,
          overallPercentage: 0,
          totalRateLimitBlocks: 0,
        },
        events: eventSummaries,
        recentRegistrations: [],
      });
    }

    return NextResponse.json({ message: "Failed to retrieve dashboard metrics." }, { status: 500 });
  }
}
