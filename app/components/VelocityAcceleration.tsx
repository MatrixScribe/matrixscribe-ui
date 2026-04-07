import React from "react";

export default function VelocityAcceleration({ entity }: any) {
  if (!entity) return null;

  const velocity = entity.velocity ?? 0;
  const acceleration = entity.acceleration ?? 0;

  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-charcoal-light">
        Velocity & acceleration
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1">
          <div className="text-xs text-charcoal-light uppercase tracking-wide">
            Velocity
          </div>
          <div className="text-sm font-medium text-charcoal">
            {velocity.toFixed(2)}
          </div>
        </div>

        <div className="bg-sandstone/40 dark:bg-neutral-900/40 rounded-md p-3 space-y-1">
          <div className="text-xs text-charcoal-light uppercase tracking-wide">
            Acceleration
          </div>
          <div className="text-sm font-medium text-charcoal">
            {acceleration.toFixed(2)}
          </div>
        </div>
      </div>

      <p className="text-xs text-charcoal-light leading-relaxed">
        Velocity measures narrative speed. Acceleration shows whether the
        narrative is heating up or cooling down.
      </p>
    </div>
  );
}
