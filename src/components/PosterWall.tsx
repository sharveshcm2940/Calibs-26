"use client";

import React, { useState } from "react";
import { Film, Eye, Ticket, Tag, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

export interface EventData {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  category: string;
  club?: string;
  venue: string;
  venue2?: string;
  duration?: string;
  startTime: string;
  endTime: string;
  capacity: number;
  registrationOpen: boolean;
  registeredCount: number;
  remainingSpots: number;
  status: "OPEN" | "LIMITED" | "ALMOST_FULL" | "HOUSEFULL" | "CLOSED";
  posterImage?: string | null;
  description: string;
  rules: string;
  maxTeamSize: number;
  isTeamEvent: boolean;
  teamSizeLabel?: string;
  certificates?: string | number;
  pocName?: string;
  pocDept?: string;
  pocContact?: string;
  requirements?: string;
  showType?: "FDFS" | "SDFS";
  showLabel?: string;
  tamilTitle?: string;
}

interface PosterWallProps {
  events: EventData[];
  onSelectEvent: (event: EventData) => void;
}

// Map events to their category presentation styles
const CATEGORY_STYLES: Record<string, { border: string; badge: string }> = {
  Dance: { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" },
  Music: { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" },
  Fashion: { border: "border-cinema-red", badge: "bg-cinema-red text-cinema-paper" },
  Drama: { border: "border-cinema-red", badge: "bg-cinema-red text-cinema-paper" },
  Photography: { border: "border-cinema-paper", badge: "bg-cinema-paper text-cinema-black" },
  Film: { border: "border-cinema-red", badge: "bg-cinema-red text-cinema-paper" },
  Gaming: { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" },
  Quiz: { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" },
  Literary: { border: "border-cinema-paper", badge: "bg-cinema-paper text-cinema-black" },
  Arts: { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" },
};

// Physical street wall layout with rotations, spans, and tape tilts
const WALL_LAYOUT = [
  { rotate: "-rotate-3", colSpan: "lg:col-span-4", tapeRotate: "rotate-2", z: "z-10" },
  { rotate: "rotate-2", colSpan: "lg:col-span-4", tapeRotate: "-rotate-1", z: "z-20" },
  { rotate: "-rotate-1", colSpan: "lg:col-span-4", tapeRotate: "rotate-3", z: "z-10" },
  { rotate: "rotate-3", colSpan: "lg:col-span-5", tapeRotate: "-rotate-2", z: "z-20" },
  { rotate: "-rotate-2", colSpan: "lg:col-span-7", tapeRotate: "rotate-1", z: "z-10" },
  { rotate: "rotate-1", colSpan: "lg:col-span-4", tapeRotate: "-rotate-3", z: "z-10" },
  { rotate: "-rotate-3", colSpan: "lg:col-span-4", tapeRotate: "rotate-2", z: "z-20" },
  { rotate: "rotate-2", colSpan: "lg:col-span-4", tapeRotate: "-rotate-1", z: "z-10" },
  { rotate: "-rotate-2", colSpan: "lg:col-span-6", tapeRotate: "rotate-3", z: "z-10" },
  { rotate: "rotate-3", colSpan: "lg:col-span-6", tapeRotate: "-rotate-2", z: "z-20" },
];

export function PosterWall({ events, onSelectEvent }: PosterWallProps) {
  const [peelingId, setPeelingId] = useState<string | null>(null);

  const handlePosterClick = (event: EventData) => {
    soundEngine.playPaperTear();
    setPeelingId(event.id);
    setTimeout(() => {
      setPeelingId(null);
      onSelectEvent(event);
    }, 280);
  };

  return (
    <section id="posters" className="py-24 bg-cinema-black text-cinema-paper border-b-4 border-cinema-black relative wall-texture overflow-hidden">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-cinema-border pb-4 font-mono text-xs text-cinema-paper/60 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cinema-red" />
            <span className="text-cinema-gold font-bold">DIGITAL THEATRE WALL • CHENNAI STREET POSTERS</span>
          </div>
          <div className="flex items-center gap-3 text-cinema-gold font-bold">
            <span>&ldquo;Paakalaama? Poster peel panni paaru.&rdquo;</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-cinema-paper/70">CLICK TO PEEL POSTER</span>
          </div>
        </div>

        <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper mt-6 leading-none poster-title-shadow">
          THE WALL
        </h2>
        <p className="font-editorial text-cinema-paper/85 text-base sm:text-lg max-w-2xl mt-3 italic leading-relaxed">
          &ldquo;Enna da, event choose pannitiya? Un talent-ku oru stage ready.&rdquo; Every poster is torn, taped, tilted, and freshly pasted outside the SVCE auditorium gates.
        </p>
        <div className="w-24 h-1 bg-cinema-red mt-4" />
      </div>

      {/* Intentionally Chaotic Physical Street Poster Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {events.map((event, idx) => {
            const conf = WALL_LAYOUT[idx % WALL_LAYOUT.length];
            const isHousefull = event.status === "HOUSEFULL";
            const catStyle = CATEGORY_STYLES[event.category] || { border: "border-cinema-gold", badge: "bg-cinema-gold text-cinema-black" };
            const isPeeling = peelingId === event.id;

            return (
              <div
                key={event.id}
                data-cursor="view"
                onClick={() => handlePosterClick(event)}
                className={`${conf.colSpan} ${conf.z} ${conf.rotate} hover:rotate-0 hover:scale-[1.02] hover:z-30 transition-all duration-200 cursor-pointer relative group ${
                  isPeeling ? "scale-95 translate-y-2 opacity-80" : ""
                }`}
              >
                {/* Physical Masking Tape Strip */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-cinema-gold/60 border border-cinema-black/50 shadow-sm z-30 transition-transform duration-200 group-hover:-translate-y-1 ${conf.tapeRotate}`}
                />

                {/* Simulated Under-Sheet revealing on peel */}
                <div className="absolute inset-0 bg-[#E2D2B0] border-4 border-cinema-black -z-10 shadow-hard transform rotate-1 flex items-end p-4">
                  <span className="font-mono text-[10px] text-cinema-black font-bold uppercase">
                    CALL SHEET • {event.category}
                  </span>
                </div>

                {/* Poster Frame */}
                <div className={`bg-cinema-black border-4 border-cinema-black shadow-hard-lg group-hover:shadow-hard-xl overflow-hidden relative transition-all duration-200 ${catStyle.border}`}>
                  {/* Poster Image Artwork */}
                  <div className="aspect-[2/3] w-full bg-cinema-charcoal relative overflow-hidden">
                    {event.posterImage ? (
                      <img
                        src={event.posterImage}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-cinema-maroon">
                        <Film className="w-12 h-12 text-cinema-gold mb-3" />
                        <h4 className="font-poster text-3xl font-black text-cinema-paper uppercase">
                          {event.name}
                        </h4>
                      </div>
                    )}

                    {/* Category Ribbon & FDFS/SDFS Indicator */}
                    <div className="absolute top-2 left-2 z-20 flex flex-wrap items-center gap-1">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider border border-cinema-black shadow-hard ${catStyle.badge}`}>
                        {event.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider border border-cinema-black shadow-hard ${
                        (event.showType || (event.startTime.includes("2026-09-18") ? "FDFS" : "SDFS")) === "FDFS"
                          ? "bg-cinema-red text-cinema-paper"
                          : "bg-cinema-black text-cinema-gold"
                      }`}>
                        {event.showType || (event.startTime.includes("2026-09-18") ? "FDFS" : "SDFS")}
                      </span>
                    </div>

                    {/* Physical Red Rubber HOUSEFULL Stamp Overlay */}
                    {isHousefull && (
                      <div className="absolute inset-0 flex items-center justify-center bg-cinema-black/70 pointer-events-none z-20">
                        <div className="transform -rotate-12 border-4 border-cinema-red bg-cinema-red/90 text-cinema-paper px-6 py-2 shadow-hard-red text-center">
                          <span className="font-poster text-4xl sm:text-5xl font-black tracking-widest block uppercase">
                            HOUSEFULL
                          </span>
                          <span className="font-mono text-xs font-black uppercase tracking-wider block text-cinema-gold mt-0.5">
                            AIYO... SHOW FULL DA!
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Hover Peel Preview Bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent p-4 flex items-center justify-between text-xs font-mono opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="text-cinema-gold font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>PEEL TO VIEW</span>
                      </span>
                      <span className="px-2 py-0.5 bg-cinema-red text-cinema-paper font-bold uppercase text-[10px]">
                        1ST YEARS ONLY
                      </span>
                    </div>
                  </div>

                  {/* Poster Billing Footer Strip */}
                  <div className="p-4 bg-cinema-black border-t-2 border-cinema-black">
                    <div className="flex items-center justify-between text-[11px] font-mono text-cinema-paper/60 uppercase mb-1">
                      <span>{event.category}</span>
                      <span className="text-cinema-gold font-bold">{event.venue}</span>
                    </div>
                    <h3 className="font-poster text-2xl sm:text-3xl font-black uppercase text-cinema-paper group-hover:text-cinema-gold transition-colors leading-tight truncate">
                      {event.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
