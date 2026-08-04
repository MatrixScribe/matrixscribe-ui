"use client";

import { useState, useMemo } from "react";
import { Country } from "@/components/topup/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (c: Country) => void;
  countries: Country[];
};

export function CountrySelectorModal({
  open,
  onClose,
  onSelect,
  countries,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return countries.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const iso = (c.iso2 || c.iso)?.toLowerCase() || "";   // ⭐ FIX
      const dial = c.dialCode || "";
      return name.includes(q) || iso.includes(q) || dial.includes(query);
    });
  }, [query, countries]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[80vh] bg-ffff rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-white/30 bg-ffff text-white">
          <h2 className="text-lg font-semibold tracking-wide">Select Country</h2>
          <p className="text-sm opacity-80">type or scroll to choose:</p>
        </div>

        {/* SEARCH BAR */}
        <div className="p-2 bg-ffff">
          <div className="flex items-center gap-3 bg-ffff rounded-2xl px-4 py-3">
            <span className="text-purple-600 text-lg">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country, ISO code, or dial code"
              className="w-full bg-transparent outline-none text-sm placeholder:text-grey"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto max-h-[60vh] p-2">
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 py-6 text-sm">
              No matching countries
            </p>
          )}

          <div className="flex flex-col gap-2">
            {filtered.map((c, index) => (
              <button
                key={`${c.iso2 || c.iso}-${index}`}
                onClick={() => {
                  onSelect({
                    ...c,
                    iso2: c.iso2 || c.iso,   // ⭐ FIX
                  });
                  onClose();
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-ffff border border-neutral-200 hover:border-purple-500 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img src={c.flag} className="h-auto w-10 rounded-md" />
                  <span className="text-sm font-medium text-white">{c.name}</span>
                </div>

                <span className="text-purple-300 text-sm font-semibold">
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
