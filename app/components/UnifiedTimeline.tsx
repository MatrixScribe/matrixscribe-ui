"use client";

/* ENTITY COMPONENT */

import React from "react";
import ChartContainer from "@/app/components/ChartContainer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface UnifiedTimelineProps {
  entity: any;
}

const safeArray = (v: any) => (Array.isArray(v) ? v : []);

export default function UnifiedTimeline({ entity }: UnifiedTimelineProps) {
  if (!entity) return null;

  const timeline =
    safeArray(entity.timeline) ||
    safeArray(entity.sentiment_timeline) ||
    [];

  if (timeline.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-charcoal-light text-sm bg-sandstone/40 dark:bg-neutral-900/40 rounded-md">
        No timeline data available
      </div>
    );
  }

  const data = timeline.map((t: any) => ({
    date: t.date || t.timestamp || "",
    sentiment: typeof t.avg_score === "number" ? t.avg_score : t.value ?? 0,
    volume: typeof t.volume === "number" ? t.volume : t.count ?? 0,
    risk: typeof t.risk === "number" ? t.risk : 0,
  }));

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Unified timeline
      </div>

      <ChartContainer height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            yAxisId="left"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
            }}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sentiment"
            stroke="#16A34A"
            strokeWidth={2}
            dot={false}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="volume"
            stroke="#3B82F6"
            strokeWidth={1.5}
            dot={false}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="risk"
            stroke="#DC2626"
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ChartContainer>

      <p className="text-xs text-charcoal-light leading-relaxed">
        A combined timeline of sentiment, volume, and risk across recent
        coverage.
      </p>
    </div>
  );
}
