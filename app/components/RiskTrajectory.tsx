import React from "react";

export default function RiskTrajectory({ entity }: any) {
  // Ensure entity is a safe object
  if (!entity || typeof entity !== "object") return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Risk trajectory
      </div>

      <div className="h-48 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Risk trajectory placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Tracks short‑term and medium‑term risk movement based on volatility,
        sentiment, and narrative pressure.
      </p>
    </div>
  );
}
