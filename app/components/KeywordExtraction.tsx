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
    <div className="space-y-[var(--space-2)]">
      <div
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        Keyword extraction
      </div>

      <div className="flex flex-wrap gap-[var(--space-1)]">
        {keywords.map((k: string, i: number) => (
          <span
            key={i}
            className="
              px-2 py-1 rounded-full
              text-[11px] leading-tight text-charcoal-mid
              bg-gradient-to-b from-sandstone/60 to-sandstone/40
              dark:from-neutral-900/70 dark:to-neutral-900/50
              border border-black/5 dark:border-white/5
              shadow-[var(--shadow-xs)] dark:shadow-[var(--shadow-xs-dark)]
              backdrop-blur-sm
            "
          >
            {k}
          </span>
        ))}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        Extracted keywords represent dominant concepts shaping the narrative.
      </p>
    </div>
  );
}
