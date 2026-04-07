import React from "react";

interface EntityHeaderProps {
  name: string;
  type: string;
  region: string;
  updatedAt: string;
  sentiment: number;
  sources: number;
  confidence: number;
  data: any[];
}

export default function EntityHeader({
  name,
  type,
  region,
  updatedAt,
  sentiment,
  sources,
  confidence,
  data,
}: EntityHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-charcoal-light">
            Entity overview
          </div>
          <div className="text-lg font-semibold text-charcoal dark:text-neutral-50">
            {name}
          </div>
          <div className="text-xs text-charcoal-light dark:text-neutral-400">
            {type} · {region}
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Sentiment
            </div>
            <div className="text-sm font-medium text-charcoal">
              {(sentiment * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Sources
            </div>
            <div className="text-sm font-medium text-charcoal">{sources}</div>
          </div>
          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Confidence
            </div>
            <div className="text-sm font-medium text-charcoal">
              {(confidence * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-xs text-charcoal-light">
        Sparkline placeholder
      </div>

      <div className="text-xs text-charcoal-light">
        Last updated {updatedAt}
      </div>
    </div>
  );
}
