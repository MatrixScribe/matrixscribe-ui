"use client";

import React from "react";

interface NarrativeSummaryProps {
  entity: any;
}

export default function NarrativeSummary({ entity }: NarrativeSummaryProps) {
  if (!entity || typeof entity !== "object") return null;

  const safe = (v: any) =>
    typeof v === "number" && !isNaN(v) ? v : 0;

  // SENTIMENT
  const sentiment = safe(entity?.sentiment?.avg);
  const sentiment7d = safe(entity?.sentiment?.avg_7d);
  const sentiment30d = safe(entity?.sentiment?.avg_30d);
  const change7d = sentiment7d - sentiment30d;

  const sentimentDirection =
    change7d > 0.01
      ? "strengthening"
      : change7d < -0.01
      ? "softening"
      : "stable";

  // VOLUME
  const volume24h = safe(entity?.volume?.vol_24h);
  const volume7d = safe(entity?.volume?.vol_7d);

  // DIVERSITY
  const diversity = safe(entity?.publisher_diversity);

  // FORECAST
  const forecast = entity?.forecast || {};
  const next7 = Array.isArray(forecast.next_7d) ? forecast.next_7d : [];

  const lastForecastValue =
    next7.length > 0 && typeof next7[next7.length - 1]?.value === "number"
      ? next7[next7.length - 1].value
      : sentiment;

  // RISK MODEL
  const volatility = safe(entity?.volatility);
  const velocity = safe(entity?.velocity);

  const norm = (x: number, max: number) =>
    Math.min(Math.max(x / max, 0), 1);

  const policyRisk =
    norm(volatility, 1) * 0.6 + norm(-sentiment, 1) * 0.4;

  const marketRisk =
    norm(velocity, 5) * 0.7 + norm(-sentiment, 1) * 0.3;

  const reputationalRisk =
    (1 - norm(diversity, 1)) * 0.5 + norm(-sentiment, 1) * 0.5;

  const primaryRisk =
    marketRisk >= policyRisk && marketRisk >= reputationalRisk
      ? "market"
      : policyRisk >= reputationalRisk
      ? "policy"
      : "reputational";

  // RENDER
  return (
    <div className="space-y-[var(--space-2)] text-[13px] leading-relaxed">
      <div
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        Narrative summary
      </div>

      <p className="text-charcoal-mid">
        Sentiment around{" "}
        <span className="font-semibold text-charcoal">{entity.name}</span>{" "}
        is currently{" "}
        <span className="font-semibold">
          {sentiment > 0.05
            ? "mildly positive"
            : sentiment < -0.05
            ? "mildly negative"
            : "balanced"}
        </span>{" "}
        and appears to be{" "}
        <span className="font-semibold">{sentimentDirection}</span>{" "}
        over the last week.
      </p>

      <p className="text-charcoal-mid">
        Coverage volume sits at{" "}
        <span className="font-semibold">{volume24h}</span> articles in the last 24 hours and{" "}
        <span className="font-semibold">{volume7d}</span> over the past 7 days, with{" "}
        <span className="font-semibold">{diversity.toFixed(2)}</span>{" "}
        publisher diversity.
      </p>

      <p className="text-charcoal-mid">
        Risk is currently led by{" "}
        <span className="font-semibold">{primaryRisk} factors</span>, while the forecast suggests{" "}
        <span className="font-semibold">
          {lastForecastValue > sentiment
            ? "a slight upward drift"
            : "a flat to slightly softer path"}
        </span>{" "}
        over the next 7 days.
      </p>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        This view combines sentiment trend, volume, risk indicators and short‑term forecast to give a concise read on where the narrative is moving.
      </p>
    </div>
  );
}
