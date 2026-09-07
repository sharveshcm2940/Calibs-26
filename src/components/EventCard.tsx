"use client";

import React from "react";
import { Clock, MapPin, Ticket, ArrowUpRight, Film, Sparkles, Shield, AlertCircle } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { soundEngine } from "@/lib/soundEngine";
import type { EventData } from "./PosterWall";

interface EventCardProps {
  event: EventData;
  onRegister: (event: EventData) => void;
  onViewDetails: (event: EventData) => void;
}

// Authentic Tamil Cinema Title & Theatrical Metadata Mapping
const POSTER_METADATA: Record<
  string,
  {
    tamilTitle: string;
    genreTag: string;
    musicCredit: string;
    cinematography: string;
    censorRating: string;
    accentColor: string;
    accentBorder: string;
  }
> = {
  "mass-dance": {
    tamilTitle: "ஆடாவடி ஸ்டெப்ஸ்",
    genreTag: "AN ALL-OUT STREET KUTHU ENTERTAINER",
    musicCredit: "ANIRUDH × THAMAN KUTHU SCORE",
    cinematography: "35MM KODAK VISION3 500T",
    censorRating: "MASS U/A",
    accentColor: "text-world-mm-yellow",
    accentBorder: "border-world-mm-yellow",
  },
  "fashion-walk": {
    tamilTitle: "ராம்ப் ராஜா & ராணி",
    genreTag: "80S SILK DHOTI TO MODERN COUTURE",
    musicCredit: "RETRO HARRIS JAYARAJ SCORE",
    cinematography: "PANAVISION ANAMORPHIC 2.39:1",
    censorRating: "GLAMOUR U",
    accentColor: "text-world-mankatha-gold",
    accentBorder: "border-world-mankatha-gold",
  },
  "battle-of-bands": {
    tamilTitle: "இசை சங்கமம்",
    genreTag: "THE ELECTRIC GUITAR & NADASWARAM WAR",
    musicCredit: "ILAIYARAAJA × ROCK SYMPHONY",
    cinematography: "ARRI ALEXA LF HIGH-SPEED",
    censorRating: "DECIBEL U/A",
    accentColor: "text-world-mm-yellow",
    accentBorder: "border-world-mm-yellow",
  },
  "singing": {
    tamilTitle: "குரல் ஓவியம்",
    genreTag: "RAW ACOUSTIC & SOULFUL MELODY BATTLES",
    musicCredit: "A.R. RAHMAN CLASSICS UNPLUGGED",
    cinematography: "VINTAGE COOKE S4 PRIMES",
    censorRating: "PURE U",
    accentColor: "text-cinema-gold",
    accentBorder: "border-cinema-gold",
  },
  "gaming": {
    tamilTitle: "கடவுள் செட்டிங்",
    genreTag: "HIGH-FPS LAN ARENA TACTICAL SHOWDOWN",
    musicCredit: "ELECTRONIC SYNTH BASS HIT",
    cinematography: "DIGITAL 240FPS ULTRA SHUTTER",
    censorRating: "TACTICAL U/A",
    accentColor: "text-world-kaithi-sodium",
    accentBorder: "border-world-kaithi-sodium",
  },
  "short-film": {
    tamilTitle: "70எம்எம் டிரீமர்ஸ்",
    genreTag: "7 MINUTES OF CELLULOID PERFECTION",
    musicCredit: "ORIGINAL ORCHESTRAL SCORE",
    cinematography: "CINEMASCOPE 2.39:1 CELLULOID",
    censorRating: "CINEPHILE U/A",
    accentColor: "text-cinema-red",
    accentBorder: "border-cinema-red",
  },
  "photography": {
    tamilTitle: "35எம்எம் லென்ஸ்",
    genreTag: "CAPTURING RAW EMOTIONS ON THE FLOOR",
    musicCredit: "SILENT MECHANICAL SHUTTER FOLEY",
    cinematography: "EASTMAN COLOR 5219 RAW",
    censorRating: "GOLDEN U",
    accentColor: "text-cinema-paper",
    accentBorder: "border-cinema-paper",
  },
  "treasure-hunt": {
    tamilTitle: "கோலிவுட் கோட்டை",
    genreTag: "THE CAMPUS-WIDE CINEMA ANAGRAM CHASE",
    musicCredit: "SUSPENSEFUL CHASE MOTIFS",
    cinematography: "STEADICAM RUN 35MM",
    censorRating: "MYSTERY U",
    accentColor: "text-world-kaithi-sodium",
    accentBorder: "border-world-kaithi-sodium",
  },
  "quiz": {
    tamilTitle: "சினிமா வெறியன்",
    genreTag: "THE GRAND BUZZER CLASH OF CINEMA LORE",
    musicCredit: "RAPID FIRE RETRO SOUNDTRACK",
    cinematography: "MULTI-CAMERA AUDITORIUM SETUP",
    censorRating: "TRIVIA U",
    accentColor: "text-world-mankatha-gold",
    accentBorder: "border-world-mankatha-gold",
  },
  "cinema-quiz": {
    tamilTitle: "சினிமா வெறியன்",
    genreTag: "THE GRAND BUZZER CLASH OF CINEMA LORE",
    musicCredit: "RAPID FIRE RETRO SOUNDTRACK",
    cinematography: "MULTI-CAMERA AUDITORIUM SETUP",
    censorRating: "TRIVIA U",
    accentColor: "text-world-mankatha-gold",
    accentBorder: "border-world-mankatha-gold",
  },
  "drama": {
    tamilTitle: "கூத்துப்பட்டறை",
    genreTag: "NO RETAKES. UNFILTERED LIVE INTENSITY",
    musicCredit: "LIVE DHOLAK & THAPPU BEATS",
    cinematography: "SPOTLIGHT THEATRE FOLEY",
    censorRating: "INTENSE U/A",
    accentColor: "text-world-karuppu-vermilion",
    accentBorder: "border-world-karuppu-vermilion",
  },
};

