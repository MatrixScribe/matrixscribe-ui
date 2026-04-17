"use client";

import React from "react";
import clsx from "clsx";

export default function ChartContainer({
  children,
  height = 200,
  className,
}: {
  children: React.ReactNode;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        // Base layout
        "rounded-lg overflow-hidden relative",
        "border border-black/5 dark:border-white/5",
        "bg-gradient-to-b from-white/90 to-white/80 dark:from-neutral-900/90 dark:to-neutral-900/80",
        "shadow-[var(--shadow-sm)] dark:shadow-[var(--shadow-sm-dark)]",
        "backdrop-blur-sm",

        // --- PHASE 3.6 MICRO‑INTERACTIONS ---
        // Smooth entrance animation
        "opacity-0 translate-y-[4px] animate-[chartFadeIn_0.45s_ease-out_forwards]",

        // Hover elevation (subtle, premium)
        "transition-all duration-300",
        "hover:shadow-[var(--shadow-md)] hover:dark:shadow-[var(--shadow-md-dark)]",
        "hover:-translate-y-[2px] hover:scale-[1.01]",
        "hover:brightness-[1.03] dark:hover:brightness-[1.08]",

        className
      )}
      style={{ height }}
    >
      {children}

      {/* Keyframe definitions */}
      <style jsx>{`
        @keyframes chartFadeIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
