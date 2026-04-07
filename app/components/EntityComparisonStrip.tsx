import React from "react";

export default function EntityComparisonStrip({ entity }: any) {
  if (!entity) return null;

  const items = entity.related_entities ?? [
    { name: "National Treasury", score: 0.61 },
    { name: "Finance Ministry", score: 0.54 },
    { name: "Reserve Bank", score: 0.72 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Entity comparison strip
      </div>

      <div className="flex flex-col gap-2">
        {items.map((e: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3"
          >
            <span className="text-sm text-charcoal-mid">{e.name}</span>
            <span className="text-xs text-charcoal-light">
              {(e.score * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        A compact comparison of related entities across key metrics.
      </p>
    </div>
  );
}
