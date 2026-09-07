"use client";

import React, { useState } from "react";
import { Clock, MapPin, Film, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface ScheduleItem {
  time: string;
  scene: string;
  title: string;
  venue: string;
  cast: string;
  notes: string;
}

const FDFS_DAY1_SCHEDULE: ScheduleItem[] = [
  {
    time: "09:00 AM",
    scene: "REPORTING",
    title: "SVCE GATES OPEN & FRESHERS VERIFICATION",
    venue: "SVCE Main Archway Desks",
    cast: "All 1st Year Freshers & Crew",
    notes: "Ticket verification, 1st-year badge issuance, and arrival fanfare.",
  },
  {
    time: "09:00 AM",
    scene: "MEDIA",
    title: "TRACE & TELL (MARKETING CLUB)",
    venue: "Classroom Block 3 – 1st Floor / Block 5",
    cast: "POC: Santhoshkumar C (EEE III)",
    notes: "Brand narrative decoding, live mic storytelling challenge.",
  },
  {
    time: "09:30 AM",
    scene: "SCIENCE",
    title: "DHURUVANGAL PATHINAARU (SCIENCE CLUB)",
    venue: "Block 3 – 1st Floor / Block 5",
    cast: "POC: Adhitya R (EEE III)",
    notes: "16 procedural investigative clue checkpoints across Block 3 & 5.",
  },
  {
    time: "09:30 AM",
    scene: "CREATIVE",
    title: "ATHIMBIR INNU SAAGALA DA (ISTD)",
    venue: "Classroom Block 5",
    cast: "POC: Sai Raksheedha S (ECE IV)",
    notes: "Theatrical poster art, acrylic paint & black chart visual storytelling.",
  },
  {
    time: "09:30 AM",
    scene: "MUSIC",
    title: "ISAI EXPRESS: SESSION 1 (MUSIC CLUB)",
    venue: "Classroom Block 5 / Block 3",
    cast: "POC: M S Rohith (Biotech III)",
    notes: "Day-long acoustic & melody marathon prelims and vocal harmonies.",
  },
  {
    time: "10:00 AM",
    scene: "PHOTOGRAPHY",
    title: "THE SHUTTER DARE (PHOTOCLUB)",
    venue: "Block 3 / Block 5",
    cast: "POC: Sriram (Mech II)",
    notes: "Photo scavenger dare challenge across campus corridors.",
  },
  {
    time: "10:00 AM",
    scene: "MUSIC",
    title: "SAREGAMA (ROTARACT CLUB)",
    venue: "Classroom Block 5 / Block 3",
    cast: "POC: Divyadharshini K (MN II)",
    notes: "Collegiate vocal face-off, classical swaras & antakshari rounds.",
  },
  {
    time: "10:00 AM",
    scene: "STRATEGY",
    title: "MANKATHA: INR 5,000 ARENA (E-CELL)",
    venue: "Block 5 – 501 / Block 5 – 502",
    cast: "POC: Kaviyarasan S (EEE III)",
    notes: "High-stakes entrepreneurial business gamble and risk simulation.",
  },
  {
    time: "10:00 AM",
    scene: "DANCE",
    title: "EN VAZHI, THANI VAZHI (DANCE CLUB)",
    venue: "MPH (Multi-Purpose Hall)",
    cast: "POC: Varshini (CSE III)",
    notes: "Premier solo dance championship with pure stage dominance.",
  },
  {
    time: "10:00 AM",
    scene: "CINEMA",
    title: "CINEMA, CINEMA! DAY 1 (SHORTFILM CLUB)",
    venue: "Library Seminar Hall",
    cast: "POC: Annirudh (Mech II)",
    notes: "Iconic movie monologue recreation & live dialogue dubbing.",
  },
  {
    time: "10:00 AM",
    scene: "THEATRE",
    title: "WHAT’S THE CHANNEL? (CURTAIN CALL)",
    venue: "Library Seminar Hall / Block 5",
    cast: "POC: Ajay B (CSE III)",
    notes: "Rapid television genre switching live comedy theatre.",
  },
  {
    time: "11:00 AM",
    scene: "CINEMA",
    title: "TENDKOTTA (YRC)",
    venue: "Block 5 / Block 3",
    cast: "POC: Elamukhil K (Chem III)",
    notes: "Vintage touring tent cinema atmosphere & trivia buzzers.",
  },
  {
    time: "12:30 PM",
    scene: "DANCE",
    title: "GUMBALE GOVINDHA (DANCE CLUB)",
    venue: "MPH (Multi-Purpose Hall)",
    cast: "POC: Swathi (CSE III)",
    notes: "Synchronized high-octane Chennai street kuthu crew showdown.",
  },
  {
    time: "01:00 PM",
    scene: "INTERVAL",
    title: "CANTEEN INTERVAL & STREET BUSKING",
    venue: "SVCE Food Court & Central Lawns",
    cast: "Entire Freshers Batch",
    notes: "Lunch break, canteen banter, and acoustic jams.",
  },
  {
    time: "01:00 PM",
    scene: "TAMIL",
    title: "IYAL ISAI NADAGAM (THENDRAL TAMIL MANDRAM)",
    venue: "Block 5 – 506",
    cast: "POC: Shivani (ECE II)",
    notes: "Tripartite celebration of Tamil poetry, music, and dramatic staging.",
  },
  {
    time: "01:30 PM",
    scene: "LITERATURE",
    title: "KOLLYWOOD DIVE FT. LOKESH KANAGARAJ",
    venue: "Block 5 / Block 3",
    cast: "POC: Nethra Ravichandran (Biotech II)",
    notes: "Dissecting cinematic universes, dark scripts & nonlinear motifs.",
  },
  {
    time: "01:30 PM",
    scene: "SCIENCE",
    title: "VEIL OF TRUST (SCIENCE CLUB)",
    venue: "Block 5",
    cast: "POC: Adithiya (EEE III)",
    notes: "Sensory deception detection & psychological logic experiment.",
  },
  {
    time: "02:00 PM",
    scene: "THEATRE",
    title: "NAAN AVAN ILLAI (SHORTFILM CLUB)",
    venue: "Classroom Block 5",
    cast: "POC: Vigneshwar (ECE II)",
    notes: "High-energy character imitation, dual avatars & role reversals.",
  },
  {
    time: "02:00 PM",
    scene: "ADVENTURE",
    title: "CLUE-LYWOOD (ENGINEERS WITHOUT BORDERS)",
    venue: "Classroom Block 5 / Block 3",
    cast: "POC: Gokul S (Biotech III)",
    notes: "Engineering equations veiled in Tamil cinema clue tracks.",
  },
  {
    time: "02:00 PM",
    scene: "FUN",
    title: "MANKATHA MODE (CARE CLUB)",
    venue: "Block 5 – Ground Floor / Block 3",
    cast: "POC: Prithish A S (CSE II)",
    notes: "Carnival agility courses, ping-pong bounces & rapid trick shots.",
  },
  {
    time: "03:00 PM",
    scene: "DANCE",
    title: "AAATAMA THEROTTAMA (DANCE CLUB)",
    venue: "MPH (Multi-Purpose Hall)",
    cast: "POC: Avanthika (CSE III)",
    notes: "Vintage 80s & 90s classical and folk rhythm tribute.",
  },
  {
    time: "06:00 PM",
    scene: "DAY 1 CLAP",
    title: "FDFS DAY 1 WRAP & SOUNDSTAGE CELEBRATION",
    venue: "SVCE Open Air Theatre (OAT)",
    cast: "All Day 1 Freshers",
    notes: "Day 1 score recap and celebration DJ.",
  },
];

const SDFS_DAY2_SCHEDULE: ScheduleItem[] = [
  {
    time: "09:00 AM",
    scene: "REPORTING",
    title: "DAY 2 REPORTING & SPOT ENTRY DESKS",
    venue: "SVCE Campus Front Desks",
    cast: "Day 2 Competitors",
    notes: "Short film submissions and registration pass verification.",
  },
  {
    time: "09:00 AM",
    scene: "MEDIA",
    title: "SELL ME THIS (MARKETING CLUB)",
    venue: "Biotech Function Hall / Block 3",
    cast: "POC: Logeshwaran P (ECE III)",
    notes: "Pitch bizarre products with irresistible street-smart swagger.",
  },
  {
    time: "09:30 AM",
    scene: "SCIENCE",
    title: "MARMADESAM (SVCE SCIENCE CLUB)",
    venue: "Block 3 – 1st Floor / Block 5",
    cast: "POC: Sanchitha D (ECE III)",
    notes: "4-hour investigative science thriller debunking occult mysteries.",
  },
  {
    time: "10:00 AM",
    scene: "PHOTO",
    title: "KADHAIYA KANDU PIDI (PHOTOCLUB)",
    venue: "Online Portal Desks",
    cast: "POC: Yuvakannan (CSE II)",
    notes: "Reconstruct the director's narrative from sequence photo frames.",
  },
  {
    time: "10:00 AM",
    scene: "CULTURAL",
    title: "ROTARACT SPOTLIGHT: 2ND EVENT",
    venue: "CB 5 / CB 3",
    cast: "POC: Kaavya B (EE II)",
    notes: "Mystery cultural buzzer rounds and student talent face-off.",
  },
  {
    time: "10:00 AM",
    scene: "FILM",
    title: "JIGARTHANDA: SHORT FILM SCREENINGS",
    venue: "Classroom Block 5",
    cast: "POC: Harshitha (ECE II)",
    notes: "Screening original student short films with jury feedback.",
  },
  {
    time: "10:00 AM",
    scene: "MUSIC",
    title: "RAGA OF REVENGE (MUSIC CLUB)",
    venue: "MPH / Other Hall",
    cast: "POC: Aarti B S (ECE III)",
    notes: "1-on-1 vocal face-off on intense vengeance ragas.",
  },
  {
    time: "11:00 AM",
    scene: "CINEMA",
    title: "DUMBCHARADES (YRC)",
    venue: "Block 5 / Block 3",
    cast: "POC: Lieogin Punniya Neson R S (Chem III)",
    notes: "Zero words, pure body language, rapid Kollywood enactments.",
  },
  {
    time: "11:00 AM",
    scene: "THEATRE",
    title: "LIGHTS, CAMERA, CARE!!! (CARE CLUB)",
    venue: "Block 5 / Block 3",
    cast: "POC: Suhan (EEE III)",
    notes: "Dramatizing college empathy situations with movie flair.",
  },
  {
    time: "01:00 PM",
    scene: "INTERVAL",
    title: "MIDDAY BREAK & JURY COMPILATION",
    venue: "SVCE Cafeteria",
    cast: "Participants & Event Crew",
    notes: "Lunch break and final round certificate tallying.",
  },
  {
    time: "01:00 PM",
    scene: "LORE",
    title: "HUNTER LICENSE TEST (READING CLUB)",
    venue: "Block 5 / Block 3",
    cast: "POC: Meenatshi P (CSE II)",
    notes: "Multi-stage anime and pop-culture logic survival trial.",
  },
  {
    time: "01:00 PM",
    scene: "TAMIL",
    title: "OZHUNGA PAADU ILLA SPRAY ADICHIDUVEN",
    venue: "Block 5 – 506",
    cast: "POC: Shivani (ECE II)",
    notes: "Hilarious Tamil singing contest: sing in pitch or face the spray!",
  },
  {
    time: "01:30 PM",
    scene: "CINEMA",
    title: "CINEMA, CINEMA! DAY 2 (SHORTFILM CLUB)",
    venue: "Library Seminar Hall",
    cast: "POC: Nikhil (Mech II)",
    notes: "Day 2 Grand Cinephile Championship finale.",
  },
  {
    time: "02:00 PM",
    scene: "BUSINESS",
    title: "STARTUP SURVIVOR (E-CELL)",
    venue: "Seminar Hall / Classroom Block 5",
    cast: "POC: Jai Ganesh S (AI&DS III)",
    notes: "Fast-paced crisis management and investor survival simulation.",
  },
  {
    time: "02:00 PM",
    scene: "MUSIC",
    title: "THAALAM TRIP (MUSIC CLUB)",
    venue: "MPH (Multi-Purpose Hall)",
    cast: "POC: Raviram Anbumani (IT III)",
    notes: "Solo percussion, beatboxing, and rhythm improvisation odyssey.",
  },
  {
    time: "05:30 PM",
    scene: "THE FINALE",
    title: "GRAND VALEDICTORY & ROLLING TROPHY FELICITATION",
    venue: "SVCE Open Air Theatre (OAT)",
    cast: "Chief Guests, Faculty & Champions",
    notes: "Calibrations 2026 Overall Champion shield presentation and final wrap.",
  },
];

export function ScheduleTimeline() {
  const [activeDay, setActiveDay] = useState<"FDFS" | "SDFS">("FDFS");

  const scheduleList = activeDay === "FDFS" ? FDFS_DAY1_SCHEDULE : SDFS_DAY2_SCHEDULE;

  const handleTabChange = (day: "FDFS" | "SDFS") => {
    soundEngine.playProjectorClick();
    setActiveDay(day);
  };

  return (
    <section id="schedule" className="py-24 bg-cinema-paper text-cinema-black border-b-4 border-cinema-black relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-4 border-cinema-black pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cinema-maroon font-bold">
              <span>SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE)</span>
              <span>•</span>
              <span>1ST YEAR CALL SHEET</span>
            </div>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none text-cinema-black">
              THE SCHEDULE
            </h2>
            <p className="font-editorial italic text-base sm:text-lg text-cinema-black/80 mt-2">
              &ldquo;Timing miss pannadha. Scene start aagidum.&rdquo;
            </p>
          </div>

          <div className="font-mono text-xs text-cinema-maroon font-bold uppercase tracking-wider text-left sm:text-right space-y-1">
            <div className="text-cinema-red font-black">நேரம் தவறாதீர் • CALL SHEET</div>
            <div>OFFICIAL PRODUCTION SHOOTING SHEET • SEPT 18–19, 2026</div>
          </div>
        </div>

        {/* Day Toggle Tabs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => handleTabChange("FDFS")}
            className={`p-4 border-4 border-cinema-black font-poster text-xl sm:text-2xl uppercase tracking-wider transition-all flex flex-col items-center justify-center ${
              activeDay === "FDFS"
                ? "bg-cinema-red text-cinema-paper shadow-hard scale-[1.02]"
                : "bg-white text-cinema-black hover:bg-[#EADCC0]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Film className="w-5 h-5 text-cinema-gold" />
              <span>DAY 01: FDFS</span>
            </span>
            <span className="text-xs font-mono opacity-80 mt-1">
              FIRST DAY FIRST SHOW • FRIDAY, SEPT 18, 2026
            </span>
          </button>

          <button
            onClick={() => handleTabChange("SDFS")}
            className={`p-4 border-4 border-cinema-black font-poster text-xl sm:text-2xl uppercase tracking-wider transition-all flex flex-col items-center justify-center ${
              activeDay === "SDFS"
                ? "bg-cinema-black text-cinema-gold shadow-hard scale-[1.02]"
                : "bg-white text-cinema-black hover:bg-[#EADCC0]"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cinema-gold" />
              <span>DAY 02: SDFS</span>
            </span>
            <span className="text-xs font-mono opacity-80 mt-1">
              SECOND DAY FIRST SHOW • SATURDAY, SEPT 19, 2026
            </span>
          </button>
        </div>

        {/* Industrial Call Sheet Typography Table */}
        <div className="divide-y-2 divide-cinema-black border-t-2 border-b-2 border-cinema-black">
          {scheduleList.map((item, idx) => {
            const isInterval = item.scene === "INTERVAL";
            const isFinale = item.scene === "THE FINALE" || item.scene === "DAY 1 CLAP";

            return (
              <div
                key={idx}
                className={`py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-colors ${
                  isInterval
                    ? "bg-[#E6D4B0] px-4 -mx-4"
                    : isFinale
                    ? "bg-cinema-black text-cinema-paper px-4 -mx-4 shadow-hard"
                    : "hover:bg-[#EADCC0] px-2 -mx-2"
                }`}
              >
                {/* Time Stamp */}
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-poster text-2xl sm:text-3xl font-black tracking-tight">
                    {item.time}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase opacity-75">
                    [{item.scene}]
                  </span>
                </div>

                {/* Event Name & Dispatch Note */}
                <div className="md:col-span-6 space-y-0.5">
                  <h3 className="font-poster text-xl sm:text-2xl font-black uppercase tracking-wide leading-none">
                    {item.title}
                  </h3>
                  <p className="font-editorial text-xs sm:text-sm italic opacity-85">
                    {item.notes}
                  </p>
                </div>

                {/* Venue & Call Meta */}
                <div className="md:col-span-3 text-xs font-mono md:text-right space-y-0.5">
                  <div className="font-bold flex md:justify-end items-center gap-1 text-[11px] sm:text-xs">
                    <MapPin className="w-3.5 h-3.5 text-cinema-red shrink-0" />
                    <span>{item.venue}</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] opacity-70">CALL: {item.cast}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
