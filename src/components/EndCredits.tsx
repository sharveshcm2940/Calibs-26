"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Film,
  ArrowUp,
  Shield,
  Layers,
  Sparkles,
  Sliders,
} from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface TheatricalSlide {
  id: number;
  badge: string;
  roleTamil: string;
  roleEnglish: string;
  mainText: string;
  subText?: string;
  isGrandTitle?: boolean;
  isClimax?: boolean;
  accentColor?: string;
}

const THEATRICAL_SLIDES: TheatricalSlide[] = [
  {
    id: 1,
    badge: "SRI VENKATESWARA COLLEGE OF ENGINEERING • PENNALUR",
    roleTamil: "ஒரு கல்லூரித் திருவிழா காவியம்",
    roleEnglish: "A FRESHERS CINEMATIC INITIATION",
    mainText: "CALIBRATIONS 2026–2027",
    subText: "KOLLYWOOD UNIVERSE EDITION • 35MM CINEMASCOPE",
    isGrandTitle: true,
    accentColor: "text-cinema-paper",
  },
  {
    id: 2,
    badge: "THE PROTAGONISTS",
    roleTamil: "நாயகர்கள்",
    roleEnglish: "STARRING (THE HEROES)",
    mainText: "THE 1ST YEAR FRESHERS BATCH",
    subText: "CLASS OF 2026–2030 • ACROSS ALL DEPARTMENTS & HOSTELS",
    isGrandTitle: true,
    accentColor: "text-cinema-gold",
  },
  {
    id: 3,
    badge: "THE SQUAD",
    roleTamil: "துணை நடிகர்கள்",
    roleEnglish: "SUPPORTING CAST",
    mainText: "CANTEEN LAST-BENCH SYNDICATE",
    subText: "MIDNIGHT HOSTEL DEBATE SQUAD & BUS PASS RUNNERS",
    accentColor: "text-cinema-paper",
  },
  {
    id: 4,
    badge: "THE CHALLENGE",
    roleTamil: "வில்லன் & சவால்கள்",
    roleEnglish: "THE ANTAGONISTS",
    mainText: "08:00 AM ATTENDANCE BELL",
    subText: "LAB OBSERVATION CYCLE SHEETS & SEMESTER TIMETABLES",
    accentColor: "text-cinema-red",
  },
  {
    id: 5,
    badge: "THE ORCHESTRATION",
    roleTamil: "இயக்கம்",
    roleEnglish: "DIRECTED BY",
    mainText: "SVCE STUDENT CULTURAL GUILD",
    subText: "CREATED BY THE STUDENTS • FOR THE STUDENTS",
    isGrandTitle: true,
    accentColor: "text-cinema-paper",
  },
  {
    id: 6,
    badge: "THE SCORE",
    roleTamil: "இசை & பின்னணி இசை",
    roleEnglish: "ORIGINAL SOUNDTRACK",
    mainText: "ANIRUDH & DEVA VIBES ORCHESTRA",
    subText: "LIVE KUTHU BEATS, OVERDRIVE GUITARS & THIRUVIZHA FLUTES",
    isGrandTitle: true,
    accentColor: "text-world-mm-yellow",
  },
  {
    id: 7,
    badge: "THE VISUALS",
    roleTamil: "ஒளிப்பதிவு",
    roleEnglish: "CINEMATOGRAPHY",
    mainText: "EASTMAN KODAK 35MM VISION3 500T",
    subText: "ANAMORPHIC 2.39:1 • STUDENT MEDIA GUILD",
    accentColor: "text-cinema-paper",
  },
  {
    id: 8,
    badge: "THE CUT",
    roleTamil: "படத்தொகுப்பு",
    roleEnglish: "EDITING & PACING",
    mainText: "CUTTING ROOM 2026",
    subText: "ZERO RETAKES • ALL ONE-TAKE MASTER SHOTS",
    accentColor: "text-cinema-paper",
  },
  {
    id: 9,
    badge: "THE MOVES",
    roleTamil: "நடனம்",
    roleEnglish: "CHOREOGRAPHY",
    mainText: "ADAVADI STREET KUTHU SYNDICATE",
    subText: "CHENNAI THIRUVIZHA SYNCHRONIZED ENERGY",
    accentColor: "text-world-mm-yellow",
  },
  {
    id: 10,
    badge: "THE AUDIO",
    roleTamil: "ஒலி வடிவமைப்பு",
    roleEnglish: "SOUND DESIGN",
    mainText: "128-CHANNEL DOLBY ATMOS",
    subText: "FRONT-ROW DECIBEL WHISTLE MASTERING",
    accentColor: "text-cinema-gold",
  },
  {
    id: 11,
    badge: "THE BANNER",
    roleTamil: "தயாரிப்பு",
    roleEnglish: "PRODUCED BY",
    mainText: "SRI VENKATESWARA COLLEGE OF ENGINEERING",
    subText: "POST BAG NO. 1, PENNALUR, SRIPERUMBUDUR TK, TAMIL NADU",
    isGrandTitle: true,
    accentColor: "text-cinema-paper",
  },
  {
    id: 12,
    badge: "GRATITUDE",
    roleTamil: "சிறப்பு நன்றி",
    roleEnglish: "SPECIAL THANKS",
    mainText: "EVERYONE WHO BLEW WHISTLES IN THE FRONT ROW",
    subText: "MANAGEMENT, FACULTY ADVISORS & VOLUNTEER CREW",
    isGrandTitle: true,
    accentColor: "text-cinema-gold",
  },
  {
    id: 13,
    badge: "POST-CREDIT SCENE • காட்சி 01",
    roleTamil: "இது முடிவு இல்லை...",
    roleEnglish: "THIS IS NOT THE END",
    mainText: "IDHU MUDIVU ILLA.",
    subText: "COLLEGE LIFE-LA FIRST SCENE DHAT'S ALL... THE SCRIPT GOES ON.",
    isClimax: true,
    accentColor: "text-cinema-paper",
  },
  {
    id: 14,
    badge: "POST-CREDIT SCENE • காட்சி 02",
    roleTamil: "அடுத்த காட்சியில் சந்திப்போம்",
    roleEnglish: "SEE YOU IN THE NEXT SCENE",
    mainText: "NEXT SCENE-LA MEET PANNALAAM.",
    subText: "SEPTEMBER 18, 2026 • SVCE CAMPUS MAIN STAGE",
    isClimax: true,
    accentColor: "text-cinema-gold",
  },
  {
    id: 15,
    badge: "THEATRICAL WRAP",
    roleTamil: "வெற்றி நமதே",
    roleEnglish: "VICTORY IS OURS",
    mainText: "THE END",
    subText: "THE REAL STORY BEGINS SEPTEMBER 18, 2026 • SVCE PENNALUR",
    isGrandTitle: true,
    isClimax: true,
    accentColor: "text-cinema-red",
  },
  {
    id: 16,
    badge: "LOKESH / ANIRUDH STYLE FRANCHISE TEASER",
    roleTamil: "மீண்டும் சந்திப்போம்",
    roleEnglish: "SEQUEL ANNOUNCEMENT",
    mainText: "CALIBRATIONS WILL RETURN IN 2027",
    subText: "ROLEX STYLE-LA START AANAALUM, ENDING FRESHERS RULE!",
    isGrandTitle: true,
    accentColor: "text-cinema-gold",
  },
];

