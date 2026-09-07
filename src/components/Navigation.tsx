"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Ticket, Volume2, VolumeX, Clapperboard, Shield, Menu, X } from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface NavigationProps {
  onRegisterClick: () => void;
}

export function Navigation({ onRegisterClick }: NavigationProps) {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundActive(soundEngine.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const newState = soundEngine.toggle();
    setSoundActive(newState);
  };

  const handleLinkClick = () => {
    soundEngine.playProjectorClick();
    setMobileMenuOpen(false);
  };

  const handleRegister = () => {
    soundEngine.playTicketPrint();
    onRegisterClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-cinema-black border-b-2 border-cinema-paper/20 backdrop-blur-md">
      {/* Top Production Tag Line */}
      <div className="bg-cinema-maroon text-cinema-paper text-[10px] font-mono px-4 py-1 flex items-center justify-between tracking-widest uppercase border-b border-cinema-black">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-3 h-3 text-cinema-gold" />
          <span className="font-bold">PROD NO. 26 • KOLLYWOOD CINEMATIC EDITION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-cinema-paper/80">
          <span>SEPT 18–19, 2026</span>
          <span>•</span>
          <span>SRI VENKATESWARA COLLEGE OF ENGINEERING • SVCE</span>
        </div>
      </div>

      {/* Main Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Film Title Lockup */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-baseline gap-2 text-cinema-paper group"
          >
            <span className="font-poster text-3xl sm:text-4xl font-black tracking-wider uppercase group-hover:text-cinema-gold transition-colors leading-none">
              CALIBRATIONS
            </span>
            <span className="font-mono text-xs text-cinema-red font-bold uppercase tracking-widest">
              2026–27
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-cinema-paper/80">
            <a
              href="#story"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
              title="Scene details"
            >
              THE FILM
            </a>
            <a
              href="#reel-story"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
              title="35mm Film Strip"
            >
              REEL
            </a>
            <a
              href="#worlds"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors text-cinema-gold font-bold flex items-center gap-1"
              title="Paakalaama?"
            >
              <span className="w-1.5 h-1.5 bg-cinema-red" />
              <span>THE 7 WORLDS</span>
            </a>
            <a
              href="#posters"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
              title="Scene open pannalama?"
            >
              THE WALL
            </a>
            <a
              href="#events"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
            >
              LINE-UP
            </a>
            <a
              href="#cast"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
            >
              THE CAST
            </a>
            <a
              href="#schedule"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
            >
              SCHEDULE
            </a>
            <a
              href="#frames"
              onClick={handleLinkClick}
              className="hover:text-cinema-gold transition-colors"
            >
              FRAMES
            </a>
          </nav>

          {/* Action CTAs & Sound Engine Toggle */}
          <div className="flex items-center gap-3">
            {/* Interactive Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundActive ? "Mute Cinema Sound FX" : "Unmute Cinema Sound FX"}
              className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-mono uppercase ${
                soundActive
                  ? "border-cinema-gold bg-cinema-gold/10 text-cinema-gold"
                  : "border-cinema-paper/30 text-cinema-paper/50 hover:text-cinema-paper"
              }`}
              aria-label="Toggle Sound Effects"
            >
              {soundActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-cinema-gold animate-pulse" />
                  <span className="hidden sm:inline text-[10px] font-bold">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px]">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Admin Desk Direct Link */}
            <Link
              href="/admin"
              className="hidden md:flex p-2 border border-cinema-paper/30 hover:border-cinema-gold text-cinema-paper/60 hover:text-cinema-gold transition-colors"
              title="Director Desk Login"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Ticket CTA Button */}
            <button
              onClick={handleRegister}
              data-cursor="ticket"
              className="px-4 sm:px-5 py-2.5 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster text-lg sm:text-xl tracking-widest uppercase border-2 border-cinema-black shadow-hard flex items-center gap-2 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Ticket className="w-4 h-4 text-cinema-gold" />
              <span>BOOK TICKETS</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-cinema-paper hover:text-cinema-gold"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cinema-black border-t-2 border-cinema-paper/20 p-6 space-y-4 font-mono text-xs uppercase tracking-wider text-cinema-paper">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="#story"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              THE FILM
            </a>
            <a
              href="#worlds"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-gold text-cinema-gold font-bold block"
            >
              THE 7 WORLDS
            </a>
            <a
              href="#posters"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              THE WALL
            </a>
            <a
              href="#events"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              LINE-UP
            </a>
            <a
              href="#cast"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              THE CAST
            </a>
            <a
              href="#schedule"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              SCHEDULE
            </a>
            <a
              href="#frames"
              onClick={handleLinkClick}
              className="p-2 border border-cinema-border hover:border-cinema-gold block"
            >
              FRAMES
            </a>
            <Link
              href="/admin"
              className="p-2 border border-cinema-border hover:border-cinema-gold text-cinema-gold flex items-center justify-between"
            >
              <span>DIRECTOR DESK</span>
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
