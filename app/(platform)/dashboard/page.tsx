import { cookies } from "next/headers";

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

const API_BASE = "https://sentiment-platform-zgr8.onrender.com/api";

async function safeFetch(path: string, token?: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      // Important for SSR in Next app router
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API error", path, res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (e) {
    console.error("API fetch failed", path, e);
    return null;
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // ---- Fetch all backend data in parallel (with safety) ----
  const [
    newsInsights,      // /api/insights/news
    analyticsData,     // /api/analytics
    alertsStore,       // /api/insights/narrative/alerts-store
    entityData,        // /api/entity
    crossSourceData,   // /api/insights/cross-source
    narrativeData,     // /api/insights/narrative
  ] = await Promise.all([
    safeFetch("/insights/news", token),
    safeFetch("/analytics", token),
    safeFetch("/insights/narrative/alerts-store", token),
    safeFetch("/entity", token),
    safeFetch("/insights/cross-source", token),
    safeFetch("/insights/narrative", token),
  ]);

  // ---- Mock fallbacks (kept so the page never breaks) ----
  const mockTimeline = [
    { date: "2024-01-01", value: -0.2 },
    { date: "2024-01-02", value: -0.1 },
    { date: "2024-01-03", value: 0.05 },
    { date: "2024-01-04", value: 0.15 },
    { date: "2024-01-05", value: 0.1 },
    { date: "2024-01-06", value: 0.2, anomaly: true },
    { date: "2024-01-07", value: 0.25 },
  ];

  const mockVolume = {
    count24h: 128,
    count7d: 842,
    velocity: 1.42,
    diversity: 0.67,
  };

  const mockAlerts = [
    {
      id: "1",
      entity: "SARB",
      severity: "critical",
      title: "Sharp negative sentiment shift detected",
      summary:
        "Narrative turned sharply negative following new monetary policy commentary.",
      timestamp: "2h ago",
    },
    {
      id: "2",
      entity: "Eskom",
      severity: "warning",
      title: "Volume spike detected",
      summary:
        "Unusual increase in article volume over the last 24 hours.",
      timestamp: "5h ago",
    },
  ];

  const mockEntities = [
    { id: 1, name: "SARB", sentiment: -0.32, volume: 128, velocity: 1.42 },
    { id: 2, name: "Eskom", sentiment: -0.12, volume: 98, velocity: 1.12 },
    { id: 3, name: "Transnet", sentiment: 0.18, volume: 76, velocity: 0.92 },
  ];

  const mockEntity = {
    name: "SARB",
    sentiment: 0.12,
    sentiment_7d_avg: 0.08,
    sentiment_30d_avg: 0.02,
    risk_indicators: {
      market_risk: 0.33,
      policy_risk: 0.42,
      reputational_risk: 0.27,
    },
    forecast: {
      next_7d: [
        { value: 0.1 },
        { value: 0.11 },
        { value: 0.12 },
        { value: 0.13 },
        { value: 0.14 },
        { value: 0.15 },
        { value: 0.16 },
      ],
    },
    article_count_24h: 128,
    article_count_7d: 842,
    publisher_diversity_score: 0.67,
    publisher_shift: [
      { name: "Business Day", shift: "+12%" },
      { name: "Reuters", shift: "-4%" },
      { name: "Bloomberg", shift: "+7%" },
    ],
    related_entities: [
      { name: "National Treasury", score: 0.61 },
      { name: "Finance Ministry", score: 0.54 },
      { name: "Reserve Bank", score: 0.72 },
    ],
  };

  const mockPublishers = [
    { name: "Business Day", count: 42 },
    { name: "Reuters", count: 38 },
    { name: "Bloomberg", count: 31 },
    { name: "News24", count: 27 },
    { name: "Daily Maverick", count: 19 },
    { name: "IOL", count: 14 },
  ];

  const mockArticles = [
    {
      title: "SARB signals cautious stance on inflation outlook",
      source: "Business Day",
      timestamp: "2h ago",
    },
    {
      title: "Market reacts to SARB policy comments",
      source: "Reuters",
      timestamp: "4h ago",
    },
    {
      title: "Analysts debate SARB’s next move",
      source: "Bloomberg",
      timestamp: "6h ago",
    },
    {
      title: "Public sentiment shifts around monetary policy",
      source: "News24",
      timestamp: "8h ago",
    },
    {
      title: "Economic uncertainty drives narrative volatility",
      source: "Daily Maverick",
      timestamp: "12h ago",
    },
  ];

  // ---- Light mapping with safe fallbacks ----
  const timelineData =
    newsInsights?.timeline ??
    newsInsights?.sentiment_timeline ??
    mockTimeline;

  const volumeData = {
    count24h:
      analyticsData?.count24h ??
      analyticsData?.volume_24h ??
      mockVolume.count24h,
    count7d:
      analyticsData?.count7d ??
      analyticsData?.volume_7d ??
      mockVolume.count7d,
    velocity:
      analyticsData?.velocity ??
      analyticsData?.velocity_index ??
      mockVolume.velocity,
    diversity:
      analyticsData?.diversity ??
      analyticsData?.publisher_diversity ??
      mockVolume.diversity,
  };

  const alertsData =
    alertsStore?.alerts ??
    alertsStore ??
    mockAlerts;

  const entitiesData =
    newsInsights?.top_entities ??
    entityData?.entities ??
    entityData ??
    mockEntities;

  const primaryEntity =
    entityData?.entity ??
    entityData?.primary ??
    entityData?.[0] ??
    mockEntity;

  const publishersData =
    crossSourceData?.publishers ??
    crossSourceData?.publisher_breakdown ??
    mockPublishers;

  const articlesData =
    newsInsights?.top_articles ??
    newsInsights?.recent_articles ??
    mockArticles;

  const narrativeEntity =
    narrativeData?.entity ??
    primaryEntity ??
    mockEntity;

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
            Sentiment Overview
          </h2>
          <SentimentTimeline data={timelineData} width={500} height={180} />
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
          <UnifiedTimeline entity={primaryEntity.name ?? "SARB"} />
        </div>
      </div>

      {/* Topic heatmap */}
      <div className="surface p-4 shadow-subtle">
        <TopicHeatmap entity={primaryEntity.name ?? "SARB"} />
      </div>
    </div>
  );
}
