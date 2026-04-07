import React from "react";

export default function SentimentHistogram({ entity }: any) {
  if (!entity) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Sentiment histogram
      </div>

      <div className="h-40 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Histogram placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Histogram shows distribution of sentiment across articles.
      </p>
    </div>
  );
}
