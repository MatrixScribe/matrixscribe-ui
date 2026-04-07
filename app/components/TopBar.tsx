"use client";

import ThemeToggle from "@/app/components/ThemeToggle";

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-surface-border bg-surface">
      
      {/* Mobile menu button */}
      <button className="md:hidden text-charcoal-light" onClick={onMenuClick}>
        Menu
      </button>

      {/* Page title placeholder */}
      <div className="font-medium text-charcoal">Workspace</div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
