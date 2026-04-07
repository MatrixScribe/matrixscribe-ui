import React from "react";

export default function RecommendedActions({ entity }: any) {
  if (!entity) return null;

  const actions = [
    {
      title: "Monitor volatility closely",
      detail:
        "Sentiment fluctuations suggest increased sensitivity to economic signals.",
    },
    {
      title: "Track publisher tone shifts",
      detail:
        "Several outlets have recently changed tone; narrative pressure may be building.",
    },
    {
      title: "Review related entities",
      detail:
        "Influence network shows strong cross‑entity coupling; spillover risk possible.",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Recommended actions
      </div>

      <div className="space-y-2">
        {actions.map((a, i) => (
          <div
            key={i}
            className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1"
          >
            <div className="text-sm font-medium text-charcoal">{a.title}</div>
            <div className="text-xs text-charcoal-light">{a.detail}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Recommended actions provide analyst‑friendly guidance based on current
        sentiment, risk, and narrative momentum.
      </p>
    </div>
  );
}
