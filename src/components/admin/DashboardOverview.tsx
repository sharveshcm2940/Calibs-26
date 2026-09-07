"use client";

import React from "react";
import { Users, Ticket, CheckCircle2, AlertTriangle, ShieldAlert, BarChart3, Clock } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface DashboardOverviewProps {
  metrics: {
    totalRegistrations: number;
    registrationsToday: number;
    totalEvents: number;
    openEvents: number;
    almostFullEvents: number;
    housefullEvents: number;
    totalCapacity: number;
    overallPercentage: number;
    totalRateLimitBlocks: number;
  };
  events: Array<{
    id: string;
    name: string;
    category: string;
    capacity: number;
    registered: number;
    remaining: number;
    status: string;
    fillRate: number;
  }>;
  recentRegistrations: Array<{
    id: string;
    registrationNumber: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    year: string;
    eventName: string;
    eventCategory: string;
    createdAt: string;
  }>;
}

export function DashboardOverview({
  metrics,
  events,
  recentRegistrations,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Registrations */}
        <div className="bg-[#141210] border border-cinema-border p-5">
          <div className="flex items-center justify-between text-cinema-paper/60 text-xs font-mono mb-2">
            <span>TOTAL REGISTRATIONS</span>
            <Users className="w-4 h-4 text-cinema-gold" />
          </div>
          <div className="font-headline text-4xl font-bold text-cinema-cream">
            {metrics.totalRegistrations}
          </div>
          <div className="text-[11px] font-mono text-cinema-gold mt-2">
            +{metrics.registrationsToday} logged today
          </div>
        </div>

        {/* Overall Capacity Fill */}
        <div className="bg-[#141210] border border-cinema-border p-5">
          <div className="flex items-center justify-between text-cinema-paper/60 text-xs font-mono mb-2">
            <span>AUDITORIUM FILL RATE</span>
            <BarChart3 className="w-4 h-4 text-cinema-gold" />
          </div>
          <div className="font-headline text-4xl font-bold text-cinema-cream">
            {metrics.overallPercentage}%
          </div>
          <div className="text-[11px] font-mono text-cinema-paper/70 mt-2">
            {metrics.totalRegistrations} / {metrics.totalCapacity} total seats filled
          </div>
        </div>

        {/* Housefull Events */}
        <div className="bg-[#141210] border border-cinema-border p-5">
          <div className="flex items-center justify-between text-cinema-paper/60 text-xs font-mono mb-2">
            <span>HOUSEFULL SHOWS</span>
            <AlertTriangle className="w-4 h-4 text-cinema-red" />
          </div>
          <div className="font-headline text-4xl font-bold text-cinema-red">
            {metrics.housefullEvents}
          </div>
          <div className="text-[11px] font-mono text-cinema-paper/70 mt-2">
            {metrics.almostFullEvents} shows almost full (&lt;15% left)
          </div>
        </div>

        {/* Rate-Limit Blocks */}
        <div className="bg-[#141210] border border-cinema-border p-5">
          <div className="flex items-center justify-between text-cinema-paper/60 text-xs font-mono mb-2">
            <span>BLOCKED RATE-LIMITS</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-headline text-4xl font-bold text-cinema-cream">
            {metrics.totalRateLimitBlocks}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-2">
            DDoS protection active
          </div>
        </div>
      </div>

      {/* Registration Capacity Progress Table */}
      <div className="bg-[#141210] border border-cinema-border p-6">
        <div className="flex items-center justify-between pb-4 border-b border-cinema-border mb-6">
          <h3 className="font-headline text-xl font-bold uppercase text-cinema-cream tracking-wide">
            BOX OFFICE CAPACITY MONITOR
          </h3>
          <span className="text-xs font-mono text-cinema-gold">
            {metrics.openEvents} OF {metrics.totalEvents} SHOWS OPEN
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cinema-border text-cinema-paper/60">
                <th className="pb-3">EVENT NAME</th>
                <th className="pb-3">CATEGORY</th>
                <th className="pb-3">CAPACITY</th>
                <th className="pb-3">REGISTERED</th>
                <th className="pb-3">REMAINING</th>
                <th className="pb-3">FILL RATE</th>
                <th className="pb-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cinema-border/50">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-cinema-black/40">
                  <td className="py-3 font-semibold text-cinema-cream">{ev.name}</td>
                  <td className="py-3 text-cinema-gold">{ev.category}</td>
                  <td className="py-3 text-cinema-paper/80">{ev.capacity}</td>
                  <td className="py-3 text-cinema-cream font-bold">{ev.registered}</td>
                  <td className="py-3 text-cinema-paper/80">{ev.remaining}</td>
                  <td className="py-3 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-cinema-black border border-cinema-border overflow-hidden">
                        <div
                          className={`h-full ${
                            ev.status === "HOUSEFULL"
                              ? "bg-cinema-red"
                              : ev.fillRate > 80
                              ? "bg-amber-500"
                              : "bg-cinema-gold"
                          }`}
                          style={{ width: `${ev.fillRate}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{ev.fillRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-2 py-0.5 border text-[10px] font-bold uppercase ${
                        ev.status === "HOUSEFULL"
                          ? "border-cinema-red bg-cinema-maroon/40 text-cinema-red"
                          : ev.status === "ALMOST_FULL"
                          ? "border-amber-600 bg-amber-950/40 text-amber-300"
                          : "border-emerald-600 bg-emerald-950/40 text-emerald-300"
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Registrations Feed */}
      <div className="bg-[#141210] border border-cinema-border p-6">
        <div className="flex items-center justify-between pb-4 border-b border-cinema-border mb-6">
          <h3 className="font-headline text-xl font-bold uppercase text-cinema-cream tracking-wide">
            RECENT REGISTRATIONS DISPATCH
          </h3>
          <span className="text-xs font-mono text-cinema-paper/60">
            LATEST 10 TRANSACTIONS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cinema-border text-cinema-paper/60">
                <th className="pb-3">PASS ID</th>
                <th className="pb-3">PARTICIPANT</th>
                <th className="pb-3">EVENT</th>
                <th className="pb-3">DEPARTMENT</th>
                <th className="pb-3">YEAR</th>
                <th className="pb-3 text-right">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cinema-border/50">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-cinema-black/40">
                  <td className="py-3 text-cinema-gold font-bold">{reg.registrationNumber}</td>
                  <td className="py-3 text-cinema-cream">{reg.name}</td>
                  <td className="py-3 text-cinema-paper/90">{reg.eventName}</td>
                  <td className="py-3 text-cinema-paper/70">{reg.department}</td>
                  <td className="py-3 text-cinema-paper/70">{reg.year}</td>
                  <td className="py-3 text-right text-cinema-paper/50">
                    {formatTime(reg.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
