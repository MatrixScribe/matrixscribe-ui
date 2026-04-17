"use client";

/* ENTITY COMPONENT */

import React from "react";
import { useRouter } from "next/navigation";

interface RelatedEntity {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface EntityComparisonStripProps {
  entity: {
    related?: RelatedEntity[];
  };
}

export default function EntityComparisonStrip({ entity }: EntityComparisonStripProps) {
  const router = useRouter();

  if (!entity) return null;

  const raw = entity.related;
  const items: RelatedEntity[] = Array.isArray(raw) ? raw : [];

  if (items.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-charcoal-light text-sm">
        No related entities found
      </div>
    );
  }

  const maxCount = Math.max(...items.map((e) => e.count || 1));

  const normalized = items.map((e) => ({
    ...e,
    score: maxCount > 0 ? e.count / maxCount : 0,
  }));

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Entity comparison strip
      </div>

      <div className="flex flex-col gap-2">
        {normalized.map((e, i) => (
          <div
            key={i}
            onClick={() => router.push(`/dashboard?entity=${e.slug}`)}
            className="flex items-center justify-between bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 cursor-pointer hover:bg-sandstone/60 transition"
          >
            <span className="text-sm text-charcoal-mid">{e.name}</span>
            <span className="text-xs text-charcoal-light">
              {(e.score * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Comparison based on co‑mention frequency across recent coverage.
      </p>
    </div>
  );
}
