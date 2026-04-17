"use client";

export default function HelpPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
      <div className="w-full max-w-md h-full bg-surface border-l border-surface-border shadow-xl flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 border-b border-surface-border">
          <span className="text-sm font-medium text-charcoal">Help & Shortcuts</span>
          <button
            onClick={onClose}
            className="text-charcoal-light hover:text-charcoal text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 text-sm text-charcoal-light overflow-y-auto">
          <div>
            <div className="font-medium text-charcoal mb-1">Keyboard</div>
            <ul className="space-y-1">
              <li><b>Cmd/Ctrl + K</b> — Command palette</li>
              <li><b>G then D</b> — Dashboard</li>
              <li><b>G then E</b> — Entity Explorer</li>
              <li><b>G then A</b> — Alerts</li>
              <li><b>G then M</b> — Datasets</li>
              <li><b>G then S</b> — Sources</li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-charcoal mb-1">Concepts</div>
            <p>
              MatrixScribe ingests news, alerts, and datasets into a unified entity graph,
              then surfaces sentiment, risk, and velocity intelligence per entity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
