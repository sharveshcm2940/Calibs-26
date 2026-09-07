import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const search = searchParams.get("search")?.trim();

    const where: any = {};
    if (eventId && eventId !== "ALL") {
      where.eventId = eventId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { registrationNumber: { contains: search } },
        { department: { contains: search } },
      ];
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: {
          select: { id: true, name: true, category: true, capacity: true },
        },
        members: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      total: registrations.length,
      registrations: registrations.map((r) => ({
        id: r.id,
        registrationNumber: r.registrationNumber,
        eventId: r.eventId,
        eventName: r.event.name,
        eventCategory: r.event.category,
        name: r.name,
        email: r.email,
        phone: r.phone,
        department: r.department,
        year: r.year,
        college: r.college,
        membersCount: r.members.length,
        members: r.members,
        createdAt: r.createdAt.toISOString(),
      })),
    });
  } catch (error: any) {
    console.warn("GET /api/admin/registrations DB offline; returning empty list:", error?.message);
    return NextResponse.json({
      total: 0,
      registrations: [],
    });
  }
}
