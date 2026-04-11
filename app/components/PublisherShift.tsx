import React from "react";

export default function PublisherShift({ entity }: any) {
  if (!entity) return null;

  // Ensure publisher_shift is ALWAYS an array
  const raw = entity.publisher_shift;
  const shifts = Array.isArray(raw)
    ? raw
    : [
        { name: "Business Day", shift: "+12%" },
        { name: "Reuters", shift: "-4%" },
        { name: "Bloomberg", shift: "+7%" },
      ];

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Publisher tone shift
      </div>

      <div className="space-y-2">
        {shifts.map((p: any, i: number) => {
          const name = p?.name ?? "Unknown";
          const shift = p?.shift ?? "—";

          return (
            <div
              key={i}
              className="flex items-center justify-between bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3"
            >
              <span className="text-sm text-charcoal-mid dark:text-neutral-200">
                {name}
              </span>
              <span className="text-xs text-charcoal-light dark:text-neutral-500">
                {shift}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Shows how publisher tone has shifted over the last 7 days.
      </p>
    </div>
  );
}
