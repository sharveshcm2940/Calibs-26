"use client";

import React, { useState } from "react";
import { Shield, Sparkles, Flame, Snowflake, Crown, Music, Coffee, Spade } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface CharacterProfile {
  id: string;
  name: string;
  tamilTitle: string;
  world: string;
  role: string;
  quote: string;
  personality: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  icon: React.ReactNode;
}

const SEVEN_CHARACTERS: CharacterProfile[] = [
  {
    id: "night-runner",
    name: "THE NIGHT RUNNER",
    tamilTitle: "இரவு வேட்டைக்காரன்",
    world: "KAITHI WORLD",
    role: "Nocturnal Trailblazer",
    quote: "When the campus gates lock, the real journey begins.",
    personality: "Silent, hyper-focused, protective of his squad.",
    bgClass: "bg-world-kaithi-dark",
    borderClass: "border-world-kaithi-sodium",
    textClass: "text-world-kaithi-sodium",
    icon: <Flame className="w-6 h-6 text-world-kaithi-sodium" />,
  },
  {
    id: "hunter",
    name: "THE HUNTER",
    tamilTitle: "பனி வேங்கை",
    world: "LEO WORLD",
    role: "Industrial Precisionist",
    quote: "Calm on the surface. Lethal when the countdown begins.",
    personality: "Ruthless perfectionism, razor-sharp stage presence.",
    bgClass: "bg-world-leo-dark",
    borderClass: "border-cinema-red",
    textClass: "text-world-leo-ice",
    icon: <Snowflake className="w-6 h-6 text-world-leo-ice" />,
  },
  {
    id: "boss",
    name: "THE BOSS",
    tamilTitle: "ஆதிக்கம்",
    world: "ROLEX WORLD",
    role: "Supreme Orchestrator",
    quote: "The stage doesn't demand attention. It bows to authority.",
    personality: "Unapologetic swagger, luxury gold aura, absolute command.",
    bgClass: "bg-world-rolex-smoke",
    borderClass: "border-world-rolex-gold",
    textClass: "text-world-rolex-gold",
    icon: <Crown className="w-6 h-6 text-world-rolex-gold" />,
  },
  {
    id: "shadow",
    name: "THE SHADOW",
    tamilTitle: "மண் வீரன்",
    world: "KARUPPU WORLD",
    role: "Grounded Mass Force",
    quote: "Our power is rooted in the soil, not empty spotlight glitter.",
    personality: "Earthy resilience, thumping acoustic presence, deep integrity.",
    bgClass: "bg-world-karuppu-charcoal",
    borderClass: "border-world-karuppu-vermilion",
    textClass: "text-world-karuppu-vermilion",
    icon: <Shield className="w-6 h-6 text-world-karuppu-vermilion" />,
  },
  {
    id: "musician",
    name: "THE MUSICIAN",
    tamilTitle: "இசை நாயகன்",
    world: "MEESAYA MURUKKU WORLD",
    role: "Youthful Dreamer",
    quote: "One catchy hook on a canteen bench can ignite the whole batch.",
    personality: "Infectious charisma, non-stop rhythm, relentless optimism.",
    bgClass: "bg-cinema-charcoal",
    borderClass: "border-world-mm-yellow",
    textClass: "text-world-mm-yellow",
    icon: <Music className="w-6 h-6 text-world-mm-yellow" />,
  },
  {
    id: "campus-rebel",
    name: "THE CAMPUS REBEL",
    tamilTitle: "கல்லூரி புரட்சியாளன்",
    world: "VIP WORLD",
    role: "Chennai Street Maverick",
    quote: "Degree in hand or not, we run this show our own way.",
    personality: "Everyday wit, engineering humor, fearless defiance.",
    bgClass: "bg-cinema-black",
    borderClass: "border-cinema-paper",
    textClass: "text-cinema-paper",
    icon: <Coffee className="w-6 h-6 text-world-vip-tea" />,
  },
  {
    id: "player",
    name: "THE PLAYER",
    tamilTitle: "சதுரங்க வேட்டை",
    world: "MANKATHA WORLD",
    role: "Heist Mastermind",
    quote: "Never reveal your hand until the trophy is in your bag.",
    personality: "Calculated risk-taker, monochrome elegance, cool demeanor.",
    bgClass: "bg-world-mankatha-slate",
    borderClass: "border-world-mankatha-gold",
    textClass: "text-world-mankatha-gold",
    icon: <Spade className="w-6 h-6 text-world-mankatha-gold" />,
  },
];

