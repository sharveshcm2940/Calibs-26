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

    const where: any = {};
    if (eventId && eventId !== "ALL") {
      where.eventId = eventId;
    }

    const registrations = await prisma.registration.findMany({
      where,
      include: {
        event: {
          select: { name: true, category: true, venue: true },
        },
        members: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate CSV Rows
    const headers = [
      "Registration ID",
      "Event Name",
      "Category",
      "Lead Participant",
      "Email",
      "Phone",
      "Department",
      "Year",
      "Institution",
      "Squad Members",
      "Registration Date",
    ];

    const escapeCsv = (str: string | null | undefined) => {
      if (!str) return '""';
      return `"${String(str).replace(/"/g, '""')}"`;
    };

    const rows = registrations.map((r) => {
      const memberNames = r.members.map((m) => m.name).join("; ");
      return [
        escapeCsv(r.registrationNumber),
        escapeCsv(r.event.name),
        escapeCsv(r.event.category),
        escapeCsv(r.name),
        escapeCsv(r.email),
        escapeCsv(r.phone),
        escapeCsv(r.department),
        escapeCsv(r.year),
        escapeCsv(r.college),
        escapeCsv(memberNames),
        escapeCsv(r.createdAt.toISOString()),
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="CALIBRATIONS-2026-REGISTRATIONS-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/registrations/export error:", error);
    return NextResponse.json({ message: "Failed to export CSV." }, { status: 500 });
  }
}
