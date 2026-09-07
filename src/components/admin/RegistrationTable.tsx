"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Download, Filter, RefreshCw, Users } from "lucide-react";
import { formatTime, formatDate } from "@/lib/utils";

interface RegistrationItem {
  id: string;
  registrationNumber: string;
  eventId: string;
  eventName: string;
  eventCategory: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  college?: string | null;
  membersCount: number;
  members: Array<{ name: string; email?: string | null; phone?: string | null }>;
  createdAt: string;
}

interface RegistrationTableProps {
  events: Array<{ id: string; name: string }>;
}

export function RegistrationTable({ events }: RegistrationTableProps) {
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedEventId !== "ALL") params.append("eventId", selectedEventId);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/admin/registrations?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setRegistrations(data.registrations || []);
      }
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedEventId, searchQuery]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleExportCsv = () => {
    const url = `/api/admin/registrations/export${
      selectedEventId !== "ALL" ? `?eventId=${selectedEventId}` : ""
    }`;
    window.location.href = url;
  };

  return (
    <div className="space-y-6">
      {/* Search & Export Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#141210] p-6 border border-cinema-border">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cinema-paper/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, email, phone, branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cinema-black border border-cinema-border focus:border-cinema-gold text-cinema-cream text-xs font-mono outline-none"
            />
          </div>

          {/* Event Filter Dropdown */}
          <div className="w-full sm:w-64">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3 py-2 bg-cinema-black border border-cinema-border focus:border-cinema-gold text-cinema-cream text-xs font-mono outline-none"
            >
              <option value="ALL">All Shows &amp; Events</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchRegistrations()}
            disabled={loading}
            className="p-2 border border-cinema-border text-cinema-paper hover:text-cinema-gold hover:border-cinema-gold transition-colors"
            title="Refresh table"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-cinema-red hover:bg-cinema-crimson border border-cinema-gold text-cinema-cream font-headline font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-cinema-gold" />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-[#141210] border border-cinema-border overflow-x-auto">
        <div className="p-4 border-b border-cinema-border flex items-center justify-between text-xs font-mono text-cinema-paper/70">
          <span>SHOWING {registrations.length} REGISTERED PASSES</span>
          <span>FILTER: {selectedEventId === "ALL" ? "ALL SHOWS" : "FILTERED"}</span>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-cinema-border text-cinema-paper/60 bg-cinema-black/40">
              <th className="p-4">PASS ID</th>
              <th className="p-4">LEAD PARTICIPANT</th>
              <th className="p-4">SHOW / EVENT</th>
              <th className="p-4">CONTACT</th>
              <th className="p-4">DEPARTMENT &amp; YR</th>
              <th className="p-4">SQUAD</th>
              <th className="p-4 text-right">DATE / TIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cinema-border/50">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-cinema-paper/50 font-typewriter">
                  {loading ? "Loading registrations..." : "No registrations found matching criteria."}
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-cinema-black/30">
                  <td className="p-4 text-cinema-gold font-bold">
                    {reg.registrationNumber}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-cinema-cream block">{reg.name}</span>
                    <span className="text-[10px] text-cinema-paper/60 block">{reg.college}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-cinema-cream block">{reg.eventName}</span>
                    <span className="text-[10px] text-cinema-gold uppercase block">{reg.eventCategory}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-cinema-paper/90 block">{reg.email}</span>
                    <span className="text-[10px] text-cinema-paper/60 block">{reg.phone}</span>
                  </td>
                  <td className="p-4 text-cinema-paper/80">
                    <span className="block">{reg.department}</span>
                    <span className="text-[10px] text-cinema-paper/60 block">{reg.year}</span>
                  </td>
                  <td className="p-4">
                    {reg.membersCount > 0 ? (
                      <span className="px-2 py-0.5 border border-cinema-border text-[10px] text-cinema-gold">
                        +{reg.membersCount} crew
                      </span>
                    ) : (
                      <span className="text-cinema-paper/40 text-[10px]">Solo</span>
                    )}
                  </td>
                  <td className="p-4 text-right text-cinema-paper/60">
                    <div>{formatDate(reg.createdAt)}</div>
                    <div className="text-[10px] text-cinema-paper/40">{formatTime(reg.createdAt)}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
