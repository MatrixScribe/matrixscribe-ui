import React from "react";

export default function InfluenceNetwork({ entity }: any) {
  if (!entity) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Influence network
      </div>

      <div className="h-56 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Influence network placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Visualizes relationships between entities, publishers, and topics.
      </p>
    </div>
  );
}
