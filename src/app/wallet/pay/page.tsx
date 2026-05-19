"use client";

import { useEffect, useState } from "react";

export default function WalletPayPage() {
  const [usdAmount, setUsdAmount] = useState<number | null>(null);
  const [effectiveRate, setEffectiveRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // USD presets
  const presets = [5, 10, 20, 50];

  /* -------------------------------------------------------
     1) Fetch EFFECTIVE FX RATE from backend
     GET /api/fx/rate/ZAR
  ------------------------------------------------------- */
  useEffect(() => {
    async function loadRate() {
      try {
        const res = await fetch(`${API_BASE}/api/fx/rate/ZAR`);
        const data = await res.json();

        if (data.success) {
          setEffectiveRate(data.effectiveRate); // ⭐ EFFECTIVE RATE
        }
      } catch (err) {
        console.error("FX rate fetch error:", err);
      }
    }

    loadRate();
  }, [API_BASE]);

  /* -------------------------------------------------------
     2) Convert USD → ZAR using effective rate
  ------------------------------------------------------- */
  const zarAmount =
    effectiveRate && usdAmount
      ? (usdAmount * effectiveRate).toFixed(2)
      : "0.00";

  const belowMinimum = usdAmount !== null && usdAmount < 2;

  /* -------------------------------------------------------
     3) Start Paystack Payment
     Send ZAR to backend (NOT USD)
  ------------------------------------------------------- */
  async function startPayment() {
    if (!usdAmount || belowMinimum) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const walletId = localStorage.getItem("walletId");

      const res = await fetch(`${API_BASE}/wallet/load/paystack/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          walletId,
          amount: Number(zarAmount), // ⭐ SEND ZAR (Paystack charge)
        }),
      });

      const data = await res.json();

      if (data?.authorization_url) {
        window.location.href = data.authorization_url; // ⭐ REDIRECT TO PAYSTACK
      } else {
        alert("Payment initialization failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Paystack initiation error:", err);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-xl font-semibold">Load Wallet</h1>

        {/* FX Rate */}
        {effectiveRate && (
          <div className="text-xs text-neutral-500">
            FX Rate: 1 USD = {effectiveRate} ZAR (effective rate incl. spread)
          </div>
        )}

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-6">
          {/* Preset USD Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setUsdAmount(p)}
                className={`rounded-xl py-2 text-sm border ${
                  usdAmount === p
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-neutral-50 border-neutral-300"
                }`}
              >
                ${p}
              </button>
            ))}
          </div>

          {/* Custom USD Amount */}
          <div>
            <label className="block text-sm font-medium">Custom Amount (USD)</label>
            <input
              type="number"
              value={usdAmount ?? ""}
              onChange={(e) => setUsdAmount(Number(e.target.value))}
              placeholder="Minimum $2"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* ZAR Equivalent */}
          <div className="text-sm text-neutral-700">
            Paystack will charge:{" "}
            <span className="font-semibold">R{zarAmount}</span>
          </div>

          {/* Minimum Warning */}
          {belowMinimum && (
            <div className="text-xs text-red-600">
              Minimum load is $2
            </div>
          )}

          {/* Paystack Button */}
          <button
            onClick={startPayment}
            disabled={!usdAmount || belowMinimum || loading}
            className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <img
              src="/logos/paystack.png"
              className="h-4 w-auto object-contain"
              alt="Paystack"
            />
            {loading ? "Processing..." : "Pay with Paystack"}
          </button>
        </div>
      </div>
    </main>
  );
}
