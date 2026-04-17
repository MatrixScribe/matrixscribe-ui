"use client";

/* ENTITY COMPONENT */

import dynamic from "next/dynamic";
import ChartContainer from "@/app/components/ChartContainer";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

type SentimentBucket = {
  bucket: string;
  count: number;
};

interface SentimentHistogramProps {
  entity: any;
}

const safeArray = (v: any) => (Array.isArray(v) ? v : []);

function SentimentHistogramInner({ entity }: SentimentHistogramProps) {
  const raw =
    safeArray(entity?.sentiment_histogram) ||
    safeArray(entity?.sentiment_distribution) ||
    safeArray(entity?.sentimentBuckets);

  const data: SentimentBucket[] =
    raw.length > 0
      ? raw.map((b: any) => ({
          bucket: String(b.bucket ?? b.label ?? b.range ?? ""),
          count:
            typeof b.count === "number"
              ? b.count
              : typeof b.value === "number"
              ? b.value
              : 0,
        }))
      : [
          { bucket: "Very -", count: 2 },
          { bucket: "Neg", count: 5 },
          { bucket: "Neu", count: 8 },
          { bucket: "Pos", count: 6 },
          { bucket: "Very +", count: 3 },
        ];

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
        Sentiment histogram
      </div>

      <ChartContainer height={200}>
        <BarChart data={data}>
          <XAxis
            dataKey="bucket"
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              padding: "6px 10px",
            }}
          />

          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            fill="#0ea5e9"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const SentimentHistogram = dynamic(
  () => Promise.resolve(SentimentHistogramInner),
  { ssr: false }
);

export default SentimentHistogram;
