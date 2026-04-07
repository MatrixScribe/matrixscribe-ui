"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import Card from "@/app/components/card";
import { sentimentColors } from "@/app/styles/sentimentColors";

export default function Sparkline({
  data,
  label,
}: {
  data: number[];
  label: string;
}) {
  const chartData = data.map((value, index) => ({
    name: index.toString(),
    value,
  }));

  return (
    <Card>
      <div className="text-xs text-charcoal-light mb-2">{label}</div>
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={sentimentColors.positive}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
