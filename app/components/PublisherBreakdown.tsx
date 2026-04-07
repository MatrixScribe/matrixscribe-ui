import React from "react";

interface PublisherBreakdownProps {
  publishers: { name: string; count: number }[];
}

export default function PublisherBreakdown({
  publishers,
}: PublisherBreakdownProps) {
  const top = publishers.slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Publisher breakdown
      </div>

      <div className="space-y-2">
        {top.map((p, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-charcoal-mid dark:text-neutral-200">
              {p.name}
            </span>
            <span className="text-xs text-charcoal-light dark:text-neutral-500">
              {p.count}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Shows which publishers are driving coverage for this entity. Replace
        with richer visuals later if needed.
      </p>
    </div>
  );
}
