"use client";

/* ENTITY COMPONENT */

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line } from "recharts";

export default function VolumeVelocity({
  count24h,
  count7d,
  velocity,
  diversity,
}: {
  count24h: number;
  count7d: number;
  velocity: number;
  diversity: number;
}) {
  const sparkData = [
    { name: "24h", value: count24h },
    { name: "7d", value: count7d },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Volume & Velocity
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-2)]">
        <Metric label="Articles (24h)" value={count24h} />
        <Metric label="Articles (7d)" value={count7d} />
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-2)]">
        <Metric label="Velocity" value={velocity.toFixed(2)} />
        <Metric label="Diversity" value={diversity.toFixed(2)} />
      </div>

      {/* Micro Sparkline */}
      <ChartContainer height={40}>
        <LineChart data={sparkData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: any }) {
  return (
    <div
      className="
        rounded-md p-3 space-y-[var(--space-1)]
        bg-gradient-to-b from-sandstone/60 to-sandstone/40
        dark:from-neutral-900/70 dark:to-neutral-900/50
        border border-black/5 dark:border-white/5
        shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
        backdrop-blur-sm
      "
    >
      <span className="text-xs text-charcoal-light">{label}</span>
      <span className="text-lg font-semibold text-charcoal">{value}</span>
    </div>
  );
}
