"use client";

import { useState, useMemo } from "react";
import { Country } from "@/components/topup/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (c: Country) => void;
  countries: Country[];
};

export function CountrySelectorModal({ open, onClose, onSelect, countries }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
  const q = query.toLowerCase();

  return countries.filter((c) => {
    const name = c.name?.toLowerCase() || "";
    const iso = c.iso2?.toLowerCase() || "";
    const dial = c.dialCode || "";

    return (
      name.includes(q) ||
      iso.includes(q) ||
      dial.includes(query)
    );
  });
}, [query, countries]);


  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm
        flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white rounded-3xl w-full max-w-md max-h-[80vh]
          overflow-hidden shadow-2xl border border-neutral-200
          animate-[slideUp_0.35s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
          <h2 className="text-lg font-semibold">Select Country</h2>
          <p className="text-sm opacity-80">Search or scroll to choose</p>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-white/70 backdrop-blur-xl border-b border-neutral-200">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country name, ISO code, or dial code"
            className="
              w-full px-4 py-3 rounded-2xl text-sm
              bg-white border border-neutral-300
              focus:ring-2 focus:ring-purple-500 focus:border-purple-500
              transition-all duration-300
              placeholder:text-neutral-400
            "
          />
        </div>

        {/* Country List */}
        <div className="overflow-y-auto max-h-[60vh] p-2">
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 py-6">
              No matching countries
            </p>
          )}

          <div className="flex flex-col gap-1">
            {filtered.map((c) => (
  <button
    key={`${c.iso2 || c.name}-${c.dialCode}`}
    onClick={() => {
      onSelect(c);
      onClose();
    }}
    className="
      flex items-center justify-between w-full px-4 py-3
      rounded-xl bg-white hover:bg-purple-50
      border border-neutral-200 hover:border-purple-400
      transition-all duration-300 active:scale-[0.98]
    "
  >
    <div className="flex items-center gap-3">
      <img
        src={c.flag}
        className="h-6 w-8 rounded shadow-sm"
      />
      <span className="text-sm font-medium text-neutral-800">
        {c.name}
      </span>
    </div>

    <span className="text-neutral-500 text-sm">
      {c.dialCode}
    </span>
  </button>
))}
          </div>
        </div>
      </div>
    </div>
  );
}
