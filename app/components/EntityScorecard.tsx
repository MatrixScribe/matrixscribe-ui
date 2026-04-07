import React from "react";

export default function EntityScorecard({ entity }: any) {
  if (!entity) return null;

  const items = [
    { label: "Sentiment", value: entity.sentiment },
    { label: "Risk", value: entity.risk_score ?? 0.42 },
    { label: "Stability", value: entity.stability ?? 0.71 },
    { label: "Influence", value: entity.influence ?? 0.58 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Entity scorecard
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
            <div className="text-sm font-medium text-charcoal">
              {(m.value * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        A compact scorecard summarizing core sentiment and risk dimensions.
      </p>
    </div>
  );
}
