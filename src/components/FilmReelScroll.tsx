"use client";

import React, { useState } from "react";
import {
  Film,
  Sparkles,
  Flame,
  Crown,
  Spade,
  Radio,
  Zap,
  Shield,
  Play,
  Pause,
  FastForward,
  ArrowLeftRight,
  X,
  Eye,
  Camera,
} from "lucide-react";
import { soundEngine } from "@/lib/soundEngine";

interface FilmScene {
  id: string;
  frameNo: string;
  scene: string;
  title: string;
  tamilTitle: string;
  tagline: string;
  tanglish: string;
  directorNote: string;
  sceneName: string;
  colorClass: string;
  bgGradient: string;
  icon: React.ReactNode;
}

// 35mm Master Reel of Cultural Highlights
const FILM_SCENES: FilmScene[] = [
  {
    id: "scene-01",
    frameNo: "FRAME 01",
    scene: "SCENE 01",
    title: "THE DANCE ARENA",
    tamilTitle: "ஆடல் அரங்கம்",
    tagline: "Synchronized kuthu, mass western, and classical expressions.",
    tanglish: "Beat start aana udane stage shake aaganum. Pure choreography adrenaline.",
    directorNote: "Eastman 500T • Stage spotlight grading • Zero retakes",
    sceneName: "DANCE ARENA",
    colorClass: "text-cinema-gold border-cinema-gold",
    bgGradient: "from-[#0B0A08] via-[#1A130D] to-[#0B0A08]",
    icon: <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-gold" />,
  },
  {
    id: "scene-02",
    frameNo: "FRAME 02",
    scene: "SCENE 02",
    title: "THE SOUNDSTAGE",
    tamilTitle: "இசை சங்கமம்",
    tagline: "Live band overdrive, acoustic harmonies, and vocal battles.",
    tanglish: "Amp gain up, mic checked. Kollywood melodies and rock anthems.",
    directorNote: "Analog tube warmth • Front-row monitor mix",
    sceneName: "MUSIC STAGE",
    colorClass: "text-cinema-red border-cinema-red",
    bgGradient: "from-[#08090C] via-[#1A0A0C] to-[#08090C]",
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-red" />,
  },
  {
    id: "scene-03",
    frameNo: "FRAME 03",
    scene: "SCENE 03",
    title: "THE PROSCENIUM",
    tamilTitle: "நாடக மேடை",
    tagline: "Theatrical mime, dramatic acts, and comedic street plays.",
    tanglish: "Dialogue delivery, razor-sharp timing. Entire crowd spellbound.",
    directorNote: "Spotlight rim accent • Proscenium theatrical lighting",
    sceneName: "DRAMA STAGE",
    colorClass: "text-cinema-paper border-cinema-paper",
    bgGradient: "from-[#0A0907] via-[#1C170F] to-[#0A0907]",
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-paper" />,
  },
  {
    id: "scene-04",
    frameNo: "FRAME 04",
    scene: "SCENE 04",
    title: "THE VIEWFINDER",
    tamilTitle: "ஒளிப்பதிவு",
    tagline: "Street photography scavenger, shutter dares, and candid frames.",
    tanglish: "Frame compose pannu, shutter speed check. Best shot on campus wins.",
    directorNote: "35mm prime lens clarity • Grain texture preservation",
    sceneName: "PHOTO CLUB",
    colorClass: "text-cinema-gold border-cinema-gold",
    bgGradient: "from-[#0D0C0A] via-[#241710] to-[#0D0C0A]",
    icon: <Film className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-gold" />,
  },
  {
    id: "scene-05",
    frameNo: "FRAME 05",
    scene: "SCENE 05",
    title: "THE 35MM CUT",
    tamilTitle: "குறும்படம்",
    tagline: "Original student short films, scripts, and editing showcases.",
    tanglish: "Script ready, storyboard drawn. First cut on the big projector.",
    directorNote: "2.39:1 Cinemascope ratio • 24fps cinematic roll",
    sceneName: "FILM CLUB",
    colorClass: "text-cinema-red border-cinema-red",
    bgGradient: "from-[#14120E] via-[#241E15] to-[#14120E]",
    icon: <Radio className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-red" />,
  },
  {
    id: "scene-06",
    frameNo: "FRAME 06",
    scene: "SCENE 06",
    title: "THE ARENA",
    tamilTitle: "மின்னணு களம்",
    tagline: "High-octane competitive e-sports and collegiate LAN showdowns.",
    tanglish: "144Hz monitors, zero latency, reflex clashing for the crown.",
    directorNote: "Neon peripheral glow • Tournament low-latency feed",
    sceneName: "GAMING ZONE",
    colorClass: "text-cinema-gold border-cinema-gold",
    bgGradient: "from-[#100E0B] via-[#211B14] to-[#100E0B]",
    icon: <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-cinema-gold" />,
  },
  {
    id: "scene-07",
    frameNo: "FRAME 07",
    scene: "SCENE 07",
    title: "THE OAT CLIMAX",
    tamilTitle: "உச்சகட்ட காட்சி",
    tagline: "Open Air Theatre grand finale, awards ceremony, and trophy roar.",
    tanglish: "Final whistle, winning squad hoisting the championship shield.",
    directorNote: "Strobe flares • OAT capacity whistle resonance",
    sceneName: "OAT FINALE",
    colorClass: "text-white border-white",
    bgGradient: "from-[#0B0B0C] via-[#16171A] to-[#0B0B0C]",
    icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
  },
];

