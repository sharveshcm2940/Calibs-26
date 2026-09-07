"use client";

import React, { useState } from "react";
import { Film, Eye, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface ContactStill {
  id: number;
  frame: string;
  title: string;
  annotation: string;
  rotation: string;
  span: string;
}

const CONTACT_STILLS: ContactStill[] = [
  {
    id: 1,
    frame: "KODAK 35MM • 12A",
    title: "OAT SPOTLIGHT RIGGING",
    annotation: "Red grease pencil: BEST TAKE FOR TEASER",
    rotation: "-rotate-1",
    span: "sm:col-span-2 lg:col-span-8",
  },
  {
    id: 2,
    frame: "KODAK 35MM • 13",
    title: "SYNCHRONIZED KUTHU SYNC",
    annotation: "Fifty dancers moving in lockstep rhythm",
    rotation: "rotate-2",
    span: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: 3,
    frame: "KODAK 35MM • 14",
    title: "FIRST CLAPPERBOARD ROLL",
    annotation: "Take 1 for Short Film preview roll",
    rotation: "rotate-1",
    span: "sm:col-span-1 lg:col-span-4",
  },
  {
    id: 4,
    frame: "KODAK 35MM • 15A",
    title: "ELECTRIC GUITAR LINE-CHECK",
    annotation: "Pre-gain overdrive check at soundstage",
    rotation: "-rotate-2",
    span: "sm:col-span-2 lg:col-span-8",
  },
  {
    id: 5,
    frame: "KODAK 35MM • 16",
    title: "FIRST ROW WHISTLE ERUPTION",
    annotation: "Audience reaction during mass hero entry",
    rotation: "-rotate-1",
    span: "sm:col-span-1 lg:col-span-6",
  },
  {
    id: 6,
    frame: "KODAK 35MM • 17",
    title: "RETRO BELLBOTTOM STYLING",
    annotation: "80s Kollywood silk dhoti adjustments",
    rotation: "rotate-1.5",
    span: "sm:col-span-1 lg:col-span-6",
  },
];

export function GalleryReel() {
  const [selectedStill, setSelectedStill] = useState<ContactStill | null>(null);
  const [isFrame26Revealed, setIsFrame26Revealed] = useState(false);

  const toggleFrame26 = () => {
    soundEngine.playProjectorClick();
    setIsFrame26Revealed((prev) => !prev);
  };

  return (
    <section id="frames" className="py-24 bg-[#0A0807] text-cinema-paper border-b-4 border-cinema-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Sheet Header */}
        <div className="border-b-4 border-cinema-border pb-6 mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-cinema-gold uppercase tracking-[0.3em] font-bold">
              <span>35MM NEGATIVE ROLL</span>
              <span>•</span>
              <span>CONTACT PROOF SHEET</span>
              <span>•</span>
              <span className="text-cinema-red font-black">நினைவுப் பதிவுகள்</span>
            </div>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-none poster-title-shadow">
              THE FRAMES
            </h2>
            <p className="font-editorial italic text-base sm:text-lg text-cinema-gold/90 mt-2">
              &ldquo;Indha frames-la dhaan namma memories.&rdquo;
            </p>
          </div>
          <div className="text-left sm:text-right space-y-1">
            <div className="font-mono text-xs text-cinema-red font-bold uppercase tracking-wider">
              EASTMAN KODAK 500T • ARCHIVE VAULT
            </div>
            <p className="font-editorial text-xs sm:text-sm italic text-cinema-paper/70 max-w-sm">
              Uncut rehearsal frames, audio line-checks, and green room candid captures straight from the SVCE film lab.
            </p>
          </div>
        </div>

        {/* Interactive 35mm Pull-Out Negative Sleeve: FRAME 026 */}
        <div className="mb-12 border-4 border-cinema-gold/60 bg-cinema-black/90 p-4 sm:p-6 relative overflow-hidden shadow-hard-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cinema-border">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-cinema-gold font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-cinema-gold animate-pulse" />
                <span>VAULT ARCHIVE • MASTER REEL CANISTER</span>
                <span className="text-cinema-red font-black">ரகசிய காட்சி</span>
              </div>
              <h3 className="font-poster text-2xl sm:text-3xl font-black uppercase text-cinema-paper tracking-wide">
                FRAME 026: CALIBRATIONS 2026–2027
              </h3>
              <p className="font-editorial italic text-xs sm:text-sm text-cinema-paper/75">
                &ldquo;First year entry mass-ah irukanum. Indha frame dhaan history-la nikkum.&rdquo;
              </p>
            </div>

            <button
              onClick={toggleFrame26}
              data-cursor="view"
              className={`px-5 py-3 border-2 font-poster uppercase text-sm sm:text-base tracking-wider transition-all flex items-center gap-2 ${
                isFrame26Revealed
                  ? "bg-cinema-gold text-cinema-black border-cinema-gold font-bold shadow-hard"
                  : "bg-cinema-red text-cinema-paper border-cinema-red hover:bg-cinema-maroon shadow-hard"
              }`}
            >
              <span>{isFrame26Revealed ? "RETRACT NEGATIVE STRIP [ மூடு ]" : "PULL OUT FRAME 026 [ இழுத்து பாருங்க ]"}</span>
              {isFrame26Revealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Pull-out Strip Reveal */}
          {isFrame26Revealed && (
            <div className="mt-6 pt-6 border-t border-cinema-gold/30">
              <div className="bg-[#050403] border-4 border-cinema-gold p-4 sm:p-6 relative">
                {/* Sprockets Top */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-cinema-gold/20 overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-4 bg-cinema-gold/30 rounded-none shrink-0" />
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 bg-cinema-charcoal border-2 border-cinema-gold/40 p-6 sm:p-8 text-center relative overflow-hidden">
                    <div className="absolute top-2 left-3 font-mono text-[10px] text-cinema-gold tracking-widest">
                      EASTMAN 5219 VISION3 500T • KODAK EXP 2026
                    </div>
                    <div className="absolute top-2 right-3 px-2 py-0.5 border border-cinema-red text-[10px] font-mono font-bold text-cinema-red bg-black/90 rotate-[-3deg]">
                      [MASTER NEGATIVE • 35MM CINEMASCOPE]
                    </div>

                    <Film className="w-16 h-16 text-cinema-gold mx-auto mb-3" />
                    <div className="font-mono text-xs text-cinema-red uppercase tracking-widest font-bold mb-1">
                      SRI VENKATESWARA COLLEGE OF ENGINEERING • PENNALUR
                    </div>
                    <h4 className="font-poster text-3xl sm:text-5xl font-black uppercase text-cinema-paper tracking-wider mb-2">
                      CALIBRATIONS 2026–2027
                    </h4>
                    <p className="font-editorial italic text-cinema-gold/90 text-sm sm:text-base max-w-xl mx-auto">
                      &ldquo;Oru periya scene create panna porom. The raw spirit, loudest cheers, and the beginning of your four-year Kollywood blockbusters.&rdquo;
                    </p>
                    <div className="mt-4 inline-flex items-center gap-3 text-xs font-mono bg-black/60 px-4 py-1.5 border border-cinema-gold/30 text-cinema-paper/80">
                      <span>FPS: 24.00</span>
                      <span>•</span>
                      <span>LENS: ANAMORPHIC 50MM T1.9</span>
                      <span>•</span>
                      <span>TAKE: 001</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-4 font-mono text-xs">
                    <div className="border-2 border-cinema-border p-3 bg-black/40 space-y-1">
                      <div className="text-cinema-gold font-bold">SLATE METADATA</div>
                      <div className="text-cinema-paper/70">PROD: SVCE FRESHERS GUILD</div>
                      <div className="text-cinema-paper/70">DATE: SEPT 18–19, 2026</div>
                      <div className="text-cinema-paper/70">LOC: PENNALUR, CHENNAI-BENGALURU HWY</div>
                      <div className="text-cinema-red font-bold">ELIGIBILITY: 1ST YEAR FRESHERS ONLY</div>
                    </div>

                    <div className="border-2 border-cinema-gold/40 p-3 bg-cinema-gold/10 text-cinema-paper space-y-1">
                      <div className="text-cinema-gold font-bold">DIRECTOR CUE [ Tanglish ]</div>
                      <div className="italic font-editorial text-sm">
                        &ldquo;Camera rolling... Sound speeds... All first years in position. Action!&rdquo;
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sprockets Bottom */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-cinema-gold/20 overflow-hidden">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-4 bg-cinema-gold/30 rounded-none shrink-0" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Film Strip Sprocket Perforations Top */}
        <div className="flex items-center justify-between gap-1 pb-3 mb-6 border-b border-cinema-border overflow-hidden opacity-40">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-3 h-5 bg-cinema-paper/30 rounded-none shrink-0" />
          ))}
        </div>

        {/* Contact Sheet Frame Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {CONTACT_STILLS.map((still) => (
            <div
              key={still.id}
              onClick={() => {
                soundEngine.playProjectorClick();
                setSelectedStill(still);
              }}
              data-cursor="view"
              className={`${still.span} ${still.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-200 cursor-pointer bg-cinema-black border-4 border-cinema-black shadow-hard-lg relative group`}
            >
              {/* Negative Header Bar */}
              <div className="bg-cinema-black px-3 py-1 flex items-center justify-between text-[10px] font-mono text-cinema-gold border-b border-cinema-border">
                <span>{still.frame}</span>
                <span className="text-cinema-red font-bold">SAFETY FILM</span>
              </div>

              {/* Still Frame */}
              <div className="aspect-[16/10] bg-cinema-charcoal relative flex flex-col items-center justify-center p-6 text-center overflow-hidden border border-cinema-border">
                <Film className="w-10 h-10 text-cinema-gold/50 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-poster text-2xl sm:text-3xl font-black uppercase text-cinema-paper tracking-wider">
                  {still.title}
                </h4>

                {/* Simulated Red Grease Pencil Annotation */}
                <div className="absolute top-2 right-2 px-2 py-0.5 border border-cinema-red text-[10px] font-mono font-bold text-cinema-red bg-cinema-black/80 rotate-[-5deg]">
                  [PASS • APPROVED]
                </div>
              </div>

              {/* Caption Bar */}
              <div className="p-3 bg-[#161310] border-t border-cinema-border text-xs font-mono flex items-center justify-between text-cinema-paper/70">
                <span className="truncate italic font-editorial text-sm">
                  {still.annotation}
                </span>
                <Eye className="w-3.5 h-3.5 text-cinema-gold shrink-0 ml-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Film Strip Sprocket Perforations Bottom */}
        <div className="flex items-center justify-between gap-1 pt-6 mt-6 border-t border-cinema-border overflow-hidden opacity-40">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="w-3 h-5 bg-cinema-paper/30 rounded-none shrink-0" />
          ))}
        </div>

        {/* Lightbox Viewer */}
        {selectedStill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinema-black/95 backdrop-blur-sm">
            <div className="relative max-w-2xl w-full bg-cinema-paper text-cinema-black border-4 border-cinema-black p-6 sm:p-8 shadow-hard-lg">
              <button
                onClick={() => setSelectedStill(null)}
                className="absolute top-4 right-4 p-1.5 border-2 border-cinema-black text-cinema-black hover:bg-cinema-black hover:text-cinema-paper transition-colors"
                aria-label="Close still viewer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono uppercase tracking-widest text-cinema-maroon font-bold block mb-1">
                {selectedStill.frame}
              </span>
              <h3 className="font-poster text-4xl sm:text-5xl font-black uppercase text-cinema-black leading-none mb-4">
                {selectedStill.title}
              </h3>

              <div className="aspect-[16/10] w-full bg-cinema-black border-2 border-cinema-black flex flex-col items-center justify-center p-6 text-center text-cinema-paper">
                <Film className="w-16 h-16 text-cinema-gold mb-3" />
                <span className="font-poster text-3xl uppercase tracking-wider">
                  {selectedStill.title}
                </span>
              </div>

              <p className="font-editorial text-base italic text-cinema-black/90 mt-4">
                &ldquo;{selectedStill.annotation}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t-2 border-cinema-black flex justify-between text-xs font-mono text-cinema-black/60">
                <span>EASTMAN COLOR NEGATIVE • 35MM</span>
                <button
                  onClick={() => setSelectedStill(null)}
                  className="font-bold underline text-cinema-black"
                >
                  DISMISS PROOF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
