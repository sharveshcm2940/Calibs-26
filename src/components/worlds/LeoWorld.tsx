"use client";

import React, { useState } from "react";
import { Film, Snowflake, ArrowRight, Flame, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface LeoWorldProps {
  onSelectEvent?: (eventId: string) => void;
}

export function LeoWorld({ onSelectEvent }: LeoWorldProps) {
  const [redImpact, setRedImpact] = useState(false);

  const triggerImpact = () => {
    soundEngine.playBassHit();
    setRedImpact(true);
    setTimeout(() => {
      setRedImpact(false);
    }, 1800);
  };

  const handleEventClick = () => {
    soundEngine.playProjectorClick();
    if (onSelectEvent) onSelectEvent("short-film");
  };

  return (
    <section
      id="world-leo"
      onMouseEnter={() => setRedImpact(true)}
      onMouseLeave={() => setRedImpact(false)}
      className={`py-24 transition-colors duration-500 border-b-4 border-cinema-black relative overflow-hidden ${
        redImpact ? "bg-[#180507]" : "bg-world-leo-bg"
      }`}
    >
      {/* Harsh Contrast Snow & Mist Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#C5D1D9_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Sudden Cinematic RED Light Impact Burst */}
      <div
        className={`absolute inset-0 bg-cinema-red/20 blur-3xl pointer-events-none transition-opacity duration-300 ${
          redImpact ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-leo-ice/30 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-world-leo-ice font-bold tracking-widest uppercase">
            <Snowflake className="w-4 h-4 text-world-leo-ice" />
            <span>LEO / COLD INTENSITY • SCENE 02</span>
          </div>
          <span className="text-cinema-paper/60 uppercase tracking-widest hidden sm:inline">
            ZONE: INDUSTRIAL SOUNDSTAGE • HIGH CONTRAST
          </span>
        </div>

        {/* Tanglish Microcopy Bar */}
        <div className="p-3 bg-cinema-black/80 border-l-4 border-cinema-red mb-8 font-mono text-xs flex items-center justify-between">
          <p className="font-editorial text-base sm:text-lg text-cinema-paper italic">
            &ldquo;Calm-ah irukku... aana scene vera level.&rdquo;
          </p>
          <button
            onClick={triggerImpact}
            className="px-3 py-1 bg-cinema-red text-cinema-paper font-bold uppercase text-[10px] tracking-widest hover:bg-white hover:text-cinema-black transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            <span>TRIGGER RED IMPACT</span>
          </button>
        </div>

        {/* Headline & Character Silhouette Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-cinema-red uppercase tracking-[0.35em] font-bold block">
              ORIGINAL CINEMATIC UNIVERSE • COLD TO SCORCHING RED
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-[0.88] poster-title-shadow">
              THE BEAST WITHIN
            </h2>

            <p className="font-editorial text-lg sm:text-xl text-world-leo-ice italic leading-relaxed">
              &ldquo;Under the silent, freezing industrial exterior lies an untamed fire. You cannot hide your true craft when the clapperboard strikes.&rdquo;
            </p>

            <div className={`p-6 bg-world-leo-dark border-2 transition-colors duration-300 shadow-hard-red relative ${
              redImpact ? "border-cinema-red" : "border-world-leo-ice/40"
            }`}>
              <div className="flex items-center justify-between text-xs font-mono text-world-leo-ice mb-2">
                <span>FEATURED EVENT SHOWCASE</span>
                <Film className="w-4 h-4 text-cinema-red" />
              </div>
              <h3 className="font-poster text-3xl sm:text-4xl font-black uppercase text-cinema-paper mb-2">
                70MM DREAMERS: SHORT FILM
              </h3>
              <p className="font-mono text-xs text-cinema-paper/80 mb-4 leading-relaxed">
                Write, shoot, and screen your magnum opus. High-contrast frames, razor-sharp sound design, and psychological intensity judged by industry directors.
              </p>
              <button
                onClick={handleEventClick}
                className="px-4 py-2 bg-cinema-red text-cinema-paper font-poster text-xl tracking-wider uppercase border-2 border-cinema-black shadow-hard hover:bg-cinema-maroon transition-colors flex items-center gap-2"
              >
                <span>INSPECT EVENT DOSSIER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Silhouette Frame */}
          <div className="lg:col-span-5">
            <div className="border-4 border-cinema-paper/30 bg-cinema-black p-8 text-center relative shadow-hard-lg overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-t from-cinema-red/30 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${
                redImpact ? "opacity-100" : "opacity-30"
              }`} />
              <div className="w-40 h-56 mx-auto bg-gradient-to-b from-zinc-800 to-zinc-950 border-2 border-zinc-700 flex flex-col items-center justify-center p-4 relative shadow-hard">
                <Flame className={`w-16 h-16 transition-colors duration-300 ${
                  redImpact ? "text-cinema-red animate-pulse" : "text-world-leo-ice"
                }`} />
                <span className="font-poster text-xl text-cinema-paper uppercase mt-2">
                  THE CHOIR MASTER
                </span>
                <span className="text-[10px] font-mono text-cinema-paper/60 uppercase">
                  CALM BEAST MODE
                </span>
              </div>
              <p className="font-editorial text-sm italic text-cinema-paper/80 mt-6">
                &ldquo;A tranquil family persona by day, a storm at call time. Master of shadows.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
