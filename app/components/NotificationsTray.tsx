"use client";

import { useState, useRef, useEffect } from "react";

export default function NotificationsTray() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    { id: 1, title: "New entity alert", body: "Risk spike detected for IRAN over last 24h." },
    { id: 2, title: "Dataset updated", body: "MENA news feed refreshed with 1,204 new articles." },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-charcoal-light hover:text-charcoal"
      >
        🔔
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-surface border border-surface-border rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-4 py-2 border-b border-surface-border text-xs font-medium text-charcoal">
            Notifications
          </div>
          <div className="max-h-80 overflow-y-auto text-sm">
            {items.map((n) => (
              <div key={n.id} className="px-4 py-3 hover:bg-surface-muted">
                <div className="font-medium text-charcoal">{n.title}</div>
                <div className="text-charcoal-light text-xs mt-1">{n.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
