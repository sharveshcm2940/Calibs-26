"use client";

import React, { useState } from "react";
import { Spade, Club, Diamond, Heart, ArrowRight, Dices, Lock } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface MankathaWorldProps {
  onSelectEvent?: (eventId: string) => void;
}

const HEIST_LINEUP = [
  { no: "01", name: "MASS DANCE", code: "ADAVADI STEPS", suit: "Spade", id: "mass-dance" },
  { no: "02", name: "FILM QUIZ", code: "CINEMA VERIYAN", suit: "Club", id: "quiz" },
  { no: "03", name: "TREASURE HUNT", code: "KOLLYWOOD KOTTAI", suit: "Diamond", id: "treasure-hunt" },
  { no: "04", name: "FASHION WALK", code: "RAMP RAJA & RANI", suit: "Heart", id: "fashion-walk" },
  { no: "05", name: "BAND BATTLE", code: "ISAI SANGAMAM", suit: "Spade", id: "battle-of-bands" },
];

export function MankathaWorld({ onSelectEvent }: MankathaWorldProps) {
  const [shufflingIndex, setShufflingIndex] = useState<number | null>(null);
  const [displayNumbers, setDisplayNumbers] = useState<{ [key: number]: string }>({
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
  });

  const handleMouseEnter = (idx: number) => {
    soundEngine.playProjectorClick();
    setShufflingIndex(idx);

    // Rapid shuffle effect
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const randomNum = String(Math.floor(Math.random() * 89) + 10);
      setDisplayNumbers((prev) => ({ ...prev, [idx]: randomNum }));

      if (count >= 5) {
        clearInterval(interval);
        setDisplayNumbers((prev) => ({ ...prev, [idx]: HEIST_LINEUP[idx].no }));
        setShufflingIndex(null);
      }
    }, 45);
  };

  const handleEventClick = (id: string) => {
    soundEngine.playProjectorClick();
    if (onSelectEvent) onSelectEvent(id);
  };

  const renderSuitIcon = (suit: string) => {
    switch (suit) {
      case "Club":
        return <Club className="w-4 h-4 text-cinema-paper" />;
      case "Diamond":
        return <Diamond className="w-4 h-4 text-world-mankatha-gold" />;
      case "Heart":
        return <Heart className="w-4 h-4 text-cinema-red" />;
      default:
        return <Spade className="w-4 h-4 text-world-mankatha-gold" />;
    }
  };

  return (
    <section id="world-mankatha" className="py-24 bg-world-mankatha-bg text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden mankatha-noir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-mankatha-gold/40 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-world-mankatha-gold font-bold tracking-widest uppercase">
            <Spade className="w-4 h-4 text-world-mankatha-gold" />
            <span>MANKATHA / HEIST SWAGGER • SCENE 07</span>
          </div>
          <span className="text-cinema-paper/60 uppercase tracking-widest hidden sm:inline">
            ZONE: CASINO NOIR • STRATEGIC SHOWDOWN
          </span>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-world-mankatha-gold uppercase tracking-[0.3em] font-bold block mb-2">
              THE MASTER PLAN • ZERO REGRETS
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-[0.88] print-offset-gold">
              THE GAME
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-editorial text-base sm:text-lg italic text-cinema-paper/85 leading-relaxed">
              &ldquo;No second prizes in this heist. Put everything on the table, play your cards with icy precision, and walk away with the championship.&rdquo;
            </p>
          </div>
        </div>

        {/* Tanglish Heist Dialogue Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-4 bg-[#141416] border-2 border-world-mankatha-gold shadow-hard font-mono text-xs">
            <span className="text-world-mankatha-gold font-bold uppercase tracking-widest block text-[10px] mb-1">
              [ HEIST RULE 01 ]
            </span>
            <p className="font-editorial text-lg text-cinema-paper italic">
              &ldquo;Game start aagiduchu.&rdquo;
            </p>
          </div>
          <div className="p-4 bg-[#141416] border-2 border-cinema-red shadow-hard font-mono text-xs">
            <span className="text-cinema-red font-bold uppercase tracking-widest block text-[10px] mb-1">
              [ HEIST RULE 02 ]
            </span>
            <p className="font-editorial text-lg text-cinema-paper italic">
              &ldquo;Risk edukkama win panna mudiyuma?&rdquo;
            </p>
          </div>
        </div>

        {/* Strategic Numbered Heist Lineup with Number Shuffle */}
        <div className="divide-y-2 divide-cinema-border border-t-2 border-b-2 border-cinema-border bg-cinema-black mb-10">
          {HEIST_LINEUP.map((item, idx) => (
            <div
              key={item.id}
              onMouseEnter={() => handleMouseEnter(idx)}
              onClick={() => handleEventClick(item.id)}
              className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-[#1A1815] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#12110F] border-2 border-world-mankatha-gold flex items-center justify-center font-mono text-2xl font-black text-world-mankatha-gold shadow-hard shrink-0">
                  {displayNumbers[idx]}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {renderSuitIcon(item.suit)}
                    <span className="font-mono text-xs text-world-mankatha-gold uppercase font-bold tracking-widest">
                      {item.code}
                    </span>
                    {shufflingIndex === idx ? (
                      <span className="text-[10px] font-mono text-cinema-red uppercase font-bold animate-pulse">
                        [SHUFFLING...]
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-cinema-paper/40 uppercase hidden sm:inline">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <h3 className="font-poster text-2xl sm:text-3xl font-black uppercase text-cinema-paper group-hover:text-world-mankatha-gold transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-cinema-paper/60 uppercase tracking-widest hidden md:inline">
                  CONFIDENTIAL BET
                </span>
                <button className="px-4 py-2 bg-cinema-paper text-cinema-black font-poster text-lg uppercase group-hover:bg-world-mankatha-gold transition-colors flex items-center gap-2 border border-cinema-black shadow-hard">
                  <span>INSPECT FILE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
