"use client";

import React from "react";
import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "card-surface",
        "rounded-lg",
        // Premium surface gradient
        "bg-gradient-to-b from-white/95 to-white/90 dark:from-neutral-900/95 dark:to-neutral-900/90",
        // Border + shadow
        "border border-black/5 dark:border-white/5",
        "shadow-[var(--shadow-md)] dark:shadow-[var(--shadow-md-dark)]",
        // Subtle texture
        "backdrop-blur-sm",
        className
      )}
    >
      {children}

      <style jsx>{`
        .card-surface {
          opacity: 0;
          transform: translateY(6px);
          animation: cardFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .card-surface:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: var(--shadow-lg);
        }

        @keyframes cardFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
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
