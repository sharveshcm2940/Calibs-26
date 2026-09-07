"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinemaIntroProps {
  onComplete: () => void;
}

export function CinemaIntro({ onComplete }: CinemaIntroProps) {
  const [stage, setStage] = useState<"flicker" | "title" | "complete">("flicker");

  useEffect(() => {
    // Check if user already saw the intro in this session
    const seen = sessionStorage.getItem("calibrations_intro_seen");
    if (seen === "true") {
      onComplete();
      setStage("complete");
      return;
    }

    // Step 1: Projector flicker (approx 1s)
    const flickerTimer = setTimeout(() => {
      setStage("title");
    }, 1100);

    // Step 2: Title build & reveal (approx 1.4s)
    const finishTimer = setTimeout(() => {
      handleSkip();
    }, 2500);

    return () => {
      clearTimeout(flickerTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("calibrations_intro_seen", "true");
    setStage("complete");
    onComplete();
  };

  if (stage === "complete") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cinema-black text-cinema-paper overflow-hidden select-none"
      >
        {/* Projector Light Beam Simulation */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="w-[1px] h-full bg-cinema-paper absolute left-[28%]" />
          <div className="w-[2px] h-full bg-cinema-red absolute left-[72%]" />
        </div>

        {/* Minimal Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-20 px-3 py-1 border border-cinema-border text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black text-[11px] font-mono tracking-widest uppercase transition-colors"
        >
          [ SKIP INTRO ]
        </button>

        {stage === "flicker" && (
          <div className="relative flex items-center justify-center w-52 h-52 border-2 border-cinema-paper/40 rounded-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-cinema-paper/30" />
              <div className="h-full w-[1px] bg-cinema-paper/30 absolute" />
            </div>
            <div className="text-center font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold animate-pulse">
              35MM REEL #01 • SPEED 24FPS
            </div>
          </div>
        )}

        {stage === "title" && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center px-4"
          >
            <span className="text-cinema-gold font-mono text-xs tracking-[0.4em] uppercase block mb-2">
              SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE) • FRESHERS &apos;26
            </span>
            <h1 className="font-poster text-7xl sm:text-9xl font-black uppercase text-cinema-paper tracking-tight poster-title-shadow leading-none">
              CALIBRATIONS
            </h1>
            <div className="mt-3 inline-block px-4 py-1 bg-cinema-red text-cinema-paper font-poster text-xl tracking-[0.25em] uppercase shadow-hard">
              KOLLYWOOD EDITION
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] font-mono text-cinema-paper/40 border-t border-cinema-border/40 pt-2">
          <span>PROJECTOR #01 • EASTMAN 35MM</span>
          <span>CAMPUS CENTRAL SOUNDSTAGE</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
