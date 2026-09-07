"use client";

import React, { useState, useRef } from "react";
import { Compass, Flame, ShieldAlert, ArrowRight } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface KaithiWorldProps {
  onSelectEvent?: (eventId: string) => void;
}

export function KaithiWorld({ onSelectEvent }: KaithiWorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightX, setLightX] = useState(50); // percentage

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    setLightX(xPct);
  };

  const handleEventClick = (id: string) => {
    soundEngine.playProjectorClick();
    if (onSelectEvent) onSelectEvent(id);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="world-kaithi"
      className="py-24 bg-world-kaithi-bg text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden kaithi-road"
    >
      {/* Interactive Headlight Light Sweep across Dark Road */}
      <div
        className="absolute -top-20 bottom-0 pointer-events-none transition-all duration-150 ease-out opacity-40 mix-blend-screen"
        style={{
          left: `${lightX}%`,
          transform: "translateX(-50%)",
          width: "450px",
          background: "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(235, 138, 42, 0.4) 15deg, rgba(245, 178, 92, 0.6) 25deg, transparent 35deg)",
          filter: "blur(22px)",
        }}
      />

      {/* Ambient Sodium Lighting Glow */}
      <div className="absolute inset-0 sodium-haze pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-world-kaithi-sodium/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-kaithi-sodium/40 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-world-kaithi-sodium font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-world-kaithi-sodium animate-ping" />
            <span>KAITHI / NIGHT MODE • THE NIGHT SHIFT</span>
          </div>
          <span className="text-cinema-paper/60 uppercase tracking-widest hidden sm:inline">
            ZONE: SVCE OUTDOOR ARENA • RAW ACTION
          </span>
        </div>

        {/* Section Headline & Narrative Hook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-world-kaithi-sodium uppercase tracking-[0.3em] font-bold block mb-2">
              SCENE 01 • CITADEL UNDER SIEGE
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-[0.88] print-offset-orange">
              THE NIGHT SHIFT
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-editorial text-base sm:text-lg italic text-cinema-paper/85 leading-relaxed">
              &ldquo;The campus doesn&rsquo;t sleep tonight. Five hundred gates locked from the inside. One crew left standing when the morning bell rings.&rdquo;
            </p>
          </div>
        </div>

        {/* Tanglish Dialogue Strip */}
        <div className="p-4 bg-cinema-black/90 border-l-4 border-world-kaithi-sodium mb-10 font-mono text-xs flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-world-kaithi-sodium font-bold uppercase tracking-widest block text-[10px] mb-1">
              [ CHENNAI NIGHT RUNNER DISPATCH ]
            </span>
            <p className="font-editorial text-lg text-cinema-paper italic">
              &ldquo;Night full-ah scene namma dhaan. Flashlight on pannitu field-ku vaanga.&rdquo;
            </p>
          </div>
          <span className="text-[11px] text-world-kaithi-sodium/80 font-bold uppercase tracking-widest">
            MOVE POINTER TO SWEEP HEADLIGHTS
          </span>
        </div>

        {/* The Night Shift Horizontal Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Kollywood Kottai (Treasure Hunt) */}
          <div className="bg-world-kaithi-dark border-2 border-world-kaithi-sodium/60 p-6 shadow-hard-orange relative group hover:border-world-kaithi-sodium transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-world-kaithi-sodium mb-4">
              <span>NIGHT MISSION 01</span>
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-poster text-3xl font-black uppercase text-cinema-paper mb-2">
              KOLLYWOOD KOTTAI
            </h3>
            <p className="font-mono text-xs text-cinema-paper/70 mb-6 leading-relaxed">
              Decipher cryptic nocturnal clues hidden across the SVCE campus. Blackout corridors, flashlight navigation, zero backup.
            </p>
            <div className="pt-4 border-t border-world-kaithi-road flex items-center justify-between text-xs font-mono">
              <span className="text-world-kaithi-sodium font-bold">TREASURE HUNT</span>
              <button
                onClick={() => handleEventClick("treasure-hunt")}
                className="px-3 py-1 bg-world-kaithi-sodium text-cinema-black font-bold uppercase hover:bg-cinema-paper transition-colors flex items-center gap-1"
              >
                <span>DOSSIER</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Kadavul Setting (Esports Arena) */}
          <div className="bg-world-kaithi-dark border-2 border-world-kaithi-sodium/60 p-6 shadow-hard-orange relative group hover:border-world-kaithi-sodium transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-world-kaithi-sodium mb-4">
              <span>NIGHT MISSION 02</span>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-poster text-3xl font-black uppercase text-cinema-paper mb-2">
              KADAVUL SETTING
            </h3>
            <p className="font-mono text-xs text-cinema-paper/70 mb-6 leading-relaxed">
              LAN tactical shootouts under heavy smoke. Elimination brackets where single-round clutch plays decide campus dominion.
            </p>
            <div className="pt-4 border-t border-world-kaithi-road flex items-center justify-between text-xs font-mono">
              <span className="text-world-kaithi-sodium font-bold">ESPORTS ARENA</span>
              <button
                onClick={() => handleEventClick("gaming")}
                className="px-3 py-1 bg-world-kaithi-sodium text-cinema-black font-bold uppercase hover:bg-cinema-paper transition-colors flex items-center gap-1"
              >
                <span>DOSSIER</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: The Night Runner Archetype Profile */}
          <div className="bg-cinema-black border-2 border-cinema-paper/30 p-6 shadow-hard relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-cinema-paper/60 mb-4">
                <span>CHARACTER DOSSIER</span>
                <Flame className="w-4 h-4 text-world-kaithi-sodium" />
              </div>
              <span className="font-mono text-xs text-world-kaithi-sodium font-bold uppercase block mb-1">
                ARCHETYPE 01
              </span>
              <h3 className="font-poster text-3xl font-black uppercase text-cinema-paper mb-2">
                THE NIGHT RUNNER
              </h3>
              <p className="font-editorial text-xs italic text-cinema-paper/80 leading-relaxed">
                Quiet in the daylight, relentless after dark. Driven by loyalty to his crew, he doesn&rsquo;t speak much, but when he charges, the entire stage follows.
              </p>
            </div>
            <div className="pt-4 border-t border-cinema-border mt-6 text-[11px] font-mono text-world-kaithi-sodium font-bold flex items-center justify-between">
              <span>STATUS: READY FOR WAR</span>
              <span className="text-[10px] text-cinema-paper/50">SVCE NIGHT UNIT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
