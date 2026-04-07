import React from "react";

export default function PublisherTimeline({ entity }: any) {
  if (!entity) return null;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Publisher timeline
      </div>

      <div className="h-48 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md flex items-center justify-center text-sm text-charcoal-light">
        Publisher timeline placeholder
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Shows how publisher sentiment evolves over time.
      </p>
    </div>
  );
}
