"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Card from "@/app/components/ui/Card";
import { sentimentColors } from "@/app/styles/sentimentColors";

export default function Sparkline({
  data,
}: {
  data: { date: string; sentiment: number }[];
}) {
  return (
    <Card>
      <div className="h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="sentiment"
              stroke={sentimentColors.positive}
              strokeWidth={2}
              dot={false}
              strokeLinecap="round"
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "12px",
              }}
              labelFormatter={(v) => `Date: ${v}`}
              formatter={(v) => [`${(v * 100).toFixed(1)}%`, "Sentiment"]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
