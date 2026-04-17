"use client";

import { useRouter } from "next/navigation";

interface TopEntity {
  id: number;
  name: string;
  slug: string;

  sentiment?: {
    avg: number;
    avg_7d: number;
    avg_30d: number;
  };

  volume?: {
    vol_24h: number;
    vol_7d: number;
  };

  velocity?: number;
  volatility?: number;
  last_seen?: string | null;
}

interface TopEntitiesProps {
  entities: TopEntity[];
}

export default function TopEntities({ entities }: TopEntitiesProps) {
  const router = useRouter();

  if (!entities || entities.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-charcoal-light text-sm">
        No entity data available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Top Entities Today
      </div>

      <div className="space-y-2">
        {entities.map((e) => {
          const sentiment = e.sentiment?.avg ?? 0;
          const vol24 = e.volume?.vol_24h ?? 0;
          const velocity = e.velocity ?? 0;

          return (
            <div
              key={e.id}
              onClick={() => router.push(`/dashboard?entity=${e.slug}`)}
              className="flex items-center justify-between p-3 rounded-md bg-sandstone/40 dark:bg-neutral-900/40 cursor-pointer hover:bg-sandstone/60 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-charcoal">
                  {e.name}
                </span>

                <span className="text-xs text-charcoal-light">
                  Volume: {vol24} • Velocity: {velocity.toFixed(2)}
                </span>
              </div>

              <div
                className="text-sm font-semibold"
                style={{
                  color:
                    sentiment > 0.1
                      ? "#16A34A"
                      : sentiment < -0.1
                      ? "var(--color-critical)"
                      : "var(--color-charcoal-mid)",
                }}
              >
                {sentiment.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
