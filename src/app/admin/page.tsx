"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  CalendarDays,
  Users,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { EventManagement } from "@/components/admin/EventManagement";
import { RegistrationTable } from "@/components/admin/RegistrationTable";
import { RateLimitMonitor } from "@/components/admin/RateLimitMonitor";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "registrations" | "rate-limits">("overview");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0908] flex items-center justify-center text-cinema-gold">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest">
            AUTHENTICATING DIRECTOR SESSION...
          </span>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0908] text-cinema-cream flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="bg-[#141210] border-b border-cinema-border sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-cinema-gold/60 bg-cinema-maroon/30 flex items-center justify-center">
            <Shield className="w-4 h-4 text-cinema-gold" />
          </div>
          <div>
            <h1 className="font-headline text-lg sm:text-xl font-bold uppercase tracking-wider text-cinema-cream leading-tight">
              CALIBRATIONS 2026 ADMIN CONSOLE
            </h1>
            <span className="text-[10px] font-mono text-cinema-gold tracking-widest uppercase block">
              DIRECTOR OF CULTURALS • SUPER ADMIN
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-cinema-border text-cinema-paper/70 hover:text-cinema-gold text-xs font-mono tracking-wider transition-colors"
          >
            <span>LIVE WEBSITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cinema-maroon/40 border border-cinema-red/60 text-cinema-cream hover:bg-cinema-red text-xs font-headline font-bold uppercase tracking-wider transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-cinema-gold" />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-cinema-border overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 py-3 px-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 transition-all shrink-0 ${
              activeTab === "overview"
                ? "border-cinema-gold text-cinema-gold bg-cinema-dark"
                : "border-transparent text-cinema-paper/60 hover:text-cinema-cream"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>OVERVIEW &amp; METRICS</span>
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 py-3 px-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 transition-all shrink-0 ${
              activeTab === "events"
                ? "border-cinema-gold text-cinema-gold bg-cinema-dark"
                : "border-transparent text-cinema-paper/60 hover:text-cinema-cream"
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>EVENT &amp; CAPACITY MGMT</span>
          </button>

          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 py-3 px-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 transition-all shrink-0 ${
              activeTab === "registrations"
                ? "border-cinema-gold text-cinema-gold bg-cinema-dark"
                : "border-transparent text-cinema-paper/60 hover:text-cinema-cream"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>REGISTRATIONS EXPLORER</span>
          </button>

          <button
            onClick={() => setActiveTab("rate-limits")}
            className={`flex items-center gap-2 py-3 px-5 font-headline font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 transition-all shrink-0 ${
              activeTab === "rate-limits"
                ? "border-cinema-gold text-cinema-gold bg-cinema-dark"
                : "border-transparent text-cinema-paper/60 hover:text-cinema-cream"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>RATE-LIMIT SURVEILLANCE</span>
          </button>
        </div>

        {/* Tab Content Render */}
        {activeTab === "overview" && (
          <DashboardOverview
            metrics={dashboardData.metrics}
            events={dashboardData.events}
            recentRegistrations={dashboardData.recentRegistrations}
          />
        )}

        {activeTab === "events" && (
          <EventManagement
            events={dashboardData.events}
            onRefresh={fetchDashboard}
          />
        )}

        {activeTab === "registrations" && (
          <RegistrationTable
            events={dashboardData.events.map((e: any) => ({ id: e.id, name: e.name }))}
          />
        )}

        {activeTab === "rate-limits" && <RateLimitMonitor />}
      </div>
    </div>
  );
}
