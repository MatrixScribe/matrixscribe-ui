"use client";

/* ENTITY COMPONENT */

import React from "react";

interface RiskIndicatorsProps {
  entity: any;
}

const safe = (v: any) =>
  typeof v === "number" && !isNaN(v) ? v : 0;

function computeRisk(entity: any) {
  if (!entity) return { policy: 0, market: 0, reputational: 0 };

  const sentiment = safe(entity?.sentiment?.avg);
  const volatility = safe(entity?.volatility);
  const velocity = safe(entity?.velocity);
  const diversity = safe(entity?.publisher_diversity);

  const norm = (x: number, max: number) =>
    Math.min(Math.max(x / max, 0), 1);

  const policyRisk = norm(volatility, 1) * 0.6 + norm(-sentiment, 1) * 0.4;
  const marketRisk = norm(velocity, 5) * 0.7 + norm(-sentiment, 1) * 0.3;
  const reputationalRisk =
    (1 - norm(diversity, 1)) * 0.5 + norm(-sentiment, 1) * 0.5;

  return {
    policy: policyRisk,
    market: marketRisk,
    reputational: reputationalRisk,
  };
}

export default function RiskIndicators({ entity }: RiskIndicatorsProps) {
  if (!entity || typeof entity !== "object") return null;

  const risk = computeRisk(entity);

  const indicators = [
    { label: "Policy risk", value: risk.policy },
    { label: "Market risk", value: risk.market },
    { label: "Reputational risk", value: risk.reputational },
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
        Risk indicators
      </div>

      <div className="space-y-[var(--space-1)]">
        {indicators.map((i, idx) => (
          <div key={idx} className="space-y-[2px]">
            <div
              className="
                flex justify-between
                text-[11px] tracking-wide
                text-charcoal-light
              "
            >
              <span>{i.label}</span>
              <span>{(i.value * 100).toFixed(0)}%</span>
            </div>

            <div
              className="
                w-full h-2 rounded-full overflow-hidden
                bg-sandstone/40 dark:bg-neutral-900/40
              "
            >
              <div
                className="h-full bg-red-600"
                style={{ width: `${i.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        Risk indicators are dynamically inferred from sentiment, volatility, publisher diversity, and velocity until full risk models are deployed.
      </p>
    </div>
  );
}
