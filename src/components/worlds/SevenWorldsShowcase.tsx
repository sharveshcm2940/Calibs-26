"use client";

import React, { useState } from "react";
import { KaithiWorld } from "./KaithiWorld";
import { LeoWorld } from "./LeoWorld";
import { RolexWorld } from "./RolexWorld";
import { KaruppuWorld } from "./KaruppuWorld";
import { MeesayaMurukkuWorld } from "./MeesayaMurukkuWorld";
import { VipWorld } from "./VipWorld";
import { MankathaWorld } from "./MankathaWorld";
import { soundEngine } from "@/lib/soundEngine";

interface SevenWorldsShowcaseProps {
  onSelectEvent: (eventId: string) => void;
  onRegisterClick: () => void;
}

const WORLDS_INDEX = [
  { id: "world-kaithi", label: "KAITHI", subtitle: "NIGHT SHIFT", color: "hover:border-world-kaithi-sodium hover:text-world-kaithi-sodium" },
  { id: "world-leo", label: "LEO", subtitle: "COLD BEAST", color: "hover:border-world-leo-ice hover:text-world-leo-ice" },
  { id: "world-rolex", label: "ROLEX", subtitle: "BOSS ENTRY", color: "hover:border-world-rolex-gold hover:text-world-rolex-gold" },
  { id: "world-karuppu", label: "KARUPPU", subtitle: "RAW MASS", color: "hover:border-world-karuppu-vermilion hover:text-world-karuppu-vermilion" },
  { id: "world-mm", label: "MEESAYA MURUKKU", subtitle: "MUSIC CUT", color: "hover:border-world-mm-yellow hover:text-world-mm-yellow" },
  { id: "world-vip", label: "VIP", subtitle: "THE GANG", color: "hover:border-world-vip-tea hover:text-world-vip-tea" },
  { id: "world-mankatha", label: "MANKATHA", subtitle: "THE GAME", color: "hover:border-world-mankatha-gold hover:text-world-mankatha-gold" },
];

export function SevenWorldsShowcase({
  onSelectEvent,
  onRegisterClick,
}: SevenWorldsShowcaseProps) {
  const [activeWorld, setActiveWorld] = useState("world-kaithi");

  const scrollToWorld = (worldId: string) => {
    soundEngine.playProjectorClick();
    setActiveWorld(worldId);
    const element = document.getElementById(worldId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="worlds" className="relative">
      {/* 7 Worlds Theatrical Selector Strip */}
      <div className="sticky top-16 sm:top-20 z-30 bg-cinema-black border-y-2 border-cinema-paper/30 py-3 px-4 shadow-hard">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-cinema-paper/50 uppercase tracking-widest shrink-0 hidden md:inline">
            7 WORLDS INDEX:
          </span>

          <div className="flex items-center gap-2">
            {WORLDS_INDEX.map((w) => (
              <button
                key={w.id}
                onClick={() => scrollToWorld(w.id)}
                className={`px-3 py-1.5 border text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 ${
                  activeWorld === w.id
                    ? "bg-cinema-paper text-cinema-black border-cinema-paper shadow-hard"
                    : `bg-cinema-charcoal border-cinema-border text-cinema-paper/80 ${w.color}`
                }`}
              >
                <span>{w.label}</span>
                <span className="hidden sm:inline text-[9px] opacity-70 ml-1.5">
                  [{w.subtitle}]
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render The 7 Cinematic Worlds in Progression */}
      <KaithiWorld onSelectEvent={onSelectEvent} />
      <LeoWorld onSelectEvent={onSelectEvent} />
      <RolexWorld onRegisterClick={onRegisterClick} />
      <KaruppuWorld onSelectEvent={onSelectEvent} />
      <MeesayaMurukkuWorld onSelectEvent={onSelectEvent} />
      <VipWorld />
      <MankathaWorld onSelectEvent={onSelectEvent} />
    </div>
  );
}
