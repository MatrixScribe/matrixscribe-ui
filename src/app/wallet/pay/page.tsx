"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletPayPage() {
  const router = useRouter();
  const [amount, setAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function startPayment() {
    if (!amount || amount <= 0) return;

    setLoading(true);

    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();

    if (data?.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      setLoading(false);
      alert("Payment initialization failed");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-xl font-semibold">Add Funds</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <label className="block text-sm font-medium">Amount (USD)</label>
          <input
            type="number"
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />

          <button
            onClick={startPayment}
            disabled={!amount || loading}
            className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Paystack"}
          </button>
        </div>
      </div>
    </main>
  );
}
