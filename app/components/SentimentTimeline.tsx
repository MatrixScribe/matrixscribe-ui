"use client";

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { AreaChart, Area, Line, Tooltip, XAxis, YAxis } from "recharts";
import { useTimelineHover } from "@/app/store/useTimelineHover";
import Gridlines from "@/app/components/charts/Gridlines";
import UnifiedTooltip from "@/app/components/charts/UnifiedTooltip";

export default function SentimentTimeline({ data }: { data: any[] }) {
  const hoverDate = useTimelineHover((s) => s.hoverDate);
  const setHoverDate = useTimelineHover((s) => s.setHoverDate);

  const safeData = Array.isArray(data)
    ? data.map((d) => ({
        date: d.date || "",
        value: typeof d.value === "number" ? d.value : 0,
      }))
    : [];

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
        Sentiment timeline
      </div>

      <ChartContainer height={220}>
        <AreaChart
          data={safeData}
          onMouseMove={(state) => {
            if (state?.activeLabel) setHoverDate(state.activeLabel);
          }}
          onMouseLeave={() => setHoverDate(null)}
        >
          {/* SENTIMENT BANDS */}
          <Area
            dataKey={() => 1}
            stroke="none"
            fill="rgba(220,38,38,0.08)"
            yAxisId="band"
            isAnimationActive={true}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Area
            dataKey={() => 0}
            stroke="none"
            fill="rgba(120,120,120,0.06)"
            yAxisId="band"
            isAnimationActive={true}
            animationDuration={700}
            animationEasing="ease-out"
          />
          <Area
            dataKey={() => -1}
            stroke="none"
            fill="rgba(34,197,94,0.08)"
            yAxisId="band"
            isAnimationActive={true}
            animationDuration={700}
            animationEasing="ease-out"
          />

          {/* PREMIUM GRIDLINES */}
          <Gridlines />

          {/* MAIN SENTIMENT LINE */}
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
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