export function EndCredits() {
  const [viewMode, setViewMode] = useState<"SLIDES" | "ROLL">("SLIDES");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFastSpeed, setIsFastSpeed] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    setIsSoundOn(soundEngine.isEnabled());
  }, []);

  // Auto-advance for Theatrical Title Slide Sequence
  useEffect(() => {
    if (viewMode !== "SLIDES" || !isPlaying) return;

    const slideDuration = isFastSpeed ? 2000 : 3800;
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => {
        const next = (prev + 1) % THEATRICAL_SLIDES.length;
        setFlashKey((k) => k + 1);
        if (next === 0 || next === 1 || next === 14) {
          soundEngine.playBassHit();
        } else {
          soundEngine.playProjectorClick();
        }
        return next;
      });
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [viewMode, isPlaying, currentSlideIndex, isFastSpeed]);

  const handleNextSlide = () => {
    soundEngine.playProjectorClick();
    setFlashKey((k) => k + 1);
    setCurrentSlideIndex((prev) => (prev + 1) % THEATRICAL_SLIDES.length);
  };

  const handlePrevSlide = () => {
    soundEngine.playProjectorClick();
    setFlashKey((k) => k + 1);
    setCurrentSlideIndex((prev) =>
      prev === 0 ? THEATRICAL_SLIDES.length - 1 : prev - 1
    );
  };

  const handleSelectSlide = (idx: number) => {
    soundEngine.playProjectorClick();
    setFlashKey((k) => k + 1);
    setCurrentSlideIndex(idx);
  };

  const togglePlay = () => {
    soundEngine.playProjectorClick();
    setIsPlaying((prev) => !prev);
  };

  const toggleSpeed = () => {
    soundEngine.playProjectorClick();
    setIsFastSpeed((prev) => !prev);
  };

  const toggleMode = (mode: "SLIDES" | "ROLL") => {
    soundEngine.playProjectorClick();
    setViewMode(mode);
    setFlashKey((k) => k + 1);
  };

  const toggleSound = () => {
    const state = soundEngine.toggle();
    setIsSoundOn(state);
    if (state) {
      soundEngine.playBassHit();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSlide = THEATRICAL_SLIDES[currentSlideIndex];

  return (
    <footer
      id="credits"
      className="bg-[#050403] text-cinema-paper pt-16 pb-14 border-t-8 border-cinema-red relative overflow-hidden"
    >
      {/* 1. Overhead Cinema Projector Spotlight Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[70%] max-w-4xl h-44 bg-gradient-to-b from-cinema-gold/25 via-cinema-gold/5 to-transparent pointer-events-none blur-2xl projector-flicker" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Pre-title */}
        <div className="text-center mb-6 space-y-1.5">
          <div className="flex items-center justify-center gap-2 font-mono text-xs text-cinema-gold uppercase tracking-[0.3em] font-bold">
            <Film
              className="w-4 h-4 text-cinema-red animate-spin"
              style={{ animationDuration: "12s" }}
            />
            <span>35MM CINEMASCOPE 2.39:1 • THEATRICAL MOVIE CREDITS</span>
            <span className="text-cinema-red font-black">திரைக்களம்</span>
          </div>
          <h2 className="font-poster text-5xl sm:text-7xl font-black uppercase tracking-tight text-cinema-paper leading-none credits-title-glow">
            THE END CREDITS
          </h2>
          <p className="font-editorial text-sm sm:text-base italic text-cinema-paper/75">
            &ldquo;Kollywood theatrical end titles with slow zoom, anamorphic flare, and dramatic title cards.&rdquo;
          </p>
        </div>

        {/* 2. THEATRICAL PROJECTION BOOTH CONTROL DECK */}
        <div className="bg-[#0D0B09] border-4 border-cinema-border p-3 sm:p-4 mb-6 shadow-hard flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            {/* Mode Switcher Buttons */}
            <div className="inline-flex border-2 border-cinema-border bg-black">
              <button
                onClick={() => toggleMode("SLIDES")}
                className={`px-3 py-1.5 font-poster text-xs uppercase tracking-wider transition-colors ${
                  viewMode === "SLIDES"
                    ? "bg-cinema-red text-cinema-paper font-black"
                    : "text-cinema-paper/70 hover:text-white"
                }`}
              >
                TITLE CARDS [ அட்டைகள் ]
              </button>
              <button
                onClick={() => toggleMode("ROLL")}
                className={`px-3 py-1.5 font-poster text-xs uppercase tracking-wider transition-colors ${
                  viewMode === "ROLL"
                    ? "bg-cinema-gold text-cinema-black font-black"
                    : "text-cinema-paper/70 hover:text-white"
                }`}
              >
                35MM ROLL [ ரோல் ]
              </button>
            </div>

            <span className="text-cinema-paper/50 hidden lg:inline">
              [24 FPS ANAMORPHIC]
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev Card (Slides Mode) */}
            {viewMode === "SLIDES" && (
              <button
                onClick={handlePrevSlide}
                data-cursor="ticket"
                aria-label="Previous card"
                className="p-1.5 border border-cinema-border bg-cinema-charcoal hover:bg-black text-cinema-paper transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              data-cursor="ticket"
              className={`px-3 py-1.5 border font-poster text-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                isPlaying
                  ? "bg-cinema-charcoal border-cinema-border text-cinema-paper hover:border-cinema-gold"
                  : "bg-cinema-red border-cinema-paper text-cinema-paper shadow-hard font-bold"
              }`}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 text-cinema-gold" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white" />
              )}
              <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
            </button>

            {/* Next Card (Slides Mode) */}
            {viewMode === "SLIDES" && (
              <button
                onClick={handleNextSlide}
                data-cursor="ticket"
                aria-label="Next card"
                className="p-1.5 border border-cinema-border bg-cinema-charcoal hover:bg-black text-cinema-paper transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Speed Toggle */}
            <button
              onClick={toggleSpeed}
              data-cursor="ticket"
              className={`px-3 py-1.5 border font-poster text-sm uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                isFastSpeed
                  ? "bg-cinema-gold border-cinema-paper text-cinema-black shadow-hard font-black"
                  : "bg-cinema-charcoal border-cinema-border text-cinema-paper hover:border-cinema-gold"
              }`}
            >
              <span>{isFastSpeed ? "2X SPEED" : "1X SPEED"}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              data-cursor="ticket"
              aria-label="Toggle sound"
              className={`p-1.5 border transition-colors ${
                isSoundOn
                  ? "bg-cinema-red border-cinema-red text-cinema-paper"
                  : "bg-cinema-charcoal border-cinema-border text-cinema-paper/60 hover:text-cinema-paper"
              }`}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3. THE 70MM THEATRICAL CINEMA SCREEN VIEWPORT */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] min-h-[460px] sm:min-h-[520px] max-h-[600px] bg-black border-4 border-cinema-black shadow-hard-lg overflow-hidden flex flex-col justify-between">
          {/* Optical Splice Flash Transition on Card Change */}
          <div
            key={flashKey}
            className="absolute inset-0 bg-cinema-paper pointer-events-none z-30 optical-flash"
          />

          {/* Cinema Screen Velvet Vignette Curtains */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_90px_rgba(0,0,0,0.96)]" />

          {/* Anamorphic Horizontal Blue/Cyan Flare Streak */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none z-15 anamorphic-streak blur-[1px]" />
          <div className="absolute top-1/2 left-0 right-0 h-[8px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none z-15 anamorphic-streak blur-md" />

          {/* Left 35mm Sprocket Perforations Strip */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#090706] border-r-2 border-cinema-border/50 z-20 flex flex-col justify-between items-center py-4 opacity-80 pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-5 bg-[#000000] border border-cinema-border/60 rounded-none shrink-0 my-0.5"
              />
            ))}
          </div>

          {/* Right 35mm Sprocket Perforations Strip */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-[#090706] border-l-2 border-cinema-border/50 z-20 flex flex-col justify-between items-center py-4 opacity-80 pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-5 bg-[#000000] border border-cinema-border/60 rounded-none shrink-0 my-0.5"
              />
            ))}
          </div>

          {/* Screen Light Grain & Scrim */}
          <div className="absolute inset-x-8 inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(35,26,18,0.45)_0%,rgba(0,0,0,0.96)_100%)] pointer-events-none z-10" />

          {/* Top & Bottom Vignette Shadows */}
          <div className="absolute top-0 inset-x-8 h-16 bg-gradient-to-b from-black via-black/75 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 inset-x-8 h-20 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-20" />

          {/* 4A. MODE: THEATRICAL TITLE CARDS (SLIDESHOW ANIMATION) */}
          {viewMode === "SLIDES" && (
            <div className="relative z-10 w-full h-full flex flex-col justify-between items-center p-8 sm:p-12 text-center my-auto">
              {/* Top Card Badge */}
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-black/70 border border-cinema-gold/40 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.3em] text-cinema-gold/90">
                  {currentSlide.badge}
                </span>
              </div>

              {/* Central Card Block with Dramatic Movie Style Animation */}
              <div
                key={currentSlide.id}
                className="cinematic-slide-anim film-gate-weave space-y-4 max-w-3xl my-auto px-4"
              >
                {/* Bilingual Role Heading */}
                <div className="space-y-1">
                  <div className="font-serif text-lg sm:text-2xl text-cinema-gold font-bold tracking-widest">
                    {currentSlide.roleTamil}
                  </div>
                  <div className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-cinema-paper/60 font-bold">
                    {currentSlide.roleEnglish}
                  </div>
                </div>

                {/* Blockbuster Title Text */}
                <h3
                  className={`font-poster uppercase tracking-wider leading-none chromatic-text ${
                    currentSlide.isGrandTitle
                      ? "text-4xl sm:text-6xl md:text-7xl font-black"
                      : "text-3xl sm:text-5xl font-black"
                  } ${currentSlide.accentColor || "text-cinema-paper"}`}
                >
                  {currentSlide.mainText}
                </h3>

                {/* Subtext */}
                {currentSlide.subText && (
                  <p className="font-editorial text-sm sm:text-lg italic text-cinema-paper/85 max-w-xl mx-auto leading-relaxed pt-1">
                    &ldquo;{currentSlide.subText}&rdquo;
                  </p>
                )}
              </div>

              {/* Bottom Card Timeline Scrubber */}
              <div className="pb-2 w-full max-w-md space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-cinema-paper/60 uppercase">
                  <span>SLIDE {String(currentSlide.id).padStart(2, "0")} / 16</span>
                  <span>{currentSlide.roleEnglish}</span>
                </div>
                {/* Slide progress pills */}
                <div className="flex items-center justify-center gap-1.5">
                  {THEATRICAL_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => handleSelectSlide(idx)}
                      aria-label={`Go to slide ${slide.id}`}
                      className={`h-1.5 transition-all duration-300 ${
                        currentSlideIndex === idx
                          ? "w-8 bg-cinema-red"
                          : "w-2 bg-cinema-paper/30 hover:bg-cinema-gold"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4B. MODE: 35MM CONTINUOUS VERTICAL CRAWL */}
          {viewMode === "ROLL" && (
            <div
              style={
                {
                  "--credits-duration": isFastSpeed ? "26s" : "52s",
                  "--credits-play-state": isPlaying ? "running" : "paused",
                  animationPlayState: isPlaying ? "running" : "paused",
                } as React.CSSProperties
              }
              className="kollywood-crawl relative z-10 w-full px-12 sm:px-20 text-center py-12 space-y-14 film-gate-weave"
            >
              {THEATRICAL_SLIDES.map((slide) => (
                <div key={slide.id} className="space-y-2">
                  <div className="font-serif text-sm sm:text-base text-cinema-gold font-bold">
                    {slide.roleTamil}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-cinema-paper/60">
                    {slide.roleEnglish}
                  </div>
                  <div
                    className={`font-poster uppercase tracking-wider leading-tight ${
                      slide.isGrandTitle
                        ? "text-3xl sm:text-5xl font-black text-cinema-paper chromatic-text"
                        : "text-2xl sm:text-3xl text-cinema-paper/90 font-bold"
                    } ${slide.accentColor || ""}`}
                  >
                    {slide.mainText}
                  </div>
                  {slide.subText && (
                    <p className="font-editorial text-xs sm:text-sm italic text-cinema-gold/80 max-w-md mx-auto">
                      {slide.subText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Navigation Anchors & Director Portal Access */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-10 text-xs font-mono border-t border-cinema-border/60 mt-10">
          <a href="#story" className="hover:text-cinema-gold uppercase">THE FILM</a>
          <span>•</span>
          <a href="#events" className="hover:text-cinema-gold uppercase">THE LINE-UP</a>
          <span>•</span>
          <a href="#cast" className="hover:text-cinema-gold uppercase">THE CAST</a>
          <span>•</span>
          <a href="#schedule" className="hover:text-cinema-gold uppercase">THE SCHEDULE</a>
          <span>•</span>
          <a href="#frames" className="hover:text-cinema-gold uppercase">THE FRAMES</a>
          <span>•</span>
          <Link
            href="/admin/login"
            className="text-cinema-gold hover:underline uppercase flex items-center gap-1 font-bold"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>DIRECTOR DESK LOGIN</span>
          </Link>
        </div>

        {/* Rewind to Opening Scene Top */}
        <div className="pt-6 text-center">
          <button
            onClick={scrollToTop}
            className="px-5 py-2.5 border-2 border-cinema-border hover:border-cinema-gold text-cinema-paper text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 transition-colors shadow-hard"
          >
            <ArrowUp className="w-3.5 h-3.5 text-cinema-gold" />
            <span>REWIND TO OPENING SCENE [ ஆரம்பத்துக்கு போ ]</span>
          </button>
        </div>

        {/* Copyright Footer */}
        <div className="pt-6 text-center text-[10px] font-mono text-cinema-paper/40">
          <p>© 2026 CALIBRATIONS. SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE), PENNALUR.</p>
          <p className="mt-0.5 text-[9px] text-cinema-paper/30">
            TAMIL CINEMA THEMED CULTURAL CAMPAIGN • EASTMAN COLOR 35MM CINEMASCOPE
          </p>
        </div>
      </div>
    </footer>
  );
}
