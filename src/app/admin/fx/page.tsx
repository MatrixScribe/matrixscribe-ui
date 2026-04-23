"use client";

import { useEffect, useState } from "react";

export default function AdminFxPage() {
  const [spread, setSpread] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/fx");
      const data = await res.json();
      if (data) setSpread(data.spreadPercent ?? "");
    })();
  }, []);

  async function handleSave() {
    await fetch("/api/admin/fx", {
      method: "POST",
      body: JSON.stringify({
        spreadPercent: Number(spread),
      }),
    });
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-xl font-semibold">FX Spread</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Spread (decimal)</label>
            <input
              type="number"
              value={spread}
              onChange={(e) => setSpread(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="rounded-xl bg-emerald-500 text-white py-2.5 text-sm font-semibold hover:bg-emerald-400 transition"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  );
}
