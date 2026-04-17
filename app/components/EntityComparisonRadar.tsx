"use client";

/* ENTITY COMPONENT */

import React from "react";

export default function EntityComparisonRadar({ entity }: any) {
  if (!entity) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Entity comparison radar
      </div>

      <div className="h-56 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Radar chart placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Compares sentiment, risk, influence, and stability across related
        entities.
      </p>
    </div>
  );
}
