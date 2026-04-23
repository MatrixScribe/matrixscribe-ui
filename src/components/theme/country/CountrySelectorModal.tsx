"use client";

import { CountryList } from "./CountryList";

export function CountrySelectorModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (c: any) => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex">
      <div className="bg-white dark:bg-slate-900 w-full h-full p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Select Country</h2>
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-slate-300"
          >
            Close
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search country..."
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700
                     bg-slate-50 dark:bg-slate-800 px-4 py-2 text-sm outline-none
                     focus:border-emerald-400"
        />

        {/* Country list */}
        <CountryList onSelect={onSelect} />
      </div>
    </div>
  );
}
