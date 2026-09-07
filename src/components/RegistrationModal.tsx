"use client";

import React, { useState } from "react";
import { X, Plus, Trash2, Clapperboard, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import type { EventData } from "./PosterWall";
import { TicketStub, type TicketDetails } from "./TicketStub";
import { formatDate, formatTime } from "@/lib/utils";
import { soundEngine } from "@/lib/soundEngine";
import { generateRegistrationNumber } from "@/lib/registrationNumber";

interface RegistrationModalProps {
  event: EventData | null;
  isOpen?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onRegistrationSuccess?: (updatedEvent: EventData) => void;
}

interface TeamMemberInput {
  name: string;
  email: string;
  phone: string;
}

// Colorful Clapper Chevron Stripes from the reference image
const CLAPPER_STRIPES = [
  "bg-emerald-600",
  "bg-yellow-400",
  "bg-sky-500",
  "bg-red-600",
  "bg-white",
  "bg-zinc-400",
  "bg-zinc-800",
  "bg-emerald-600",
  "bg-yellow-400",
  "bg-sky-500",
  "bg-red-600",
  "bg-white",
  "bg-zinc-400",
  "bg-zinc-800",
];

export function RegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
  onRegistrationSuccess,
}: RegistrationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("ECE");
  const [year] = useState("1st Year");
  const [college, setCollege] = useState("Sri Venkateswara College of Engineering (SVCE)");
  const [members, setMembers] = useState<TeamMemberInput[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clapped, setClapped] = useState(false);
  const [showPackUpAlert, setShowPackUpAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isHousefullError, setIsHousefullError] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<TicketDetails | null>(null);

  if (!event || (isOpen !== undefined && !isOpen)) return null;

  const handleAddMember = () => {
    soundEngine.playProjectorClick();
    if (members.length < event.maxTeamSize - 1) {
      setMembers([...members, { name: "", email: "", phone: "" }]);
    }
  };

  const handleRemoveMember = (idx: number) => {
    soundEngine.playProjectorClick();
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleMemberChange = (idx: number, field: keyof TeamMemberInput, value: string) => {
    const updated = [...members];
    updated[idx][field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setIsHousefullError(false);

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          department,
          year,
          college,
          members: members.filter((m) => m.name.trim().length > 0),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409 || data.code === "HOUSEFULL" || data.message?.includes("sold out")) {
          setIsHousefullError(true);
          soundEngine.playStampImpact();
          return;
        }
        throw new Error(data.message || "Registration processing failed.");
      }

      // Clapperboard Snap Animation & Sound Trigger
      setClapped(true);
      soundEngine.playClapperSnap();

      // Show "SCENE CUT! PACK UP PANNUMGA!" alert popup
      setShowPackUpAlert(true);

      const issuedTicket: TicketDetails = {
        registrationNumber: data.registration?.registrationNumber || data.registrationNumber || generateRegistrationNumber(),
        eventName: event.name,
        category: event.category,
        venue: event.venue,
        startTime: event.startTime,
        name,
        email,
        phone,
        department,
        year,
        college,
        members: members.filter((m) => m.name.trim().length > 0),
      };

      setConfirmedTicket(issuedTicket);

      if (onSuccess) onSuccess();
      if (onRegistrationSuccess) {
        onRegistrationSuccess({
          ...event,
          registeredCount: event.registeredCount + 1,
          remainingSpots: Math.max(0, event.remainingSpots - 1),
          status: event.registeredCount + 1 >= event.capacity ? "HOUSEFULL" : event.status,
        });
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred at the ticket desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismissPackUpAlert = () => {
    soundEngine.playTicketPrint();
    setShowPackUpAlert(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cinema-black/95 backdrop-blur-md overflow-y-auto">
      {/* 1. SCENE CUT! PACK UP PANNUMGA! Popup Alert */}
      {showPackUpAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cinema-black/95 backdrop-blur-lg animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-lg w-full bg-cinema-black border-4 border-cinema-red p-6 sm:p-10 text-center shadow-hard-red relative">
            {/* Clapperboard Icon Header */}
            <div className="w-16 h-16 bg-cinema-red border-2 border-cinema-black mx-auto flex items-center justify-center shadow-hard mb-4">
              <Clapperboard className="w-9 h-9 text-cinema-paper" />
            </div>

            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold font-bold block mb-1">
              DIRECTOR CALL • TAKE APPROVED
            </span>

            {/* Tanglish Confirmation Callout */}
            <span className="text-sm font-mono text-cinema-paper font-bold uppercase tracking-wider block text-emerald-400 mb-2">
              Mass! Un registration confirm aayiduchu.
            </span>

            {/* Requested Hero Phrase */}
            <h2 className="font-poster text-5xl sm:text-7xl font-black uppercase text-cinema-paper tracking-tight leading-none print-offset-red">
              SCENE CUT!
            </h2>
            <h3 className="font-poster text-4xl sm:text-6xl font-black uppercase text-cinema-gold tracking-tight leading-tight mt-1">
              PACK UP PANNUMGA!
            </h3>

            {/* Printing Progress Simulation */}
            <div className="my-5 p-3 bg-zinc-950 border border-cinema-gold/40 text-left font-mono text-xs text-cinema-gold space-y-1">
              <div className="flex items-center justify-between text-[10px] text-cinema-paper/60 border-b border-zinc-800 pb-1">
                <span>PRINTING SEQUENCE: 35MM TICKET FEED</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="text-[11px] text-cinema-paper">
                &gt; EVENT: <strong className="text-cinema-gold uppercase">{event.name}</strong>
              </div>
              <div className="text-[11px] text-cinema-paper">
                &gt; PARTICIPANT: <strong>{name || "REGISTERED FRESHER"}</strong>
              </div>
              <div className="text-[11px] text-cinema-paper">
                &gt; AUTH ID: <strong className="text-cinema-red">{confirmedTicket?.registrationNumber || "CAL-26-PENDING"}</strong>
              </div>
              <div className="text-[10px] text-emerald-400 font-bold pt-1">
                &gt; MASS! TICKET READY.
              </div>
            </div>

            <button
              onClick={handleDismissPackUpAlert}
              className="w-full py-3.5 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster text-2xl tracking-widest uppercase border-2 border-cinema-paper shadow-hard flex items-center justify-center gap-2 transition-transform active:translate-x-[2px] active:translate-y-[2px]"
            >
              <span>INSPECT YOUR PASS [ MASS TICKET ]</span>
              <ArrowRight className="w-5 h-5 text-cinema-gold" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Confirmed Digital Cinema Ticket */}
      {confirmedTicket && !showPackUpAlert ? (
        <div className="relative w-full max-w-xl bg-cinema-paper text-cinema-black border-4 border-cinema-black p-6 sm:p-8 shadow-hard-lg my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 border-2 border-cinema-black hover:bg-cinema-black hover:text-cinema-paper transition-colors"
            aria-label="Close ticket view"
          >
            <X className="w-5 h-5" />
          </button>
          <TicketStub ticket={confirmedTicket} onDone={onClose} />
        </div>
      ) : (
        /* 3. The Authentic Film Slate / Clapperboard Registration Form */
        <div className="relative w-full max-w-2xl bg-white text-zinc-950 border-4 border-zinc-900 shadow-hard-lg my-8 overflow-hidden">
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-1.5 bg-zinc-900 text-white border border-white hover:bg-red-600 transition-colors"
            aria-label="Close registration slate"
          >
            <X className="w-5 h-5" />
          </button>

          {/* TOP CLAPPERBOARD ARM SECTION */}
          <div className="relative bg-zinc-950 border-b-4 border-zinc-900 overflow-hidden">
            {/* Moving Hinged Clapper Arm */}
            <div
              className={`h-9 flex items-center border-b-2 border-zinc-800 transition-transform origin-bottom-left duration-300 ${
                clapped ? "rotate-0" : "-rotate-3"
              }`}
            >
              {/* Left Hinge Bracket with Screws */}
              <div className="w-12 h-full bg-zinc-900 border-r-2 border-zinc-800 flex items-center justify-center gap-1.5 shrink-0 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-950 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 border border-zinc-950 shadow-inner" />
              </div>

              {/* Colorful Diagonal Chevron Stripes */}
              <div className="flex-1 h-full flex overflow-hidden">
                {CLAPPER_STRIPES.map((color, idx) => (
                  <div
                    key={idx}
                    className={`h-full flex-1 ${color} transform -skew-x-12 border-r border-zinc-950`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Stationary Arm */}
            <div className="h-8 flex items-center">
              <div className="w-12 h-full bg-zinc-900 border-r-2 border-zinc-800 shrink-0" />
              <div className="flex-1 h-full flex overflow-hidden">
                {CLAPPER_STRIPES.map((color, idx) => (
                  <div
                    key={idx}
                    className={`h-full flex-1 ${color} transform -skew-x-12 border-r border-zinc-950`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SLATE WHITEBOARD BODY */}
          <div className="p-6 sm:p-8 bg-white text-zinc-950 font-mono">
            {/* HOUSEFULL OVERLAY IF FULL */}
            {isHousefullError && (
              <div className="p-4 mb-6 bg-red-100 border-4 border-red-600 text-red-700 font-poster text-2xl sm:text-3xl uppercase tracking-widest text-center shadow-hard rotate-[-1deg]">
                AIYO... SHOW FULL DA! INDHA EVENT-KU TICKETS SOLD OUT.
                <span className="block font-mono text-xs text-red-900 mt-1">0 SLOTS LEFT • REGISTRATION CLOSED</span>
              </div>
            )}

            {/* ERROR ALERT */}
            {errorMsg && (
              <div className="p-3 mb-4 bg-red-100 border-2 border-red-600 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: PRODUCTION */}
              <div className="border-b-2 border-zinc-900 pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-900 block">
                    PRODUCTION • SRI VENKATESWARA COLLEGE OF ENGINEERING
                  </span>
                  <span className="text-[11px] font-mono text-red-600 font-bold uppercase">
                    Ticket edukka ready-ah? Register pannitu scene-ku vaanga.
                  </span>
                </div>
                <div className="font-poster text-2xl sm:text-3xl font-black uppercase tracking-wide text-zinc-900 leading-none">
                  CALIBRATIONS 2026–2027: {event.name}
                </div>
              </div>

              {/* Row 2: 4 Grid Boxes (ROLL, SCENE, SHOT, TAKE) */}
              <div className="grid grid-cols-4 border-2 border-zinc-900 divide-x-2 divide-zinc-900 text-center bg-zinc-50">
                {/* ROLL (Department Selector) */}
                <div className="p-2">
                  <span className="text-[10px] font-black uppercase tracking-wider block text-zinc-600">
                    ROLL (DEPT)
                  </span>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-transparent font-poster text-xl font-bold uppercase text-center outline-none cursor-pointer mt-1"
                  >
                    <option value="ECE">ECE</option>
                    <option value="CSE">CSE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="IT">IT</option>
                    <option value="EEE">EEE</option>
                    <option value="BIOTECH">BIOTECH</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                {/* SCENE (Category) */}
                <div className="p-2">
                  <span className="text-[10px] font-black uppercase tracking-wider block text-zinc-600">
                    SCENE
                  </span>
                  <span className="font-poster text-xl font-bold uppercase text-zinc-900 block truncate mt-1">
                    {event.category}
                  </span>
                </div>

                {/* SHOT (Year - Restricted to 1st Year only) */}
                <div className="p-2 bg-amber-50">
                  <span className="text-[10px] font-black uppercase tracking-wider block text-amber-900">
                    SHOT (YEAR)
                  </span>
                  <span className="font-poster text-xl font-bold uppercase text-red-600 block mt-1 leading-none">
                    1ST YEAR
                  </span>
                  <span className="text-[8px] font-mono text-zinc-700 font-bold uppercase block tracking-tighter mt-0.5">
                    FRESHER ONLY
                  </span>
                </div>

                {/* TAKE (Slot ID) */}
                <div className="p-2">
                  <span className="text-[10px] font-black uppercase tracking-wider block text-zinc-600">
                    TAKE
                  </span>
                  <span className="font-poster text-xl font-bold uppercase text-red-600 block mt-1">
                    #{event.registeredCount + 1}
                  </span>
                </div>
              </div>

              {/* Row 3: DIRECTOR & CAMERAMAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1">
                    DIRECTOR (LEAD PARTICIPANT NAME)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-900 bg-white font-sans text-sm outline-none focus:bg-yellow-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1">
                    CAMERAMAN (CONTACT PHONE)
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-900 bg-white font-sans text-sm outline-none focus:bg-yellow-50"
                  />
                </div>
              </div>

              {/* Row 4: DATE & EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1">
                    COLLEGE / INSTITUTION
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sri Venkateswara College of Engineering (SVCE)"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-900 bg-white font-sans text-sm outline-none focus:bg-yellow-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-zinc-900 mb-1">
                    CONTACT EMAIL (PASS DISPATCH)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@svce.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-zinc-900 bg-white font-sans text-sm outline-none focus:bg-yellow-50"
                  />
                </div>
              </div>

              {/* Team Members Section if Team Event */}
              {event.isTeamEvent && (
                <div className="pt-2 border-t-2 border-dashed border-zinc-400">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-900">
                      SQUAD CREW ({members.length + 1} / {event.maxTeamSize} MEMBERS)
                    </span>
                    {members.length < event.maxTeamSize - 1 && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="px-2.5 py-1 bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-mono uppercase font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>ADD CREW MEMBER</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {members.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          placeholder={`Crew Member ${idx + 2} Name`}
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                          className="flex-1 px-3 py-1.5 border-2 border-zinc-900 bg-white text-xs font-sans outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="p-1.5 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          aria-label="Remove squad member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Slate Action */}
              <div className="pt-4 border-t-2 border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-zinc-600">
                  <span>DATE: {formatDate(event.startTime)} at {formatTime(event.startTime)}</span>
                  <span className="block font-bold text-red-600">
                    CALL TIME: REPORT 15 MIN BEFORE SCENE
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isHousefullError}
                  className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 hover:bg-red-600 text-white font-poster text-2xl tracking-widest uppercase border-2 border-zinc-900 shadow-hard flex items-center justify-center gap-2 transition-all active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                >
                  <Clapperboard className="w-5 h-5 text-yellow-400" />
                  <span>{isSubmitting ? "ROLLING TAKE..." : "CLAP TO CONFIRM [ SCENE START! ]"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
