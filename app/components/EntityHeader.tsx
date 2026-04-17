"use client";

/* ENTITY COMPONENT */

import React from "react";
import Card from "@/app/components/Card";

interface EntityHeaderProps {
  name: string;
  type: string;
  region: string;
  updatedAt: string;
  articleCount: number;
  topicCount: number;
  sentimentBuckets: {
    sentiment: string | null;
    count: number;
    avg_score: string | null;
  }[];
}

export default function EntityHeader({
  name,
  type,
  region,
  updatedAt,
  articleCount,
  topicCount,
  sentimentBuckets,
}: EntityHeaderProps) {
  return (
    <Card className="entity-header-card space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-charcoal-light">
            Entity Overview
          </div>

          <div className="text-lg font-semibold text-charcoal">
            {name}
          </div>

          <div className="text-xs text-charcoal-light">
            {type || "Entity"} · {region || "Unknown region"}
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Articles
            </div>
            <div className="text-sm font-medium text-charcoal">
              {articleCount}
            </div>
          </div>

          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Topics
            </div>
            <div className="text-sm font-medium text-charcoal">
              {topicCount}
            </div>
          </div>

          <div>
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              Sentiment
            </div>
            <div className="text-sm font-medium text-charcoal">
              {sentimentBuckets.length} buckets
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-charcoal-light">
        Last updated {updatedAt}
      </div>

      <style jsx>{`
        .entity-header-card {
          opacity: 0;
          transform: translateY(6px);
          animation: cardFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition:
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .entity-header-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        @keyframes cardFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
