import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const logs = await prisma.rateLimitLog.findMany({
      take: 50,
      orderBy: { blockedAt: "desc" },
    });

    const totalViolations = await prisma.rateLimitLog.count();

    return NextResponse.json({
      totalViolations,
      logs: logs.map((log) => ({
        id: log.id,
        endpoint: log.endpoint,
        ipHash: log.ipHash,
        eventId: log.eventId,
        requestCount: log.requestCount,
        blockedAt: log.blockedAt.toISOString(),
        reason: log.reason,
      })),
    });
  } catch (error: any) {
    console.warn("GET /api/admin/rate-limits DB offline; returning demo logs:", error?.message);
    return NextResponse.json({
      totalViolations: 0,
      logs: [],
    });
  }
}
