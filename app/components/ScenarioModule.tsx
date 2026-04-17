"use client";

/* ENTITY COMPONENT */

import React from "react";

export default function ScenarioModule({ entity }: any) {
  if (!entity) return null;

  const scenarios = [
    {
      title: "Base case",
      probability: 0.62,
      description:
        "Sentiment remains mildly positive as inflation expectations stabilize.",
    },
    {
      title: "Upside case",
      probability: 0.23,
      description:
        "Improved economic signals drive stronger sentiment and reduced volatility.",
    },
    {
      title: "Downside case",
      probability: 0.15,
      description:
        "Renewed uncertainty triggers short-term sentiment deterioration.",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Scenario outlook
      </div>

      <div className="space-y-3">
        {scenarios.map((s, i) => (
          <div
            key={i}
            className="bg-sandstone dark:bg-surface rounded-md p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-charcoal">
                {s.title}
              </span>
              <span className="text-sm text-charcoal-light">
                {(s.probability * 100).toFixed(0)}%
              </span>
            </div>

            <p className="text-xs text-charcoal-mid leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Scenarios outline plausible short‑term paths based on current sentiment
        and risk signals.
      </p>
    </div>
  );
}
