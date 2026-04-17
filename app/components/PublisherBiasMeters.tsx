import React from "react";

export default function PublisherBiasMeters({ entity }: any) {
  if (!entity || typeof entity !== "object") return null;

  const raw = entity.biases;
  const biases = Array.isArray(raw)
    ? raw
    : [
        { name: "Business Day", score: 0.12 },
        { name: "Reuters", score: -0.05 },
        { name: "Bloomberg", score: 0.08 },
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
        Publisher bias meters
      </div>

      <div className="space-y-[var(--space-1)]">
        {biases.map((b: any, i: number) => {
          const name = b?.name ?? "Unknown";
          const score =
            typeof b?.score === "number" && !isNaN(b.score) ? b.score : 0;

          return (
            <div key={i} className="space-y-[2px]">
              <div
                className="
                  flex justify-between
                  text-[11px] tracking-wide
                  text-charcoal-light
                "
              >
                <span>{name}</span>
                <span>{(score * 100).toFixed(0)}%</span>
              </div>

              <div
                className="
                  w-full h-2 rounded-full overflow-hidden
                  bg-sandstone/40 dark:bg-neutral-900/40
                "
              >
                <div
                  className={`
                    h-full
                    ${score >= 0 ? "bg-green-600" : "bg-red-600"}
                  `}
                  style={{ width: `${Math.abs(score) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[12px] text-charcoal-light leading-relaxed">
        Bias meters show directional lean in publisher sentiment.
      </p>
    </div>
  );
}
