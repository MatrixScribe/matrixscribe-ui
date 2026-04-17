"use client";

/* ENTITY COMPONENT */

import React from "react";

interface TopicHeatmapProps {
  entity: any;
}

const safeArray = (v: any) => (Array.isArray(v) ? v : []);

export default function TopicHeatmap({ entity }: TopicHeatmapProps) {
  const topics = safeArray(entity?.topics);

  if (topics.length === 0) {
    return (
      <div
        className="
          h-40 rounded-lg
          bg-gradient-to-b from-sandstone/60 to-sandstone/40
          dark:from-neutral-900/70 dark:to-neutral-900/50
          border border-black/5 dark:border-white/5
          shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
          backdrop-blur-sm
          flex items-center justify-center
          text-[12px] text-charcoal-light
        "
      >
        No topic data available
      </div>
    );
  }

  const maxCount = Math.max(...topics.map((t: any) => t.count || 1));

  const top = topics.slice(0, 16).map((t: any, idx: number) => ({
    label: t.name || t.topic || `T${idx + 1}`,
    score: maxCount > 0 ? (t.count || 0) / maxCount : 0,
  }));

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
        Topic heatmap
      </div>

      <div className="grid grid-cols-4 gap-[var(--space-1)]">
        {top.map((t) => {
          const v = Math.max(0, Math.min(1, t.score));
          const bg = `rgba(56, 189, 248, ${0.15 + v * 0.7})`;

          return (
            <div
              key={t.label}
              className="
                rounded-md px-2 py-2
                text-[11px] leading-tight
                text-slate-900 dark:text-slate-50
                shadow-[var(--shadow-xs)] dark:shadow-[var(--shadow-xs-dark)]
                border border-black/5 dark:border-white/5
                backdrop-blur-sm
              "
              style={{ backgroundColor: bg }}
            >
              <div className="truncate">{t.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
