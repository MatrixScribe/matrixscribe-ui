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

import { cookies } from "next/headers";

export default async function EntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ⭐ UNWRAP THE PROMISE
  console.log("SLUG:", slug);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/entities/${slug}`, {
    cache: "no-store",
    next: { revalidate: 0 },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const entity = res.ok ? await res.json() : null;

  return (
    <Grid>
      {/* LEFT COLUMN */}
      <div className="col-span-3 space-y-4">
        <Card>
          {entity ? (
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
          ) : (
            <div className="text-charcoal-light text-sm">Entity unavailable</div>
          )}
        </Card>

        {entity && (
          <Card>
            <RollingMetrics
              avg7={entity.sentiment_7d_avg}
              avg30={entity.sentiment_30d_avg}
              volatility={entity.sentiment_volatility}
              zscore={entity.sentiment_zscore}
            />
          </Card>
        )}

        {entity && (
          <Card>
            <VolumeVelocity
              count24h={entity.article_count_24h}
              count7d={entity.article_count_7d}
              velocity={entity.velocity}
              diversity={entity.publisher_diversity_score}
            />
          </Card>
        )}

        {entity && (
          <Card>
            <SentimentMomentum entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <VelocityAcceleration entity={entity} />
          </Card>
        )}
      </div>

      {/* CENTER COLUMN */}
      <div className="col-span-6 space-y-4">
        <Card>
          {entity?.timeline ? (
            <TimelineChart
              data={entity.timeline}
              confidence={entity.timeline_confidence}
            />
          ) : (
            <div className="h-64 flex items-center justify-center text-charcoal-light text-sm">
              Timeline will render here
            </div>
          )}
        </Card>

        {entity && (
          <Card>
            <TopArticles articles={entity.top_articles} />
          </Card>
        )}

        {entity && (
          <Card>
            <WhatChanged entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <KeywordExtraction entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <EntityScorecard entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <ScenarioModule entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <InfluenceNetwork entity={entity} />
          </Card>
        )}
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-3 space-y-4">
        <Card>
          {entity?.publishers ? (
            <PublisherBreakdown publishers={entity.publishers} />
          ) : (
            <div className="text-charcoal-light text-sm">No publisher data</div>
          )}
        </Card>

        <Card>
          {entity?.alerts?.length ? (
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

        {entity && (
          <Card>
            <RelatedEntities
              entities={entity.related_entities}
              topics={entity.topics}
            />
          </Card>
        )}

        {entity && (
          <Card>
            <PublisherShift entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <RiskTrajectory entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <ForecastConfidence entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <SourceDiversityWheel entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <CoverageMap entity={entity} />
          </Card>
        )}

        {entity && (
          <Card>
            <EntityComparisonRadar entity={entity} />
          </Card>
        )}
      </div>
    </Grid>
  );
}
