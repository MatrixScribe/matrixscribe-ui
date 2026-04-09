console.log("RUNNING FILE:", __filename);

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import Grid from "../../components/Grid";
import Card from "../../components/Card";
import EntityHeader from "../../components/EntityHeader";
import AlertBanner from "../../components/AlertBanner";
import TimelineChart from "../../components/TimelineChart";

import RollingMetrics from "../../components/RollingMetrics";
import VolumeVelocity from "../../components/VolumeVelocity";
import PublisherBreakdown from "../../components/PublisherBreakdown";
import TopArticles from "../../components/TopArticles";
import RelatedEntities from "../../components/RelatedEntities";

import KeywordExtraction from "../../components/KeywordExtraction";
import RiskTrajectory from "../../components/RiskTrajectory";
import SourceDiversityWheel from "../../components/SourceDiversityWheel";
import ForecastConfidence from "../../components/ForecastConfidence";
import VelocityAcceleration from "../../components/VelocityAcceleration";
import EntityScorecard from "../../components/EntityScorecard";
import WhatChanged from "../../components/WhatChanged";
import ScenarioModule from "../../components/ScenarioModule";
import CoverageMap from "../../components/CoverageMap";
import SentimentMomentum from "../../components/SentimentMomentum";
import PublisherShift from "../../components/PublisherShift";
import InfluenceNetwork from "../../components/InfluenceNetwork";
import EntityComparisonRadar from "../../components/EntityComparisonRadar";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

// ------------------------------
// Safe backend fetch with JWT
// ------------------------------
async function safeFetch(path: string, token: string) {
  try {
    const url = `${API_BASE}${path}`;
    console.log("FETCHING:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Entity API error:", url, res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Entity API fetch failed:", err);
    return null;
  }
}

// ------------------------------
// Normalize arrays safely
// ------------------------------
function normalizeArray(raw: any) {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => ({
    ...item,
    name: item.name ?? "",
    count: item.count ?? 0,
  }));
}

export default async function EntityPage({
  params,
}: {
  params: { slug: string };
}) {
  // ------------------------------
  // 1. AUTH CHECK
  // ------------------------------
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { slug } = params;
  console.log("SLUG:", slug);

  // ------------------------------
  // 2. FETCH ENTITY DATA
  // ------------------------------
  const data = await safeFetch(`/api/entity/${slug}`, token);

  if (!data || !data.entity) {
    return (
      <Grid>
        <Card>
          <div className="text-charcoal-light text-sm">
            Entity unavailable or not found.
          </div>
        </Card>
      </Grid>
    );
  }

  const entity = {
    ...data.entity,
    timeline: data.timeline ?? [],
    top_articles: data.articles ?? [],
    publishers: normalizeArray(data.publishers),
    related_entities: normalizeArray(data.related),
    topics: normalizeArray(data.topics),
    tags: normalizeArray(data.tags),
    risk: data.risk ?? {},
    alerts: data.alerts ?? [],
    forecast: data.forecast ?? {},
    events: data.events ?? [],
    comparison: data.comparison ?? [],
    insights: data.insights ?? [],
  };

  // ------------------------------
  // 3. RENDER PAGE
  // ------------------------------
  return (
    <Grid>
      {/* LEFT COLUMN */}
      <div className="col-span-3 space-y-4">
        <Card>
          <EntityHeader
            name={entity.name}
            type={entity.type}
            region={entity.region}
            updatedAt={entity.updatedAt}
            sentiment={entity.sentiment}
            sources={entity.sources}
            confidence={entity.confidence}
            data={entity.sparkline}
          />
        </Card>

        <Card>
          <RollingMetrics
            avg7={entity.sentiment_7d_avg}
            avg30={entity.sentiment_30d_avg}
            volatility={entity.sentiment_volatility}
            zscore={entity.sentiment_zscore}
          />
        </Card>

        <Card>
          <VolumeVelocity
            count24h={entity.article_count_24h}
            count7d={entity.article_count_7d}
            velocity={entity.velocity}
            diversity={entity.publisher_diversity_score}
          />
        </Card>

        <Card>
          <SentimentMomentum entity={entity} />
        </Card>

        <Card>
          <VelocityAcceleration entity={entity} />
        </Card>
      </div>

      {/* CENTER COLUMN */}
      <div className="col-span-6 space-y-4">
        <Card>
          <TimelineChart
            data={entity.timeline}
            confidence={entity.timeline_confidence}
          />
        </Card>

        <Card>
          <TopArticles articles={entity.top_articles} />
        </Card>

        <Card>
          <WhatChanged entity={entity} />
        </Card>

        <Card>
          <KeywordExtraction entity={entity} />
        </Card>

        <Card>
          <EntityScorecard entity={entity} />
        </Card>

        <Card>
          <ScenarioModule entity={entity} />
        </Card>

        <Card>
          <InfluenceNetwork entity={entity} />
        </Card>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 space-y-4">
        <Card>
          <PublisherBreakdown publishers={entity.publishers} />
        </Card>

        <Card>
          {entity.alerts.length ? (
            entity.alerts.map((a: any, i: number) => (
              <div key={i} className="mb-3">
                <div className="font-medium text-charcoal">{a.message}</div>
                <div className="text-xs text-charcoal-light">{a.timestamp}</div>
              </div>
            ))
          ) : (
            <AlertBanner
              message="No critical alerts at this time."
              severity="info"
            />
          )}
        </Card>

        <Card>
          <RelatedEntities
            entities={entity.related_entities}
            topics={entity.topics}
          />
        </Card>

        <Card>
          <PublisherShift entity={entity} />
        </Card>

        <Card>
          <RiskTrajectory entity={entity} />
        </Card>

        <Card>
          <ForecastConfidence entity={entity} />
        </Card>

        <Card>
          <SourceDiversityWheel entity={entity} />
        </Card>

        <Card>
          <CoverageMap entity={entity} />
        </Card>

        <Card>
          <EntityComparisonRadar entity={entity} />
        </Card>
      </div>
    </Grid>
  );
}
