"use client";

import React from "react";

export function AboutSection() {
  return (
    <section id="story" className="py-20 paper-grain text-cinema-black border-b-4 border-cinema-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newspaper Masthead */}
        <div className="border-b-4 border-cinema-black pb-4 text-center">
          <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b-2 border-cinema-black pb-1 mb-2">
            <span>CHENNAI THEATRICAL DISPATCH</span>
            <span>VOL. 48 • ISSUE 01 • PRICE: FREE PASS</span>
            <span>SEPTEMBER 2026 EDITION</span>
          </div>

          <h2 className="font-poster text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight text-cinema-black leading-none">
            THE STORY / THE PLOT
          </h2>

          <div className="flex items-center justify-between text-[11px] font-mono border-t border-cinema-black pt-1 mt-2 text-cinema-maroon font-bold uppercase">
            <span>SPECIAL FEATURE: CALIBRATIONS 2026 FRESHERS CAMPAIGN</span>
            <span>PUBLISHED BY SVCE STUDENT PRESS</span>
          </div>
        </div>

        {/* Large Cinematic Pull Quote & Tamil Typography Stamp */}
        <div className="py-6 border-b-2 border-cinema-black text-center sm:text-left">
          <blockquote className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-cinema-black leading-tight italic">
            &ldquo;College life-la first scene romba important. Indha scene namma ellarum serndhu create pannuvom.&rdquo;
          </blockquote>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="px-3 py-1 bg-cinema-red text-cinema-paper font-poster text-xl font-black uppercase tracking-wider border border-cinema-black shadow-hard">
              இது நம்ம நேரம்
            </span>
            <span className="font-mono text-xs text-cinema-maroon font-bold uppercase">
              SYNOPSIS FROM SVCE FRESHERS STEERING COMMITTEE • PENNALUR, CHENNAI
            </span>
          </div>
        </div>

        {/* Editorial Content: Two-Column Newspaper Layout + Censor Board Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Left Newspaper Columns */}
          <div className="lg:col-span-8 space-y-4 font-editorial text-base sm:text-lg leading-relaxed text-cinema-black/90">
            <p className="first-letter:text-6xl first-letter:font-poster first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-cinema-red">
              Every year, thousands of freshers step beneath the iconic archway of the SVCE campus. But this 2026 edition has torn up the conventional rulebook and replaced it with a high-stakes 35mm shooting schedule. The air carries the sharp tang of filter coffee, stage pyro, and the sheer electric swagger of Tamil cinema.
            </p>

            <p>
              <strong className="font-bold text-cinema-black">CALIBRATIONS 2026–2027</strong> is designed from the ground up as a tribute to the grand theatrical tradition of Kollywood. From the monumental mass hero entries at the Open Air Theatre to the soulful unplugged acoustic sessions honoring Maestro Ilaiyaraaja and A.R. Rahman, every corner of the campus has been repurposed as a live movie set.
            </p>

            <div className="p-4 bg-cinema-black text-cinema-paper my-6 font-mono text-xs border-2 border-cinema-black shadow-hard">
              <span className="text-cinema-gold font-bold uppercase block mb-1">
                [ DIRECTOR’S DISPATCH • TANGLISH CUT ]
              </span>
              <p className="italic font-typewriter">
                &ldquo;Stage ready da. Clapperboard adichachu. Inga yarum dummy character illa, ellarum lead protagonist dhaan. The spotlights are burning hot, whistle roar is deafening, and there are strictly no second takes. Vaanga, kalakkalaam!&rdquo;
              </p>
            </div>

            <p>
              Whether you are competing in the high-stakes <em>Adavadi Steps</em> mass dance battle, premiering an original cut at the <em>First Clap</em> short film festival, or chasing cryptic dialogue riddles in the <em>Padayappa</em> campus treasure hunt, this festival belongs to every student who has ever whistled from the first row of a single-screen theatre.
            </p>
          </div>

          {/* Right Column: Physical Censor Board Certificate Seal */}
          <div className="lg:col-span-4 bg-[#E2D2B0] p-6 border-4 border-cinema-black shadow-hard">
            <div className="border-2 border-dashed border-cinema-black p-4 text-center">
              <span className="text-[10px] font-mono tracking-widest text-cinema-maroon uppercase block font-bold">
                CENTRAL BOARD OF COLLEGE CULTURALS
              </span>
              <h4 className="font-poster text-3xl font-black uppercase text-cinema-black tracking-wide mt-1">
                CENSOR CERTIFICATE
              </h4>

              {/* Distressed Stamp */}
              <div className="my-5 py-4 border-4 border-cinema-red text-cinema-red font-poster text-7xl font-black tracking-widest rotate-[-6deg] bg-cinema-paper shadow-sm">
                U / A
              </div>

              <span className="font-mono text-xs text-cinema-maroon font-bold uppercase block mb-4">
                CERTIFIED FOR MAXIMUM MASS NOISE
              </span>

              <div className="text-left font-mono text-xs space-y-1.5 border-t border-cinema-black/40 pt-3 text-cinema-black/90">
                <div className="flex justify-between">
                  <span className="text-cinema-black/60">TITLE:</span>
                  <span className="font-bold">CALIBRATIONS 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cinema-black/60">THEME:</span>
                  <span className="font-bold text-cinema-red">KOLLYWOOD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cinema-black/60">DURATION:</span>
                  <span>48 HOURS NON-STOP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cinema-black/60">SEAL NO:</span>
                  <span className="font-bold">SVCE-2026-UA-01</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cinema-black/40 text-[10px] font-mono text-cinema-black/60 text-center">
                ISSUED BY ORDER OF THE DEAN &amp; STUDENT STEERING COMMITTEE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
