"use client";

import { useState, useMemo } from "react";
import { Country } from "@/components/topup/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (c: Country) => void;
  countries: Country[] | null | undefined;
};

export function CountrySelectorModal({
  open,
  onClose,
  onSelect,
  countries,
}: Props) {
  const [query, setQuery] = useState("");

  // ⭐ Always ensure countries is an array
  const safeCountries = Array.isArray(countries) ? countries : [];

  // ⭐ Filtering logic
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return safeCountries.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const iso = (c.iso2 || c.iso || "").toLowerCase();
      const dial = (c.dialCode || "").toLowerCase();
      return name.includes(q) || iso.includes(q) || dial.includes(q);
    });
  }, [query, safeCountries]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md max-h-[80vh] bg-white rounded-3xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-lg font-semibold">Select Country</h2>
          <p className="text-sm text-neutral-500">Search or scroll to choose</p>
        </div>

        {/* SEARCH */}
        <div className="p-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search country, ISO code, or dial code"
            className="w-full px-4 py-3 rounded-xl border bg-white"
          />
        </div>

        {/* LIST */}
        <div className="overflow-y-auto max-h-[60vh] p-2">
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 py-6 text-sm">
              No matching countries
            </p>
          )}

          {filtered.map((c, index) => {
            const iso2 = c.iso2 || c.iso || ""; // ⭐ FIXED

            return (
              <button
                key={`${iso2}-${c.name}-${index}`} // ⭐ ALWAYS UNIQUE
                onClick={() => {
                  onSelect({
                    name: c.name,
                    iso2, // ⭐ ALWAYS RETURN ISO2
                    dialCode: c.dialCode,
                    flag: c.flag,
                  });
                  onClose();
                }}
                className="
                  flex items-center justify-between w-full px-4 py-3
                  rounded-xl border border-neutral-200 bg-white
                  hover:border-purple-500 hover:bg-purple-50
                  transition-all mb-2
                "
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.flag}
                    className="h-6 w-6 rounded-md shadow-sm"
                  />
                  <span className="text-sm font-medium text-neutral-800">
                    {c.name}
                  </span>
                </div>

                <span className="text-purple-600 text-sm font-semibold">
                  {c.dialCode}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
