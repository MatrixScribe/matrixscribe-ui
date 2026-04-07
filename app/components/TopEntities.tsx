"use client";

interface EntityItem {
  id: number;
  name: string;
  sentiment: number; // -1 to 1
  volume: number;
  velocity: number;
}

interface TopEntitiesProps {
  entities: EntityItem[];
}

export default function TopEntities({ entities }: TopEntitiesProps) {
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
        {entities.map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between p-3 rounded-md bg-sandstone/40 dark:bg-neutral-900/40"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-charcoal">{e.name}</span>
              <span className="text-xs text-charcoal-light">
                Volume: {e.volume} • Velocity: {e.velocity.toFixed(2)}
              </span>
            </div>

            <div
              className="text-sm font-semibold"
              style={{
                color:
                  e.sentiment > 0.1
                    ? "#16A34A"
                    : e.sentiment < -0.1
                    ? "var(--color-critical)"
                    : "var(--color-charcoal-mid)",
              }}
            >
              {e.sentiment.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
