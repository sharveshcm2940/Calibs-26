"use client";

import React from "react";
import { Zap, Shield, ArrowRight } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface KaruppuWorldProps {
  onSelectEvent?: (eventId: string) => void;
}

export function KaruppuWorld({ onSelectEvent }: KaruppuWorldProps) {
  const handleEventClick = () => {
    soundEngine.playProjectorClick();
    if (onSelectEvent) onSelectEvent("drama");
  };

  return (
    <section id="world-karuppu" className="py-24 bg-world-karuppu-bg text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden karuppu-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-karuppu-mud/60 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-world-karuppu-vermilion font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 bg-world-karuppu-vermilion" />
            <span>KARUPPU / EARTHEN MASS • SCENE 04</span>
          </div>
          <span className="text-cinema-paper/60 uppercase tracking-widest hidden sm:inline">
            ZONE: SOIL &amp; STAGE • GROUNDED INTENSITY
          </span>
        </div>

        {/* Earthen Raw Mass Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Character Dossier */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-world-karuppu-charcoal border-4 border-cinema-black shadow-hard-lg p-6 sm:p-8 relative">
              <div className="border-b border-world-karuppu-mud pb-3 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-world-karuppu-vermilion font-bold block">
                    ARCHETYPE 04
                  </span>
                  <h4 className="font-poster text-3xl sm:text-4xl font-black uppercase text-cinema-paper leading-none mt-1">
                    THE SHADOW
                  </h4>
                </div>
                <Shield className="w-6 h-6 text-world-karuppu-vermilion" />
              </div>

              {/* Graphic Earthen Symbol */}
              <div className="aspect-[4/3] bg-cinema-black border-2 border-world-karuppu-mud relative flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 border-4 border-world-karuppu-vermilion rotate-45 flex items-center justify-center bg-world-karuppu-mud/30">
                  <span className="font-poster text-3xl font-black text-cinema-paper -rotate-45">
                    MASS
                  </span>
                </div>
                <span className="font-mono text-[11px] text-world-karuppu-vermilion font-bold uppercase mt-4 tracking-widest">
                  ROOTED RESILIENCE • UNBROKEN PRIDE
                </span>
              </div>

              <p className="font-editorial text-xs italic text-cinema-paper/80 mt-4 leading-relaxed">
                Bound to the soil, untamed by corporate sheen. His fury is quiet, his presence immovable. When he steps forward, the ground shakes.
              </p>
            </div>
          </div>

          {/* Right Narrative & Event Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="font-mono text-xs text-world-karuppu-vermilion uppercase tracking-[0.3em] font-bold block">
              INDIGENOUS POWER &amp; RAW EXPRESSION • மண் வாசனை
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-[0.88] print-offset-red">
              THE RAW MASS
            </h2>

            <p className="font-editorial text-lg sm:text-xl text-cinema-paper/90 italic leading-relaxed">
              &ldquo;Mannoda veeram, kuraloda thimiru. Edhuvume easy illa... aana stage-ku vandha, scene namma dhaan.&rdquo;
            </p>

            <div className="p-6 bg-world-karuppu-charcoal border-2 border-world-karuppu-vermilion shadow-hard">
              <div className="flex items-center justify-between text-xs font-mono text-world-karuppu-vermilion mb-2">
                <span>FEATURED STAGE EVENT</span>
                <Zap className="w-4 h-4 text-world-karuppu-vermilion" />
              </div>
              <h3 className="font-poster text-3xl font-black uppercase text-cinema-paper mb-2">
                KADHAI THIRAKKADHAI: STAGE PLAY
              </h3>
              <p className="font-mono text-xs text-cinema-paper/80 mb-4 leading-relaxed">
                Original stage dramas confronting heritage, social struggle, and unapologetic courage under fierce spotlights.
              </p>
              <button
                onClick={handleEventClick}
                className="px-5 py-2.5 bg-world-karuppu-vermilion hover:bg-cinema-maroon text-cinema-paper font-poster text-lg tracking-widest uppercase border border-cinema-paper shadow-hard flex items-center gap-2 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
              >
                <span>INSPECT DRAMA DOSSIER</span>
                <ArrowRight className="w-4 h-4 text-cinema-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
