import React from "react";

export default function RiskIndicators({ entity }: any) {
  if (!entity) return null;

  const risk = entity.risk_indicators || entity.risk || {};

  const indicators = [
    { label: "Policy risk", value: risk.policy_risk ?? 0 },
    { label: "Market risk", value: risk.market_risk ?? 0 },
    { label: "Reputational risk", value: risk.reputational_risk ?? 0 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Risk indicators
      </div>

      <div className="space-y-2">
        {indicators.map((i, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs text-charcoal-light">
              <span>{i.label}</span>
              <span>{(i.value * 100).toFixed(0)}%</span>
            </div>

            <div className="w-full h-2 bg-sandstone/40 dark:bg-neutral-900/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600"
                style={{ width: `${i.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Risk indicators summarize exposure across policy, market, and
        reputational dimensions.
      </p>
    </div>
  );
}
