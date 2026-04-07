import React from "react";

export default function KeywordExtraction({ entity }: any) {
  if (!entity) return null;

  const keywords = entity.keywords ?? [
    "interest rates",
    "inflation",
    "policy stance",
    "economic outlook",
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Keyword extraction
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((k: string, i: number) => (
          <span
            key={i}
            className="px-2 py-1 rounded-full bg-sandstone/60 dark:bg-neutral-900/60 text-xs text-charcoal-mid"
          >
            {k}
          </span>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Extracted keywords represent dominant concepts shaping the narrative.
      </p>
    </div>
  );
}
