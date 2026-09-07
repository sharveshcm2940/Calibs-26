"use client";

import React from "react";

export function SponsorCredits() {
  return (
    <section className="py-20 bg-cinema-paper text-cinema-black border-b-4 border-cinema-black text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-maroon font-bold block mb-2">
          FINANCIAL PATRONS &amp; EXECUTIVE PRODUCERS
        </span>
        <h2 className="font-poster text-5xl sm:text-7xl font-black uppercase tracking-tight leading-none text-cinema-black">
          PRODUCTION CREDITS
        </h2>
        <div className="w-16 h-1 bg-cinema-red mx-auto mt-4 mb-12" />

        <div className="space-y-12 font-mono text-xs">
          {/* PRESENTED BY */}
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.3em] uppercase text-cinema-maroon font-bold block">
              PRESENTED BY
            </span>
            <div className="inline-block p-4 sm:p-6 bg-cinema-black text-cinema-paper border-4 border-cinema-black shadow-hard">
              <span className="font-poster text-3xl sm:text-5xl font-black uppercase tracking-wide">
                SVCE STUDENT CULTURAL GUILD
              </span>
              <span className="block font-mono text-[10px] text-cinema-gold tracking-[0.2em] mt-1">
                SRI VENKATESWARA COLLEGE OF ENGINEERING • PENNALUR
              </span>
            </div>
          </div>

          {/* IN ASSOCIATION WITH */}
          <div className="space-y-2 pt-4">
            <span className="text-[11px] tracking-[0.3em] uppercase text-cinema-maroon font-bold block">
              IN ASSOCIATION WITH
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 font-poster text-2xl sm:text-3xl text-cinema-black uppercase tracking-wider">
              <span className="p-3 border-2 border-cinema-black bg-[#E6D4B0]">SVCE ALUMNI CINEMA GUILD</span>
              <span className="p-3 border-2 border-cinema-black bg-[#E6D4B0]">CHENNAI STEREOPHONIC STUDIOS</span>
            </div>
          </div>

          {/* SUPPORTED BY */}
          <div className="space-y-2 pt-4 border-t-2 border-cinema-black/30">
            <span className="text-[10px] tracking-[0.3em] uppercase text-cinema-black/60 font-bold block">
              SUPPORTED BY
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-cinema-black/80 font-bold uppercase tracking-widest">
              <span>SVCE MEDIA LABS</span>
              <span>•</span>
              <span>KODAMBAKKAM POST-PRODUCTION</span>
              <span>•</span>
              <span>THEATRICAL LIGHTING ALLIANCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
