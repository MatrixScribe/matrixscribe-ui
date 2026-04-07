import React from "react";

export default function CoverageMap({ entity }: any) {
  if (!entity) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Coverage map
      </div>

      <div className="h-48 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Coverage map placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Visualizes geographic coverage intensity. Replace with real geo‑data.
      </p>
    </div>
  );
}
