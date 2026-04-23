"use client";

import { mockCountries } from "@/data/mockCountries";

export function CountryList({ onSelect }: { onSelect: (c: any) => void }) {
  return (
    <div className="mt-4 space-y-1">
      {mockCountries.map((country) => (
        <button
          key={country.iso2}
          onClick={() => onSelect(country)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                     bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700
                     transition text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{country.flag}</span>
            <span className="font-medium">{country.name}</span>
          </div>
          <span className="text-xs text-slate-500">Select</span>
        </button>
      ))}
    </div>
  );
}
