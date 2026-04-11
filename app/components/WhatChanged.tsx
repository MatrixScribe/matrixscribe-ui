import React from "react";

export default function WhatChanged({ entity }: any) {
  if (!entity || typeof entity !== "object") return null;

  // Ensure changes is ALWAYS an array of strings
  const raw = entity.changes;
  const changes = Array.isArray(raw)
    ? raw.map((c) => (typeof c === "string" ? c : String(c ?? "")))
    : [
        "Spike in monetary policy coverage",
        "Shift in tone from major financial outlets",
        "Increase in regional commentary",
      ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        What changed (72h)
      </div>

      <div className="space-y-2">
        {changes.map((c: string, i: number) => (
          <div
            key={i}
            className="bg-sandstone dark:bg-surface rounded-md p-3 text-sm text-charcoal-mid"
          >
            {c || "—"}
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Highlights the most meaningful narrative shifts over the past 72 hours.
      </p>
    </div>
  );
}
