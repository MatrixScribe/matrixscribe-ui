"use client";

import { useEffect, useState } from "react";

export default function AdminFxTable() {
  const [rates, setRates] = useState([]);
  const [spreads, setSpreads] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    // 1. Load FX rates + spreads from backend
    const res = await fetch("http://localhost:4000/admin/fx/all", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    const data = await res.json();

    // Build spread map
    const spreadMap = {};
    data.spreads.forEach((s: any) => {
      spreadMap[s.currency] = Number(s.spread_percent);
    });

    setRates(data.rates);
    setSpreads(spreadMap);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function saveSpread(currency: string) {
    await fetch("http://localhost:4000/admin/fx/spread", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency,
        spreadPercent: spreads[currency] ?? 0,
      }),
    });

    loadData();
  }

  async function toggleLock(currency: string, locked: boolean) {
    await fetch("http://localhost:4000/admin/fx/lock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency, locked }),
    });

    loadData();
  }

  if (loading) {
    return (
      <main className="p-10 text-neutral-600">Loading FX rates…</main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-2xl font-semibold">FX Rates (USD → All Currencies)</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-100 text-neutral-600">
              <tr>
                <th className="p-3 text-left">Currency</th>
                <th className="p-3 text-left">Base Rate</th>
                <th className="p-3 text-left">Spread (%)</th>
                <th className="p-3 text-left">Effective Rate</th>
                <th className="p-3 text-left">Locked</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rates.map((r: any) => {
                const spread = spreads[r.quote_currency] ?? 0;
                const effective = r.rate * (1 + spread / 100);

                return (
                  <tr key={r.quote_currency} className="border-t">
                    <td className="p-3 font-medium">{r.quote_currency}</td>

                    <td className="p-3">{Number(r.rate).toFixed(4)}</td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={spread}
                        onChange={(e) =>
                          setSpreads({
                            ...spreads,
                            [r.quote_currency]: Number(e.target.value),
                          })
                        }
                        className="w-20 rounded-lg border border-neutral-300 px-2 py-1"
                      />
                    </td>

                    <td className="p-3 font-semibold">
                      {effective.toFixed(4)}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => toggleLock(r.quote_currency, !r.locked)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          r.locked
                            ? "bg-red-500 text-white hover:bg-red-400"
                            : "bg-neutral-300 text-neutral-800 hover:bg-neutral-200"
                        }`}
                      >
                        {r.locked ? "Locked" : "Unlocked"}
                      </button>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => saveSpread(r.quote_currency)}
                        className="rounded-lg bg-emerald-500 px-3 py-1.5 text-white text-xs font-semibold hover:bg-emerald-400"
                      >
                        Save Spread
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
