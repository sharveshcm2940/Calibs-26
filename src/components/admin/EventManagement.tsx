"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Power, Check, X, AlertCircle } from "lucide-react";

interface EventManagementProps {
  events: any[];
  onRefresh: () => void;
}

export function EventManagement({ events, onRefresh }: EventManagementProps) {
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [capacityInput, setCapacityInput] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick capacity edit start
  const handleStartEdit = (event: any) => {
    setEditingEventId(event.id);
    setCapacityInput(event.capacity);
    setErrorMsg(null);
  };

  // Quick capacity edit save
  const handleSaveCapacity = async (eventId: string) => {
    setIsUpdating(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capacity: Number(capacityInput) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message || "Failed to update capacity");
        setIsUpdating(false);
        return;
      }
      setEditingEventId(null);
      onRefresh();
    } catch {
      setErrorMsg("Network error updating capacity");
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle registration open / closed
  const handleToggleRegistration = async (eventId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationOpen: !currentStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to toggle registration:", err);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId: string, eventName: string) => {
    if (!confirm(`Are you sure you want to delete the event '${eventName}'? This will delete associated registrations.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141210] p-6 border border-cinema-border">
        <div>
          <h2 className="font-headline text-2xl font-bold uppercase text-cinema-cream tracking-wide">
            EVENT MANAGEMENT &amp; CAPACITY CONTROL
          </h2>
          <p className="text-xs font-mono text-cinema-paper/60 mt-1">
            Adjust auditorium limits dynamically. Reducing capacity below current registrations triggers immediate HOUSEFULL status.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-cinema-maroon border border-cinema-red text-cinema-cream text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-cinema-gold" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-[#141210] border border-cinema-border overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-cinema-border text-cinema-paper/60 bg-cinema-black/40">
              <th className="p-4">EVENT NAME</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">VENUE</th>
              <th className="p-4">CAPACITY LIMIT</th>
              <th className="p-4">REGISTERED</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cinema-border/50">
            {events.map((ev) => {
              const isEditing = editingEventId === ev.id;
              const isHousefull = ev.registered >= ev.capacity;

              return (
                <tr key={ev.id} className="hover:bg-cinema-black/30">
                  <td className="p-4 font-semibold text-cinema-cream">
                    {ev.name}
                  </td>
                  <td className="p-4 text-cinema-gold">{ev.category}</td>
                  <td className="p-4 text-cinema-paper/80">{ev.venue}</td>

                  {/* Capacity editable inline */}
                  <td className="p-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="1"
                          value={capacityInput}
                          onChange={(e) => setCapacityInput(parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 bg-cinema-black border border-cinema-gold text-cinema-cream text-xs font-mono outline-none"
                        />
                        <button
                          onClick={() => handleSaveCapacity(ev.id)}
                          disabled={isUpdating}
                          className="p-1 text-emerald-400 hover:bg-emerald-950 border border-emerald-700"
                          title="Save capacity"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingEventId(null)}
                          className="p-1 text-cinema-red hover:bg-cinema-maroon border border-cinema-border"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-cinema-cream font-bold">{ev.capacity}</span>
                        <button
                          onClick={() => handleStartEdit(ev)}
                          className="text-cinema-gold/70 hover:text-cinema-gold"
                          title="Edit capacity"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="p-4 text-cinema-cream font-bold">
                    {ev.registered}
                  </td>

                  {/* Live Status Badge */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 border text-[10px] font-bold uppercase ${
                        !ev.registrationOpen
                          ? "border-neutral-700 bg-neutral-900 text-neutral-400"
                          : isHousefull
                          ? "border-cinema-red bg-cinema-maroon/60 text-cinema-cream"
                          : "border-emerald-600 bg-emerald-950/60 text-emerald-300"
                      }`}
                    >
                      {!ev.registrationOpen ? "CLOSED" : isHousefull ? "HOUSEFULL" : "OPEN"}
                    </span>
                  </td>

                  {/* Actions (Toggle Registration Open/Close, Delete) */}
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleRegistration(ev.id, ev.registrationOpen)}
                      className={`px-2.5 py-1 border text-[10px] uppercase font-bold tracking-wider ${
                        ev.registrationOpen
                          ? "border-amber-700 text-amber-300 hover:bg-amber-950"
                          : "border-emerald-700 text-emerald-300 hover:bg-emerald-950"
                      }`}
                      title="Toggle registration open or closed"
                    >
                      {ev.registrationOpen ? "PAUSE REG" : "OPEN REG"}
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.name)}
                      className="p-1.5 border border-cinema-border text-cinema-red hover:bg-cinema-maroon/40"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
