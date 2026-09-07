"use client";

import React, { useState } from "react";
import { Crown, Sparkles, Flame, Eye } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface RolexWorldProps {
  onRegisterClick?: () => void;
}

export function RolexWorld({ onRegisterClick }: RolexWorldProps) {
  const [entryStage, setEntryStage] = useState<number>(3); // 0 to 3 progressive reveal

  const handleProgressEntry = () => {
    soundEngine.playBassHit();
    setEntryStage((prev) => (prev + 1) % 4);
  };

  const handleRegister = () => {
    soundEngine.playTicketPrint();
    if (onRegisterClick) onRegisterClick();
  };

  return (
    <section id="world-rolex" className="py-24 bg-[#070605] text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden rolex-smoke">
      {/* Metallic Gold Sheen Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-world-rolex-gold/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-rolex-gold/40 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-world-rolex-gold font-bold tracking-widest uppercase">
            <Crown className="w-4 h-4 text-world-rolex-gold" />
            <span>ROLEX / BOSS ENTRY • SCENE 03</span>
          </div>
          <span className="text-world-rolex-gold/60 uppercase tracking-widest hidden sm:inline">
            ZONE: VIP BOX OFFICE • MASS APEX
          </span>
        </div>

        {/* The Boss Entry Heroic Banner */}
        <div className="bg-black/95 border-4 border-world-rolex-gold/70 p-6 sm:p-14 shadow-hard-gold relative">
          {/* Thin Gold Rim Light Atmosphere */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-world-rolex-gold/15 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-world-rolex-gold/15 border border-world-rolex-gold text-world-rolex-gold font-mono text-xs uppercase font-bold tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MASS ENTRANCE CINEMATIC REVEAL</span>
              </div>

              {/* Character Title: THE BOSS */}
              <h2 className="font-poster text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-cinema-paper leading-[0.85] print-offset-gold">
                THE BOSS
              </h2>

              {/* Tanglish Dialogue Headline */}
              <p className="font-poster text-2xl sm:text-4xl uppercase tracking-wider text-world-rolex-gold leading-tight">
                &ldquo;Entry late aanaalum, impact late aagathu.&rdquo;
              </p>

              <p className="font-editorial text-base sm:text-xl italic text-cinema-paper/85 max-w-2xl leading-relaxed">
                When the ultimate authority arrives, conversations cease and the stage yields. Gold rim lighting cuts the smoke. Total command of the campus auditorium.
              </p>

              {/* Progressive Entrance Stages Trigger */}
              <div className="pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
                <button
                  onClick={handleProgressEntry}
                  className="px-4 py-2 bg-world-rolex-gold text-cinema-black font-poster text-lg font-black uppercase border-2 border-cinema-black shadow-hard hover:bg-cinema-paper transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>STEP REVEAL [{entryStage + 1}/4]</span>
                </button>
                <span className="text-world-rolex-gold/80 font-bold uppercase tracking-wider">
                  {entryStage === 0 && "1. LEATHER BOOT STEPS FORWARD"}
                  {entryStage === 1 && "2. GOLD CUFFLINK & CANE GRIP"}
                  {entryStage === 2 && "3. BROAD SHOULDERS CUT THE SMOKE"}
                  {entryStage === 3 && "4. FULL SILHOUETTE • FACE OBSCURED"}
                </span>
              </div>
            </div>

            {/* Right: Silhouette Frame with Gold Rim Lighting */}
            <div className="lg:col-span-4">
              <div className="bg-[#0A0907] border-4 border-world-rolex-gold/60 p-6 text-center relative shadow-hard-gold group">
                <div className="w-48 h-64 mx-auto bg-gradient-to-b from-[#18140E] to-black border-2 border-world-rolex-gold/40 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  {/* Gold Rim Light Gradient */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-world-rolex-gold shadow-[0_0_15px_#C49A48]" />
                  <div className="absolute inset-y-0 right-0 w-1 bg-world-rolex-gold/60 shadow-[0_0_15px_#C49A48]" />

                  <Crown className="w-16 h-16 text-world-rolex-gold mb-3 animate-pulse" />
                  <span className="font-poster text-2xl uppercase tracking-wider text-cinema-paper">
                    THE ARCHITECT
                  </span>
                  <span className="text-[10px] font-mono text-world-rolex-gold uppercase tracking-widest mt-1">
                    FACE OBSCURED IN SMOKE
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-world-rolex-gold/30 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-world-rolex-gold font-bold">STATUS: APEX</span>
                  <button
                    onClick={handleRegister}
                    className="hover:text-world-rolex-gold font-bold underline uppercase"
                  >
                    CLAIM PASS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
