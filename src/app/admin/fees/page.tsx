"use client";

import { useEffect, useState } from "react";

export default function AdminFeesPage() {
  const [flat, setFlat] = useState("");
  const [percent, setPercent] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/fees");
      const data = await res.json();
      if (data) {
        setFlat(data.feeFlat ?? "");
        setPercent(data.feePercent ?? "");
      }
    })();
  }, []);

  async function handleSave() {
    await fetch("/api/admin/fees", {
      method: "POST",
      body: JSON.stringify({
        feeFlat: Number(flat),
        feePercent: Number(percent),
      }),
    });
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-xl font-semibold">Platform Fee</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Flat Fee (USD)</label>
            <input
              type="number"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Percent Fee (decimal)</label>
            <input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
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
