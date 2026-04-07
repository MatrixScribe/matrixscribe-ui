import React from "react";

interface AlertBannerProps {
  message: string;
  severity: "info" | "warning" | "critical";
}

export default function AlertBanner({ message, severity }: AlertBannerProps) {
  const color =
    severity === "critical"
      ? "bg-red-600 text-white"
      : severity === "warning"
      ? "bg-amber-500 text-charcoal"
      : "bg-sandstone/60 text-charcoal";

  return (
    <div className={`rounded-md px-3 py-2 text-xs font-medium ${color}`}>
      {message}
    </div>
  );
}
