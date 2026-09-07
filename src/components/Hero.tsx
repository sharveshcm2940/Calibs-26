"use client";

import React, { useState, useRef, useEffect } from "react";
import { Ticket, ArrowDown, Film, Clapperboard, Sparkles } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface HeroProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onRegisterClick, onExploreClick }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Subtle mouse tracking for projector lens parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMouseOffset({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => {
      if (hero) hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleRegister = () => {
    soundEngine.playTicketPrint();
    onRegisterClick();
  };

  const handleExplore = () => {
    soundEngine.playWhoosh();
    onExploreClick();
  };

  const handleSoundCue = () => {
    soundEngine.playBassHit();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[95vh] bg-cinema-black text-cinema-paper flex flex-col justify-between p-4 sm:p-8 lg:p-12 border-b-4 border-cinema-black overflow-hidden paper-grain"
    >
      {/* 1. Interactive Cinema Projector Beam & Dust Atmosphere */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[750px] pointer-events-none transition-transform duration-300 ease-out opacity-25"
        style={{
          transform: `translateX(calc(-50% + ${mouseOffset.x * 30}px)) rotate(${mouseOffset.x * 2}deg)`,
          background: "conic-gradient(from 170deg at 50% 0%, transparent 0deg, rgba(240, 225, 191, 0.22) 15deg, rgba(196, 154, 72, 0.3) 25deg, transparent 35deg)",
          filter: "blur(18px)",
        }}
      />

      {/* 2. Ambient Cursor-Tracking Sodium & Red Light Sweeps */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cinema-red/15 blur-[140px] pointer-events-none transition-transform duration-200"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 40}px), calc(-50% + ${mouseOffset.y * 30}px))`,
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-cinema-gold/10 blur-[100px] pointer-events-none transition-transform duration-200"
        style={{
          transform: `translate(${mouseOffset.x * -30}px, ${mouseOffset.y * -20}px)`,
        }}
      />

      {/* Top Billboard Meta Bar with Tanglish Cue */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b-2 border-cinema-paper/20 pb-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-cinema-red text-cinema-paper font-black uppercase text-[10px] tracking-widest border border-cinema-paper shadow-hard">
            CENSOR U/A
          </span>
          <span className="text-cinema-gold font-bold uppercase tracking-widest">
            SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE) • PENNALUR
          </span>
        </div>

        {/* Tanglish Hook & Bass Cue Trigger */}
        <div className="flex items-center gap-4 text-cinema-paper/80 text-[11px] uppercase tracking-wider">
          <span className="text-cinema-gold font-bold">
            &ldquo;Scene ready-ah? First day. First scene. Vaanga, start pannalaam.&rdquo;
          </span>
          <button
            onClick={handleSoundCue}
            className="hover:text-cinema-gold transition-colors font-bold flex items-center gap-1 hidden sm:flex"
            title="Trigger Title Bass Hit"
          >
            <Sparkles className="w-3.5 h-3.5 text-cinema-gold" />
            <span>[PLAY INTRO CUE]</span>
          </button>
        </div>
      </div>

      {/* Dominant Movie Title Reveal Centerpiece */}
      <div className="relative z-10 py-10 sm:py-16 flex flex-col items-start justify-center max-w-7xl mx-auto w-full">
        {/* Tamil Script Graphic Typography */}
        <div className="flex items-center gap-4 mb-3">
          <span className="font-editorial text-2xl sm:text-4xl text-cinema-gold font-bold tracking-widest block">
            வாங்க. ஆரம்பிக்கலாம்.
          </span>
          <span className="px-3 py-0.5 bg-cinema-red text-cinema-paper font-poster text-xl uppercase tracking-widest border border-cinema-paper shadow-hard">
            சீன் ரெடி
          </span>
          <span className="hidden md:inline text-xs font-mono text-cinema-paper/60 uppercase tracking-widest">
            இது நம்ம நேரம் • IT&apos;S OUR TIME
          </span>
        </div>

        {/* Viewport Dominating Blockbuster Typography with Mouse Parallax Shift */}
        <div
          className="transition-transform duration-150 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 8}px, ${mouseOffset.y * 6}px, 0)`,
          }}
        >
          <h1 className="font-poster text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] font-black tracking-tight uppercase text-cinema-paper leading-[0.84] poster-title-shadow">
            CALIBRATIONS
          </h1>
        </div>

        {/* Edition & Tanglish Sub-lockup */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-sm sm:text-base">
          <span className="px-3 py-1 bg-cinema-paper text-cinema-black font-poster text-xl sm:text-2xl font-black uppercase tracking-wider border-2 border-cinema-black shadow-hard">
            2026 — 2027
          </span>
          <span className="font-poster text-3xl sm:text-4xl uppercase tracking-[0.15em] text-cinema-red font-black print-offset-black">
            KOLLYWOOD CINEMATIC EDITION
          </span>
          <span className="px-2 py-0.5 bg-cinema-charcoal border border-cinema-gold text-cinema-gold text-xs font-mono font-bold uppercase tracking-widest">
            FDFS &amp; SDFS • 1ST YEARS ONLY
          </span>
        </div>

        {/* Natural College Tanglish Narrative Dispatch */}
        <p className="font-editorial text-base sm:text-2xl text-cinema-paper/90 max-w-3xl mt-6 italic leading-relaxed">
          &ldquo;College life-la first scene romba important da. Seven cinematic worlds colliding across the historic SVCE campus. Full volume, zero backdown. Vaanga, kalakkalaam!&rdquo;
        </p>

        {/* CTA Actions Bar with Tanglish Microcopy */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4">
          <button
            onClick={handleRegister}
            className="px-8 py-4 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster text-2xl tracking-widest uppercase border-2 border-cinema-black shadow-hard-lg flex items-center gap-3 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Ticket className="w-6 h-6 text-cinema-gold" />
            <span>BOOK ENTRY PASS</span>
            <span className="hidden sm:inline text-xs font-mono text-cinema-gold tracking-widest ml-1">
              [ SCENE-KU VAANGA ]
            </span>
          </button>

          <button
            onClick={handleExplore}
            className="px-8 py-4 bg-cinema-paper hover:bg-[#E2D2B0] text-cinema-black font-poster text-2xl tracking-widest uppercase border-2 border-cinema-black shadow-hard flex items-center gap-2 transition-colors"
          >
            <span>EXPLORE 7 WORLDS</span>
            <span className="hidden sm:inline text-xs font-mono text-cinema-red tracking-widest ml-1">
              [ PAAKALAAMA? ]
            </span>
            <ArrowDown className="w-5 h-5 text-cinema-red" />
          </button>
        </div>
      </div>

      {/* Bottom Production Credits Billing Block */}
      <div className="relative z-10 border-t-2 border-cinema-paper/20 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[11px] uppercase text-cinema-paper/70">
        <div>
          <span className="text-cinema-gold block text-[9px] font-bold tracking-widest">
            PRODUCED BY
          </span>
          <span className="font-bold text-cinema-paper">SVCE FRESHERS GUILD</span>
        </div>
        <div>
          <span className="text-cinema-gold block text-[9px] font-bold tracking-widest">
            CINEMATIC ARCHIVES
          </span>
          <span className="font-bold text-cinema-paper">KAITHI • LEO • ROLEX</span>
        </div>
        <div>
          <span className="text-cinema-gold block text-[9px] font-bold tracking-widest">
            COLLEGE LEGENDS
          </span>
          <span className="font-bold text-cinema-paper">KARUPPU • MM • VIP • MANKATHA</span>
        </div>
        <div>
          <span className="text-cinema-gold block text-[9px] font-bold tracking-widest">
            CAMPUS VENUES
          </span>
          <span className="font-bold text-cinema-paper">OAT • MAIN AUDITORIUM • LIBRARY</span>
        </div>
      </div>
    </section>
  );
}
