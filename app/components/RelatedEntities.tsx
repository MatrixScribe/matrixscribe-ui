import React from "react";

interface RelatedEntitiesProps {
  entities: { name: string; type?: string }[];
  topics: string[];
}

export default function RelatedEntities({
  entities,
  topics,
}: RelatedEntitiesProps) {
  const related = (entities || []).slice(0, 6);
  const topTopics = (topics || []).slice(0, 4);

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Related entities & topics
      </div>

      <div className="space-y-2">
        {related.map((e, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-sm text-charcoal-mid dark:text-neutral-200"
          >
            <span>{e.name}</span>
            {e.type && (
              <span className="text-xs text-charcoal-light dark:text-neutral-500">
                {e.type}
              </span>
            )}
          </div>
        ))}
      </div>

      {topTopics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topTopics.map((t, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-sandstone/60 dark:bg-neutral-900/60 text-charcoal-light"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-charcoal-light leading-relaxed">
        Related entities and topics show the narrative context and adjacency
        around this entity.
      </p>
    </div>
  );
}
