"use client";

/* ENTITY COMPONENT */

import React from "react";

interface PublisherBreakdownProps {
  publishers: { name: string; count: number }[] | Record<string, number>;
}

function normalizePublishers(raw: any) {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw
      .map((p: any) => ({
        name: p?.name ?? "Unknown",
        count: typeof p?.count === "number" ? p.count : 0,
      }))
      .filter((p) => p.count > 0);
  }

  if (typeof raw === "object") {
    return Object.entries(raw)
      .map(([name, value]) => ({
        name,
        count: typeof value === "number" ? value : 0,
      }))
      .filter((p) => p.count > 0);
  }

  return [];
}

export default function PublisherBreakdown({ publishers }: PublisherBreakdownProps) {
  const normalized = normalizePublishers(publishers);
  const sorted = normalized.sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, 6);

  if (top.length === 0) {
    return (
      <div
        className="
          h-32 flex items-center justify-center
          text-[13px] text-charcoal-light
        "
      >
        No publisher data available
      </div>
    );
  }

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
        Publisher breakdown
      </div>

      <div className="space-y-[var(--space-1)]">
        {top.map((p, i) => (
          <div
            key={i}
            className="
              flex items-center justify-between
              text-[13px] leading-tight
            "
          >
            <span className="text-charcoal-mid dark:text-neutral-200">
              {p.name}
            </span>

            <span
              className="
                text-[11px]
                tracking-wide
                text-charcoal-light dark:text-neutral-500
              "
            >
              {p.count}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        Shows which publishers are driving coverage for this entity.
      </p>
    </div>
  );
}
