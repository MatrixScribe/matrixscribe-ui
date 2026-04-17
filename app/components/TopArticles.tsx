"use client";

import React from "react";

interface ArticleItem {
  id: number;
  content?: string;
  source?: string;
  created_at?: string;
  url?: string;
  external_id?: string;
}

interface TopArticlesProps {
  articles: ArticleItem[];
}

export default function TopArticles({ articles }: TopArticlesProps) {
  const safeArticles = Array.isArray(articles) ? articles : [];
  const top = safeArticles.slice(0, 5);

  if (top.length === 0) {
    return (
      <div
        className="
          h-32 flex items-center justify-center
          text-[13px] text-charcoal-light
        "
      >
        No articles available
      </div>
    );
  }

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
        Top articles
      </div>

      <div className="space-y-[var(--space-2)]">
        {top.map((a) => {
          const content =
            typeof a.content === "string" && a.content.trim().length > 0
              ? a.content.trim()
              : "No content available";

          const preview =
            content.length > 140 ? content.slice(0, 140) + "…" : content;

          const source = a.source ?? "Unknown source";

          const timestamp = a.created_at
            ? new Date(a.created_at).toLocaleString()
            : "Unknown time";

          const link = a.url || a.external_id || null;

          return (
            <div
              key={a.id}
              className="space-y-[var(--space-1)] leading-relaxed"
            >
              <div
                className="
                  text-[13px] font-semibold tracking-tight
                  text-charcoal dark:text-neutral-100
                "
              >
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {preview}
                  </a>
                ) : (
                  preview
                )}
              </div>

              <div
                className="
                  text-[11px]
                  tracking-wide
                  text-charcoal-light dark:text-neutral-500
                "
              >
                {source} · {timestamp}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        These are the most influential or recent articles shaping the current narrative.
      </p>
    </div>
  );
}
