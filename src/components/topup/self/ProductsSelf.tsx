"use client";

import { useEffect, useMemo, useState } from "react";

const API_BASE = "https://redatacom-end.onrender.com/api";

export default function ProductsSelf({
  selectedOperator,
  productsLoading,
  setProductsLoading,
  products,
  setProducts,
  selectedProduct,
  setSelectedProduct,
  setStep3Done,
}) {
  const [localSelectedId, setLocalSelectedId] = useState<string | number | null>(null);

  // ⭐ Load products for selected operator
  useEffect(() => {
    if (!selectedOperator) return;

    setProductsLoading(true);

    fetch(`${API_BASE}/products?operatorId=${selectedOperator.operatorId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.bundles || res?.type === "FIXED") {
          setProducts(res.bundles || []);
        } else if (res?.type === "RANGE") {
          setProducts([res]); // range product
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, [selectedOperator]);

  // ⭐ Sorted bundles (best value first)
  const sortedBundles = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (products[0]?.type === "RANGE") return products; // range product
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  const isRange = products.length > 0 && products[0]?.type === "RANGE";

  return (
    <section className="w-full max-w-3xl mx-auto rounded-2xl p-5 bg-white/90 border border-neutral-200 shadow-md backdrop-blur-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-neutral-500">Operator</p>
          <p className="text-lg font-semibold text-neutral-900">
            {selectedOperator?.name || "Select operator"}
          </p>
        </div>

        {selectedOperator?.logo && (
          <img
            src={selectedOperator.logo}
            className="h-10 w-auto rounded-md shadow-sm bg-white p-1"
          />
        )}
      </div>

      {/* LOADING */}
      {productsLoading && (
        <div className="mt-3 text-sm text-neutral-500 animate-pulse">
          Fetching best deals…
        </div>
      )}

      {/* NO PRODUCTS */}
      {!productsLoading && products.length === 0 && (
        <div className="mt-3 text-sm text-neutral-500">
          No products available for this operator.
        </div>
      )}

      {/* RANGE PRODUCT */}
      {!productsLoading && isRange && (
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4">
            <p className="text-xs text-neutral-700 mb-2">
              Enter any amount between{" "}
              <span className="font-semibold">
                {products[0].min} {products[0].currency}
              </span>{" "}
              and{" "}
              <span className="font-semibold">
                {products[0].max} {products[0].currency}
              </span>
              .
            </p>

            <input
              type="number"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder={`${products[0].min} - ${products[0].max}`}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= products[0].min && val <= products[0].max) {
                  const payload = {
                    type: "RANGE",
                    operatorId: selectedOperator.operatorId,
                    operatorName: selectedOperator.name,
                    amount: val,
                    currency: products[0].currency,
                  };
                  setSelectedProduct(payload);
                  setStep3Done(true);
                } else {
                  setSelectedProduct(null);
                  setStep3Done(false);
                }
              }}
            />

            {selectedProduct && (
              <div className="mt-3 text-xs text-neutral-700 bg-white border border-purple-200 rounded-xl p-3">
                You’re about to recharge{" "}
                <span className="font-semibold">
                  {selectedProduct.amount} {selectedProduct.currency}
                </span>
                .
              </div>
            )}
          </div>
        </div>
      )}

      {/* FIXED BUNDLES — GRID, MOBILE FRIENDLY */}
      {!productsLoading && !isRange && products.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-neutral-600">
            Choose a bundle — more visible, tap to select.
          </p>

          <div
            className="
              grid grid-cols-2 sm:grid-cols-3 gap-3
            "
          >
            {sortedBundles.map((b) => {
              const isActive =
                localSelectedId === b.id ||
                (selectedProduct?.bundle && selectedProduct.bundle.id === b.id);

              const tag =
                b.name.toLowerCase().includes("unlimited")
                  ? "Unlimited"
                  : b.name.toLowerCase().includes("social")
                  ? "Social"
                  : b.name.toLowerCase().includes("data")
                  ? "Data"
                  : null;

              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setLocalSelectedId(b.id);
                    setSelectedProduct({
                      type: "FIXED",
                      operatorId: selectedOperator.operatorId,
                      operatorName: selectedOperator.name,
                      bundle: b,
                    });
                    setStep3Done(true);
                  }}
                  className={`
                    rounded-2xl border px-3 py-3 flex flex-col justify-between text-left transition
                    ${
                      isActive
                        ? "border-purple-600 bg-purple-50 shadow-md"
                        : "border-neutral-200 bg-white hover:border-purple-400"
                    }
                  `}
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-[13px] text-neutral-900 line-clamp-2">
                      {b.name}
                    </p>
                    <p className="text-[11px] text-purple-700 line-clamp-2">
                      {b.rawDescription || "Instant recharge bundle"}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-black">
                      {b.price} {b.currency}
                    </p>

                    {tag && (
                      <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-purple-600 text-white">
                        {tag}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* SELECTION SUMMARY */}
          {selectedProduct && selectedProduct.type === "FIXED" && (
            <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-700 flex items-center justify-between">
              <div>
                <p className="font-semibold text-neutral-900">
                  Selected bundle
                </p>
                <p className="text-[11px]">
                  {selectedProduct.bundle.name} —{" "}
                  {selectedProduct.bundle.price} {selectedProduct.bundle.currency}
                </p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-purple-600 text-white">
                Ready to review
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
