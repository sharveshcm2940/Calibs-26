"use client";

import React, { useEffect, useRef } from "react";

export function FilmGrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 256);
    let height = (canvas.height = 256);

    const imgData = ctx.createImageData(width, height);
    const buffer32 = new Uint32Array(imgData.data.buffer);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      // Render grain every 2nd frame to keep it lightweight (30fps grain)
      if (frameCount % 2 === 0) {
        const len = buffer32.length;
        for (let i = 0; i < len; i++) {
          // Subtle grey grain variation
          const val = (Math.random() * 255) | 0;
          buffer32[i] = (22 << 24) | (val << 16) | (val << 8) | val;
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-35 mix-blend-overlay">
      {/* Animated Noise Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      {/* Occasional Film Scratches & Light Leak Accents */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cinema-red/5 via-transparent to-cinema-gold/5 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[22%] w-[1px] bg-white/[0.03] pointer-events-none hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-[38%] w-[1px] bg-white/[0.02] pointer-events-none hidden sm:block" />
    </div>
  );
}
