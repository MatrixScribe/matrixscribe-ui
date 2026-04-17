"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EntityQuickSwitcher({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Fake list for now — replace with backend search later
  const entities = ["israel", "iran", "south-africa", "usa", "china", "russia"];

  const filtered = entities.filter((e) =>
    e.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-32">
      <div className="w-full max-w-lg bg-surface border border-surface-border rounded-xl shadow-xl">
        <input
          autoFocus
          placeholder="Search entities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-surface-muted border-b border-surface-border text-sm outline-none"
        />

        <div className="max-h-80 overflow-y-auto">
          {filtered.map((slug) => (
            <button
              key={slug}
              onClick={() => {
                router.push(`/entity/${slug}`);
                onClose();
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-surface-muted"
            >
              {slug}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
