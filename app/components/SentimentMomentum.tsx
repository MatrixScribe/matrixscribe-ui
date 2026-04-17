"use client";

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useTimelineHover } from "@/app/store/useTimelineHover";
import Gridlines from "@/app/components/charts/Gridlines";
import UnifiedTooltip from "@/app/components/charts/UnifiedTooltip";

export default function SentimentMomentum({ entity }: any) {
  const hoverDate = useTimelineHover((s) => s.hoverDate);
  const setHoverDate = useTimelineHover((s) => s.setHoverDate);

  const momentum = Array.isArray(entity?.momentum)
    ? entity.momentum
    : [];

  const data = momentum.map((m: any, i: number) => ({
    date: m.date || `D${i + 1}`,
    value: m.value ?? 0,
  }));

  if (data.length === 0) {
    return (
      <div
        className="
          h-40 rounded-lg
          bg-gradient-to-b from-sandstone/60 to-sandstone/40
          dark:from-neutral-900/70 dark:to-neutral-900/50
          border border-black/5 dark:border-white/5
          shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
          backdrop-blur-sm
        "
      />
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
        Sentiment momentum
      </div>

      <ChartContainer height={180}>
        <LineChart
          data={data}
          onMouseMove={(state) => {
            if (state?.activeLabel) setHoverDate(state.activeLabel);
          }}
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* PREMIUM GRIDLINES */}
          <Gridlines />

          {/* MAIN MOMENTUM LINE */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={600}
            animationEasing="ease-out"
          />

          {/* SYNCED CROSSHAIR */}
          {hoverDate && (
            <Line
              type="monotone"
              dataKey={() => null}
              stroke="#000"
              strokeWidth={1}
              strokeDasharray="4 4"
              isAnimationActive={false}
            />
          )}

          <XAxis dataKey="date" hide />
          <YAxis hide />

          {/* UNIFIED TOOLTIP */}
          <Tooltip content={<UnifiedTooltip />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