export function EventCard({ event, onRegister, onViewDetails }: EventCardProps) {
  const isHousefull = event.status === "HOUSEFULL" || event.registeredCount >= event.capacity;
  const isClosed = event.status === "CLOSED" || !event.registrationOpen;
  const fillPercentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const showType =
    event.showType || (event.startTime.includes("2026-09-18") ? "FDFS" : "SDFS");

  const meta = POSTER_METADATA[event.id] ||
    POSTER_METADATA[event.slug] || {
      tamilTitle: "கலை விழா",
      genreTag: "CALIBRATIONS 2026 SPECIAL ATTRACTION",
      musicCredit: "STUDENT SOUND LABS",
      cinematography: "35MM KODAK VISION3",
      censorRating: "U/A",
      accentColor: "text-cinema-gold",
      accentBorder: "border-cinema-gold",
    };

  const handleDetailsClick = () => {
    soundEngine.playProjectorClick();
    onViewDetails(event);
  };

  const handleRegisterClick = () => {
    soundEngine.playClapperSnap();
    onRegister(event);
  };

  return (
    <div
      data-cursor="view"
      className="relative bg-cinema-black border-4 border-cinema-black shadow-hard-lg hover:shadow-hard-xl transition-all duration-300 group flex flex-col justify-between overflow-hidden rounded-none ring-1 ring-cinema-border/50 hover:border-cinema-gold"
    >
      {/* 1. Physical Corner Scotch Tape Strips (Kollywood street wall wheatpaste feel) */}
      <div className="absolute -top-1 -left-1 w-10 h-3.5 bg-amber-100/30 border border-amber-200/40 backdrop-blur-xs -rotate-12 z-30 pointer-events-none shadow-sm" />
      <div className="absolute -top-1 -right-1 w-10 h-3.5 bg-amber-100/30 border border-amber-200/40 backdrop-blur-xs rotate-12 z-30 pointer-events-none shadow-sm" />

      {/* 2. Light Leak Sheen Scan Effect on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />

      {/* 3. Physical HOUSEFULL Painted Wooden / Steel Board Overlay */}
      {isHousefull && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] p-4">
          <div className="transform -rotate-6 border-4 border-cinema-red bg-[#180507] text-cinema-paper p-5 shadow-hard-red text-center max-w-[280px] relative overflow-hidden">
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-cinema-gold/70 border border-black" />
            <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-cinema-gold/70 border border-black" />
            <div className="border-b-2 border-cinema-red/80 pb-1 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-cinema-gold font-black block">
                ROHINI / UDHAYAM STYLE
              </span>
              <h4 className="font-poster text-4xl sm:text-5xl font-black tracking-widest uppercase leading-none text-cinema-red print-offset-black">
                HOUSEFULL
              </h4>
            </div>
            <p className="font-mono text-xs font-black uppercase tracking-wider text-cinema-paper">
              AIYO... SHOW FULL DA!
            </p>
            <p className="font-editorial text-[11px] italic text-cinema-gold/90 mt-1">
              &ldquo;All rows occupied. Zero slots left.&rdquo;
            </p>
            <div className="mt-2 text-[9px] font-mono bg-cinema-red text-white py-0.5 uppercase tracking-widest font-bold">
              NO CURRENT BOOKING
            </div>
          </div>
        </div>
      )}

      {/* 4. POSTER CANVAS AREA */}
      <div className="relative min-h-[460px] sm:min-h-[480px] p-5 flex flex-col justify-between overflow-hidden bg-[#0D0B09]">
        {/* Background Visual Graphic (Theatrical Poster Image or Graphic Backing) */}
        {event.posterImage ? (
          <div className="absolute inset-0 z-0">
            {/* Poster Image */}
            <img
              src={event.posterImage}
              alt={event.name}
              className="w-full h-full object-cover object-center opacity-45 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            />
            {/* Cinema Scrim Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/75 to-cinema-black/40" />
            {/* Film Grain Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,4,3,0.85)_100%)]" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1C140D] to-[#0A0807] opacity-90" />
        )}

        {/* 35mm Edge Sockets (Left border detail) */}
        <div className="absolute left-1 top-12 bottom-12 w-1 flex flex-col justify-between opacity-30 pointer-events-none z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-1 h-3 bg-cinema-paper/60" />
          ))}
        </div>

        {/* TOP POSTER BANNER: Studio / Club Header & Theatrical Badges */}
        <div className="relative z-10 space-y-2.5">
          {/* Studio & Club Brand */}
          <div className="flex items-center justify-between text-[10px] font-mono text-cinema-gold/90 font-bold uppercase tracking-[0.2em] border-b border-cinema-border/60 pb-1.5">
            <span className="truncate">{event.club ? event.club.toUpperCase() : "SRI VENKATESWARA COLLEGE OF ENGINEERING"}</span>
            <span className="shrink-0 text-cinema-red font-mono text-[9px] font-black bg-cinema-black/80 px-1.5 py-0.5 border border-cinema-border">
              {event.duration || "2 HRS"}
            </span>
          </div>

          {/* Show Stamps Row */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* FDFS / SDFS Theatrical Release Banner */}
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider border shadow-hard ${
                  showType === "FDFS"
                    ? "bg-cinema-red text-cinema-paper border-cinema-paper/80 shadow-hard-red"
                    : "bg-cinema-gold text-cinema-black border-cinema-paper/80 shadow-hard-gold"
                }`}
              >
                {showType === "FDFS" ? "FDFS • SEPT 18" : "SDFS • SEPT 19"}
              </span>

              {/* Censor Rating Seal */}
              <span className="px-1.5 py-0.5 border border-cinema-gold/70 text-cinema-gold text-[9px] font-mono font-bold tracking-widest bg-cinema-black/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cinema-red inline-block" />
                {meta.censorRating}
              </span>
            </div>

            {/* Team Size & Category Badge */}
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cinema-gold bg-cinema-black px-1.5 py-0.5 border border-cinema-border shrink-0">
                {event.teamSizeLabel || (event.isTeamEvent ? "Group" : "Solo")}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cinema-paper/80 bg-cinema-charcoal/90 px-1.5 py-0.5 border border-cinema-border hidden xs:inline">
                {event.category}
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE POSTER BODY: Grand Kollywood Title Treatment */}
        <div className="relative z-10 my-auto py-6 text-center space-y-2">
          {/* Tamil Script Title Stamp */}
          <div className="font-serif text-lg sm:text-xl font-bold tracking-widest text-cinema-gold drop-shadow-md">
            {event.tamilTitle || meta.tamilTitle}
          </div>

          {/* Blockbuster English Display Title */}
          <h3
            onClick={handleDetailsClick}
            className="font-poster text-3xl sm:text-4xl font-black uppercase tracking-tight text-cinema-paper leading-[0.92] poster-title-shadow group-hover:text-cinema-gold transition-colors cursor-pointer"
          >
            {event.name}
          </h3>

          {/* Kollywood Theatrical Genre Tag */}
          <div className="pt-1">
            <span className="inline-block px-2.5 py-0.5 bg-cinema-black/80 border border-cinema-border/60 text-[10px] font-mono font-bold tracking-widest text-cinema-paper/80 uppercase">
              {meta.genreTag}
            </span>
          </div>

          {/* Paraphrased Tagline */}
          {event.tagline && (
            <p className="font-editorial text-xs sm:text-sm italic text-cinema-paper/90 max-w-xs mx-auto leading-relaxed pt-1">
              &ldquo;{event.tagline}&rdquo;
            </p>
          )}
        </div>

        {/* BOTTOM POSTER BLOCK: Authentic Kollywood Theatrical Billing Block */}
        <div className="relative z-10 border-t border-cinema-border/70 pt-2.5 space-y-2">
          {/* Classic Condensed Movie Poster Credits Block */}
          <div className="text-[8.5px] font-mono uppercase tracking-wider text-cinema-paper/60 text-center leading-tight space-y-0.5 font-bold">
            <div>
              VENUE 1: <span className="text-cinema-red font-black">{event.venue}</span>
              {event.venue2 && event.venue2 !== "—" && (
                <span> • VENUE 2: <span className="text-cinema-gold">{event.venue2}</span></span>
              )}
            </div>
            <div>
              POC: <span className="text-cinema-paper/90">{event.pocName || "Guild"}</span>
              {event.pocDept && <span className="text-cinema-paper/70"> ({event.pocDept})</span>}
              {event.certificates && (
                <span className="text-cinema-gold/90"> • CERTS: {event.certificates}</span>
              )}
            </div>
            <div className="text-[8px] text-cinema-paper/50">
              {event.club ? `${event.club.toUpperCase()} • ` : ""}CALL: {event.duration || formatTime(event.startTime)} • 1ST YEARS ONLY
            </div>
          </div>

          {/* Seating Row Availability Indicator */}
          <div className="pt-1.5 border-t border-cinema-border/40">
            <div className="flex justify-between items-center text-[10px] font-mono mb-1">
              <span className="text-cinema-paper/70 font-bold uppercase tracking-wider">
                {isHousefull ? "HOUSEFULL" : "THEATRE OCCUPANCY"}
              </span>
              <span className="font-black text-cinema-gold">
                {event.registeredCount} / {event.capacity} BOOKED
              </span>
            </div>
            <div className="w-full h-1.5 bg-cinema-black border border-cinema-border overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isHousefull
                    ? "bg-cinema-red"
                    : fillPercentage > 75
                    ? "bg-amber-500"
                    : "bg-cinema-gold"
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOX OFFICE TICKET COUNTERFOIL FOOTER */}
      <div className="p-3 bg-[#0B0907] border-t-4 border-cinema-black flex items-center gap-2 relative z-10">
        {/* Dossier Details Button */}
        <button
          onClick={handleDetailsClick}
          className="flex-1 py-2 px-3 border border-cinema-border hover:border-cinema-gold bg-cinema-charcoal hover:bg-black text-cinema-paper/80 hover:text-cinema-gold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Box Office Ticket Pass Booking Button */}
        {isHousefull ? (
          <div className="flex-1 py-2 px-3 bg-cinema-maroon border-2 border-cinema-red text-cinema-paper font-poster text-sm sm:text-base tracking-widest uppercase text-center cursor-not-allowed">
            SOLD OUT
          </div>
        ) : isClosed ? (
          <div className="flex-1 py-2 px-3 bg-cinema-charcoal border border-cinema-border text-cinema-paper/50 font-mono text-xs uppercase text-center cursor-not-allowed">
            CLOSED
          </div>
        ) : (
          <button
            onClick={handleRegisterClick}
            data-cursor="ticket"
            className="flex-1 py-2 px-3 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster text-sm sm:text-base tracking-widest uppercase border border-cinema-paper shadow-hard flex items-center justify-center gap-1.5 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Ticket className="w-4 h-4 text-cinema-gold" />
            <span>BOOK PASS</span>
          </button>
        )}
      </div>
    </div>
  );
}
