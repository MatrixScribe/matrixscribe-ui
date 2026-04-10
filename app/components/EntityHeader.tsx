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
    <Card className="space-y-3">
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
    </Card>
  );
}
