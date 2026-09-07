import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_EVENTS } from "@/lib/fallbackEvents";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { startTime: "asc" },
    });

    const formattedEvents = events.map((event) => {
      const registeredCount = event._count.registrations;
      const remainingSpots = Math.max(0, event.capacity - registeredCount);
      const fallback = FALLBACK_EVENTS.find(
        (f) => f.slug === event.slug || f.id === event.id
      );

      let status: "OPEN" | "LIMITED" | "ALMOST_FULL" | "HOUSEFULL" | "CLOSED" = "OPEN";

      if (!event.registrationOpen) {
        status = "CLOSED";
      } else if (registeredCount >= event.capacity) {
        status = "HOUSEFULL";
      } else if (remainingSpots <= Math.max(3, Math.floor(event.capacity * 0.15))) {
        status = "ALMOST_FULL";
      } else if (remainingSpots <= Math.max(5, Math.floor(event.capacity * 0.35))) {
        status = "LIMITED";
      }

      return {
        id: event.id,
        name: event.name,
        slug: event.slug,
        tagline: event.tagline || fallback?.tagline,
        category: event.category,
        club: fallback?.club,
        venue: event.venue,
        venue2: fallback?.venue2,
        duration: fallback?.duration,
        startTime: event.startTime.toISOString(),
        endTime: event.endTime.toISOString(),
        capacity: event.capacity,
        registrationOpen: event.registrationOpen,
        registeredCount,
        remainingSpots,
        status,
        posterImage: event.posterImage || fallback?.posterImage,
        description: event.description,
        rules: event.rules,
        maxTeamSize: event.maxTeamSize,
        isTeamEvent: event.isTeamEvent,
        teamSizeLabel: fallback?.teamSizeLabel,
        certificates: fallback?.certificates,
        pocName: fallback?.pocName,
        pocDept: fallback?.pocDept,
        pocContact: fallback?.pocContact,
        requirements: fallback?.requirements,
        showType: fallback?.showType,
        showLabel: fallback?.showLabel,
        tamilTitle: fallback?.tamilTitle,
      };
    });

    return NextResponse.json({ events: formattedEvents });
  } catch (error) {
    console.warn("GET /api/events DB offline; using fallback catalogue:", (error as any)?.message);
    return NextResponse.json({ events: FALLBACK_EVENTS });
  }
}
