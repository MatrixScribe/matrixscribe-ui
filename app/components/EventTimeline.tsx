import React from "react";

export default function EventTimeline({ entity }: any) {
  if (!entity) return null;

  const events = entity.events || [];

  if (events.length === 0) {
    return (
      <div className="space-y-3">
        <div className="text-xs uppercase tracking-wide text-charcoal-light">
          Event timeline
        </div>

        <div className="h-32 flex items-center justify-center text-xs text-charcoal-light">
          No major events detected for this entity.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Event timeline
      </div>

      <div className="space-y-2">
        {events.map((e: any, i: number) => (
          <div key={i} className="text-sm text-charcoal-mid">
            <span className="font-medium">{e.date}</span> — {e.description}
          </div>
        ))}
      </div>
    </div>
  );
}
