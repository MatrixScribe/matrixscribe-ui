"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  const actions = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Entity Explorer", href: "/explorer" },
    { label: "Alerts", href: "/alerts" },
    { label: "Datasets", href: "/datasets" },
    { label: "Sources", href: "/sources" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-32">
      <div className="w-full max-w-lg bg-surface border border-surface-border rounded-xl shadow-xl">
        <input
          autoFocus
          placeholder="Search or jump to…"
          className="w-full px-4 py-3 bg-surface-muted border-b border-surface-border text-sm outline-none"
        />

        <div className="max-h-80 overflow-y-auto">
          {actions.map((a) => (
            <button
              key={a.href}
              onClick={() => {
                router.push(a.href);
                onClose();
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-surface-muted"
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
