"use client";

export default function QuickActionsBar() {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-surface border border-surface-border rounded-full shadow-lg px-3 py-2 flex items-center gap-2 text-xs text-charcoal-light">
        <button className="px-2 py-1 rounded-full hover:bg-surface-muted">
          + Entity Watch
        </button>
        <button className="px-2 py-1 rounded-full hover:bg-surface-muted">
          + Dataset
        </button>
        <button className="px-2 py-1 rounded-full hover:bg-surface-muted">
          Open Explorer
        </button>
      </div>
    </div>
  );
}
