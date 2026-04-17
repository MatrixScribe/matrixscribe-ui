import React from "react";

interface DiversityDonutProps {
  score: number; // 0–100 or 0–1
}

export default function DiversityDonut({ score }: DiversityDonutProps) {
  const normalized = score > 1 ? score / 100 : score;
  const v = Math.max(0, Math.min(1, normalized || 0));
  const circumference = 2 * Math.PI * 18;
  const offset = circumference * (1 - v);

  const color =
    v > 0.7 ? "#22c55e" : v > 0.4 ? "#eab308" : "#f97316";

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 50 50" className="w-10 h-10">
        <circle
          cx="25"
          cy="25"
          r="18"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx="25"
          cy="25"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 25 25)"
        />
      </svg>
      <div>
        <div className="text-xs text-charcoal-light">
          Publisher diversity
        </div>
        <div className="text-sm font-semibold">
          {(v * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}
