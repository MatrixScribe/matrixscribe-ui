"use client";

import Card from "@/app/components/Card";
import ModuleHeader from "@/app/components/ModuleHeader";
import EntityHeader from "@/app/platform/entity/[slug]/EntityHeader";

import EntityScorecard from "@/app/components/EntityScorecard";
import SentimentTimeline from "@/app/components/SentimentTimeline";
import KeywordExtraction from "@/app/components/KeywordExtraction";
import TopArticles from "@/app/components/TopArticles";
import RelatedEntities from "@/app/components/RelatedEntities";
import RiskIndicators from "@/app/components/RiskIndicators";
import EventTimeline from "@/app/components/EventTimeline";

import NarrativeSummary from "@/app/components/NarrativeSummary";
import SentimentDrivers from "@/app/components/SentimentDrivers";
import SentimentHistogram from "@/app/components/SentimentHistogram";
import SentimentMomentum from "@/app/components/SentimentMomentum";
import TopicHeatmap from "@/app/components/TopicHeatmap";
import TopicDrift from "@/app/components/TopicDrift";
import PublisherBreakdown from "@/app/components/PublisherBreakdown";
import PublisherBiasMeters from "@/app/components/PublisherBiasMeters";
import PublisherReliabilityScatter from "@/app/components/PublisherReliabilityScatter";
import PublisherShift from "@/app/components/PublisherShift";
import PublisherTimeline from "@/app/components/PublisherTimeline";
import EntityInfluenceGraph from "@/app/components/EntityInfluenceGraph";
import RiskTrajectory from "@/app/components/RiskTrajectory";
import ForecastConfidence from "@/app/components/ForecastConfidence";
import Forecasting from "@/app/components/Forecasting";
import WhatChanged from "@/app/components/WhatChanged";
import WhyThisMatters from "@/app/components/WhyThisMatters";
import RecommendedActions from "@/app/components/RecommendedActions";
import VolumeVelocity from "@/app/components/VolumeVelocity";
import VelocityAcceleration from "@/app/components/VelocityAcceleration";
import RollingMetrics from "@/app/components/RollingMetrics";

import SentimentSparkline from "@/app/components/visuals/SentimentSparkline";
import RiskGauge from "@/app/components/visuals/RiskGauge";
import DiversityDonut from "@/app/components/visuals/DiversityDonut";
import VelocityBars from "@/app/components/visuals/VelocityBars";
import ForecastConeChart from "@/app/components/charts/ForecastConeChart";

export const dynamic = "force-dynamic";

// ---------- SAFE HELPERS ----------
const safeArray = (v: any) => (Array.isArray(v) ? v : []);
const safeObj = (v: any) => (v && typeof v === "object" ? v : {});
const safeNum = (v: any) =>
  typeof v === "number" && !isNaN(v) ? v : 0;

