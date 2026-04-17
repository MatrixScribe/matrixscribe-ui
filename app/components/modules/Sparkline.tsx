"use client";

/* ENTITY COMPONENT */

import React from "react";
import Card from "@/app/components/Card";
import ChartContainer from "@/app/components/ChartContainer";
import { LineChart, Line, Tooltip } from "recharts";
import { sentimentColors } from "@/app/styles/sentimentColors";

export default function Sparkline({
  data,
  label,
}: {
  data: number[];
  label: string;
}) {
  const chartData = Array.isArray(data)
    ? data.map((value, index) => ({
        name: index.toString(),
        value: typeof value === "number" && !isNaN(value) ? value : 0,
      }))
    : [];

  return (
    <Card>
      <div className="text-xs text-charcoal-light mb-2">{label}</div>

      <ChartContainer height={80}>
        <LineChart data={chartData}>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={sentimentColors.positive}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
