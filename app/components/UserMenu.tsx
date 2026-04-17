"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-charcoal-light hover:text-charcoal"
      >
        <User size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-surface-border rounded-lg shadow-lg overflow-hidden">
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-surface-muted flex items-center gap-2">
            <Settings size={16} /> Settings
          </button>

          <form action="/api/logout" method="POST">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-surface-muted flex items-center gap-2">
              <LogOut size={16} /> Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