export function CharacterSection() {
  const [selectedId, setSelectedId] = useState(SEVEN_CHARACTERS[0].id);
  const activeChar = SEVEN_CHARACTERS.find((c) => c.id === selectedId) || SEVEN_CHARACTERS[0];

  const handleSelect = (char: CharacterProfile) => {
    soundEngine.playProjectorClick();
    setSelectedId(char.id);
  };

  return (
    <section id="cast" className="py-24 bg-cinema-black text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden theatre-wall">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="border-b-4 border-cinema-border pb-6 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-cinema-gold uppercase tracking-[0.3em] font-bold block mb-1">
              THE 7 ORIGINAL CINEMATIC ARCHETYPES
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-none poster-title-shadow">
              THE CAST
            </h2>
          </div>
          <p className="font-editorial text-sm sm:text-base text-cinema-paper/80 max-w-md italic">
            Seven original personas born from the visual grammar of Tamil cinema, ready to lead their squads across the campus festival.
          </p>
        </div>

        {/* Character Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {SEVEN_CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => handleSelect(char)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all shrink-0 ${
                selectedId === char.id
                  ? "bg-cinema-paper text-cinema-black border-cinema-paper shadow-hard scale-105"
                  : "bg-cinema-charcoal border-cinema-border text-cinema-paper/70 hover:border-cinema-gold"
              }`}
            >
              <span>{char.name}</span>
            </button>
          ))}
        </div>

        {/* Active Character Spotlight Showcase */}
        <div className={`${activeChar.bgClass} border-4 ${activeChar.borderClass} p-8 sm:p-12 shadow-hard-lg relative`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative Box */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 bg-cinema-black border ${activeChar.borderClass} font-mono text-xs font-bold uppercase tracking-widest ${activeChar.textClass}`}>
                  {activeChar.world}
                </span>
                <span className="font-editorial text-lg text-cinema-gold italic">
                  {activeChar.tamilTitle}
                </span>
              </div>

              <h3 className="font-poster text-5xl sm:text-7xl font-black uppercase tracking-tight text-cinema-paper leading-none">
                {activeChar.name}
              </h3>

              <div className="w-16 h-1 bg-cinema-red" />

              <p className="font-poster text-2xl sm:text-3xl uppercase tracking-wide text-cinema-paper/90">
                &ldquo;{activeChar.quote}&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cinema-border text-xs font-mono text-cinema-paper/70">
                <div>
                  <span className="text-cinema-gold font-bold block">FESTIVAL ROLE:</span>
                  <span className="text-cinema-paper font-semibold">{activeChar.role}</span>
                </div>
                <div>
                  <span className="text-cinema-gold font-bold block">CORE TRAIT:</span>
                  <span className="text-cinema-paper font-semibold">{activeChar.personality}</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Emblem Representation */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-72 bg-cinema-black border-4 border-cinema-black shadow-hard flex flex-col items-center justify-between p-6 text-center">
                <div className="w-full flex justify-between text-[10px] font-mono text-cinema-paper/50">
                  <span>CHAR #0{SEVEN_CHARACTERS.findIndex((c) => c.id === activeChar.id) + 1}</span>
                  <span>ORIGINAL</span>
                </div>

                <div className="p-5 border-2 border-cinema-border bg-[#1A1815]">
                  {activeChar.icon}
                </div>

                <div>
                  <span className="font-poster text-xl uppercase tracking-wider text-cinema-paper block">
                    {activeChar.name}
                  </span>
                  <span className="text-[9px] font-mono text-cinema-gold uppercase">
                    CALIBRATIONS 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
