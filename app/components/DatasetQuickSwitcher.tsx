"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DatasetQuickSwitcher({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Replace with backend dataset list later
  const datasets = ["global-news", "mena-risk", "energy-incidents", "fx-signals"];

  const filtered = datasets.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
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
          placeholder="Search datasets…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-surface-muted border-b border-surface-border text-sm outline-none"
        />

        <div className="max-h-80 overflow-y-auto">
          {filtered.map((id) => (
            <button
              key={id}
              onClick={() => {
                router.push(`/datasets/${id}`);
                onClose();
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-surface-muted"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