export default async function EntityPage(props: any) {
  const params = await props.params;
  const slug = params.slug;

  if (!slug) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Invalid Entity</h1>
        <p>No slug was provided.</p>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entity/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Entity Not Found</h1>
        <p>Backend returned an error for slug: {slug}</p>
      </div>
    );
  }

  const data = safeObj(await res.json());

  // ---------- FLEXIBLE MAPPING LAYER ----------
  const rawEntity = safeObj(data.entity || data);

  const timeline = safeArray(
    data.timeline ||
      data.sentiment_timeline ||
      data.sentimentTimeline
  );

  const articles = safeArray(
    data.articles ||
      data.article_list ||
      data.articleList
  );

  const topics = safeArray(
    data.topics ||
      data.topic_list ||
      data.topicList
  );

  const tags = safeArray(
    data.tags ||
      data.tag_list ||
      data.tagList
  );

  const risk = safeObj(
    data.risk ||
      data.risk_profile ||
      data.riskProfile
  );

  const sentimentBuckets = safeArray(
    risk.sentiment ||
      risk.sentiment_buckets ||
      risk.sentimentBuckets
  );

  const publishers = safeArray(
    data.publishers ||
      rawEntity.publishers ||
      rawEntity.publisher_breakdown ||
      rawEntity.publisherBreakdown
  );

  const relatedEntities = safeArray(
    data.related ||
      rawEntity.related_entities ||
      rawEntity.relatedEntities
  );

  const velocity = safeObj(data.velocity || rawEntity.velocity || {});

  const updatedAt =
    rawEntity.updated_at ||
    rawEntity.updatedAt ||
    rawEntity.last_updated ||
    rawEntity.lastUpdated ||
    null;

  const articleCount = articles.length;
  const topicCount = topics.length;
  const tagCount = tags.length;

  const sentimentTimelineData = timeline.map((t: any) => {
    const obj = t && typeof t === "object" ? t : {};
    const rawValue =
      typeof obj.avg_score === "number"
        ? obj.avg_score
        : typeof obj.score === "number"
        ? obj.score
        : 0;

    return {
      date: obj.date || obj.day || obj.timestamp || "",
      value: Number.isFinite(rawValue) ? rawValue : 0,
    };
  });

  const relatedTopics = topics.map((t: any) => {
    const obj = t && typeof t === "object" ? t : {};
    return obj.name || obj.topic || "";
  });

  const sentiment7 = safeNum(rawEntity.sentiment_7d_avg);
  const sentiment30 = safeNum(rawEntity.sentiment_30d_avg);
  const sentimentDelta = sentiment7 - sentiment30;

  const riskLevel =
    safeNum(risk.market_risk) +
    safeNum(risk.policy_risk) +
    safeNum(risk.reputational_risk);

  const riskNormalized = Math.min(1, riskLevel / 3);

  const forecastSeries = safeArray(
    rawEntity.forecast?.next_7d
  ).map((p: any, idx: number) => ({
    date: p.date || `D${idx + 1}`,
    value: safeNum(p.value),
    lower: safeNum(p.lower ?? p.value * 0.9),
    upper: safeNum(p.upper ?? p.value * 1.1),
  }));

  const entity = {
    ...rawEntity,
    publishers,
    related_entities: relatedEntities,
    article_count_24h: rawEntity.article_count_24h ?? 0,
    article_count_7d: rawEntity.article_count_7d ?? 0,
    velocity: safeNum(velocity.v30d),
    publisher_diversity_score:
      safeNum(rawEntity.publisher_diversity_score),
  };

  // ---------- PREMIUM VISUAL INTELLIGENCE LAYOUT ----------
  return (
    <div className="flex flex-col gap-[var(--space-3)] px-10 py-8">

      {/* NEW PERSISTENT HEADER */}
      <EntityHeader entity={entity} />

      {/* HERO INTELLIGENCE HEADER — TIER 1 */}
      <section className="relative">
        <div
          className="
            rounded-2xl
            bg-gradient-to-b from-white/98 to-white/92
            dark:from-neutral-900/98 dark:to-neutral-900/92
            border border-black/10 dark:border-white/10
            shadow-[var(--shadow-lg)] dark:shadow-[var(--shadow-lg-dark)]
            backdrop-blur-md
            p-10
            flex flex-col gap-[var(--space-2)]
          "
        >

          {/* Top Row */}
          <div className="flex flex-wrap items-start justify-between gap-[var(--space-2)]">
            <div className="space-y-[var(--space-1)]">
              <h1 className="text-4xl font-semibold tracking-tight text-charcoal">
                {entity.name}
              </h1>
              <p className="text-sm text-charcoal-light">
                {entity.type} • {entity.region}
              </p>
              <p className="text-xs text-charcoal-light">
                Last updated: {updatedAt ?? "N/A"}
              </p>
            </div>

            <div className="flex flex-col items-end gap-[var(--space-2)]">
              <div className="flex items-center gap-[var(--space-1)]">
                <div
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    sentimentDelta > 0
                      ? "bg-green-100 text-green-700"
                      : sentimentDelta < 0
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {sentimentDelta > 0 ? "▲" : sentimentDelta < 0 ? "▼" : "•"}{" "}
                  {Math.abs(sentimentDelta).toFixed(2)} (7d vs 30d)
                </div>
                <DiversityDonut
                  score={safeNum(entity.publisher_diversity_score)}
                />
              </div>
              <div className="w-56">
                <SentimentSparkline data={sentimentTimelineData} />
              </div>
            </div>
          </div>

          {/* Metrics + Risk Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-[var(--space-2)] mt-[var(--space-2)] items-center">
            <div className="grid grid-cols-2 gap-[var(--space-2)]">
              <div>
                <p className="text-xs text-charcoal-light">
                  Articles (24h)
                </p>
                <p className="text-xl font-semibold">
                  {entity.article_count_24h ?? 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-charcoal-light">
                  Articles (7d)
                </p>
                <p className="text-xl font-semibold">
                  {entity.article_count_7d ?? 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-charcoal-light">Topics</p>
                <p className="text-xl font-semibold">
                  {topicCount}
                </p>
              </div>
              <div>
                <p className="text-xs text-charcoal-light">
                  Tags
                </p>
                <p className="text-xl font-semibold">
                  {tagCount}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-1)]">
              <p className="text-xs text-charcoal-light">
                Coverage velocity
              </p>
              <VelocityBars
                count24h={safeNum(entity.article_count_24h)}
                count7d={safeNum(entity.article_count_7d)}
              />
            </div>

            <div className="flex flex-col gap-[var(--space-1)]">
              <p className="text-xs text-charcoal-light">
                Aggregate risk
              </p>
              <RiskGauge
                value={riskNormalized}
                label="Market • Policy • Reputational"
              />
            </div>

            <div className="flex flex-col gap-[var(--space-1)]">
              <p className="text-xs text-charcoal-light">
                Short‑term forecast
              </p>
              <ForecastConeChart data={forecastSeries} />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 2xl:grid-cols-3 gap-[var(--space-3)]">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-[var(--space-3)] 2xl:col-span-2">

          {/* Narrative Cluster */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Narrative Intelligence" />

            <Card className="p-6">
              <NarrativeSummary entity={entity} />
            </Card>

            <Card className="p-6">
              <SentimentTimeline data={sentimentTimelineData} />
            </Card>

            <Card className="p-6">
              <SentimentDrivers entity={entity} />
            </Card>

            <Card className="p-6">
              <SentimentMomentum entity={entity} />
            </Card>

            <Card className="p-6">
              <SentimentHistogram entity={entity} />
            </Card>
          </div>

          {/* Topics Cluster */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Topic Intelligence" />

            <Card className="p-6">
              <KeywordExtraction entity={entity} />
            </Card>

            <Card className="p-6">
              <TopicHeatmap entity={entity} />
            </Card>

            <Card className="p-6">
              <TopicDrift entity={entity} />
            </Card>
          </div>

          {/* Articles Cluster */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Media Coverage" />

            <Card className="p-6">
              <TopArticles articles={articles} />
            </Card>

            <Card className="p-6">
              <PublisherBreakdown publishers={publishers} />
            </Card>

            <Card className="p-6">
              <PublisherBiasMeters entity={entity} />
            </Card>

            <Card className="p-6">
              <PublisherReliabilityScatter entity={entity} />
            </Card>

            <Card className="p-6">
              <PublisherShift entity={entity} />
            </Card>

            <Card className="p-6">
              <PublisherTimeline entity={entity} />
            </Card>
          </div>

          {/* Influence Cluster */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Influence Graph" />

            <Card className="p-6">
              <EntityInfluenceGraph entity={entity} />
            </Card>

            <Card className="p-6">
              <RelatedEntities
                entities={relatedEntities}
                topics={relatedTopics}
              />
            </Card>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[var(--space-3)]">

          <Card className="p-6">
            <EntityScorecard
              articleCount={articleCount}
              topicCount={topicCount}
              tagCount={tagCount}
              sentimentBucketCount={sentimentBuckets.length}
            />
          </Card>

          {/* Risk */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Risk Intelligence" />

            <Card className="p-6">
              <RiskIndicators entity={entity} />
            </Card>

            <Card className="p-6">
              <RiskTrajectory entity={entity} />
            </Card>
          </div>

          {/* Forecasting */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Forecasting" />

            <Card className="p-6">
              <ForecastConfidence entity={entity} />
            </Card>

            <Card className="p-6">
              <Forecasting entity={entity} />
            </Card>
          </div>

          {/* Events */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Event Signals" />

            <Card className="p-6">
              <EventTimeline entity={entity} />
            </Card>

            <Card className="p-6">
              <WhatChanged entity={entity} />
            </Card>

            <Card className="p-6">
              <WhyThisMatters entity={entity} />
            </Card>

            <Card className="p-6">
              <RecommendedActions entity={entity} />
            </Card>
          </div>

          {/* Velocity */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <ModuleHeader title="Velocity & Metrics" />

            <Card className="p-6">
              <VolumeVelocity
                count24h={safeNum(entity.article_count_24h)}
                count7d={safeNum(entity.article_count_7d)}
                velocity={safeNum(entity.velocity)}
                diversity={safeNum(entity.publisher_diversity_score)}
              />
            </Card>

            <Card className="p-6">
              <VelocityAcceleration entity={entity} />
            </Card>

            <Card className="p-6">
              <RollingMetrics
                avg7={safeNum(entity.avg7)}
                avg30={safeNum(entity.avg30)}
                volatility={safeNum(entity.volatility)}
                zscore={safeNum(entity.zscore)}
              />
            </Card>
          </div>

        </div>

      </section>

    </div>
  );
}
