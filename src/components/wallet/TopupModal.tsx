"use client";

import { useState, useEffect } from "react";
import { FxRate } from "@/types/fx";

interface TopupModalProps {
  preferredCurrency: string | null;
  onClose: () => void;
  onComplete: () => void;
}

export function TopupModal({
  preferredCurrency,
  onClose,
  onComplete,
}: TopupModalProps) {
  const [fx, setFx] = useState<FxRate | null>(null);
  const [fxZar, setFxZar] = useState<FxRate | null>(null);
  const [usdAmount, setUsdAmount] = useState<number>(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadFx() {
      if (!preferredCurrency) return;

      const res = await fetch("https://redatacom-end.onrender.com/api/fx");
      const json = await res.json();

      const match = json.rates.find((r: FxRate) => r.currency === preferredCurrency);
      const zar = json.rates.find((r: FxRate) => r.currency === "ZAR");

      setFx(match || null);
      setFxZar(zar || null);
    }

    loadFx();
  }, [preferredCurrency]);

  if (!preferredCurrency || !fx || !fxZar) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
          <p className="text-center text-neutral-700">Loading FX rates...</p>
        </div>
      </div>
    );
  }

  // Use backend SELL RATE directly
  const localCost = usdAmount * fx.sell_rate;
  const zarCost = usdAmount * fxZar.sell_rate;

  async function handleTopup() {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://redatacom-end.onrender.com/api/wallet/topup/initiate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currency: preferredCurrency,
          amount: usdAmount,
        }),
      }
    );

    const json = await res.json();
    setLoading(false);

    if (!json.authorization_url) {
      console.error("Topup failed:", json);
      return;
    }

    window.location.href = json.authorization_url;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100 border border-neutral-400 rounded-3xl p-6 w-full max-w-md shadow-2xl">

        <img src="/ReloadWallet.png" className="h-12 w-auto opacity-90" className="mb-3" />

        {/* Preset USD buttons */}
        <div className="flex gap-2 mb-3">
          {[5, 10, 20, 50, 100].map((amt) => (
            <button
              key={amt}
              onClick={() => setUsdAmount(amt)}
              className="px-3 py-2 rounded-lg text-sm font-semibold bg-white border border-neutral-300 hover:bg-purple-100 hover:border-purple-400 transition"
            >
              ${amt}
            </button>
          ))}
        </div>

        <label className="block mb-3 text-sm font-medium">USD Amount</label>
        <input
          type="number"
          value={usdAmount}
          onChange={(e) => setUsdAmount(Number(e.target.value))}
          className="w-full border rounded-xl px-4 py-3 mb-4 bg-white/70 focus:bg-white focus:ring-2 focus:ring-purple-300 transition"
        />

        {/* Preferred currency */}
        <p className="text-neutral-700 mb-2">
          Estimated Charges: <strong>{preferredCurrency} {localCost.toFixed(2)}</strong>
        </p>
        <p className="text-xs text-neutral-600 mb-4">
          Redatacom Rate: 1 USD = {fx.sell_rate.toFixed(4)} {preferredCurrency}
        </p>

        {/* ZAR charge */}
        <p className="text-sm text-neutral-700 mb-2">
          You will be paying <strong>ZAR {zarCost.toFixed(2)}</strong>
        </p>

        <button
          onClick={handleTopup}
          disabled={loading}
          className="mt-6 w-full px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200"
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full px-4 py-3 rounded-xl bg-neutral-200 hover:bg-neutral-300 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
