"use client";

import React, { useState } from "react";
import { Disc, Music, Radio, ArrowRight, Heart, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface MeesayaMurukkuWorldProps {
  onSelectEvent?: (eventId: string) => void;
}

export function MeesayaMurukkuWorld({ onSelectEvent }: MeesayaMurukkuWorldProps) {
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 75, 55, 90, 65, 80, 45, 95, 60, 85, 50, 70]);

  const handleWaveInteraction = () => {
    soundEngine.playProjectorClick();
    // Jumble visualizer bars randomly
    setWaveHeights((prev) => prev.map(() => Math.floor(Math.random() * 65) + 30));
  };

  const handleEventClick = (id: string) => {
    soundEngine.playProjectorClick();
    if (onSelectEvent) onSelectEvent(id);
  };

  return (
    <section id="world-mm" className="py-24 bg-world-mm-bg text-world-mm-ink border-b-4 border-cinema-black relative overflow-hidden paper-grain">
      {/* College Ruled Notebook Background Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_bottom,#1F1B16_1px,transparent_1px)] [background-size:100%_32px]" />
      <div className="absolute top-0 bottom-0 left-12 sm:left-24 w-[2px] bg-cinema-red/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-mm-ink/30 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-cinema-red font-bold tracking-widest uppercase">
            <Radio className="w-4 h-4 text-world-mm-yellow" />
            <span>MEESAYA MURUKKU / YOUTH VIBE • SCENE 05</span>
          </div>
          <span className="text-world-mm-ink/60 uppercase tracking-widest hidden sm:inline">
            ZONE: SVCE CANTEEN LAWNS • COLLEGE + MUSIC + FRIENDSHIP
          </span>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-cinema-red uppercase tracking-[0.3em] font-bold block mb-2">
              FIRST SCENE • SVCE CANTEEN BENCHES
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-world-mm-ink leading-[0.88]">
              CAMPUS SIDE &amp; MUSIC CUT
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-editorial text-base sm:text-lg italic text-world-mm-ink/80 leading-relaxed">
              &ldquo;No budget for auto fare, but dreams that fill stadiums. Turn the classroom bench into a beatbox and write your first hit.&rdquo;
            </p>
          </div>
        </div>

        {/* Youthful College Tanglish Callout Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="p-4 bg-[#EAD7B5] border-2 border-world-mm-ink shadow-hard font-mono text-xs">
            <span className="font-bold text-cinema-red uppercase tracking-wider block text-[10px] mb-1">
              [ CANTEEN WISDOM 01 ]
            </span>
            <p className="font-editorial text-lg text-world-mm-ink italic">
              &ldquo;Class-ku attendance irukku... aana vibe-ku attendance venam.&rdquo;
            </p>
          </div>
          <div className="p-4 bg-[#EAD7B5] border-2 border-world-mm-ink shadow-hard font-mono text-xs">
            <span className="font-bold text-cinema-maroon uppercase tracking-wider block text-[10px] mb-1">
              [ CANTEEN WISDOM 02 ]
            </span>
            <p className="font-editorial text-lg text-world-mm-ink italic">
              &ldquo;Friends irundha podhum, scene automatic-ah set.&rdquo;
            </p>
          </div>
        </div>

        {/* Physical Cassette Tape Graphic & Interactive Audio Visualizer */}
        <div
          onMouseMove={handleWaveInteraction}
          className="bg-cinema-black text-cinema-paper border-4 border-cinema-black p-6 sm:p-10 shadow-hard-lg mb-10 relative cursor-pointer group"
          title="Move pointer to modulate music bars"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Cassette Tape Illustration */}
            <div className="md:col-span-5 flex flex-col items-center bg-[#1A1815] border-2 border-world-mm-yellow p-6 shadow-hard">
              <div className="w-full flex items-center justify-between border-b border-cinema-border pb-2 mb-4 text-[10px] font-mono text-world-mm-yellow uppercase">
                <span>C-60 STEREO TAPE</span>
                <span>CALIBS SIDE A</span>
              </div>

              {/* Spool Wheels */}
              <div className="flex items-center justify-center gap-8 py-3 w-full bg-cinema-black border border-cinema-border">
                <div className="w-12 h-12 rounded-full border-4 border-world-mm-yellow flex items-center justify-center cassette-spin">
                  <div className="w-4 h-4 bg-cinema-paper rounded-full" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-world-mm-yellow flex items-center justify-center cassette-spin">
                  <div className="w-4 h-4 bg-cinema-paper rounded-full" />
                </div>
              </div>

              <span className="font-poster text-2xl uppercase tracking-wider text-cinema-paper mt-4">
                CAMPUS ANTHEM 2026
              </span>
              <span className="text-[10px] font-mono text-cinema-paper/60 uppercase">
                ORIGINAL STUDENT VOCALS &amp; SVCE FRESHERS BEATS
              </span>
            </div>

            {/* Lyrics-Style Typography & Interactive Pointer-Reactive Equalizer */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-world-mm-yellow uppercase tracking-[0.25em] font-bold block">
                  [ LIVE EQUALIZER • MOVE POINTER TO JAM ]
                </span>
                <Sparkles className="w-4 h-4 text-world-mm-yellow animate-spin" />
              </div>

              {/* Equalizer Bars */}
              <div className="h-16 flex items-end gap-2 p-2 bg-[#121110] border border-cinema-border">
                {waveHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cinema-red to-world-mm-yellow transition-all duration-150"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="border-l-4 border-world-mm-yellow pl-4 py-2 bg-white/5">
                <p className="font-poster text-2xl sm:text-3xl uppercase tracking-wide text-world-mm-yellow">
                  &ldquo;Bench mela beatbox... mic illama paattu.&rdquo;
                </p>
                <p className="font-mono text-xs text-cinema-paper/70 mt-1">
                  Freshers Acoustic Cypher • SVCE Mechanical Canteen Quadrangle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Music & Vocal Events Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Isai Sangamam */}
          <div className="bg-white border-4 border-world-mm-ink p-6 shadow-hard relative group">
            <div className="flex items-center justify-between text-xs font-mono text-cinema-red mb-3">
              <span>BATTLE OF THE BANDS</span>
              <Music className="w-4 h-4 text-world-mm-yellow" />
            </div>
            <h3 className="font-poster text-3xl font-black uppercase text-world-mm-ink mb-2">
              ISAI SANGAMAM
            </h3>
            <p className="font-sans text-xs text-world-mm-ink/80 mb-6 leading-relaxed">
              Electric guitars, live thavil, brass section, and thunderous drums. Battle for the title of campus rock heavyweights.
            </p>
            <div className="pt-4 border-t-2 border-world-mm-ink flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cinema-red uppercase">LIVE AT SVCE OAT</span>
              <button
                onClick={() => handleEventClick("band-battle")}
                className="px-3 py-1 bg-world-mm-ink text-cinema-paper font-poster text-base uppercase hover:bg-cinema-red transition-colors flex items-center gap-1"
              >
                <span>DOSSIER</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Kural Oviyam */}
          <div className="bg-white border-4 border-world-mm-ink p-6 shadow-hard relative group">
            <div className="flex items-center justify-between text-xs font-mono text-cinema-red mb-3">
              <span>SOLO &amp; DUET VOCALS</span>
              <Disc className="w-4 h-4 text-world-mm-yellow" />
            </div>
            <h3 className="font-poster text-3xl font-black uppercase text-world-mm-ink mb-2">
              KURAL OVIYAM
            </h3>
            <p className="font-sans text-xs text-world-mm-ink/80 mb-6 leading-relaxed">
              Sing your heart out across golden Tamil classics, high-octane kuthu anthems, and modern fusion melodies.
            </p>
            <div className="pt-4 border-t-2 border-world-mm-ink flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cinema-red uppercase">AUDITORIUM STAGE</span>
              <button
                onClick={() => handleEventClick("singing")}
                className="px-3 py-1 bg-world-mm-ink text-cinema-paper font-poster text-base uppercase hover:bg-cinema-red transition-colors flex items-center gap-1"
              >
                <span>DOSSIER</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
