import React from "react";

interface RiskGaugeProps {
  value: number; // 0–1 normalized
  label?: string;
}

export default function RiskGauge({ value, label }: RiskGaugeProps) {
  const v = Math.max(0, Math.min(1, value || 0));
  const angle = 180 * v - 90; // -90 to +90
  const radians = (angle * Math.PI) / 180;
  const x = 50 + 40 * Math.cos(radians);
  const y = 50 + 40 * Math.sin(radians);

  const color =
    v > 0.66 ? "#dc2626" : v > 0.33 ? "#f97316" : "#16a34a";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 60" className="w-full h-20">
        <defs>
          <linearGradient id="risk-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        <path
          d="M10 50 A40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#risk-arc)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <line
          x1="50"
          y1="50"
          x2={x}
          y2={y}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle cx="50" cy="50" r="3" fill="#0f172a" />
      </svg>
      {label && (
        <div className="text-xs text-charcoal-light">
          {label}
        </div>
      )}
    </div>
  );
}
