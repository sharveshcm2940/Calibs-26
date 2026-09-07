"use client";

import React, { useEffect, useState } from "react";

export function CinemaCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<"default" | "view" | "ticket" | "frame">("default");
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch/mobile devices
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestTicket = target.closest("button[data-cursor='ticket'], [href*='register'], .btn-ticket");
      const closestPoster = target.closest(".group[data-cursor='view'], #posters .group, .event-card");
      const closestFrame = target.closest("#frames img, .gallery-frame");

      if (closestTicket) {
        setCursorState("ticket");
      } else if (closestPoster) {
        setCursorState("view");
      } else if (closestFrame) {
        setCursorState("frame");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorState === "default" && (
        <div className="w-3 h-3 rounded-full bg-cinema-red border border-cinema-paper shadow-hard" />
      )}

      {cursorState === "view" && (
        <div className="px-2 py-0.5 bg-cinema-black border-2 border-cinema-gold text-cinema-gold font-mono text-[9px] font-black uppercase tracking-widest shadow-hard">
          VIEW SCENE
        </div>
      )}

      {cursorState === "ticket" && (
        <div className="px-2.5 py-0.5 bg-cinema-red border-2 border-cinema-paper text-cinema-paper font-mono text-[9px] font-black uppercase tracking-widest shadow-hard animate-pulse">
          GET TICKET
        </div>
      )}

      {cursorState === "frame" && (
        <div className="px-2 py-0.5 bg-cinema-paper border-2 border-cinema-black text-cinema-black font-mono text-[9px] font-black uppercase tracking-widest shadow-hard">
          FRAME 35MM
        </div>
      )}
    </div>
  );
}
