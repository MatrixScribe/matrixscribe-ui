"use client";

/* ENTITY COMPONENT */

import React from "react";

interface CorrelationMatrixProps {
  entity: any;
}

export default function CorrelationMatrix({ entity }: CorrelationMatrixProps) {
  if (!entity) return null;

  const correlations = [
    { label: "Sentiment vs Volume", value: 0.42 },
    { label: "Sentiment vs Volatility", value: -0.31 },
    { label: "Sentiment vs Risk", value: -0.27 },
    { label: "Volume vs Risk", value: 0.55 },
    { label: "Forecast vs Sentiment", value: 0.61 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Correlation matrix
      </div>

      <div className="grid grid-cols-1 gap-2">
        {correlations.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-sandstone dark:bg-surface rounded-md px-3 py-2"
          >
            <span className="text-sm text-charcoal-mid">{c.label}</span>

            <span
              className={`text-sm font-medium ${
                c.value > 0 ? "text-green-600" : "text-critical"
              }`}
            >
              {c.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        These correlations are placeholders. Once market data is connected, this
        module will show real statistical relationships between sentiment,
        volume, volatility, risk, and external indicators.
      </p>
    </div>
  );
}
