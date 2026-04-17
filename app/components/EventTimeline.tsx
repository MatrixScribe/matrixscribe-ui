"use client";

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useTimelineHover } from "@/app/store/useTimelineHover";
import Gridlines from "@/app/components/charts/Gridlines";
import UnifiedTooltip from "@/app/components/charts/UnifiedTooltip";

export default function EventTimeline({ entity }: any) {
  const hoverDate = useTimelineHover((s) => s.hoverDate);
  const setHoverDate = useTimelineHover((s) => s.setHoverDate);

  const events = Array.isArray(entity?.events) ? entity.events : [];

  const data = events.map((e: any, i: number) => ({
    date: e.date || `D${i + 1}`,
    value: e.intensity ?? 0,
  }));

  if (data.length === 0) {
    return <div className="h-40 bg-sandstone/40 rounded-lg" />;
  }

  return (
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

        {/* MAIN EVENT INTENSITY LINE (DRAW ANIMATION) */}
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

        {/* SYNCED CROSSHAIR (NO ANIMATION) */}
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
  );
}
