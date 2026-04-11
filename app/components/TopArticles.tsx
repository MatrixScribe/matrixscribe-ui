import React from "react";

interface TopArticlesProps {
  articles: {
    id: number;
    content?: string;
    source?: string;
    created_at?: string;
    url?: string;
  }[];
}

export default function TopArticles({ articles }: TopArticlesProps) {
  const safeArticles = Array.isArray(articles) ? articles : [];
  const top = safeArticles.slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Top articles
      </div>

      <div className="space-y-3">
        {top.map((a) => {
          const content = typeof a.content === "string" ? a.content : "";
          const source = a.source ?? "Unknown source";
          const timestamp = a.created_at
            ? new Date(a.created_at).toLocaleString()
            : "Unknown time";

          return (
            <div key={a.id} className="space-y-1">
              <div className="text-sm font-medium text-charcoal dark:text-neutral-100">
                {content.length > 0 ? content.slice(0, 120) + "..." : "No content available"}
              </div>

              <div className="text-xs text-charcoal-light dark:text-neutral-500">
                {source} · {timestamp}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        These are the most influential or recent articles shaping the current
        narrative.
      </p>
    </div>
  );
}
