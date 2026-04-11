import React from "react";

export default function TopicDrift({ entity }: any) {
  // Ensure entity is a safe object
  if (!entity || typeof entity !== "object") return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Topic drift
      </div>

      <div className="h-40 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Topic drift placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Topic drift shows how dominant themes shift over time.
      </p>
    </div>
  );
}
