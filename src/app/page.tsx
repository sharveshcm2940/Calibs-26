"use client";

import React, { useState, useEffect } from "react";
import { CinemaIntro } from "@/components/CinemaIntro";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { PosterWall, type EventData } from "@/components/PosterWall";
import { EventCatalogue } from "@/components/EventCatalogue";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { GalleryReel } from "@/components/GalleryReel";
import { SponsorCredits } from "@/components/SponsorCredits";
import { EndCredits } from "@/components/EndCredits";
import { RegistrationModal } from "@/components/RegistrationModal";
import { FilmGrainOverlay } from "@/components/FilmGrainOverlay";
import { CinemaCursor } from "@/components/CinemaCursor";
import { FilmReelScroll } from "@/components/FilmReelScroll";

import { FALLBACK_EVENTS } from "@/lib/fallbackEvents";

// Initial official SVCE events loaded from FALLBACK_EVENTS
const INITIAL_EVENTS: EventData[] = FALLBACK_EVENTS;

export default function HomePage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [events, setEvents] = useState<EventData[]>(INITIAL_EVENTS);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventData | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Fetch live events from API
  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (res.ok && data.events && data.events.length > 0) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to fetch events from API:", err);
      }
    }
    loadEvents();
  }, []);

  const handleOpenRegister = (event?: EventData) => {
    if (event) {
      setSelectedEventForModal(event);
    } else {
      // Default to first open event
      const openEvent = events.find((e) => e.status !== "HOUSEFULL" && e.registrationOpen) || events[0];
      setSelectedEventForModal(openEvent);
    }
    setIsRegisterModalOpen(true);
  };

  const handleEventRegistrationSuccess = (updatedEvent: EventData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e))
    );
  };

  const handleScrollToEvents = () => {
    const el = document.getElementById("events");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-print-black text-print-paper relative overflow-x-hidden selection:bg-print-red selection:text-print-paper">
      {/* 35mm Physical Film Grain & Cinema Contextual Cursor */}
      <FilmGrainOverlay />
      <CinemaCursor />

      {/* Cinema Projector Intro Sequence */}
      <CinemaIntro onComplete={() => setIntroFinished(true)} />

      {/* Main Website Structure */}
      <Navigation onRegisterClick={() => handleOpenRegister()} />

      <Hero
        onRegisterClick={() => handleOpenRegister()}
        onExploreClick={handleScrollToEvents}
      />

      <AboutSection />

      {/* 35mm GSAP Film Reel Continuous Strip */}
      <FilmReelScroll />

      <PosterWall
        events={events}
        onSelectEvent={(event) => handleOpenRegister(event)}
      />

      <EventCatalogue
        events={events}
        onRegister={(event) => handleOpenRegister(event)}
      />

      <ScheduleTimeline />

      <GalleryReel />

      <SponsorCredits />

      <EndCredits />

      {/* Box Office Registration Ticket Counter Modal */}
      {isRegisterModalOpen && selectedEventForModal && (
        <RegistrationModal
          event={selectedEventForModal}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegistrationSuccess={handleEventRegistrationSuccess}
        />
      )}
    </main>
  );
}
