import React from "react";

interface RollingMetricsProps {
  avg7: number | null | undefined;
  avg30: number | null | undefined;
  volatility: number | null | undefined;
  zscore: number | null | undefined;
}

export default function RollingMetrics({
  avg7,
  avg30,
  volatility,
  zscore,
}: RollingMetricsProps) {
  const items = [
    { label: "7‑day avg", value: avg7 },
    { label: "30‑day avg", value: avg30 },
    { label: "Volatility", value: volatility },
    { label: "Z‑score", value: zscore },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Rolling sentiment metrics
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((m, i) => (
          <div
            key={i}
            className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1"
          >
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              {m.label}
            </div>

            <div className="text-sm font-medium text-charcoal dark:text-neutral-100">
              {typeof m.value === "number"
                ? m.value.toFixed(2)
                : "—"}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Rolling metrics smooth short‑term noise and highlight structural shifts
        in sentiment.
      </p>
    </div>
  );
}
