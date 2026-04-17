import { redirect } from "next/navigation";
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

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function safeFetch(path: string, token?: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const safeArray = (x: any) => (Array.isArray(x) ? x : []);

export default async function DashboardPage({ searchParams }: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const topEntities = await safeFetch("/api/entities/top", token);

  const primaryEntitySlug =
    searchParams?.entity ||
    (topEntities && topEntities.length > 0 ? topEntities[0].slug : "sarb");

  const [
    newsInsights,
    analyticsData,
    alertsStore,
    entityData,
    crossSourceData,
    narrativeData,
  ] = await Promise.all([
    safeFetch("/api/insights/news", token),
    safeFetch("/api/analytics", token),
    safeFetch("/api/insights/narrative/alerts-store", token),
    safeFetch(`/api/entity/${primaryEntitySlug}`, token),
    safeFetch("/api/insights/cross-source", token),
    safeFetch("/api/insights/narrative", token),
  ]);

  const isReady =
    newsInsights &&
    analyticsData &&
    entityData &&
    crossSourceData &&
    narrativeData;

  if (!isReady) {
    return (
      <div className="p-10 text-center text-charcoal">
        <h1 className="text-xl font-semibold">Loading intelligence…</h1>
        <p className="text-sm opacity-70">Fetching real‑time data</p>
      </div>
    );
  }

  const timelineData = safeArray(
    newsInsights?.timeline ??
      newsInsights?.sentiment_timeline ??
      entityData?.timeline ??
      []
  );

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

  const alertsData = safeArray(alertsStore?.alerts ?? alertsStore ?? []);
  const entitiesData = safeArray(topEntities ?? []);

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

  const articlesData = safeArray(
    newsInsights?.top_articles ??
      newsInsights?.recent_articles ??
      entityData?.articles ??
      []
  );

  const narrativeEntity =
    narrativeData?.entity ?? primaryEntity ?? entityData ?? null;

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="surface p-4 shadow-subtle">
          <h2 className="text-sm font-medium text-charcoal mb-3">
            Sentiment Overview — {primaryEntity?.name}
          </h2>
          {timelineData.length > 0 && <SentimentTimeline data={timelineData} />}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="surface p-4 shadow-subtle">
          <NarrativeSummary entity={narrativeEntity} />
        </div>

        <div className="surface p-4 shadow-subtle">
          <UnifiedTimeline entity={primaryEntity} />
        </div>
      </div>

      <div className="surface p-4 shadow-subtle">
        <TopicHeatmap entity={primaryEntity} />
      </div>
    </div>
  );
}
