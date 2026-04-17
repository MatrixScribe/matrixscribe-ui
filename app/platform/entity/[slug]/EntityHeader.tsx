"use client";

import styles from "./EntityHeader.module.css";

export default function EntityHeader({ entity }: { entity: any }) {
  if (!entity) return null;

  return (
    <div
      className={
        styles.header +
        " sticky top-0 z-30 " +
        " bg-gradient-to-b from-white/98 to-white/92 " +
        " dark:from-neutral-900/98 dark:to-neutral-900/92 " +
        " border-b border-black/10 dark:border-white/10 " +
        " shadow-[var(--shadow-lg)] dark:shadow-[var(--shadow-lg-dark)] " +
        " backdrop-blur-md py-3 px-6 flex items-center justify-between "
      }
    >
      <div className="leading-tight">
        <div className="text-base font-semibold tracking-tight text-charcoal">
          {entity.name}
        </div>

        <div className="text-[11px] font-medium tracking-wide text-charcoal-light uppercase">
          Entity intelligence overview
        </div>
      </div>
    </div>
  );
}
