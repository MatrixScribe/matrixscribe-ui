interface AlertsDetailProps {
  alerts: {
    message: string;
    timestamp: string;
    severity: string;
    severity_score: number;
    triggers: { type: string; value: number; threshold: number }[];
  }[];
}

export default function AlertsDetail({ alerts }: AlertsDetailProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center text-charcoal-light text-sm">
        No alerts available
      </div>
    );
  }

  return (
    <div className="space-y-3 text-sm">
      {alerts.map((a, i) => (
        <div key={i} className="space-y-2">

          {/* Message */}
          <div className="text-charcoal font-medium leading-snug">
            {a.message}
          </div>
          <div className="text-xs text-charcoal-light">{a.timestamp}</div>

          {/* Severity */}
          <div className="flex justify-between text-xs">
            <span className="text-charcoal-light">Severity</span>

            <span
              className={
                a.severity === "high"
                  ? "text-critical font-medium"
                  : a.severity === "medium"
                  ? "text-orange-500 font-medium"
                  : "text-green-600 font-medium"
              }
            >
              {a.severity} ({Math.round(a.severity_score * 100)}%)
            </span>
          </div>

          {/* Triggers */}
          <div className="space-y-1">
            {a.triggers.map((t, j) => (
              <div key={j} className="flex justify-between text-xs">
                <span className="text-charcoal-light">{t.type}</span>

                <span
                  className={
                    t.value > t.threshold
                      ? "text-critical font-medium"
                      : "text-charcoal-light"
                  }
                >
                  {t.value} / {t.threshold}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-b border-sandstone pt-2" />

        </div>
      ))}
    </div>
  );
}
