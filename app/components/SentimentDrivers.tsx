import React from "react";

export default function SentimentDrivers({ entity }: any) {
  if (!entity || typeof entity !== "object") return null;

  // Ensure drivers is ALWAYS an array of strings
  const raw = entity.drivers;
  const drivers = Array.isArray(raw)
    ? raw.map((d) => (typeof d === "string" ? d : String(d ?? "")))
    : [
        "Policy commentary",
        "Market volatility",
        "Regional economic updates",
      ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Sentiment drivers
      </div>

      <div className="space-y-2">
        {drivers.map((d: string, i: number) => (
          <div
            key={i}
            className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 text-sm text-charcoal-mid"
          >
            {d || "—"}
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Drivers highlight the factors most responsible for sentiment movement.
      </p>
    </div>
  );
}
