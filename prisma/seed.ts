import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { FALLBACK_EVENTS } from "../src/lib/fallbackEvents";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CALIBRATIONS 2026–2027 database with official SVCE events...");

  // Clean existing data for a fresh seed
  await prisma.rateLimitLog.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.registrationMember.deleteMany({});
  await prisma.registration.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.admin.deleteMany({});

  // 1. Create Default Admin
  const adminPassword = await bcrypt.hash("calibrations2026!", 10);
  const admin = await prisma.admin.create({
    data: {
      username: "admin",
      email: "admin@calibrations2026.edu",
      name: "Director of Culturals",
      role: "SUPER_ADMIN",
      passwordHash: adminPassword,
    },
  });
  console.log(`Created admin user: ${admin.username} (Password: calibrations2026!)`);

  // 2. Seed all 32 official events from FALLBACK_EVENTS
  for (const event of FALLBACK_EVENTS) {
    await prisma.event.create({
      data: {
        id: event.id,
        name: event.name,
        slug: event.slug,
        tagline: event.tagline,
        category: event.category,
        venue: event.venue,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        capacity: event.capacity,
        registrationOpen: event.registrationOpen,
        maxTeamSize: event.maxTeamSize,
        isTeamEvent: event.isTeamEvent,
        posterImage: event.posterImage,
        description: event.description,
        rules: event.rules,
      },
    });
  }
  console.log(`Seeded ${FALLBACK_EVENTS.length} official SVCE events successfully.`);

  // Create an initial audit log
  await prisma.auditLog.create({
    data: {
      action: "DATABASE_INITIALIZED",
      adminId: admin.id,
      targetType: "SYSTEM",
      targetId: "SYSTEM_ROOT",
      details: JSON.stringify({
        message: `Initial database seed of ${FALLBACK_EVENTS.length} events completed successfully.`,
      }),
    },
  });

  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
