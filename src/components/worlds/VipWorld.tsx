"use client";

import React from "react";
import { Coffee, IdCard, Users, ArrowRight, ShieldCheck, FileText, Ticket } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

export function VipWorld() {
  const handleCardClick = () => {
    soundEngine.playProjectorClick();
  };

  return (
    <section id="world-vip" className="py-24 bg-world-vip-bg text-world-vip-ink border-b-4 border-cinema-black relative overflow-hidden vip-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Reference Tag */}
        <div className="flex items-center justify-between border-b-2 border-world-vip-ink/30 pb-3 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-cinema-red font-bold tracking-widest uppercase">
            <Coffee className="w-4 h-4 text-world-vip-tea" />
            <span>VIP / CHENNAI YOUTH • SCENE 06</span>
          </div>
          <span className="text-world-vip-ink/60 uppercase tracking-widest hidden sm:inline">
            ZONE: SVCE CANTEEN &amp; LAWNS • REBEL RESILIENCE
          </span>
        </div>

        {/* Headline & Engineering Life Subheading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs text-cinema-red uppercase tracking-[0.3em] font-bold block mb-2">
              CAMPUS CHRONICLES • BACKBENCHERS TO HEADLINERS
            </span>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-world-vip-ink leading-[0.88]">
              THE GANG
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="font-editorial text-base sm:text-lg italic text-world-vip-ink/80 leading-relaxed">
              &ldquo;Cut bun, cutting chai, eight backlogs, and infinite self-respect. When the system says no, Chennai engineering youth finds a way.&rdquo;
            </p>
          </div>
        </div>

        {/* Small Sticky Notes with Youthful Tanglish Microcopy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-3 bg-[#FFF9A6] border-2 border-cinema-black shadow-hard transform -rotate-1 font-mono text-xs text-cinema-black">
            <span className="font-bold text-cinema-red block text-[9px] uppercase tracking-wider">
              NOTE #01 • CANTEEN DESK
            </span>
            <p className="font-editorial text-base font-bold italic mt-1">
              &ldquo;Machan, event-ku register pannitiya?&rdquo;
            </p>
            <span className="text-[9px] opacity-70 block mt-1">1st Year Freshers Pass Only</span>
          </div>

          <div className="p-3 bg-[#FFDBA6] border-2 border-cinema-black shadow-hard transform rotate-1 font-mono text-xs text-cinema-black">
            <span className="font-bold text-cinema-maroon block text-[9px] uppercase tracking-wider">
              NOTE #02 • AUDITORIUM STEPS
            </span>
            <p className="font-editorial text-base font-bold italic mt-1">
              &ldquo;Dei, nee stage-ku varriya illaya?&rdquo;
            </p>
            <span className="text-[9px] opacity-70 block mt-1">First Day First Show Call</span>
          </div>

          <div className="p-3 bg-[#B8FFA6] border-2 border-cinema-black shadow-hard transform -rotate-2 font-mono text-xs text-cinema-black">
            <span className="font-bold text-[#145214] block text-[9px] uppercase tracking-wider">
              NOTE #03 • CLASSROOM BENCH
            </span>
            <p className="font-editorial text-base font-bold italic mt-1">
              &ldquo;Attendance pathi apram paathukalaam.&rdquo;
            </p>
            <span className="text-[9px] opacity-70 block mt-1">CaliBS Priority Mode</span>
          </div>
        </div>

        {/* Engineering College ID Card, Canteen Receipt & Student Crew Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Simulated Lanyard ID Card & Bus Ticket */}
          <div className="md:col-span-5 space-y-6">
            <div
              onClick={handleCardClick}
              className="bg-cinema-paper border-4 border-cinema-black p-6 shadow-hard-lg relative cursor-pointer group"
            >
              {/* Lanyard Clip Simulation */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-6 bg-cinema-black border border-cinema-paper flex items-center justify-center">
                <div className="w-4 h-2 bg-cinema-gold" />
              </div>

              <div className="border-b-2 border-cinema-black pb-3 mb-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cinema-red font-bold block">
                  SRI VENKATESWARA COLLEGE OF ENGINEERING • SVCE PENNALUR
                </span>
                <span className="font-poster text-2xl uppercase tracking-wider text-cinema-black block">
                  CREW ADMISSION PASS
                </span>
              </div>

              <div className="flex items-center gap-4 py-3">
                <div className="w-20 h-24 bg-cinema-black border-2 border-cinema-black flex flex-col items-center justify-center text-center p-2 text-cinema-paper">
                  <IdCard className="w-8 h-8 text-cinema-gold mb-1" />
                  <span className="text-[9px] font-mono">FRESHER</span>
                </div>
                <div className="space-y-1 font-mono text-xs text-cinema-black">
                  <div>
                    <span className="opacity-60 block text-[10px]">NAME:</span>
                    <span className="font-poster text-xl uppercase font-bold">THE CAMPUS REBEL</span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">BRANCH:</span>
                    <span className="font-bold">MECHANICAL &amp; ALLIED GUILD</span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">ROLL NO:</span>
                    <span className="font-bold text-cinema-red">2026-SVCE-VIP-01</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-dashed border-cinema-black/40 flex justify-between text-[10px] font-mono text-cinema-black/70">
                <span>AUTHORIZED VOLUNTEER CORPS</span>
                <ShieldCheck className="w-3.5 h-3.5 text-cinema-red" />
              </div>
            </div>

            {/* Simulated Canteen Receipt */}
            <div className="bg-white border-2 border-dashed border-cinema-black p-4 font-mono text-xs text-cinema-black shadow-hard">
              <div className="flex justify-between border-b border-cinema-black/30 pb-2 mb-2">
                <span className="font-bold">SVCE CANTEEN DESK #04</span>
                <span>REC #8821</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span>1x FILTER COFFEE [CHAI CUT]</span>
                  <span>RS. 15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>2x SAMOSA [HOT CHUTNEY]</span>
                  <span>RS. 24.00</span>
                </div>
                <div className="flex justify-between">
                  <span>1x CALIBS FRESHERS BADGE</span>
                  <span className="font-bold text-cinema-red">FREE</span>
                </div>
              </div>
              <div className="pt-2 mt-2 border-t border-cinema-black/40 text-[9px] text-center opacity-70">
                &ldquo;VIBE HIGHER THAN MARKS&rdquo;
              </div>
            </div>
          </div>

          {/* Student Committee Operations & Roles */}
          <div className="md:col-span-7 space-y-4 font-mono text-xs">
            <div className="bg-cinema-black text-cinema-paper border-2 border-cinema-black p-5 shadow-hard">
              <div className="flex items-center justify-between text-cinema-gold mb-1">
                <span className="font-bold uppercase tracking-wider">01 • THE SOUND &amp; LIGHTS SQUAD</span>
                <span className="text-[10px]">CREW COUNT: 45</span>
              </div>
              <p className="text-cinema-paper/75 leading-relaxed font-sans">
                Rigging 10,000 watts of stage amplification, spotlight trusses, and smoke pyro across the SVCE Open Air Theatre.
              </p>
            </div>

            <div className="bg-cinema-black text-cinema-paper border-2 border-cinema-black p-5 shadow-hard">
              <div className="flex items-center justify-between text-cinema-gold mb-1">
                <span className="font-bold uppercase tracking-wider">02 • THE AUDITORIUM CONTROL WING</span>
                <span className="text-[10px]">CREW COUNT: 60</span>
              </div>
              <p className="text-cinema-paper/75 leading-relaxed font-sans">
                Real-time ticketing verification, stage ushering, and strict box-office capacity enforcement.
              </p>
            </div>

            <div className="bg-cinema-black text-cinema-paper border-2 border-cinema-black p-5 shadow-hard">
              <div className="flex items-center justify-between text-cinema-gold mb-1">
                <span className="font-bold uppercase tracking-wider">03 • HOSPITALITY &amp; CANTEEN CORPS</span>
                <span className="text-[10px]">CREW COUNT: 35</span>
              </div>
              <p className="text-cinema-paper/75 leading-relaxed font-sans">
                Continuous tea supply, participant registration counters, and backstage green room logistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
