"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { formatTime, formatDate } from "@/lib/utils";

interface RateLimitViolation {
  id: string;
  endpoint: string;
  ipHash: string;
  eventId?: string | null;
  requestCount: number;
  blockedAt: string;
  reason?: string | null;
}

export function RateLimitMonitor() {
  const [logs, setLogs] = useState<RateLimitViolation[]>([]);
  const [totalViolations, setTotalViolations] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/rate-limits");
      const data = await res.json();
      if (res.ok) {
        setLogs(data.logs || []);
        setTotalViolations(data.totalViolations || 0);
      }
    } catch (err) {
      console.error("Failed to fetch rate limit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-[#141210] p-6 border border-cinema-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cinema-red text-xs font-mono uppercase tracking-wider font-bold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>API ABUSE &amp; RATE LIMIT SURVEILLANCE</span>
          </div>
          <h2 className="font-headline text-2xl font-bold uppercase text-cinema-cream tracking-wide">
            RATE LIMIT LOGS &amp; DDOS TELEMETRY
          </h2>
          <p className="text-xs font-mono text-cinema-paper/60 mt-1">
            Enforcing a threshold of 10 requests / 10 minutes per client hash. IPs are SHA-256 anonymized for GDPR and student privacy compliance.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-mono text-cinema-paper/60 block">TOTAL BLOCKS</span>
            <span className="font-headline text-3xl font-bold text-cinema-cream">
              {totalViolations}
            </span>
          </div>

          <button
            onClick={fetchLogs}
            disabled={loading}
            className="p-2.5 border border-cinema-border text-cinema-paper hover:text-cinema-gold hover:border-cinema-gold transition-colors"
            title="Refresh logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#141210] border border-cinema-border overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-cinema-border text-cinema-paper/60 bg-cinema-black/40">
              <th className="p-4">BLOCKED AT</th>
              <th className="p-4">TARGET ENDPOINT</th>
              <th className="p-4">CLIENT IP HASH</th>
              <th className="p-4">REQUEST BURST</th>
              <th className="p-4">ACTION TAKEN</th>
              <th className="p-4 text-right">REASON</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cinema-border/50">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-cinema-paper/50 font-typewriter">
                  {loading
                    ? "Loading telemetry..."
                    : "No rate limit violations logged. Normal operating conditions."}
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-cinema-black/30">
                  <td className="p-4 text-cinema-paper/70">
                    <div>{formatDate(log.blockedAt)}</div>
                    <div className="text-[10px] text-cinema-paper/40">{formatTime(log.blockedAt)}</div>
                  </td>
                  <td className="p-4 font-semibold text-cinema-cream">
                    {log.endpoint}
                  </td>
                  <td className="p-4 text-cinema-gold font-mono">
                    <span className="px-2 py-0.5 border border-cinema-border bg-cinema-black">
                      {log.ipHash}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-amber-400">
                      {log.requestCount} attempts
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-cinema-red bg-cinema-maroon/50 text-cinema-cream text-[10px] font-bold uppercase">
                      HTTP 429 REJECTED
                    </span>
                  </td>
                  <td className="p-4 text-right text-cinema-paper/60 text-[11px]">
                    {log.reason || "Exceeded request velocity limit"}
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
