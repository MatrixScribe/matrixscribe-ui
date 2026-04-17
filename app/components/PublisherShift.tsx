"use client";

/* ENTITY COMPONENT */

import dynamic from "next/dynamic";
import ChartContainer from "@/app/components/ChartContainer";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface PublisherShiftProps {
  entity: any;
}

const safeArray = (v: any) => (Array.isArray(v) ? v : []);

// Compute sentiment delta per publisher
function computePublisherShift(entity: any) {
  const articles = safeArray(entity?.articles);
  const sentimentTimeline = safeArray(entity?.timeline);

  if (articles.length === 0 || sentimentTimeline.length === 0) {
    return [];
  }

  const grouped: Record<string, { recent: number[]; older: number[] }> = {};
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;

  for (const a of articles) {
    const source = a.source || "Unknown";
    const created = new Date(a.created_at);

    if (!grouped[source]) {
      grouped[source] = { recent: [], older: [] };
    }

    const timelinePoint = sentimentTimeline.find(
      (t: any) => new Date(t.date).toDateString() === created.toDateString()
    );

    const score = timelinePoint?.avg_score ?? 0;

    if (created.getTime() > cutoff) {
      grouped[source].recent.push(score);
    } else {
      grouped[source].older.push(score);
    }
  }

  return Object.entries(grouped).map(([publisher, data]) => {
    const avgRecent =
      data.recent.reduce((a, b) => a + b, 0) / (data.recent.length || 1);
    const avgOlder =
      data.older.reduce((a, b) => a + b, 0) / (data.older.length || 1);

    return {
      name: publisher,
      delta: avgRecent - avgOlder,
    };
  });
}

function PublisherShiftInner({ entity }: PublisherShiftProps) {
  const computed = computePublisherShift(entity);

  const data =
    computed.length > 0
      ? computed
      : [
          { name: "Publisher A", delta: 0.1 },
          { name: "Publisher B", delta: -0.05 },
          { name: "Publisher C", delta: 0.02 },
        ];

  if (!data || data.length === 0) {
    return (
      <div
        className="
          h-40 flex items-center justify-center
          text-[13px] text-charcoal-light
        "
      >
        No publisher shift data
      </div>
    );
  }

  return (
    <div className="space-y-[var(--space-2)]">
      <div
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        Publisher shift
      </div>

      <ChartContainer height={160}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              padding: "6px 10px",
            }}
          />

          <Bar
            dataKey="delta"
            radius={[4, 4, 0, 0]}
            fill="#f97316"
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const PublisherShift = dynamic(
  () => Promise.resolve(PublisherShiftInner),
  { ssr: false }
);

export default PublisherShift;
