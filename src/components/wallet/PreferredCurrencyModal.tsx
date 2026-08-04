"use client";

import { useState, useEffect } from "react";
import { FxRate } from "@/types/fx";

interface PreferredCurrencyModalProps {
  onClose: () => void;
  onSelect: (currency: string) => void;
}

export function PreferredCurrencyModal({
  onClose,
  onSelect,
}: PreferredCurrencyModalProps) {
  const [rates, setRates] = useState<FxRate[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadFx() {
      const res = await fetch("https://redatacom-end.onrender.com/api/fx");
      const json = await res.json();
      setRates(json.rates || []);
    }
    loadFx();
  }, []);

  const filtered = rates.filter((r) =>
    r.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-neutral-900">
          Preferred Wallet Currency
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full px-4 py-3 mb-4 rounded-xl border 
            bg-neutral-50 focus:bg-white 
            focus:ring-2 focus:ring-purple-300 
            transition
          "
        />

        {/* Currency List */}
        <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
          {filtered.map((r) => (
            <button
              key={r.currency}
              onClick={() => onSelect(r.currency)}
              className="
                w-full flex items-center justify-between
                px-4 py-3 rounded-xl border
                hover:bg-purple-100 transition
              "
            >
              <div>
                <p className="font-semibold text-neutral-900">{r.currency}</p>
                <p className="text-sm text-neutral-600">
                  {r.mid_rate}
                </p>
              </div>

              <p className="text-xs text-neutral-400">
                {new Date(r.updated_at).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            mt-5 w-full px-4 py-3 rounded-xl 
            bg-ffff hover:bg-neutral-300 
            font-medium transition
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
