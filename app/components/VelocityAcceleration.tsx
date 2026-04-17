"use client";

/* ENTITY COMPONENT */

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line } from "recharts";

export default function VelocityAcceleration({ entity }: any) {
  if (!entity) return null;

  const velocity = entity.velocity ?? 0;
  const acceleration = entity.acceleration ?? 0;

  // Micro sparkline data
  const sparkData = [
    { name: "v", value: velocity },
    { name: "a", value: acceleration },
  ];

  return (
    <div className="space-y-[var(--space-2)]">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Velocity & Acceleration
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-2)]">
        <Metric label="Velocity" value={velocity.toFixed(2)} />
        <Metric label="Acceleration" value={acceleration.toFixed(2)} />
      </div>

      {/* Micro Sparkline */}
      <ChartContainer height={40}>
        <LineChart data={sparkData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ChartContainer>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Velocity measures narrative speed. Acceleration shows whether the
        narrative is heating up or cooling down.
      </p>
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
