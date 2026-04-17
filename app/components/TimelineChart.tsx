"use client";

/* ENTITY COMPONENT */

import React from "react";

interface TimelineChartProps {
  data: { timestamp: string; value: number }[];
  confidence?: number;
}

export default function TimelineChart({ data, confidence }: TimelineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Timeline will render here
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Sentiment timeline
      </div>

      <div className="h-64 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-charcoal-light text-sm">
        Timeline chart placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        This timeline tracks sentiment over time. Confidence:{" "}
        {confidence !== undefined ? `${(confidence * 100).toFixed(0)}%` : "—"}.
        Replace with a real chart when ready.
      </p>
    </div>
  );
}
