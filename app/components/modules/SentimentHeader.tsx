"use client";

import Card from "@/app/components/Card";
import { sentimentColors } from "@/app/styles/sentimentColors";

export default function SentimentHeader({
  sentiment,
  change7d,
  change30d,
  volume,
}: {
  sentiment: number;
  change7d: number;
  change30d: number;
  volume: number;
}) {
  const formatPct = (v: number) =>
    `${v > 0 ? "+" : ""}${(v * 100).toFixed(1)}%`;

  const sentimentColor =
    sentiment > 0
      ? sentimentColors.positive
      : sentiment < 0
      ? sentimentColors.negative
      : sentimentColors.neutral;

  return (
    <Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Current Sentiment */}
        <div>
          <div className="text-xs text-charcoal-light">Sentiment</div>
          <div
            className="text-xl font-semibold"
            style={{ color: sentimentColor }}
          >
            {formatPct(sentiment)}
          </div>
        </div>

        {/* 7-Day Change */}
        <div>
          <div className="text-xs text-charcoal-light">7-Day Change</div>
          <div
            className="text-lg font-medium"
            style={{
              color:
                change7d > 0
                  ? sentimentColors.positive
                  : change7d < 0
                  ? sentimentColors.negative
                  : sentimentColors.neutral,
            }}
          >
            {formatPct(change7d)}
          </div>
        </div>

        {/* 30-Day Change */}
        <div>
          <div className="text-xs text-charcoal-light">30-Day Change</div>
          <div
            className="text-lg font-medium"
            style={{
              color:
                change30d > 0
                  ? sentimentColors.positive
                  : change30d < 0
                  ? sentimentColors.negative
                  : sentimentColors.neutral,
            }}
          >
            {formatPct(change30d)}
          </div>
        </div>

        {/* Volume */}
        <div>
          <div className="text-xs text-charcoal-light">Volume (Today)</div>
          <div className="text-lg font-medium text-charcoal">
            {volume.toLocaleString()}
          </div>
        </div>

      </div>
    </Card>
  );
}
