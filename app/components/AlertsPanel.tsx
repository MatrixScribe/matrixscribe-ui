"use client";

interface AlertItem {
  id: string;
  entity: string;
  severity: "critical" | "warning" | "info";
  title: string;
  summary: string;
  timestamp: string;
}

interface AlertsPanelProps {
  alerts: AlertItem[];
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-charcoal-light text-sm">
        No active alerts
      </div>
    );
  }

  const severityColor = {
    critical: "text-critical",
    warning: "text-amber-600",
    info: "text-charcoal-light",
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="p-4 rounded-lg bg-surface border border-surface-border shadow-subtle"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold uppercase ${severityColor[alert.severity]}`}>
                {alert.severity}
              </span>
              <span className="text-xs text-charcoal-light">
                {alert.entity}
              </span>
            </div>

            <span className="text-xs text-charcoal-light">
              {alert.timestamp}
            </span>
          </div>

          {/* Title */}
          <div className="text-sm font-medium text-charcoal mb-1">
            {alert.title}
          </div>

          {/* Summary */}
          <div className="text-xs text-charcoal-light leading-relaxed">
            {alert.summary}
          </div>
        </div>
      ))}
    </div>
  );
}
