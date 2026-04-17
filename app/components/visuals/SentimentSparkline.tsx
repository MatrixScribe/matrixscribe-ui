import React from "react";

type Point = { date: string; value: number };

interface SentimentSparklineProps {
  data: Point[];
  className?: string;
}

export default function SentimentSparkline({
  data,
  className,
}: SentimentSparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div className={className}>
        <div className="h-10 w-full rounded-md bg-slate-100 dark:bg-neutral-800" />
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data
    .map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * 100;
      const y = 100 - ((d.value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const last = data[data.length - 1]?.value ?? 0;
  const first = data[0]?.value ?? 0;
  const trendUp = last >= first;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 40"
        className="w-full h-10 text-sky-500 dark:text-sky-400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sparkline-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={points}
        />
        <polygon
          fill="url(#sparkline-fill)"
          points={`0,40 ${points} 100,40`}
        />

        <circle
          cx="100"
          cy={100 - ((last - min) / range) * 100}
          r="2"
          fill={trendUp ? "#16a34a" : "#dc2626"}
        />
      </svg>
    </div>
  );
}
