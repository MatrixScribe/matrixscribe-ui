import Card from "@/app/components/Card";
import EntityHeader from "@/app/components/EntityHeader";
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

export const dynamic = "force-dynamic";

export default async function EntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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

  const data = await res.json();

  // ---------- FLEXIBLE MAPPING LAYER ----------
  const entity = data.entity || data;

  const timeline =
    data.timeline ||
    data.sentiment_timeline ||
    data.sentimentTimeline ||
    [];

  const articles =
    data.articles ||
    data.article_list ||
    data.articleList ||
    [];

  const topics =
    data.topics ||
    data.topic_list ||
    data.topicList ||
    [];

  const tags =
    data.tags ||
    data.tag_list ||
    data.tagList ||
    [];

  const risk =
    data.risk ||
    data.risk_profile ||
    data.riskProfile ||
    {};

  const sentimentBuckets =
    risk.sentiment ||
    risk.sentiment_buckets ||
    risk.sentimentBuckets ||
    [];

  const updatedAt =
    entity.updated_at ||
    entity.updatedAt ||
    entity.last_updated ||
    entity.lastUpdated ||
    null;

  const articleCount = Array.isArray(articles) ? articles.length : 0;
  const topicCount = Array.isArray(topics) ? topics.length : 0;
  const tagCount = Array.isArray(tags) ? tags.length : 0;

  const sentimentTimelineData = Array.isArray(timeline)
    ? timeline.map((t: any) => ({
        date: t.date || t.day || t.timestamp,
        value:
          typeof t.avg_score !== "undefined"
            ? Number(t.avg_score)
            : typeof t.score !== "undefined"
            ? Number(t.score)
            : 0,
      }))
    : [];

  // ---------- PAGE LAYOUT ----------
  return (
    <div className="p-6 space-y-8">

      {/* 1. ENTITY OVERVIEW */}
      <Card>
        <EntityHeader
          name={entity.name}
          type={entity.type}
          region={entity.region}
          updatedAt={updatedAt}
          articleCount={articleCount}
          topicCount={topicCount}
          sentimentBuckets={sentimentBuckets}
        />
      </Card>

      <Card>
        <EntityScorecard
          articleCount={articleCount}
          topicCount={topicCount}
          tagCount={tagCount}
          sentimentBucketCount={Array.isArray(sentimentBuckets) ? sentimentBuckets.length : 0}
        />
      </Card>

      {/* 2. NARRATIVE & SENTIMENT */}
      <Card>
        <NarrativeSummary entity={entity} articles={articles} />
      </Card>

      <Card>
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wide text-charcoal-light">
            Sentiment timeline
          </div>
          <SentimentTimeline data={sentimentTimelineData} />
        </div>
      </Card>

      <Card>
        <SentimentDrivers entity={entity} articles={articles} />
      </Card>

      <Card>
        <SentimentMomentum entity={entity} timeline={timeline} />
      </Card>

      <Card>
        <SentimentHistogram entity={entity} articles={articles} />
      </Card>

      {/* 3. TOPICS & KEYWORDS */}
      <Card>
        <KeywordExtraction entity={entity} />
      </Card>

      <Card>
        <TopicHeatmap entity={entity} topics={topics} timeline={timeline} />
      </Card>

      <Card>
        <TopicDrift entity={entity} topics={topics} />
      </Card>

      {/* 4. ARTICLES & MEDIA */}
      <Card>
        <TopArticles articles={articles} />
      </Card>

      <Card>
        <PublisherBreakdown entity={entity} articles={articles} />
      </Card>

      <Card>
        <PublisherBiasMeters entity={entity} articles={articles} />
      </Card>

      <Card>
        <PublisherReliabilityScatter entity={entity} articles={articles} />
      </Card>

      <Card>
        <PublisherShift entity={entity} articles={articles} />
      </Card>

      <Card>
        <PublisherTimeline entity={entity} articles={articles} />
      </Card>

      {/* 5. INFLUENCE & NETWORK */}
      <Card>
        <EntityInfluenceGraph entity={entity} />
      </Card>

      <Card>
        <RelatedEntities
          entities={entity.related_entities || []}
          topics={topics.map((t: any) => t.name || t.topic || "")}
        />
      </Card>

      {/* 6. RISK & FORECASTING */}
      <Card>
        <RiskIndicators entity={entity} risk={risk} />
      </Card>

      <Card>
        <RiskTrajectory entity={entity} risk={risk} timeline={timeline} />
      </Card>

      <Card>
        <ForecastConfidence entity={entity} risk={risk} />
      </Card>

      <Card>
        <Forecasting entity={entity} timeline={timeline} />
      </Card>

      {/* 7. EVENTS & CHANGE DETECTION */}
      <Card>
        <EventTimeline entity={entity} />
      </Card>

      <Card>
        <WhatChanged entity={entity} articles={articles} timeline={timeline} />
      </Card>

      <Card>
        <WhyThisMatters entity={entity} />
      </Card>

      <Card>
        <RecommendedActions entity={entity} risk={risk} />
      </Card>

      {/* 8. VOLUME & VELOCITY */}
      <Card>
        <VolumeVelocity entity={entity} timeline={timeline} />
      </Card>

      <Card>
        <VelocityAcceleration entity={entity} timeline={timeline} />
      </Card>

      <Card>
        <RollingMetrics entity={entity} timeline={timeline} />
      </Card>

    </div>
  );
}
