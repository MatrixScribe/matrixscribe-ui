import Card from "@/app/components/Card";
import EntityHeader from "@/app/components/EntityHeader";
import EntityScorecard from "@/app/components/EntityScorecard";
import SentimentTimeline from "@/app/components/SentimentTimeline";
import KeywordExtraction from "@/app/components/KeywordExtraction";
import TopArticles from "@/app/components/TopArticles";
import RelatedEntities from "@/app/components/RelatedEntities";
import RiskIndicators from "@/app/components/RiskIndicators";
import EventTimeline from "@/app/components/EventTimeline";

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
  const { entity, timeline, articles, topics, tags, risk } = data;

  return (
    <div className="p-6 space-y-8">

      {/* ENTITY HEADER */}
      <Card>
  <EntityHeader
    name={entity.name}
    type={entity.type}
    region={entity.region}
    updatedAt={entity.updated_at}
    articleCount={articles.length}
    topicCount={topics.length}
    sentimentBuckets={risk.sentiment || []}
  />
</Card>

      {/* SCORECARD */}
      <Card>
        <EntityScorecard
          articleCount={articles.length}
          topicCount={topics.length}
          tagCount={tags.length}
          sentimentBucketCount={risk.sentiment?.length || 0}
        />
      </Card>

      {/* SENTIMENT TIMELINE */}
      <Card>
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wide text-charcoal-light">
            Sentiment timeline
          </div>

          <SentimentTimeline
            data={timeline.map((t: any) => ({
              date: t.date,
              value: Number(t.avg_score) || 0,
            }))}
          />
        </div>
      </Card>

      {/* KEYWORD EXTRACTION */}
      <Card>
        <KeywordExtraction entity={entity} />
      </Card>

      {/* TOP ARTICLES */}
      <Card>
        <TopArticles articles={articles} />
      </Card>

      {/* RELATED ENTITIES */}
      <Card>
        <RelatedEntities
          entities={entity.related_entities || []}
          topics={topics.map((t: any) => t.name)}
        />
      </Card>

      {/* RISK INDICATORS */}
      <Card>
        <RiskIndicators entity={entity} />
      </Card>

      {/* EVENT TIMELINE */}
      <Card>
        <EventTimeline entity={entity} />
      </Card>

    </div>
  );
}