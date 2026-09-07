import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function getStatusColor(status: "OPEN" | "LIMITED" | "ALMOST_FULL" | "HOUSEFULL" | "CLOSED") {
  switch (status) {
    case "OPEN":
      return "border-emerald-700/60 bg-emerald-950/40 text-emerald-300";
    case "LIMITED":
      return "border-amber-700/60 bg-amber-950/40 text-amber-300";
    case "ALMOST_FULL":
      return "border-orange-700/60 bg-orange-950/40 text-orange-300";
    case "HOUSEFULL":
      return "border-cinema-red/80 bg-cinema-maroon/60 text-cinema-cream";
    case "CLOSED":
      return "border-neutral-700 bg-neutral-900 text-neutral-400";
  }
}
