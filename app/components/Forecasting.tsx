import React from "react";

export default function Forecasting({ entity }: any) {
  // Ensure entity is a safe object
  if (!entity || typeof entity !== "object") return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Forecasting
      </div>

      <div className="h-40 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Forecasting module placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Forecasting projects short‑term sentiment direction based on historical
        patterns and current momentum.
      </p>
    </div>
  );
}
