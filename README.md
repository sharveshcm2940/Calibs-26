# CALIBRATIONS 2026–2027

### The Premier Kollywood / Tamil Cinema Themed College Cultural Festival
**College of Engineering, Guindy (CEG), Anna University, Chennai**  
*“Lights. Camera. College. Entry isn't complete until the campus hears the roar.”*

---

## Creative Concept & Art Direction

**CALIBRATIONS 2026–2027** is built around the raw, cinematic energy of **Kollywood / Tamil Cinema**. Designed to evoke the feeling of a real student-directed cultural festival rather than an AI-generated template:

- **Strict Zero-Emoji Policy:** All notifications, badges, buttons, and headers use custom typography, authentic film iconography, and Lucide SVG icons. Zero unicode emojis are present in the codebase.
- **Physical & Tactile Cinema Aesthetics:**
  - **Color Palette:** Cinema Black (`#0B0A09`), Deep Maroon (`#5A1116`), Cinema Red (`#A51D24`), Warm Cream (`#F1E4C5`), Muted Gold (`#C69A45`), Paper Beige (`#D8C8A7`).
  - **Film Textures:** Subtle film grain overlays, 35mm sprocket borders, paper tear edges, distressed rubber stamps, wheatpaste posters, and projector beam lighting.
  - **Typography:** Cinematic serif titles (`Cinzel`), punchy poster headlines (`Barlow Condensed`), vintage screenplay dispatch (`Courier Prime`), and clean sans-serif body (`Inter`).
- **Cinema Narrative Layout:**
  - **Hero:** Movie title reveal with projector flicker and skip controls.
  - **About:** Director’s Note styled as a typewriter screenplay with an official Central Board Censor Certificate (U/A).
  - **Dialogue Box:** Animated punchlines showcasing original Kollywood power one-liners.
  - **Poster Wall:** Physical wheatpasted posters with slight realistic tilts, paper movement, and quick inspection.
  - **Catalogue:** 10 curated events with category filters and real-time box office capacities.
  - **Cast:** 8 original character archetypes (The Hero, The Mass Entry, The Comedian, The Director, The Villain, The Professor, The Rebel, The Romantic Lead).
  - **Call Sheet:** Shooting schedule for Day 1 and Day 2.
  - **Photo Reel:** 35mm continuous film strip with interactive contact sheet lightbox.
  - **Sponsors:** Movie production credits format.
  - **End Credits:** Rolling theatrical credits footer.

---

## Core Technology Stack

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + Custom CSS cinema utilities & grain textures
- **Animation:** Framer Motion + CSS keyframes
- **Backend:** Node.js REST API route handlers
- **Database & ORM:** MySQL 8.4 + Prisma ORM
- **Authentication:** Admin session with HTTP-only cookies and signed JWT (`jose`)
- **Validation:** Zod schemas
- **Rate Limiting:** Sliding-window rate limiter with SHA-256 IP anonymization and violation telemetry
- **Testing:** Vitest

---

## Concurrency Protection & HOUSEFULL Engine

The platform enforces strict capacity limits at the database transaction level to prevent race conditions during high-traffic booking rushes:

```
BEGIN TRANSACTION
  1. Fetch event record with current registration count
  2. If count >= event.capacity -> ROLLBACK & return HTTP 409 (HOUSEFULL)
  3. Verify no duplicate registration exists by email or phone
  4. Generate unique ticket number CAL-26-XXXXXX
  5. Commit registration & squad members
COMMIT TRANSACTION
```

When an event sells out:
1. The backend immediately rejects subsequent registration attempts with HTTP 409 `HOUSEFULL`.
2. The registration modal displays a dramatic red rubber stamp animation with screen flicker.
3. The event poster receives a physical `HOUSEFULL` overlay stamp.
4. The registration button disables and switches to `HOUSEFULL`.

---

## Admin Console (`/admin`)

The administration console provides complete operational control:
- **Director Login:** Accessible at `/admin/login` (Default seed: `admin` / `calibrations2026!`).
- **Overview & Box Office Fill:** Live capacity gauges, total registrations, today's velocity, and housefull counts.
- **Dynamic Capacity Control:** Live capacity adjustments (reducing capacity below current registrations triggers instant HOUSEFULL status for live testing).
- **Registration Explorer:** Live searchable table with event filtering and instant CSV export.
- **Rate-Limit Surveillance:** Telemetry dashboard monitoring blocked IP hashes, burst rates, and targeted endpoints.

---

## Getting Started & Local Setup

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- MySQL Server (e.g. MySQL 8.4 running locally or on cloud)

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your MySQL connection string:
```bash
cp .env.example .env
```

Example `.env`:
```env
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/calibrations_db"
JWT_SECRET="calibrations-kollywood-jwt-secret-2026-super-secure-key"
ADMIN_SESSION_SECRET="calibrations-admin-session-secret-key-2026"
RATE_LIMIT_MAX_ATTEMPTS=10
RATE_LIMIT_WINDOW_MS=600000
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed
```bash
# Push schema to MySQL database
npx prisma db push

# Seed 10 events, initial registrations, and admin account
npx tsx prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the cinema portal.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the administrative dashboard.

### 5. Running Automated Tests
```bash
npm test
```
The test suite validates:
- Human-friendly registration number generation (`CAL-26-XXXXXX`)
- Zod payload validation
- Capacity enforcement & instant `HOUSEFULL` state transition
- Race condition concurrency handling under simultaneous requests
- Duplicate registration rejection
- IP hashing and 429 rate limit triggers
- Admin password hashing and JWT verification

---

## Production Deployment (Vercel / Node.js)

1. Provision a MySQL database on AWS RDS, PlanetScale, Aiven, or Railway.
2. In your deployment provider (e.g. Vercel), set environment variables from `.env`.
3. Set the build command to:
   ```bash
   npx prisma generate && next build
   ```
4. Deploy!
