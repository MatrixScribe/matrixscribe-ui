import React from "react";

interface EntityInfluenceGraphProps {
  entity: any;
}

export default function EntityInfluenceGraph({ entity }: EntityInfluenceGraphProps) {
  if (!entity || typeof entity !== "object") return null;

  // Ensure related_entities is ALWAYS an array
  const raw = entity.related_entities;
  const related = Array.isArray(raw) ? raw : [];

  // Avoid divide-by-zero
  const count = related.length > 0 ? related.length : 1;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Influence graph
      </div>

      <div className="relative w-full h-64 bg-sandstone dark:bg-surface rounded-xl flex items-center justify-center">

        {/* Central node */}
        <div className="absolute text-center">
          <div className="font-medium text-charcoal">
            {entity.name ?? "Unknown"}
          </div>
          <div className="text-xs text-charcoal-light">Central node</div>
        </div>

        {/* Related nodes */}
        {related.map((r: any, i: number) => {
          const name = r?.name ?? "Unknown";
          const strength =
            typeof r?.strength === "number" && !isNaN(r.strength)
              ? r.strength
              : 0;

          const angle = (i / count) * 2 * Math.PI;
          const radius = 110;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <div className="px-2 py-1 bg-surface rounded-md shadow-subtle text-xs text-charcoal-mid">
                {name}
              </div>
              <div className="text-[10px] text-charcoal-light mt-1">
                Strength {Math.round(strength * 100)}%
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        This influence graph visualizes how closely connected this entity is to
        others in the ecosystem. The strength score reflects co‑coverage,
        narrative overlap, and sentiment co‑movement.
      </p>
    </div>
  );
}
