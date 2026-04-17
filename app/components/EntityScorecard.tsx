"use client";

import React from "react";
import styles from "./EntityScorecard.module.css";

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
    <div className={`${styles.scorecardContainer} space-y-[var(--space-2)]`}>
      <div className="text-[11px] font-semibold tracking-wide text-charcoal-light uppercase">
        Entity scorecard
      </div>

      <div className="grid grid-cols-2 gap-[var(--space-2)]">
        {items.map((m, i) => (
          <div
            key={i}
            className={`
              ${styles.scorecardItem}
              rounded-md p-3 space-y-[var(--space-1)]
              bg-gradient-to-b from-sandstone/60 to-sandstone/40
              dark:from-neutral-900/70 dark:to-neutral-900/50
              border border-black/5 dark:border-white/5
              shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]
              backdrop-blur-sm
            `}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="text-[11px] font-medium tracking-wide text-charcoal-light uppercase">
              {m.label}
            </div>

            <div className="text-base font-semibold tracking-tight text-charcoal dark:text-neutral-100">
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
