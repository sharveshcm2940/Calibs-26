"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clapperboard, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface DialogueCut {
  tamilHeading: string;
  line: string;
  subtext: string;
  tanglishPunch: string;
  tag: string;
  character: string;
  colorClass: string;
}

const DIALOGUE_CUTS: DialogueCut[] = [
  {
    tamilHeading: "ஆட்டம் ஆரம்பம்",
    line: "FIRST DAY. FIRST SCENE. UN STORY. STARTS NOW.",
    subtext: "இன்று இரவு, இந்த வளாகம் ஒரு புதிய சரித்திரம் எழுதும்.",
    tanglishPunch: "Ready-ah?",
    tag: "OPENING CALL • KINETIC IMPACT",
    character: "THE PROTAGONIST",
    colorClass: "text-cinema-red",
  },
  {
    tamilHeading: "சீன் ரெடி",
    line: "TONIGHT, THE CAMPUS HAS A DIFFERENT STORY.",
    subtext: "இன்று யாரும் ஒதுங்கி நிற்கப்போவதில்லை. மேடை அனைவருக்கும் சொந்தம்.",
    tanglishPunch: "Night full-ah scene namma dhaan.",
    tag: "KAITHI / NIGHT SHIFT",
    character: "THE NIGHT RUNNER",
    colorClass: "text-world-kaithi-sodium",
  },
  {
    tamilHeading: "இது நம்ம நேரம்",
    line: "NO BACKGROUND CHARACTERS TONIGHT.",
    subtext: "முதல் நாள். உச்சகட்ட சத்தம். பின்வாங்காதே.",
    tanglishPunch: "Class-ku attendance irukku... aana vibe-ku attendance venam!",
    tag: "VIP / CAMPUS CUT",
    character: "THE CAMPUS REBEL",
    colorClass: "text-world-mm-yellow",
  },
  {
    tamilHeading: "வாங்க ஆரம்பிக்கலாம்",
    line: "ENTRY LATE AANAALUM, IMPACT LATE AAGATHU.",
    subtext: "உன் நுழைவு. உன் காட்சி. உன் சரித்திரம்.",
    tanglishPunch: "Stage authority belongs to us.",
    tag: "ROLEX / BOSS ENTRY",
    character: "THE BOSS",
    colorClass: "text-world-rolex-gold",
  },
  {
    tamilHeading: "வெற்றி நமதே",
    line: "RISK EDUKKAMA WIN PANNA MUDIYUMA?",
    subtext: "ஆட்டம் தொடங்குவது நீ உள்ளே நுழையும் நொடியில்.",
    tanglishPunch: "Game start aagiduchu.",
    tag: "MANKATHA / THE GAME",
    character: "THE PLAYER",
    colorClass: "text-world-mankatha-gold",
  },
];

export function DialogueBox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const active = DIALOGUE_CUTS[currentIndex];

  const handleNext = () => {
    soundEngine.playProjectorClick();
    setAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % DIALOGUE_CUTS.length);
  };

  const handlePrev = () => {
    soundEngine.playProjectorClick();
    setAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + DIALOGUE_CUTS.length) % DIALOGUE_CUTS.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimating(false), 350);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <section className="py-20 bg-cinema-black text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-cinema-red/10 via-transparent to-cinema-gold/10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Film Scene Header */}
        <div className="flex items-center justify-between border-b-2 border-cinema-border pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4 text-cinema-red" />
            <span className="text-cinema-gold font-bold uppercase tracking-widest">
              CINEMATIC DIALOGUE REVEAL • SCENE CUT 0{currentIndex + 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 border border-cinema-border hover:border-cinema-gold transition-colors"
              aria-label="Previous Dialogue"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs px-2 text-cinema-paper/60">
              0{currentIndex + 1} / 0{DIALOGUE_CUTS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 border border-cinema-border hover:border-cinema-gold transition-colors"
              aria-label="Next Dialogue"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Card Container with Block Mask Reveal */}
        <div className="bg-[#121110] border-4 border-cinema-border p-6 sm:p-12 shadow-hard-lg relative">
          {/* Animated Black Block Reveal Mask */}
          {animating && (
            <div className="absolute inset-0 bg-cinema-red z-20 animate-pulse pointer-events-none opacity-30" />
          )}

          {/* Top Tag & Character Voice */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="px-3 py-1 bg-cinema-black border border-cinema-border font-mono text-xs uppercase font-bold text-cinema-gold tracking-widest">
              {active.tag}
            </span>

            <span className="font-mono text-xs text-cinema-paper/60 uppercase tracking-widest">
              VOICE: <strong className="text-cinema-paper">{active.character}</strong>
            </span>
          </div>

          {/* Large Tamil Typography Graphic Moment */}
          <div className="mb-4">
            <span className="font-editorial text-3xl sm:text-5xl font-black text-cinema-gold tracking-widest block uppercase">
              {active.tamilHeading}
            </span>
          </div>

          {/* Impact Dialogue Typography */}
          <h3 className={`font-poster text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-4 transition-transform duration-200 ${active.colorClass}`}>
            &ldquo;{active.line}&rdquo;
          </h3>

          {/* Tanglish Punchline Callout */}
          <div className="p-3 bg-cinema-black/80 border-l-4 border-cinema-gold my-4 font-mono text-sm">
            <span className="text-[10px] text-cinema-gold font-bold uppercase tracking-widest block mb-0.5">
              [ CHENNAI STUDENT PUNCH ]
            </span>
            <p className="font-editorial text-xl sm:text-2xl text-cinema-paper italic">
              &ldquo;{active.tanglishPunch}&rdquo;
            </p>
          </div>

          {/* Subtext */}
          <p className="font-editorial text-base sm:text-xl text-cinema-paper/70 italic mt-4">
            {active.subtext}
          </p>

          <div className="mt-8 pt-4 border-t border-cinema-border flex items-center justify-between text-xs font-mono text-cinema-paper/60">
            <span>ORIGINAL STUDENT WRITERS CORPS • SVCE CAMPUS</span>
            <span className="px-3 py-1 bg-cinema-red text-cinema-paper font-bold uppercase">
              CERTIFIED MASS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
