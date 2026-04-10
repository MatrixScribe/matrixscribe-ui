import React from "react";

interface TopArticlesProps {
  articles: {
    id: number;
    content: string;
    source: string;
    created_at: string;
    url?: string;
  }[];
}

export default function TopArticles({ articles }: TopArticlesProps) {
  const top = (articles || []).slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Top articles
      </div>

      <div className="space-y-3">
        {top.map((a) => (
          <div key={a.id} className="space-y-1">
            <div className="text-sm font-medium text-charcoal dark:text-neutral-100">
              {a.content.slice(0, 120)}...
            </div>

            <div className="text-xs text-charcoal-light dark:text-neutral-500">
              {a.source} · {new Date(a.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        These are the most influential or recent articles shaping the current
        narrative.
      </p>
    </div>
  );
}
