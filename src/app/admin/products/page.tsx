"use client";

import { useEffect, useState } from "react";

type ProductRule = {
  id: string;
  productType: string;
  markupPercent: number;
};

export default function AdminProductsPage() {
  const [rules, setRules] = useState<ProductRule[]>([]);
  const [productType, setProductType] = useState("");
  const [markup, setMarkup] = useState("");

  async function load() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setRules(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({
        productType,
        markupPercent: Number(markup),
      }),
    });
    setProductType("");
    setMarkup("");
    await load();
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-xl font-semibold">Product Markup</h1>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex gap-3">
            <input
              placeholder="Product type (airtime/data/utilities)"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Markup (decimal)"
              type="number"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
              className="w-40 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={handleAdd}
              className="rounded-xl bg-emerald-500 text-white px-4 text-sm font-semibold hover:bg-emerald-400 transition"
            >
              Add
            </button>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
            {rules.map((r) => (
              <div key={r.id} className="flex justify-between">
                <span className="font-mono">{r.productType}</span>
                <span>{r.markupPercent}</span>
              </div>
            ))}
            {rules.length === 0 && (
              <p className="text-neutral-500 text-sm">No product rules configured yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
