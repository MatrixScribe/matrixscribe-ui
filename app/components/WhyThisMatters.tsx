import React from "react";

export default function WhyThisMatters({ entity }: any) {
  // Ensure entity is a safe object
  if (!entity || typeof entity !== "object") return null;

  // Static points — safe by design
  const points = [
    "Sentiment shifts are accelerating, indicating increased narrative sensitivity.",
    "Publisher tone changes suggest coordinated or emerging story pressure.",
    "Risk indicators show early signs of volatility that may influence market perception.",
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Why this matters
      </div>

      <div className="space-y-2">
        {points.map((p, i) => (
          <div
            key={i}
            className="bg-sandstone dark:bg-surface rounded-md p-3"
          >
            <div className="text-sm text-charcoal-mid leading-relaxed">
              {p}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Highlights why the current narrative environment is strategically
        important.
      </p>
    </div>
  );
}
