"use client";

import { useState } from "react";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";

export function CreateEsimModal({ open, onClose, onContinue, countries }) {
  const [label, setLabel] = useState("");
  const [country, setCountry] = useState(null);
  const [icon, setIcon] = useState("📶");
  const [color, setColor] = useState("#7c3aed");
  const [alerts, setAlerts] = useState(true);
  const [autoRenew, setAutoRenew] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);

  if (!open) return null;

  const canContinue = label && country;

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="p-5 bg-gradient-to-r from-purple-600 to-purple-500 text-white">
            <h2 className="text-lg font-semibold">Create New eSIM</h2>
            <p className="text-sm opacity-80">Customize before selecting a bundle</p>
          </div>

          {/* BODY */}
          <div className="p-4 flex flex-col gap-4">
            {/* Label */}
            <div>
              <label className="text-xs font-semibold text-neutral-700">Label</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Qatar Work"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm"
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-xs font-semibold text-neutral-700">Country</label>
              <button
                onClick={() => setShowCountrySelector(true)}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm flex justify-between"
              >
                {country ? `${country.flag} ${country.name}` : "Select country"}
              </button>
            </div>

            {/* Icon */}
            <div>
              <label className="text-xs font-semibold text-neutral-700">Icon</label>
              <div className="mt-1 flex gap-2">
                {["📶", "🌍", "✈️", "📱", "🛰️"].map((i) => (
                  <button
                    key={i}
                    onClick={() => setIcon(i)}
                    className={`px-3 py-2 rounded-xl border text-lg ${
                      icon === i ? "border-purple-500 bg-purple-50" : "border-neutral-200"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="text-xs font-semibold text-neutral-700">Color theme</label>
              <div className="mt-1 flex gap-2">
                {["#7c3aed", "#0ea5e9", "#22c55e", "#f97316", "#e11d48"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full border ${
                      color === c ? "border-black scale-110" : "border-white/60"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-700">Usage alerts</p>
              <button
                onClick={() => setAlerts((v) => !v)}
                className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
                  alerts ? "bg-purple-500" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow transition ${
                    alerts ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>

            {/* Auto renew */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-700">Auto-renew</p>
              <button
                onClick={() => setAutoRenew((v) => !v)}
                className={`w-10 h-6 rounded-full flex items-center px-1 transition ${
                  autoRenew ? "bg-purple-500" : "bg-neutral-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow transition ${
                    autoRenew ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-neutral-200 text-neutral-700"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onContinue({
                  label,
                  country: {
                    ...country,
                    iso2: country.iso2, // ⭐ CRITICAL FIX
                  },
                  icon,
                  color,
                  alerts,
                  autoRenew,
                })
              }
              disabled={!canContinue}
              className={`flex-1 py-2 rounded-xl text-white font-semibold ${
                canContinue ? "bg-purple-600 hover:bg-purple-700" : "bg-neutral-300"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* REAL COUNTRY SELECTOR */}
      <CountrySelectorModal
        open={showCountrySelector}
        onClose={() => setShowCountrySelector(false)}
        onSelect={(c) => {
          setCountry({
            ...c,
            iso2: c.iso2, // ⭐ ENSURE ISO2 ALWAYS EXISTS
          });
          setShowCountrySelector(false);
        }}
        countries={countries}
      />
    </>
  );
}
