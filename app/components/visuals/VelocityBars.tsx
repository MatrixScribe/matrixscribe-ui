import React from "react";

interface VelocityBarsProps {
  count24h: number;
  count7d: number;
}

export default function VelocityBars({
  count24h,
  count7d,
}: VelocityBarsProps) {
  const day = count24h || 0;
  const week = count7d || 0;
  const max = Math.max(day, week, 1);

  const dayHeight = (day / max) * 100;
  const weekHeight = (week / max) * 100;

  return (
    <div className="flex items-end gap-3 h-16">
      <div className="flex flex-col items-center gap-1 flex-1">
        <div
          className="w-full rounded-md bg-sky-500/80"
          style={{ height: `${dayHeight}%` }}
        />
        <span className="text-[10px] text-charcoal-light">
          24h
        </span>
      </div>
      <div className="flex flex-col items-center gap-1 flex-1">
        <div
          className="w-full rounded-md bg-indigo-500/80"
          style={{ height: `${weekHeight}%` }}
        />
        <span className="text-[10px] text-charcoal-light">
          7d
        </span>
      </div>
    </div>
  );
}
