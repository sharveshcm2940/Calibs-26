import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { eventUpdateSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const parseResult = eventUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { message: "Invalid update data", errors: parseResult.error.errors },
        { status: 400 }
      );
    }

    const currentEvent = await prisma.event.findUnique({ where: { id } });
    if (!currentEvent) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    const updateData: any = {};
    if (parseResult.data.capacity !== undefined) updateData.capacity = parseResult.data.capacity;
    if (parseResult.data.registrationOpen !== undefined) updateData.registrationOpen = parseResult.data.registrationOpen;
    if (parseResult.data.name !== undefined) updateData.name = parseResult.data.name;
    if (parseResult.data.venue !== undefined) updateData.venue = parseResult.data.venue;
    if (parseResult.data.description !== undefined) updateData.description = parseResult.data.description;
    if (parseResult.data.rules !== undefined) updateData.rules = parseResult.data.rules;
    if (parseResult.data.startTime !== undefined) updateData.startTime = new Date(parseResult.data.startTime);
    if (parseResult.data.endTime !== undefined) updateData.endTime = new Date(parseResult.data.endTime);

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        _count: { select: { registrations: true } },
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: "EVENT_UPDATED",
        adminId: session.adminId,
        targetType: "EVENT",
        targetId: id,
        details: JSON.stringify({
          before: {
            capacity: currentEvent.capacity,
            registrationOpen: currentEvent.registrationOpen,
          },
          after: updateData,
        }),
      },
    });

    return NextResponse.json({
      message: "Event updated successfully.",
      event: {
        ...updatedEvent,
        registeredCount: updatedEvent._count.registrations,
        remainingSpots: Math.max(0, updatedEvent.capacity - updatedEvent._count.registrations),
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/events/[id] error:", error);
    return NextResponse.json({ message: "Failed to update event." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    await prisma.event.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        action: "EVENT_DELETED",
        adminId: session.adminId,
        targetType: "EVENT",
        targetId: id,
        details: JSON.stringify({ deletedEventName: event.name }),
      },
    });

    return NextResponse.json({ message: `Event '${event.name}' deleted successfully.` });
  } catch (error) {
    console.error("DELETE /api/admin/events/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete event." }, { status: 500 });
  }
}