export function FilmReelScroll() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFastSpeed, setIsFastSpeed] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inspectedScene, setInspectedScene] = useState<FilmScene | null>(null);

  const togglePlay = () => {
    soundEngine.playProjectorClick();
    setIsPlaying((prev) => !prev);
  };

  const toggleSpeed = () => {
    soundEngine.playProjectorClick();
    setIsFastSpeed((prev) => !prev);
  };

  const toggleDirection = () => {
    soundEngine.playProjectorClick();
    setIsReverse((prev) => !prev);
  };

  const handleCardClick = (scene: FilmScene) => {
    soundEngine.playFilmReel();
    setInspectedScene(scene);
  };

  const closeInspection = () => {
    soundEngine.playProjectorClick();
    setInspectedScene(null);
  };

  // Speed: 48s for normal cinema glide, 22s for fast-forward
  const duration = isFastSpeed ? "22s" : "48s";
  // If hovered, inspecting, or explicitly paused, pause sliding
  const playState = !isPlaying || isHovered || inspectedScene !== null ? "paused" : "running";

  return (
    <section
      id="reel-story"
      className="bg-[#050403] text-cinema-paper border-b-4 border-cinema-black relative overflow-hidden"
    >
      {/* 35mm Top Sprocket Holes Bar */}
      <div className="bg-zinc-950 border-b-2 border-zinc-800 py-2 px-3 sm:py-2.5 sm:px-4 overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cinema-gold animate-spin shrink-0" style={{ animationDuration: "16s" }} />
          <span className="font-mono text-[10px] sm:text-xs text-cinema-gold font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] truncate">
            <span className="sm:hidden">35MM FILM REEL</span>
            <span className="hidden sm:inline">35MM KODAK FILM STRIP • AUTOMATIC PROJECTOR REEL</span>
          </span>
          <span className="text-cinema-red font-mono text-[10px] sm:text-xs font-black shrink-0">
            • சுழலும் ரீல்
          </span>
        </div>

        {/* Sprocket Holes with Sync Slide Animation */}
        <div className="flex items-center gap-2 overflow-hidden w-20 xs:w-32 sm:w-64 md:w-96 shrink-0">
          <div
            style={{ "--reel-play-state": playState } as React.CSSProperties}
            className="flex items-center gap-1.5 sm:gap-2 sprocket-slide-anim"
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 sm:w-3.5 h-2 sm:h-2.5 bg-zinc-900 border border-zinc-700 rounded-none shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* REEL PROJECTION CONSOLE: Responsive Controls Bar */}
      <div className="bg-[#0A0807] border-b-2 border-cinema-border px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs font-mono">
        {/* Status indicator row */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 ${
                playState === "running"
                  ? "bg-cinema-red animate-ping"
                  : "bg-amber-500"
              }`}
            />
            <span className="font-bold text-cinema-gold text-[11px] sm:text-xs uppercase tracking-wider">
              {inspectedScene
                ? "INSPECTING FRAME [ பார்வை ]"
                : isHovered
                ? "HOLD ON FRAME [ நிறுத்தம் ]"
                : isPlaying
                ? "AUTOMATIC ROLLING [ 24 FPS ]"
                : "PAUSED [ நில் ]"}
            </span>
          </div>

          {/* Desktop Hover / Mobile Touch Instruction */}
          <span className="text-cinema-paper/60 text-[10px] sm:text-xs">
            <span className="sm:hidden">[ TOUCH TO HOLD • TAP TO VIEW ]</span>
            <span className="hidden sm:inline">HOVER TO PAUSE • CLICK FRAME TO INSPECT</span>
          </span>
        </div>

        {/* Interactive Playback Control Deck */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            data-cursor="ticket"
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 min-h-[36px] border font-poster text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              isPlaying
                ? "bg-cinema-charcoal border-cinema-border text-cinema-paper hover:border-cinema-gold"
                : "bg-cinema-red border-cinema-paper text-cinema-paper shadow-hard font-bold"
            }`}
            title={isPlaying ? "Pause Automatic Slide" : "Start Automatic Slide"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-cinema-gold shrink-0" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white shrink-0" />
            )}
            <span>{isPlaying ? "PAUSE" : "AUTOPLAY"}</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={toggleSpeed}
            data-cursor="ticket"
            className={`flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 min-h-[36px] border font-poster text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              isFastSpeed
                ? "bg-cinema-gold border-cinema-paper text-cinema-black shadow-hard font-black"
                : "bg-cinema-charcoal border-cinema-border text-cinema-paper hover:border-cinema-gold"
            }`}
            title="Toggle Glide Speed"
          >
            <FastForward className="w-3.5 h-3.5 shrink-0" />
            <span className="sm:hidden">{isFastSpeed ? "2X" : "1X"}</span>
            <span className="hidden sm:inline">{isFastSpeed ? "2X SPEED" : "1X SPEED"}</span>
          </button>

          {/* Direction Toggle */}
          <button
            onClick={toggleDirection}
            data-cursor="ticket"
            className="flex-1 sm:flex-none px-2.5 sm:px-3 py-1.5 min-h-[36px] border border-cinema-border bg-cinema-charcoal hover:bg-black text-cinema-paper hover:border-cinema-gold text-xs font-poster uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            title="Toggle Slide Direction"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-cinema-gold shrink-0" />
            <span className="sm:hidden">{isReverse ? "RIGHT" : "LEFT"}</span>
            <span className="hidden sm:inline">{isReverse ? "SLIDE RIGHT" : "SLIDE LEFT"}</span>
          </button>
        </div>
      </div>

      {/* CONTINUOUS AUTOMATIC SLIDING 35MM FILM REEL STRIP */}
      <div
        className="py-8 sm:py-12 md:py-16 overflow-hidden relative cursor-grab active:cursor-grabbing touch-pan-y select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onTouchCancel={() => setIsHovered(false)}
      >
        {/* Left & Right Shadow Fade Scrims */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-16 md:w-32 bg-gradient-to-r from-[#050403] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-16 md:w-32 bg-gradient-to-l from-[#050403] to-transparent z-10 pointer-events-none" />

        <div
          style={
            {
              "--reel-duration": duration,
              "--reel-play-state": playState,
            } as React.CSSProperties
          }
          className={`reel-auto-slide ${isReverse ? "reel-auto-slide-reverse" : ""}`}
        >
          {/* Double array renders duplicate scenes for 100% seamless continuous infinite sliding */}
          {[...FILM_SCENES, ...FILM_SCENES].map((scene, idx) => (
            <div
              key={`${scene.id}-${idx}`}
              onClick={() => handleCardClick(scene)}
              data-cursor="view"
              className={`w-[260px] xs:w-[300px] sm:w-[420px] md:w-[480px] bg-gradient-to-b ${scene.bgGradient} border-2 sm:border-4 ${scene.colorClass} p-4 sm:p-6 md:p-8 shadow-hard sm:shadow-hard-lg relative group shrink-0 transition-transform active:scale-[0.98] sm:hover:scale-[1.02] mx-2 sm:mx-4`}
            >
              {/* Top Film Frame Number Stamp */}
              <div className="flex items-center justify-between border-b border-cinema-border/80 sm:border-b-2 pb-2 sm:pb-2.5 mb-3 sm:mb-5 font-mono text-[10px] sm:text-xs">
                <span className="font-bold text-cinema-gold tracking-wider sm:tracking-widest uppercase truncate max-w-[160px] sm:max-w-none">
                  {scene.frameNo} • {scene.sceneName}
                </span>
                <span className="px-1.5 py-0.5 sm:px-2 bg-cinema-black border border-cinema-border font-bold text-cinema-paper text-[9px] sm:text-[10px] shrink-0">
                  REEL #0{((idx) % 7) + 1}
                </span>
              </div>

              {/* Scene Title & Cinematic Icon */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-3 sm:mb-4">
                <div className="p-2 sm:p-2.5 bg-cinema-black border border-cinema-border sm:border-2 shrink-0">
                  {scene.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-xs text-cinema-red uppercase font-bold tracking-[0.2em] block">
                      {scene.scene}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-cinema-gold/70 block">
                      • {scene.tamilTitle}
                    </span>
                  </div>
                  <h3 className="font-poster text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase text-cinema-paper leading-none truncate">
                    {scene.title}
                  </h3>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-sans text-xs sm:text-sm text-cinema-paper/80 mb-3.5 sm:mb-5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {scene.tagline}
              </p>

              {/* Tanglish Dialogue Cut Quote */}
              <div className="p-2.5 sm:p-3.5 bg-cinema-black/90 border-l-3 sm:border-l-4 border-cinema-gold font-mono text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cinema-gold font-bold block text-[9px] sm:text-[9.5px] tracking-wider uppercase">
                    [ TANGLISH DIALOGUE ]
                  </span>
                  <span className="text-[9px] text-cinema-paper/40 hidden xs:inline">SVCE 2026</span>
                </div>
                <p className="font-editorial text-xs sm:text-sm md:text-base text-cinema-paper italic leading-snug sm:leading-normal">
                  &ldquo;{scene.tanglish}&rdquo;
                </p>
              </div>

              {/* Bottom Film Slate Meta */}
              <div className="mt-3.5 sm:mt-5 pt-2 sm:pt-2.5 border-t border-cinema-border flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-cinema-paper/50">
                <span className="truncate max-w-[140px] sm:max-w-none">SVCE MASTER NEGATIVE • 35MM</span>
                <span className="text-cinema-gold font-bold flex items-center gap-1 shrink-0">
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="sm:hidden">TAP</span>
                  <span className="hidden sm:inline">CLICK TO INSPECT</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 35MM FRAME NEGATIVE INSPECTOR MODAL (FOR MOBILE TAP & DESKTOP CLICK) */}
      {inspectedScene && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={closeInspection}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg bg-gradient-to-b ${inspectedScene.bgGradient} border-4 ${inspectedScene.colorClass} p-4 sm:p-6 shadow-hard-lg relative text-cinema-paper`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-cinema-border pb-3 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-cinema-gold" />
                <span className="font-bold text-cinema-gold uppercase tracking-widest text-[11px] sm:text-xs">
                  {inspectedScene.frameNo} • {inspectedScene.sceneName}
                </span>
              </div>
              <button
                onClick={closeInspection}
                className="p-1 border border-cinema-border bg-cinema-black text-cinema-paper hover:text-cinema-gold hover:border-cinema-gold transition-colors"
                aria-label="Close Inspection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Title & Icon */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 bg-cinema-black border-2 border-cinema-border shrink-0">
                {inspectedScene.icon}
              </div>
              <div>
                <span className="font-mono text-xs text-cinema-red uppercase font-bold tracking-[0.25em] block">
                  {inspectedScene.scene} • {inspectedScene.tamilTitle}
                </span>
                <h3 className="font-poster text-3xl sm:text-4xl font-black uppercase text-cinema-paper leading-none">
                  {inspectedScene.title}
                </h3>
              </div>
            </div>

            {/* Tagline */}
            <p className="font-sans text-xs sm:text-sm text-cinema-paper/85 mb-4 leading-relaxed">
              {inspectedScene.tagline}
            </p>

            {/* Tanglish Dialogue Box */}
            <div className="p-3.5 bg-cinema-black/95 border-l-4 border-cinema-gold font-mono mb-4">
              <span className="text-cinema-gold font-bold block text-[10px] tracking-wider uppercase mb-1">
                [ TANGLISH DIALOGUE / வசனம் ]
              </span>
              <p className="font-editorial text-sm sm:text-base md:text-lg text-cinema-paper italic leading-snug">
                &ldquo;{inspectedScene.tanglish}&rdquo;
              </p>
            </div>

            {/* Director's Slate Note */}
            <div className="p-2.5 bg-cinema-charcoal/80 border border-cinema-border font-mono text-xs mb-4 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-cinema-gold shrink-0" />
              <span className="text-cinema-paper/80 text-[10px] sm:text-[11px]">
                {inspectedScene.directorNote}
              </span>
            </div>

            {/* Tech Specs Block */}
            <div className="pt-2.5 border-t border-cinema-border flex flex-wrap items-center justify-between gap-1.5 text-[9px] sm:text-[10px] font-mono text-cinema-paper/60 mb-4">
              <span>FORMAT: 35MM EASTMAN KODAK 500T</span>
              <span>ASPECT: 2.39:1 CINEMASCOPE</span>
              <span>VENUE: SRI VENKATESWARA COLLEGE OF ENGG</span>
            </div>

            {/* Modal Footer CTA */}
            <button
              onClick={closeInspection}
              className="w-full py-2.5 bg-cinema-red hover:bg-cinema-maroon border-2 border-cinema-paper text-cinema-paper font-poster text-sm sm:text-base uppercase tracking-wider transition-colors shadow-hard font-bold flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>RESUME 35MM REEL [ ரீல் தொடர்க ]</span>
            </button>
          </div>
        </div>
      )}

      {/* 35mm Bottom Sprocket Holes Bar */}
      <div className="bg-zinc-950 border-t-2 border-zinc-800 py-2 px-3 sm:py-2.5 sm:px-4 overflow-hidden flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden w-20 xs:w-32 sm:w-64 md:w-96 shrink-0">
          <div
            style={{ "--reel-play-state": playState } as React.CSSProperties}
            className="flex items-center gap-1.5 sm:gap-2 sprocket-slide-anim"
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-2.5 sm:w-3.5 h-2 sm:h-2.5 bg-zinc-900 border border-zinc-700 rounded-none shrink-0"
              />
            ))}
          </div>
        </div>

        <span className="font-mono text-[9px] sm:text-[10px] text-cinema-paper/60 uppercase tracking-widest truncate max-w-[200px] sm:max-w-none text-right">
          <span className="sm:hidden">SVCE 35MM REEL [ 2026 ]</span>
          <span className="hidden sm:inline">CONTINUOUS AUTOMATIC 35MM SPOOL • CALIBRATIONS 2026–2027</span>
        </span>
      </div>
    </section>
  );
}
