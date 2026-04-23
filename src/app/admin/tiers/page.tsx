"use client";

import { useEffect, useState } from "react";

type TierRule = {
  id: string;
  minAmount: number;
  maxAmount: number;
  markupPercent: number;
};

export default function AdminTiersPage() {
  const [tiers, setTiers] = useState<TierRule[]>([]);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [markup, setMarkup] = useState("");

  async function load() {
    const res = await fetch("/api/admin/tiers");
    const data = await res.json();
    setTiers(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    await fetch("/api/admin/tiers", {
      method: "POST",
      body: JSON.stringify({
        minAmount: Number(minAmount),
        maxAmount: Number(maxAmount),
        markupPercent: Number(markup),
      }),
    });
    setMinAmount("");
    setMaxAmount("");
    setMarkup("");
    await load();
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-xl font-semibold">Tier Markup</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex gap-3">
            <input
              placeholder="Min amount"
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="w-32 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Max amount"
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="w-32 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Markup (decimal)"
              type="number"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={handleAdd}
              className="rounded-xl bg-emerald-500 text-white px-4 text-sm font-semibold hover:bg-emerald-400 transition"
            >
              Add
            </button>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
            {tiers.map((t) => (
              <div key={t.id} className="flex justify-between">
                <span>
                  ${t.minAmount} – ${t.maxAmount}
                </span>
                <span>{t.markupPercent}</span>
              </div>
            ))}
            {tiers.length === 0 && (
              <p className="text-neutral-500 text-sm">No tier rules configured yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
