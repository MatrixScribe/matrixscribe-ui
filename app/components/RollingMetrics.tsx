"use client";

/* ENTITY COMPONENT */

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line } from "recharts";

interface RollingMetricsProps {
  avg7: number | null | undefined;
  avg30: number | null | undefined;
  volatility: number | null | undefined;
  zscore: number | null | undefined;
}

export default function RollingMetrics({
  avg7,
  avg30,
  volatility,
  zscore,
}: RollingMetricsProps) {
  const safe = (v: any) =>
    typeof v === "number" && !isNaN(v) ? v : 0;

  const m7 = safe(avg7);
  const m30 = safe(avg30);
  const vol = safe(volatility);
  const z = safe(zscore);

  // Micro sparkline data
  const sparkData = [
    { name: "7d", value: m7 },
    { name: "30d", value: m30 },
    { name: "Vol", value: vol },
    { name: "Z", value: z },
  ];

  const items = [
    { label: "7‑day avg", value: m7 },
    { label: "30‑day avg", value: m30 },
    { label: "Volatility", value: vol },
    { label: "Z‑score", value: z },
  ];

  return (
    <div className="space-y-[var(--space-2)]">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Rolling sentiment metrics
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-2)]">
        {items.map((m, i) => (
          <div
            key={i}
            className="
              rounded-md p-3 space-y-[var(--space-1)]
              bg-gradient-to-b from-sandstone/60 to-sandstone/40
              dark:from-neutral-900/70 dark:to-neutral-900/50
              border border-black/5 dark:border-white/5
              shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
              backdrop-blur-sm
            "
          >
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              {m.label}
            </div>

            <div className="text-sm font-medium text-charcoal dark:text-neutral-100">
              {m.value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Micro Sparkline */}
      <ChartContainer height={40}>
        <LineChart data={sparkData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ChartContainer>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Rolling metrics smooth short‑term noise and highlight structural shifts
        in sentiment.
      </p>
    </div>
  );
}
