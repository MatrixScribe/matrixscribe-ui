"use client";

export default function Module({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-[var(--space-2)]">
      <h2
        className="
          text-sm font-semibold tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        {title}
      </h2>

      <div>{children}</div>
    </div>
  );
}
