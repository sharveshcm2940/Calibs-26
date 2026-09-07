"use client";

import React from "react";
import { motion } from "framer-motion";

interface HousefullStampProps {
  onDismiss?: () => void;
  eventName?: string;
}

export function HousefullStamp({ onDismiss, eventName }: HousefullStampProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-print-paper text-print-black border-4 border-print-black shadow-hard-lg text-center overflow-hidden">
      {/* Physical Distressed Red Ink Rubber Stamp */}
      <motion.div
        initial={{ scale: 3.5, rotate: -25, opacity: 0 }}
        animate={{ scale: 1, rotate: -7, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 250, duration: 0.35 }}
        className="px-8 py-3 border-[6px] border-print-red bg-print-paper text-print-red shadow-hard-red"
      >
        <span className="font-poster text-6xl sm:text-8xl font-black tracking-widest uppercase leading-none block">
          HOUSEFULL
        </span>
        <span className="text-[11px] font-mono tracking-[0.3em] text-print-maroon uppercase block font-bold mt-1">
          BOX OFFICE TICKETS EXHAUSTED
        </span>
      </motion.div>

      <div className="mt-6 max-w-md font-mono text-xs text-print-black/90 space-y-2">
        <p>
          Hall capacity for <strong className="font-bold text-print-black uppercase">{eventName || "this show"}</strong> has reached 100%.
        </p>
        <p className="text-[11px] text-print-black/60">
          Strict auditorium safety protocol prohibits overbooking.
        </p>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="mt-6 px-6 py-2.5 bg-print-black text-print-paper font-mono text-xs uppercase tracking-widest border-2 border-print-black shadow-hard hover:bg-print-maroon transition-colors"
        >
          [ RETURN TO LINE-UP ]
        </button>
      )}
    </div>
  );
}
