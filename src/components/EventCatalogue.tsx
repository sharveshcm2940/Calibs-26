"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Clock, MapPin, Ticket, ArrowDownRight, Film, Sparkles, Phone, Award, Users, CheckCircle2 } from "lucide-react";
import { EventCard } from "./EventCard";
import type { EventData } from "./PosterWall";
import { formatTime } from "@/lib/utils";
import { soundEngine } from "@/lib/soundEngine";

interface EventCatalogueProps {
  events: EventData[];
  onRegister: (event: EventData) => void;
  selectedEventForModal?: EventData | null;
  onCloseModal?: () => void;
  onOpenDetailsModal?: (event: EventData) => void;
}

export function EventCatalogue({
  events,
  onRegister,
  selectedEventForModal,
  onCloseModal,
  onOpenDetailsModal,
}: EventCatalogueProps) {
  const [selectedShowType, setSelectedShowType] = useState<"ALL" | "FDFS" | "SDFS">("ALL");
  const [selectedClub, setSelectedClub] = useState<string>("ALL CLUBS");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalEvent, setActiveModalEvent] = useState<EventData | null>(
    selectedEventForModal || null
  );

  React.useEffect(() => {
    if (selectedEventForModal !== undefined) {
      setActiveModalEvent(selectedEventForModal);
    }
  }, [selectedEventForModal]);

  const fdfsCount = useMemo(
    () => events.filter((e) => (e.showType || (e.startTime.includes("2026-09-18") ? "FDFS" : "SDFS")) === "FDFS").length,
    [events]
  );
  const sdfsCount = useMemo(
    () => events.filter((e) => (e.showType || (e.startTime.includes("2026-09-18") ? "FDFS" : "SDFS")) === "SDFS").length,
    [events]
  );

  const clubs = useMemo(() => {
    const clubSet = new Set(events.map((e) => e.club).filter(Boolean) as string[]);
    return ["ALL CLUBS", ...Array.from(clubSet)];
  }, [events]);

  const categories = useMemo(() => {
    const cats = new Set(events.map((e) => e.category));
    return ["ALL", ...Array.from(cats)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventShowType = event.showType || (event.startTime.includes("2026-09-18") ? "FDFS" : "SDFS");
      const matchesShowType = selectedShowType === "ALL" || eventShowType === selectedShowType;
      const matchesClub = selectedClub === "ALL CLUBS" || event.club === selectedClub;
      const matchesCategory =
        selectedCategory === "ALL" || event.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        event.name.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        (event.venue2 && event.venue2.toLowerCase().includes(q)) ||
        (event.club && event.club.toLowerCase().includes(q)) ||
        (event.pocName && event.pocName.toLowerCase().includes(q)) ||
        (event.tamilTitle && event.tamilTitle.toLowerCase().includes(q));

      return matchesShowType && matchesClub && matchesCategory && matchesSearch;
    });
  }, [events, selectedShowType, selectedClub, selectedCategory, searchQuery]);

  const handleOpenDetails = (event: EventData) => {
    soundEngine.playProjectorClick();
    setActiveModalEvent(event);
    if (onOpenDetailsModal) onOpenDetailsModal(event);
  };

  const handleClose = () => {
    soundEngine.playProjectorClick();
    setActiveModalEvent(null);
    if (onCloseModal) onCloseModal();
  };

  const handleShowTypeSelect = (type: "ALL" | "FDFS" | "SDFS") => {
    soundEngine.playProjectorClick();
    setSelectedShowType(type);
  };

  const handleCategorySelect = (category: string) => {
    soundEngine.playProjectorClick();
    setSelectedCategory(category);
  };

  const handleClubSelect = (club: string) => {
    soundEngine.playProjectorClick();
    setSelectedClub(club);
  };

  return (
    <section id="events" className="py-20 sm:py-24 bg-[#0A0807] border-b-4 border-cinema-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marquee Ticker */}
        <div className="border border-cinema-gold/30 bg-black/60 px-4 py-2 mb-8 flex flex-wrap items-center justify-between text-[11px] font-mono text-cinema-gold tracking-widest uppercase gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-red animate-ping" />
            <span className="font-bold">NOW SHOWING • THEATRICAL MOVIE POSTER GALLERY</span>
          </div>
          <span className="text-cinema-paper/60 hidden sm:inline">
            SRI VENKATESWARA COLLEGE OF ENGINEERING • PENNALUR [ {events.length} EVENTS ]
          </span>
        </div>

        {/* Section Header */}
        <div className="border-b-4 border-cinema-border pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-cinema-red text-cinema-paper font-mono text-[10px] font-black uppercase tracking-widest border border-cinema-paper shadow-hard">
                SVCE FRESHERS EXCLUSIVE
              </span>
              <span className="text-cinema-gold font-mono text-xs uppercase tracking-widest font-bold">
                1ST YEAR BATCH 2026–2030 ONLY
              </span>
              <span className="text-cinema-red font-black font-mono text-xs">
                • திரையரங்குகளில் இன்று
              </span>
            </div>
            <h2 className="font-poster text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-cinema-paper leading-none poster-title-shadow">
              THE LINE-UP
            </h2>
          </div>

          <p className="font-editorial text-sm sm:text-base text-cinema-paper/85 max-w-md italic leading-relaxed">
            &ldquo;Enna da, event choose pannitiya? Un talent-ku oru stage ready. FDFS or SDFS — poster paaru, un slot-ku ticket edu!&rdquo;
          </p>
        </div>

        {/* SHOW SEGREGATION TABS: FDFS & SDFS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <button
            onClick={() => handleShowTypeSelect("ALL")}
            className={`p-4 border-2 font-poster text-xl tracking-wider uppercase flex flex-col items-center justify-center transition-all ${
              selectedShowType === "ALL"
                ? "bg-cinema-paper text-cinema-black border-cinema-paper shadow-hard scale-[1.02]"
                : "bg-cinema-charcoal border-cinema-border text-cinema-paper/80 hover:border-cinema-gold"
            }`}
          >
            <span>ALL SHOWS</span>
            <span className="text-[10px] font-mono opacity-70">{events.length} MOVIE POSTERS</span>
          </button>

          <button
            onClick={() => handleShowTypeSelect("FDFS")}
            className={`p-4 border-2 font-poster text-xl tracking-wider uppercase flex flex-col items-center justify-center transition-all ${
              selectedShowType === "FDFS"
                ? "bg-cinema-red text-cinema-paper border-cinema-paper shadow-hard-red scale-[1.02]"
                : "bg-cinema-charcoal border-cinema-border text-cinema-paper/80 hover:border-cinema-red"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cinema-gold animate-ping" />
              <span>FDFS — FIRST DAY FIRST SHOW</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">FRIDAY • SEPT 18, 2026 • {fdfsCount} MARQUEE RELEASES</span>
          </button>

          <button
            onClick={() => handleShowTypeSelect("SDFS")}
            className={`p-4 border-2 font-poster text-xl tracking-wider uppercase flex flex-col items-center justify-center transition-all ${
              selectedShowType === "SDFS"
                ? "bg-cinema-gold text-cinema-black border-cinema-paper shadow-hard-gold scale-[1.02]"
                : "bg-cinema-charcoal border-cinema-border text-cinema-paper/80 hover:border-cinema-gold"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cinema-red" />
              <span>SDFS — SECOND DAY FIRST SHOW</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">SATURDAY • SEPT 19, 2026 • {sdfsCount} GRAND FINALES</span>
          </button>
        </div>

        {/* Club Filter Strip */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cinema-gold font-bold uppercase tracking-wider">
            <Film className="w-3.5 h-3.5 text-cinema-gold" />
            <span>FILTER BY SVCE ORGANIZING CLUB:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {clubs.map((club) => (
              <button
                key={club}
                onClick={() => handleClubSelect(club)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border whitespace-nowrap transition-all ${
                  selectedClub === club
                    ? "bg-cinema-gold text-cinema-black border-cinema-paper shadow-hard font-black"
                    : "bg-cinema-charcoal border-cinema-border text-cinema-paper/70 hover:border-cinema-gold hover:text-cinema-gold"
                }`}
              >
                {club}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Category Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-cinema-border">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-cinema-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event, club, venue, POC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cinema-charcoal border-2 border-cinema-border focus:border-cinema-gold text-cinema-paper text-xs font-mono outline-none"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all ${
                  selectedCategory === category
                    ? "bg-cinema-red border-cinema-paper text-cinema-paper shadow-hard"
                    : "bg-cinema-charcoal border-cinema-border text-cinema-paper/70 hover:border-cinema-gold hover:text-cinema-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-cinema-paper/60 mb-6 pb-2 border-b border-cinema-border/40">
          <span>SHOWING <strong className="text-cinema-gold">{filteredEvents.length}</strong> OF {events.length} EVENTS</span>
          {(selectedClub !== "ALL CLUBS" || selectedCategory !== "ALL" || selectedShowType !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedClub("ALL CLUBS");
                setSelectedCategory("ALL");
                setSelectedShowType("ALL");
                setSearchQuery("");
              }}
              className="text-cinema-red hover:underline uppercase text-[11px] font-bold"
            >
              RESET ALL FILTERS
            </button>
          )}
        </div>

        {/* Events Catalogue Grid - Kollywood Movie Posters */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={onRegister}
                onViewDetails={handleOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-cinema-border bg-cinema-charcoal/40 p-8">
            <Film className="w-12 h-12 text-cinema-gold mx-auto mb-3 opacity-50" />
            <h4 className="font-poster text-2xl uppercase text-cinema-paper mb-1">NO EVENTS MATCHED YOUR SEARCH</h4>
            <p className="font-mono text-xs text-cinema-paper/60 mb-4">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => {
                setSelectedClub("ALL CLUBS");
                setSelectedCategory("ALL");
                setSelectedShowType("ALL");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-cinema-red text-cinema-paper font-poster text-sm uppercase tracking-wider border border-cinema-paper"
            >
              VIEW ALL SHOWS
            </button>
          </div>
        )}

        {/* EventSheet: Theatrical Production Dossier Inspection Panel */}
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-cinema-black/90 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-cinema-paper text-cinema-black border-4 border-cinema-black shadow-hard-lg p-5 sm:p-8 my-6 max-h-[92vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 border-2 border-cinema-black text-cinema-black hover:bg-cinema-black hover:text-cinema-paper transition-colors"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b-2 border-cinema-black pb-4 mb-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-cinema-red text-cinema-paper text-[10px] font-mono font-black uppercase border border-cinema-black shadow-hard">
                    {activeModalEvent.showType || (activeModalEvent.startTime.includes("2026-09-18") ? "FDFS • FIRST DAY FIRST SHOW" : "SDFS • SECOND DAY FIRST SHOW")}
                  </span>
                  {activeModalEvent.club && (
                    <span className="px-2 py-0.5 bg-cinema-black text-cinema-gold text-[10px] font-mono font-bold uppercase border border-cinema-black">
                      {activeModalEvent.club}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-white text-cinema-black text-[10px] font-mono font-bold uppercase border border-cinema-black">
                    1ST YEARS ONLY
                  </span>
                </div>

                {activeModalEvent.tamilTitle && (
                  <div className="font-serif text-lg font-bold text-cinema-maroon mb-1">
                    {activeModalEvent.tamilTitle}
                  </div>
                )}

                <h3 className="font-poster text-3xl sm:text-5xl font-black uppercase text-cinema-black tracking-tight leading-none">
                  {activeModalEvent.name}
                </h3>
                {activeModalEvent.tagline && (
                  <p className="font-editorial text-sm italic text-cinema-maroon mt-1.5 leading-snug">
                    &ldquo;{activeModalEvent.tagline}&rdquo;
                  </p>
                )}
              </div>

              {/* Call Sheet Matrix Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 sm:p-4 bg-[#E2D2B0] border-2 border-cinema-black mb-5 text-xs font-mono">
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">CALL TIME / DURATION</span>
                  <span className="font-bold text-cinema-black">
                    {activeModalEvent.duration || formatTime(activeModalEvent.startTime)}
                  </span>
                </div>
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">PRIMARY VENUE 1</span>
                  <span className="font-bold text-cinema-red truncate block">
                    {activeModalEvent.venue}
                  </span>
                </div>
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">SECONDARY VENUE 2</span>
                  <span className="font-bold text-cinema-black truncate block">
                    {activeModalEvent.venue2 && activeModalEvent.venue2 !== "—" ? activeModalEvent.venue2 : "Classroom / OAT"}
                  </span>
                </div>
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">SQUAD SIZE</span>
                  <span className="font-bold text-cinema-black">
                    {activeModalEvent.teamSizeLabel || (activeModalEvent.isTeamEvent ? `Max ${activeModalEvent.maxTeamSize} Members` : "Solo Entry")}
                  </span>
                </div>
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">CERTIFICATES</span>
                  <span className="font-bold text-cinema-black">
                    {activeModalEvent.certificates ? `${activeModalEvent.certificates} Awarded` : "Issued to Winners"}
                  </span>
                </div>
                <div>
                  <span className="text-cinema-black/60 block text-[10px]">ORGANIZER</span>
                  <span className="font-bold text-cinema-black truncate block">
                    {activeModalEvent.club || "SVCE Culturals"}
                  </span>
                </div>
              </div>

              {/* POC Point of Contact Card */}
              {activeModalEvent.pocName && (
                <div className="p-3 bg-white border-2 border-cinema-black mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
                  <div>
                    <span className="text-cinema-maroon font-bold block text-[10px] uppercase">
                      STUDENT POINT OF CONTACT (POC)
                    </span>
                    <span className="font-bold text-cinema-black text-sm">
                      {activeModalEvent.pocName}
                    </span>
                    {activeModalEvent.pocDept && (
                      <span className="text-cinema-black/70 ml-1">
                        ({activeModalEvent.pocDept})
                      </span>
                    )}
                  </div>
                  {activeModalEvent.pocContact && (
                    <a
                      href={`tel:${activeModalEvent.pocContact.replace(/\s+/g, "")}`}
                      className="px-3 py-1.5 bg-cinema-black text-cinema-gold hover:bg-cinema-red hover:text-white transition-colors border border-black flex items-center gap-1.5 font-bold text-xs shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{activeModalEvent.pocContact}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Additional Requirements Block */}
              {activeModalEvent.requirements && activeModalEvent.requirements !== "NA" && activeModalEvent.requirements !== "NIL" && (
                <div className="p-3 bg-[#EAE0CA] border border-cinema-border mb-5 text-xs font-mono">
                  <span className="font-bold text-cinema-maroon uppercase block text-[10px] mb-0.5">
                    [ PRODUCTION REQUIREMENTS &amp; GEAR ]
                  </span>
                  <p className="text-cinema-black/90 leading-relaxed">
                    {activeModalEvent.requirements}
                  </p>
                </div>
              )}

              {/* Description & Rules */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-mono text-xs font-bold text-cinema-black uppercase tracking-wider mb-1">
                    [ SYNOPSIS ]
                  </h4>
                  <p className="font-editorial text-sm sm:text-base text-cinema-black/90 leading-relaxed">
                    {activeModalEvent.description}
                  </p>
                </div>

                <div className="p-4 bg-cinema-black text-cinema-paper border-2 border-cinema-black font-mono text-xs leading-relaxed whitespace-pre-line">
                  <span className="text-cinema-gold font-bold uppercase block mb-2">
                    [ OFFICIAL RULES OF ENGAGEMENT ]
                  </span>
                  {activeModalEvent.rules}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-cinema-black">
                <div className="text-xs font-mono text-cinema-black/70">
                  STATUS:{" "}
                  <strong className="text-cinema-red uppercase font-bold">
                    {activeModalEvent.status} ({activeModalEvent.remainingSpots} SEATS REMAIN)
                  </strong>
                </div>

                {activeModalEvent.status === "HOUSEFULL" ? (
                  <div className="w-full sm:w-auto px-6 py-2.5 bg-cinema-red border-2 border-cinema-black text-cinema-paper font-poster text-xl tracking-widest uppercase text-center cursor-not-allowed">
                    HOUSEFULL
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleClose();
                      onRegister(activeModalEvent);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster text-xl tracking-widest uppercase border-2 border-cinema-black shadow-hard flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-5 h-5 text-cinema-gold" />
                    <span>BOOK ENTRY TICKET</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
