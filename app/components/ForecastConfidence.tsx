import React from "react";

export default function ForecastConfidence({ entity }: any) {
  if (!entity || typeof entity !== "object") return null;

  // Ensure forecast_confidence is ALWAYS a number
  const raw = entity.forecast_confidence;
  const confidence =
    typeof raw === "number" && !isNaN(raw) ? raw : 0.68;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Forecast confidence
      </div>

      <div className="h-24 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-mid">
        Confidence: {(confidence * 100).toFixed(0)}%
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Indicates how reliable the short‑term forecast is based on data quality
        and narrative stability.
      </p>
    </div>
  );
}
