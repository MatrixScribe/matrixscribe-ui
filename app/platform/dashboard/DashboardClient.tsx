"use client";

import { useEffect, useState } from "react";

import SentimentTimeline from "@/app/components/SentimentTimeline";
import VolumeVelocity from "@/app/components/VolumeVelocity";
import AlertsPanel from "@/app/components/AlertsPanel";
import TopicHeatmap from "@/app/components/TopicHeatmap";
import UnifiedTimeline from "@/app/components/UnifiedTimeline";
import TopEntities from "@/app/components/TopEntities";
import PublisherShift from "@/app/components/PublisherShift";
import PublisherBreakdown from "@/app/components/PublisherBreakdown";
import RiskIndicators from "@/app/components/RiskIndicators";
import EntityComparisonStrip from "@/app/components/EntityComparisonStrip";
import TopArticles from "@/app/components/TopArticles";
import NarrativeSummary from "@/app/components/NarrativeSummary";

// ⭐ Add explicit prop types
interface DashboardClientProps {
  apiBase: string;
  primaryEntitySlug: string;
}

export default function DashboardClient({
  apiBase,
  primaryEntitySlug,
}: DashboardClientProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const fetcher = (path: string) =>
        fetch(`${apiBase}${path}`, {
          credentials: "include",
        }).then((r) => r.json());

      const [
        newsInsights,
        analyticsData,
        alertsStore,
        entityData,
        crossSourceData,
        narrativeData,
        topEntities,
      ] = await Promise.all([
        fetcher("/api/insights/news"),
        fetcher("/api/analytics"),
        fetcher("/api/insights/narrative/alerts-store"),
        fetcher(`/api/entity/${primaryEntitySlug}`),
        fetcher("/api/insights/cross-source"),
        fetcher("/api/insights/narrative"),
        fetcher("/api/entities/top"),
      ]);

      setData({
        newsInsights,
        analyticsData,
        alertsStore,
        entityData,
        crossSourceData,
        narrativeData,
        topEntities,
      });
    }

    load();
  }, [apiBase, primaryEntitySlug]);

  if (!data) return <div className="p-6">Loading intelligence…</div>;

  const {
    newsInsights,
    analyticsData,
    alertsStore,
    entityData,
    crossSourceData,
    narrativeData,
    topEntities,
  } = data;

  const timelineData =
    newsInsights?.timeline ??
    newsInsights?.sentiment_timeline ??
    entityData?.timeline ??
    [];

  const volumeData = {
    count24h:
      analyticsData?.count24h ??
      analyticsData?.volume_24h ??
      entityData?.volume?.vol_24h ??
      0,
    count7d:
      analyticsData?.count7d ??
      analyticsData?.volume_7d ??
      entityData?.volume?.vol_7d ??
      0,
    velocity:
      analyticsData?.velocity ??
      analyticsData?.velocity_index ??
      entityData?.velocity ??
      0,
    diversity:
      analyticsData?.diversity ??
      analyticsData?.publisher_diversity ??
      entityData?.publisher_diversity ??
      0,
  };

  const alertsData = alertsStore?.alerts ?? alertsStore ?? [];
  const entitiesData = topEntities ?? [];

  const primaryEntity =
    entityData?.entity ??
    entityData ??
    entitiesData.find((e: any) => e.slug === primaryEntitySlug) ??
    null;

  const publishersData =
    crossSourceData?.publishers ??
    crossSourceData?.publisher_breakdown ??
    entityData?.publishers ??
    [];

  const articlesData =
    newsInsights?.top_articles ??
    newsInsights?.recent_articles ??
    entityData?.articles ??
    [];

  const narrativeEntity =
    narrativeData?.entity ?? primaryEntity ?? entityData ?? null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-charcoal">
            Intelligence Dashboard
          </h1>
          <p className="text-sm text-charcoal-light">
            High-level view of entities, narratives, and risk.
          </p>
        </div>
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface p-4 shadow-subtle">
          <h2 className="text-sm font-medium text-charcoal mb-3">
            Sentiment Overview — {primaryEntity?.name}
          </h2>
          <SentimentTimeline data={timelineData} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <VolumeVelocity
            count24h={volumeData.count24h}
            count7d={volumeData.count7d}
            velocity={volumeData.velocity}
            diversity={volumeData.diversity}
          />
        </div>

        <div className="surface p-4 shadow-subtle">
          <h2 className="text-sm font-medium text-charcoal mb-3">
            Active Alerts
          </h2>
          <AlertsPanel alerts={alertsData} />
        </div>
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface p-4 shadow-subtle">
          <TopEntities entities={entitiesData} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <PublisherShift entity={primaryEntity} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <PublisherBreakdown publishers={publishersData} />
        </div>
      </div>

      {/* Lower middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface p-4 shadow-subtle">
          <RiskIndicators entity={narrativeEntity} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <EntityComparisonStrip entity={primaryEntity} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <TopArticles articles={articlesData} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="surface p-4 shadow-subtle">
          <NarrativeSummary entity={narrativeEntity} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <UnifiedTimeline entity={primaryEntity} />
        </div>
      </div>

      {/* Topic heatmap */}
      <div className="surface p-4 shadow-subtle">
        <TopicHeatmap entity={primaryEntity} />
      </div>
    </div>
  );
}
