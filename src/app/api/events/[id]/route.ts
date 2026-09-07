import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFallbackEvent } from "@/lib/fallbackEvents";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Show not found." }, { status: 404 });
    }

    const registeredCount = event._count.registrations;
    const remainingSpots = Math.max(0, event.capacity - registeredCount);

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

    const fallback = getFallbackEvent(id) || getFallbackEvent(event.slug);

    return NextResponse.json({
      event: {
        ...event,
        club: fallback?.club,
        venue2: fallback?.venue2,
        duration: fallback?.duration,
        teamSizeLabel: fallback?.teamSizeLabel,
        certificates: fallback?.certificates,
        pocName: fallback?.pocName,
        pocDept: fallback?.pocDept,
        pocContact: fallback?.pocContact,
        requirements: fallback?.requirements,
        showType: fallback?.showType,
        showLabel: fallback?.showLabel,
        tamilTitle: fallback?.tamilTitle,
        registeredCount,
        remainingSpots,
        status,
      },
    });
  } catch (error: any) {
    console.warn("GET /api/events/[id] DB error (checking fallback):", error?.message);
    try {
      const { id } = await params;
      const fallback = getFallbackEvent(id);
      if (fallback) {
        return NextResponse.json({ event: fallback });
      }
    } catch {}
    return NextResponse.json({ message: "Failed to retrieve show details." }, { status: 500 });
  }
}
