import React from "react";

interface EntityScorecardProps {
  articleCount: number;
  topicCount: number;
  tagCount: number;
  sentimentBucketCount: number;
}

export default function EntityScorecard({
  articleCount,
  topicCount,
  tagCount,
  sentimentBucketCount,
}: EntityScorecardProps) {
  const items = [
    { label: "Articles", value: articleCount },
    { label: "Topics", value: topicCount },
    { label: "Tags", value: tagCount },
    { label: "Sentiment Buckets", value: sentimentBucketCount },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Entity scorecard
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((m, i) => (
          <div
            key={i}
            className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1"
          >
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              {m.label}
            </div>
            <div className="text-sm font-medium text-charcoal">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        A compact scorecard summarizing core entity metrics.
      </p>
    </div>
  );
}
