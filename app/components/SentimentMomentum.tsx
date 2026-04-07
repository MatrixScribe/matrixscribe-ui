import React from "react";

export default function SentimentMomentum({ entity }: any) {
  if (!entity) return null;

  const momentum = entity.momentum ?? 0.12;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Sentiment momentum
      </div>

      <div className="h-24 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-mid">
        Momentum: {(momentum * 100).toFixed(1)}%
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Momentum shows the rate of sentiment acceleration or deceleration over
        recent periods.
      </p>
    </div>
  );
}