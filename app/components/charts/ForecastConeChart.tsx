"use client";

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import { AreaChart, Area, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useTimelineHover } from "@/app/store/useTimelineHover";
import Gridlines from "@/app/components/charts/Gridlines";
import UnifiedTooltip from "@/app/components/charts/UnifiedTooltip";

export default function ForecastConeChart({ data }: { data: any[] }) {
  const hoverDate = useTimelineHover((s) => s.hoverDate);
  const setHoverDate = useTimelineHover((s) => s.setHoverDate);

  if (!data || data.length === 0) {
    return <div className="h-40 rounded-lg bg-sandstone/40 dark:bg-neutral-800/40" />;
  }

  const chartData = data.map((d, i) => ({
    date: d.date || `D${i + 1}`,
    value: d.value ?? 0,
    lower: d.lower ?? d.value * 0.9,
    upper: d.upper ?? d.value * 1.1,
  }));

  return (
    <ChartContainer height={200}>
      <AreaChart
        data={chartData}
        onMouseMove={(state) => {
          if (state?.activeLabel) setHoverDate(state.activeLabel);
        }}
        onMouseLeave={() => setHoverDate(null)}
      >
        {/* SENTIMENT BANDS (FADE-IN ANIMATION) */}
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

        {/* FORECAST CONE (FADE-IN ANIMATION) */}
        <Area
          type="monotone"
          dataKey="upper"
          stroke="none"
          fill="rgba(14,165,233,0.25)"
          isAnimationActive={true}
          animationDuration={700}
          animationEasing="ease-out"
        />
        <Area
          type="monotone"
          dataKey="lower"
          stroke="none"
          fill="rgba(255,255,255,0.8)"
          isAnimationActive={true}
          animationDuration={700}
          animationEasing="ease-out"
        />

        {/* FORECAST LINE (DRAW ANIMATION) */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"
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
      </AreaChart>
    </ChartContainer>
  );
}
