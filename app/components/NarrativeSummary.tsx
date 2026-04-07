import React from "react";

interface NarrativeSummaryProps {
  entity: any;
}

export default function NarrativeSummary({ entity }: NarrativeSummaryProps) {
  if (!entity) return null;

  const sentiment = entity.sentiment;
  const change7d = entity.sentiment_7d_avg - entity.sentiment_30d_avg;
  const risk = entity.risk_indicators;
  const forecast = entity.forecast;
  const volume24h = entity.article_count_24h;
  const volume7d = entity.article_count_7d;

  const sentimentDirection =
    change7d > 0.01 ? "strengthening" :
    change7d < -0.01 ? "softening" :
    "stable";

  const primaryRisk =
    risk.market_risk > risk.policy_risk && risk.market_risk > risk.reputational_risk
      ? "market"
      : risk.policy_risk > risk.reputational_risk
      ? "policy"
      : "reputational";

  return (
    <div className="space-y-3 text-sm">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Narrative summary
      </div>

      <p className="text-charcoal-mid leading-relaxed">
        Sentiment around{" "}
        <span className="font-medium text-charcoal">{entity.name}</span>{" "}
        is currently{" "}
        <span className="font-medium">
          {sentiment > 0.05
            ? "mildly positive"
            : sentiment < -0.05
            ? "mildly negative"
            : "balanced"}
        </span>{" "}
        and appears to be{" "}
        <span className="font-medium">{sentimentDirection}</span>{" "}
        over the last week.
      </p>

      <p className="text-charcoal-mid leading-relaxed">
        Coverage volume sits at{" "}
        <span className="font-medium">{volume24h}</span> articles in the last 24 hours and{" "}
        <span className="font-medium">{volume7d}</span> over the past 7 days, with{" "}
        <span className="font-medium">{entity.publisher_diversity_score}</span>{" "}
        publisher diversity.
      </p>

      <p className="text-charcoal-mid leading-relaxed">
        Risk is currently led by{" "}
        <span className="font-medium">{primaryRisk} factors</span>, while the forecast suggests{" "}
        <span className="font-medium">
          {forecast?.next_7d?.[forecast.next_7d.length - 1]?.value > sentiment
            ? "a slight upward drift"
            : "a flat to slightly softer path"}
        </span>{" "}
        over the next 7 days.
      </p>

      <p className="text-charcoal-light leading-relaxed">
        This view combines sentiment trend, volume, risk indicators and short‑term forecast to give a
        concise read on where the narrative is moving.
      </p>
    </div>
  );
}
