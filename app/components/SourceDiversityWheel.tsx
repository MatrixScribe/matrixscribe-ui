import React from "react";

interface SourceDiversityWheelProps {
  entity: any;
}

export default function SourceDiversityWheel({ entity }: SourceDiversityWheelProps) {
  if (!entity || !entity.source_geography) return null;

  const geo = entity.source_geography;

  const segments = [
    { label: "Local", value: geo.local, color: "var(--color-charcoal-mid)" },
    { label: "Regional", value: geo.regional, color: "var(--color-sandstone-border)" },
    { label: "International", value: geo.international, color: "var(--color-charcoal-light)" },
  ];

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let cumulative = 0;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Source diversity wheel
      </div>

      {/* Radial wheel */}
      <div className="relative w-full h-56 flex items-center justify-center">
        <svg
          width="180"
          height="180"
          viewBox="0 0 32 32"
          className="rotate-[-90deg]"
        >
          {segments.map((s, i) => {
            const start = cumulative / total;
            const end = (cumulative + s.value) / total;
            cumulative += s.value;

            return (
              <circle
                key={i}
                r="16"
                cx="16"
                cy="16"
                fill="transparent"
                stroke={s.color}
                strokeWidth="6"
                strokeDasharray={`${(end - start) * 100} ${100}`}
                strokeDashoffset={-start * 100}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute text-center">
          <div className="text-sm font-medium text-charcoal">
            {total} sources
          </div>
          <div className="text-xs text-charcoal-light">coverage mix</div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm text-charcoal-mid">
                {s.label}
              </span>
            </div>

            <span className="text-sm text-charcoal-light">
              {s.value}%
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        This wheel visualizes the geographic diversity of coverage. A strong
        local base indicates domestic relevance, while regional and
        international contributions highlight broader narrative reach.
      </p>
    </div>
  );
}
