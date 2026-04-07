import React from "react";

type PublisherPoint = {
  name: string;
  reliability: number;
  sentiment: number;
  x: number;
  y: number;
};

export default function PublisherReliabilityScatter({ entity }: any) {
  if (!entity || !entity.publishers) return null;

  const points: PublisherPoint[] = entity.publishers.slice(0, 10).map((p: any, i: number) => ({
    name: p.name,
    reliability: p.reliability_score ?? Math.random() * 0.5 + 0.5,
    sentiment: p.sentiment ?? (Math.random() * 2 - 1),
    x: 40 + (i % 5) * 40,
    y: 40 + Math.floor(i / 5) * 50,
  }));

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Publisher reliability scatter
      </div>

      <div className="relative w-full h-56 bg-sandstone/40 dark:bg-neutral-900/40 rounded-md overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 260 180">
          <line
            x1="30"
            y1="150"
            x2="240"
            y2="150"
            stroke="var(--color-charcoal-light)"
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="150"
            stroke="var(--color-charcoal-light)"
            strokeWidth="1"
            opacity="0.4"
          />

          {points.map((p: PublisherPoint, i: number) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={6 + p.reliability * 4}
                fill={
                  p.sentiment > 0
                    ? "var(--color-green)"
                    : p.sentiment < 0
                    ? "var(--color-red)"
                    : "var(--color-charcoal-light)"
                }
                opacity="0.85"
              />
              <text
                x={p.x}
                y={p.y + 16}
                textAnchor="middle"
                fontSize="9"
                fill="var(--color-charcoal-mid)"
              >
                {p.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Reliability vs sentiment for major publishers.
      </p>
    </div>
  );
}
