"use client";

import { Product } from "./types";

type Props = {
  step2Done: boolean;
  productsLoading: boolean;
  products: Product[];
  groupedProducts: Record<string, Product[]>;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  step3Done: boolean;
  setStep3Done: (v: boolean) => void;
};

export function Step3Products(props: Props) {
  const {
    step2Done,
    productsLoading,
    products,
    selectedProduct,
    setSelectedProduct,
    setStep3Done
  } = props;

  const isRange = products.some((p) => p.kind === "custom");
  const isFixed = !isRange && products.length > 0;

  // Dot color logic
  const dotColor = selectedProduct
    ? "bg-emerald-500 animate-pulse hover:animate-energy"
    : step2Done
    ? "bg-yellow-400"
    : "bg-neutral-300";

  return (
    <div
      className={`
        relative bg-white border rounded-2xl shadow-sm p-6 mb-6 transition
        ${step2Done ? "opacity-100" : "opacity-40 pointer-events-none"}
      `}
    >
      {/* Step Dot */}
      <div
        className={`
          absolute top-4 right-4 h-2.5 w-2.5 rounded-full 
          transition-all shadow-sm cursor-default
          ${dotColor}
        `}
      />

      <h2 className="text-[15px] font-semibold mb-4">3. Choose Product</h2>

      {/* LOADING — PREMIUM SKELETONS */}
      {productsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="
                h-20 rounded-xl border border-neutral-200 bg-neutral-100 
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* NO PRODUCTS */}
      {!productsLoading && products.length === 0 && (
        <p className="text-sm text-neutral-500">No products available.</p>
      )}

      {/* RANGE (AIRTIME) */}
      {!productsLoading && isRange && (
        <div className="mt-4">
          {products
            .filter((p) => p.kind === "custom")
            .map((p) => (
              <div
                key={p.id}
                className="border rounded-xl p-4 bg-neutral-50 shadow-sm"
              >
                <label className="text-xs text-neutral-600">
                  Enter Amount ({p.baseCurrency} {p.minBaseAmount} –{" "}
                  {p.maxBaseAmount})
                </label>

                <input
                  type="number"
                  className="
                    w-full mt-2 border rounded-lg px-3 py-2 text-sm 
                    focus:ring-2 focus:ring-purple-500 outline-none
                  "
                  placeholder={`Enter amount (${p.baseCurrency})`}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const min = p.minBaseAmount ?? 0;
                    const max = p.maxBaseAmount ?? Number.MAX_SAFE_INTEGER;

                    if (val >= min && val <= max) {
                      setSelectedProduct({ ...p, customAmount: val });
                      setStep3Done(true);
                    } else {
                      setSelectedProduct(null);
                      setStep3Done(false);
                    }
                  }}
                />
              </div>
            ))}
        </div>
      )}

      {/* FIXED PRODUCTS (DATA / PIN) */}
      {!productsLoading && isFixed && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {products.map((p) => {
            const isSelected = selectedProduct?.id === p.id;

            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setStep3Done(true);
                }}
                className={`
                  group relative border rounded-2xl px-4 py-4 text-left transition-all
                  shadow-sm hover:shadow-md
                  ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-neutral-300 bg-white hover:border-neutral-400"
                  }
                `}
              >
                <div className="text-[15px] font-semibold text-neutral-900">
                  {p.label || p.name}
                </div>

                <div className="text-neutral-600 text-sm mt-1">
                  {p.baseCurrency || p.currency} {p.baseAmount || p.amount}
                </div>

                {p.description && (
                  <div className="text-[11px] text-neutral-500 mt-2 line-clamp-2">
                    {p.description}
                  </div>
                )}

                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-purple-400 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
