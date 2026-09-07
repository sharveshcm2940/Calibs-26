"use client";

import React, { useRef } from "react";
import { Printer, Download, ArrowLeft, Ticket } from "lucide-react";
import { formatTime, formatDate } from "@/lib/utils";

export interface TicketDetails {
  registrationNumber: string;
  eventName: string;
  category: string;
  venue: string;
  startTime: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  college?: string | null;
  members?: Array<{ name: string; email?: string | null; phone?: string | null }>;
}

interface TicketStubProps {
  ticket: TicketDetails;
  onDone: () => void;
}

export function TicketStub({ ticket, onDone }: TicketStubProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
=====================================================
CALIBRATIONS 2026–2027 • OFFICIAL CINEMA ENTRY PASS
ADMIT ONE
=====================================================
EVENT               : ${ticket.eventName}
CATEGORY            : ${ticket.category}
REGISTRATION NUMBER : ${ticket.registrationNumber}
VENUE               : ${ticket.venue}
DATE & TIME         : ${formatDate(ticket.startTime)} at ${formatTime(ticket.startTime)}

PARTICIPANT DETAILS:
NAME                : ${ticket.name}
EMAIL               : ${ticket.email}
PHONE               : ${ticket.phone}
BRANCH / YEAR       : ${ticket.department} (${ticket.year})
COLLEGE             : ${ticket.college || "Sri Venkateswara College of Engineering (SVCE)"}
${ticket.members && ticket.members.length > 0 ? `SQUAD CREW          : ${ticket.members.map((m) => m.name).join(", ")}` : ""}

ENTRY PROTOCOL:
1. Present registration code at auditorium gates.
2. Report 15 minutes before call time.
3. Zero admission charge for students. Enjoy the show!
=====================================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${ticket.registrationNumber}-TICKET.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto py-2">
      {/* Confirmation Stamped Notice */}
      <div className="px-4 py-1.5 bg-cinema-black text-cinema-paper border-2 border-cinema-black font-mono text-xs uppercase font-bold tracking-widest mb-6 shadow-hard flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400" />
        <span>REGISTRATION CONFIRMED • PASS ISSUED</span>
      </div>

      {/* Physical Cinema Ticket on Old Paper with Perforations */}
      <div
        ref={ticketRef}
        className="w-full bg-cinema-paper text-cinema-black border-4 border-cinema-black shadow-hard-lg overflow-hidden relative"
      >
        {/* Top Ticket Header */}
        <div className="bg-cinema-black text-cinema-paper px-6 py-3 border-b-2 border-cinema-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cinema-gold" />
            <div>
              <span className="font-poster text-2xl tracking-wider uppercase block leading-none">
                CALIBRATIONS 2026–2027
              </span>
              <span className="text-[9px] font-mono text-cinema-gold uppercase tracking-widest block">
                SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE)
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] text-cinema-gold uppercase font-bold">
            1ST YEAR ADMISSION
          </span>
        </div>

        {/* Perforated Notches on Left and Right */}
        <div className="relative p-6 sm:p-8">
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-cinema-black border-r-2 border-cinema-black" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-cinema-black border-l-2 border-cinema-black" />

          {/* Event & Pass ID */}
          <div className="text-center pb-5 border-b-2 border-dashed border-cinema-black/40">
            <span className="font-mono text-xs tracking-[0.25em] text-cinema-maroon uppercase font-bold">
              EVENT: {ticket.category}
            </span>
            <h2 className="font-poster text-4xl sm:text-5xl font-black uppercase tracking-tight text-cinema-black mt-1 leading-none">
              {ticket.eventName}
            </h2>

            <div className="mt-4 inline-block px-5 py-2 bg-cinema-black text-cinema-paper border-2 border-cinema-black shadow-hard">
              <span className="text-[9px] font-mono uppercase block text-cinema-paper/70">
                REGISTRATION NUMBER
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black tracking-[0.2em] text-cinema-gold">
                {ticket.registrationNumber}
              </span>
            </div>
          </div>

          {/* Ticket Information */}
          <div className="grid grid-cols-2 gap-4 py-5 border-b-2 border-dashed border-cinema-black/40 text-xs font-mono">
            <div>
              <span className="text-cinema-black/60 font-bold block">PARTICIPANT:</span>
              <span className="font-poster text-2xl uppercase font-black text-cinema-black leading-tight block">
                {ticket.name}
              </span>
              <span className="text-[11px] block">{ticket.department}</span>
              <span className="text-[11px] block font-bold text-cinema-red">{ticket.year} (Freshers Exclusive)</span>
            </div>

            <div>
              <span className="text-cinema-black/60 font-bold block">VENUE &amp; CALL:</span>
              <span className="font-poster text-xl uppercase font-bold text-cinema-black block">
                {ticket.venue}
              </span>
              <span className="text-[11px] block font-bold text-cinema-red">
                {formatDate(ticket.startTime)} at {formatTime(ticket.startTime)}
              </span>
              <span className="text-[10px] block text-cinema-maroon font-bold mt-1">
                SECTOR: MAIN AUDITORIUM PIT
              </span>
            </div>

            {ticket.members && ticket.members.length > 0 && (
              <div className="col-span-2 pt-2 border-t border-cinema-black/20">
                <span className="text-cinema-black/60 font-bold block">SQUAD CREW:</span>
                <span className="text-xs font-bold text-cinema-black">
                  {ticket.members.map((m) => m.name).join(", ")}
                </span>
              </div>
            )}
          </div>

          {/* Barcode & Seal Footer */}
          <div className="pt-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="h-8 flex items-center gap-[2px]">
                {[5, 2, 6, 2, 4, 7, 2, 6, 3, 2, 5, 8, 2, 4, 2, 5, 6, 2, 4, 6, 2, 4].map((w, i) => (
                  <div key={i} className="bg-cinema-black h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
              <span className="text-[9px] font-mono text-cinema-black/70 tracking-widest font-bold">
                AUTH #{ticket.registrationNumber}
              </span>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 border-2 border-cinema-red text-cinema-red font-poster text-sm font-black uppercase">
                VALID TICKET PASS
              </span>
              <span className="block text-[8px] font-mono text-cinema-black/60 mt-0.5">
                NON-TRANSFERABLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: DOWNLOAD TICKET and BACK TO EVENTS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full">
        <button
          onClick={handlePrint}
          className="flex-1 py-3 px-4 bg-cinema-paper text-cinema-black border-2 border-cinema-black hover:bg-[#E2D2B0] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-hard transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT PASS</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex-1 py-3 px-4 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper border-2 border-cinema-black text-xs font-poster text-xl tracking-wider uppercase flex items-center justify-center gap-2 shadow-hard transition-transform active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Download className="w-4 h-4 text-cinema-gold" />
          <span>DOWNLOAD TICKET</span>
        </button>

        <button
          onClick={onDone}
          className="w-full sm:w-auto py-3 px-4 border-2 border-cinema-border text-cinema-paper/70 hover:text-cinema-paper text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors mt-2 sm:mt-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO EVENTS</span>
        </button>
      </div>
    </div>
  );
}
