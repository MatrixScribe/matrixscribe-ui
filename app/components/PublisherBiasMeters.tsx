import React from "react";

export default function PublisherBiasMeters({ entity }: any) {
  if (!entity) return null;

  const biases = entity.biases ?? [
    { name: "Business Day", score: 0.12 },
    { name: "Reuters", score: -0.05 },
    { name: "Bloomberg", score: 0.08 },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Publisher bias meters
      </div>

      <div className="space-y-2">
        {biases.map((b: any, i: number) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs text-charcoal-light">
              <span>{b.name}</span>
              <span>{(b.score * 100).toFixed(0)}%</span>
            </div>

            <div className="w-full h-2 bg-sandstone/40 dark:bg-neutral-900/40 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  b.score >= 0 ? "bg-green-600" : "bg-red-600"
                }`}
                style={{ width: `${Math.abs(b.score) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Bias meters show directional lean in publisher sentiment.
      </p>
    </div>
  );
}
