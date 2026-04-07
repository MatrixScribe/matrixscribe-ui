import React from "react";

export default function SourceGeography({ entity }: any) {
  if (!entity) return null;

  const regions = entity.source_regions ?? [
    { region: "South Africa", pct: 42 },
    { region: "Africa (ex‑SA)", pct: 18 },
    { region: "Global", pct: 40 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Source geography
      </div>

      <div className="space-y-2">
        {regions.map((r: any, i: number) => (
          <div
            key={i}
            className="flex items-center justify-between bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3"
          >
            <span className="text-sm text-charcoal-mid">{r.region}</span>
            <span className="text-xs text-charcoal-light">{r.pct}%</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Geographic distribution of sources contributing to coverage.
      </p>
    </div>
  );
}
