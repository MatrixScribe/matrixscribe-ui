"use client";

/* ENTITY COMPONENT */

import React from "react";

export default function SentimentDrivers({ entity }: any) {
  if (!entity || typeof entity !== "object") return null;

  const raw = entity.drivers;

  const drivers = Array.isArray(raw)
    ? raw.map((d) => (typeof d === "string" ? d : String(d ?? "")))
    : [
        "Policy commentary",
        "Market volatility",
        "Regional economic updates",
      ];

  return (
    <div className="space-y-[var(--space-2)]">
      <div
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        Sentiment drivers
      </div>

      <div className="space-y-[var(--space-1)]">
        {drivers.map((d: string, i: number) => (
          <div
            key={i}
            className="
              rounded-md p-3
              text-[13px] leading-relaxed text-charcoal-mid
              bg-gradient-to-b from-sandstone/60 to-sandstone/40
              dark:from-neutral-900/70 dark:to-neutral-900/50
              border border-black/5 dark:border-white/5
              shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
              backdrop-blur-sm
            "
          >
            {d || "—"}
          </div>
        ))}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        Drivers highlight the factors most responsible for sentiment movement.
      </p>
    </div>
  );
}
