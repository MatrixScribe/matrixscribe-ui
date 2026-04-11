import Card from "@/app/components/Card";
import EntityHeader from "@/app/components/EntityHeader";
import EntityScorecard from "@/app/components/EntityScorecard";
import SentimentTimeline from "@/app/components/SentimentTimeline";
import KeywordExtraction from "@/app/components/KeywordExtraction";
import TopArticles from "@/app/components/TopArticles";
import RelatedEntities from "@/app/components/RelatedEntities";
import RiskIndicators from "@/app/components/RiskIndicators";
import EventTimeline from "@/app/components/EventTimeline";

// Premium components
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

// ---------- SAFE HELPERS ----------
const safeArray = (v: any) => (Array.isArray(v) ? v : []);
const safeObj = (v: any) => (v && typeof v === "object" ? v : {});
const safeNum = (v: any) =>
  typeof v === "number" && !isNaN(v) ? v : null;

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

  const data = safeObj(await res.json());

  // ---------- FLEXIBLE MAPPING LAYER ----------
  const entity = safeObj(data.entity || data);

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

  const updatedAt =
    entity.updated_at ||
    entity.updatedAt ||
    entity.last_updated ||
    entity.lastUpdated ||
    null;

  const articleCount = articles.length;
  const topicCount = topics.length;
  const tagCount = tags.length;

  const sentimentTimelineData = timeline.map((t: any) => ({
    date: t.date || t.day || t.timestamp || "",
    value:
      typeof t.avg_score !== "undefined"
        ? Number(t.avg_score)
        : typeof t.score !== "undefined"
        ? Number(t.score)
        : 0,
  }));

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
          sentimentBucketCount={sentimentBuckets.length}
        />
      </Card>

      {/* 2. NARRATIVE & SENTIMENT */}
      <Card>
        <NarrativeSummary entity={entity} />
      </Card>

      <Card>
        <SentimentTimeline data={sentimentTimelineData} />
      </Card>

      <Card>
        <SentimentDrivers entity={entity} />
      </Card>

      <Card>
        <SentimentMomentum entity={entity} />
      </Card>

      <Card>
        <SentimentHistogram entity={entity} />
      </Card>

      {/* 3. TOPICS & KEYWORDS */}
      <Card>
        <KeywordExtraction entity={entity} />
      </Card>

      <Card>
        <TopicHeatmap entity={entity} />
      </Card>

      <Card>
        <TopicDrift entity={entity} />
      </Card>

      {/* 4. ARTICLES & MEDIA */}
      <Card>
        <TopArticles articles={articles} />
      </Card>

      <Card>
        <PublisherBreakdown
          publishers={
            safeArray(
              entity.publishers ||
                entity.publisher_breakdown ||
                entity.publisherBreakdown
            )
          }
        />
      </Card>

      <Card>
        <PublisherBiasMeters entity={entity} />
      </Card>

      <Card>
        <PublisherReliabilityScatter entity={entity} />
      </Card>

      <Card>
        <PublisherShift entity={entity} />
      </Card>

      <Card>
        <PublisherTimeline entity={entity} />
      </Card>

      {/* 5. INFLUENCE & NETWORK */}
      <Card>
        <EntityInfluenceGraph entity={entity} />
      </Card>

      <Card>
        <RelatedEntities
          entities={safeArray(entity.related_entities)}
          topics={topics.map((t: any) => t.name || t.topic || "")}
        />
      </Card>

      {/* 6. RISK & FORECASTING */}
      <Card>
        <RiskIndicators entity={entity} />
      </Card>

      <Card>
        <RiskTrajectory entity={entity} />
      </Card>

      <Card>
        <ForecastConfidence entity={entity} />
      </Card>

      <Card>
        <Forecasting entity={entity} />
      </Card>

      {/* 7. EVENTS & CHANGE DETECTION */}
      <Card>
        <EventTimeline entity={entity} />
      </Card>

      <Card>
        <WhatChanged entity={entity} />
      </Card>

      <Card>
        <WhyThisMatters entity={entity} />
      </Card>

      <Card>
        <RecommendedActions entity={entity} />
      </Card>

      {/* 8. VOLUME & VELOCITY */}
      <Card>
        <VolumeVelocity
          count24h={safeNum(entity.article_count_24h)}
          count7d={safeNum(entity.article_count_7d)}
          velocity={safeNum(entity.velocity)}
          diversity={safeNum(entity.publisher_diversity_score)}
        />
      </Card>

      <Card>
        <VelocityAcceleration entity={entity} />
      </Card>

      <Card>
        <RollingMetrics
          avg7={safeNum(entity.avg7)}
          avg30={safeNum(entity.avg30)}
          volatility={safeNum(entity.volatility)}
          zscore={safeNum(entity.zscore)}
        />
      </Card>

    </div>
  );
}
