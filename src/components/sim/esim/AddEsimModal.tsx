"use client";

import { useState } from "react";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";

type AddEsimModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { iso2: string; flag: string; countryName: string }) => void;
  countries: any[];
};

export function AddEsimModal({ open, onClose, onSave, countries }: AddEsimModalProps) {
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="w-[90%] max-w-sm p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl text-white max-h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6">Create eSIM</h2>

        {/* COUNTRY SELECTOR */}
        <div className="mb-5">
          <label className="text-xs opacity-80">Destination Country</label>
          <button
            onClick={() => setCountryModalOpen(true)}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              {selectedCountry && (
                <img src={selectedCountry.flag} className="h-6 w-6 rounded-md" />
              )}
              <span>{selectedCountry?.name || "Select Country"}</span>
            </span>
            <span className="text-neutral-300 text-lg">›</span>
          </button>

          <CountrySelectorModal
            open={countryModalOpen}
            onClose={() => setCountryModalOpen(false)}
            onSelect={(c) => {
              setSelectedCountry(c);
              setCountryModalOpen(false);
            }}
            countries={countries}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 sticky bottom-0 bg-white/5 py-2 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl bg-white/10 text-white font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!selectedCountry) return;
              onSave({
                iso2: selectedCountry.iso2,
                flag: selectedCountry.flag,
                countryName: selectedCountry.name,
              });
            }}
            className="w-1/2 py-3 rounded-xl bg-purple-600 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
