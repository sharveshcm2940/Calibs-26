"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, User, AlertCircle, ArrowLeft, Loader2, Clapperboard } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setErrorMessage("Network error connecting to auth server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0908] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#C69A45_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cinema-red/10 blur-3xl pointer-events-none" />

      {/* Back to Public Site Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-cinema-paper/60 hover:text-cinema-gold transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO PUBLIC PORTAL</span>
      </Link>

      {/* Admin Login Card */}
      <div className="relative w-full max-w-md bg-cinema-charcoal border-4 border-cinema-black shadow-hard-lg p-8 sm:p-10">
        {/* Card Header */}
        <div className="text-center pb-6 border-b border-cinema-border mb-6">
          <div className="w-12 h-12 border-2 border-cinema-black bg-cinema-maroon mx-auto flex items-center justify-center mb-3 shadow-hard">
            <Shield className="w-6 h-6 text-cinema-gold" />
          </div>
          <h1 className="font-poster text-4xl font-black uppercase text-cinema-paper tracking-wider">
            DIRECTOR DESK
          </h1>
          <span className="text-[10px] font-mono tracking-[0.25em] text-cinema-gold uppercase block mt-1 font-bold">
            SECURE ACCESS • CALIBRATIONS 2026
          </span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-cinema-maroon border-2 border-cinema-red text-cinema-paper text-xs font-mono flex items-start gap-2.5 shadow-hard">
            <AlertCircle className="w-4 h-4 text-cinema-gold shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-cinema-gold uppercase tracking-wider mb-1.5 font-bold">
              USERNAME / EMAIL
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cinema-paper/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cinema-black border-2 border-cinema-border focus:border-cinema-gold text-cinema-paper text-sm font-sans outline-none placeholder:text-cinema-paper/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cinema-gold uppercase tracking-wider mb-1.5 font-bold">
              PASSCODE
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cinema-paper/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cinema-black border-2 border-cinema-border focus:border-cinema-gold text-cinema-paper text-sm font-sans outline-none placeholder:text-cinema-paper/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-cinema-red hover:bg-cinema-maroon text-cinema-paper font-poster font-black text-xl tracking-widest uppercase border-2 border-cinema-black flex items-center justify-center gap-2 shadow-hard transition-transform active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 text-cinema-gold animate-spin" />
                <span>VERIFYING CREDENTIALS...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-cinema-gold" />
                <span>ENTER CONSOLE</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Tip */}
        <div className="mt-8 pt-4 border-t border-cinema-border/50 text-center">
          <p className="text-[11px] font-mono text-cinema-paper/60">
            DEFAULT SEED CREDENTIALS:
          </p>
          <p className="text-xs font-mono text-cinema-gold mt-1">
            admin / calibrations2026!
          </p>
        </div>
      </div>
    </div>
  );
}
