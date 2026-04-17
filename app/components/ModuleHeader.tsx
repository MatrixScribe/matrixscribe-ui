"use client";

/* ENTITY COMPONENT */

export default function ModuleHeader({ title }: { title: string }) {
  return (
    <div className="text-xs uppercase tracking-wide text-charcoal-light mb-2">
      {title}
    </div>
  );
}
