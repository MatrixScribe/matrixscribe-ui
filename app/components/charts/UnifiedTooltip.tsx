"use client";

import React from "react";
import styles from "./UnifiedTooltip.module.css";

export default function UnifiedTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;

  return (
    <div
      className={
        styles.unifiedTooltip +
        " rounded-lg px-3 py-2 bg-white/95 dark:bg-neutral-900/90 " +
        "border border-black/5 dark:border-white/5 " +
        "shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)] " +
        "backdrop-blur-md"
      }
    >
      <div className="text-[11px] font-medium text-charcoal dark:text-neutral-200">
        {label}
      </div>

      <div className="text-[13px] font-semibold text-charcoal dark:text-neutral-100">
        {typeof value === "number" ? value.toFixed(2) : value}
      </div>
    </div>
  );
}
