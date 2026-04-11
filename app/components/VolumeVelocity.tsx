import React from "react";

interface VolumeVelocityProps {
  count24h: number | null | undefined;
  count7d: number | null | undefined;
  velocity: number | null | undefined;
  diversity: number | null | undefined;
}

export default function VolumeVelocity({
  count24h,
  count7d,
  velocity,
  diversity,
}: VolumeVelocityProps) {
  const safeNum = (v: any) =>
    typeof v === "number" && !isNaN(v) ? v : null;

  const items = [
    { label: "Articles (24h)", value: safeNum(count24h) },
    { label: "Articles (7d)", value: safeNum(count7d) },
    {
      label: "Velocity",
      value: safeNum(velocity) !== null ? safeNum(velocity)!.toFixed(2) : "—",
    },
    {
      label: "Publisher diversity",
      value: safeNum(diversity) !== null ? safeNum(diversity)!.toFixed(2) : "—",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Volume & velocity
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((m, i) => (
          <div
            key={i}
            className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1"
          >
            <div className="text-xs text-charcoal-light uppercase tracking-wide">
              {m.label}
            </div>

            <div className="text-sm font-medium text-charcoal dark:text-neutral-100">
              {m.value === null ? "—" : m.value}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Volume and velocity measure narrative intensity and speed.
      </p>
    </div>
  );
}
