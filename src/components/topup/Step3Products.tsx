"use client";

import { Product } from "./types";
import { useState, useEffect, useRef } from "react";
import { usePreferredCurrency } from "@/components/context/PreferredCurrencyContext";

type Props = {
  step2Done: boolean;
  productsLoading: boolean;
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  step3Done: boolean;
  setStep3Done: (v: boolean) => void;
};

export function Step3Products({
  step2Done,
  productsLoading,
  products,
  selectedProduct,
  setSelectedProduct,
  setStep3Done
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  // ⭐ Preferred currency context
  const { preferredCurrency, preferredRate } = usePreferredCurrency();

  // ⭐ Robust RANGE detection
  const isRange =
    products.length === 1 &&
    (products[0]?.type === "RANGE" ||
      (products[0] as any)?.denominationType === "RANGE");

  const isFixed = !isRange && products.length > 0;

  const dotColor = selectedProduct
    ? "bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,1)]"
    : step2Done
    ? "bg-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.9)]"
    : "bg-neutral-300";

  const cardRef = useRef<HTMLDivElement | null>(null);

  /* Cosmic Tilt */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -8;
      const rotateY = (x / rect.width) * 8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    };

    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* Preferred currency converter */
  const convert = (amount: number | undefined | null) => {
    if (!preferredCurrency || !preferredRate || !amount) return null;
    return (amount / preferredRate).toFixed(2);
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-3xl p-7 mb-10 transition-transform duration-300
        bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/70
        backdrop-blur-2xl border border-white/10
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        ${step2Done ? "opacity-100" : "opacity-40 pointer-events-none"}
        ${selectedProduct ? "animate-[cosmicPulse_2s_ease-in-out_infinite]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      <style>{`
        @keyframes cosmicPulse {
          0% { box-shadow: 0 0 0px rgba(88,101,242,0.0); }
          50% { box-shadow: 0 0 35px rgba(88,101,242,0.45); }
          100% { box-shadow: 0 0 0px rgba(88,101,242,0.0); }
        }
      `}</style>

      {/* Nebula Glow */}
      <div className="
        absolute inset-0 rounded-3xl pointer-events-none
        bg-gradient-to-br from-purple-600/20 via-indigo-500/10 to-transparent
        opacity-0 hover:opacity-100 transition duration-700
      " />

      {/* Star Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white/40 rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6,
            }}
          />
        ))}
      </div>

      {/* Step Dot */}
      <div
        className={`
          absolute top-5 right-5 h-3 w-3 rounded-full 
          transition-all duration-300
          ${dotColor}
        `}
      />

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[20px] font-semibold tracking-tight text-white">
          <img src="/plans.png" className="w-45 h-auto opacity-100" />
        </h2>

        <p className="text-indigo-200 text-sm mt-1 transition-all duration-300">
          {selectedProduct
            ? "Locked in. Stellar choice."
            : hovered
            ? `Scanning ${hovered}…`
            : "Select data bundle or enter airtime amount."}
        </p>

        {preferredCurrency && preferredRate && (
          <p className="text-[11px] text-indigo-300 mt-1">
            Showing operator price + preferred {preferredCurrency}.
          </p>
        )}
      </div>

      {/* LOADING */}
      {productsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={`skeleton-${i}`}
              className="
                h-24 rounded-2xl bg-indigo-900/40 backdrop-blur-xl
                animate-pulse border border-indigo-700/40
              "
            />
          ))}
        </div>
      )}

      {/* NO PRODUCTS */}
      {!productsLoading && products.length === 0 && (
        <p className="text-sm text-indigo-200">No cosmic products found.</p>
      )}

      {/* RANGE PRODUCT (AIRTIME) */}
      {!productsLoading && isRange && (
        <div className="mt-4 space-y-4">
          {products.map((p, index) => {
            const min = (p as any).minAmount ?? 0;
            const max = (p as any).maxAmount ?? Number.MAX_SAFE_INTEGER;
            const currency = (p as any).currency ?? "ZAR";

            return (
              <div
                key={`range-${index}`}
                className="
                  rounded-2xl p-5 bg-indigo-900/40 backdrop-blur-xl
                  border border-indigo-700/40 shadow-lg
                  hover:shadow-[0_0_25px_rgba(88,101,242,0.5)]
                  transition-all duration-300
                "
              >
                <label className="text-sm text-indigo-200 font-medium">
                  Enter Amount ({currency} {min} – {max})
                </label>

                {preferredCurrency && preferredRate && (
                  <p className="text-[11px] text-indigo-300 mt-1">
                    ≈ {preferredCurrency} {(min / preferredRate).toFixed(2)} –{" "}
                    {(max / preferredRate).toFixed(2)}
                  </p>
                )}

                <input
                  type="number"
                  className="
                    w-full mt-3 rounded-2xl px-4 py-3 text-sm
                    bg-indigo-800/40 backdrop-blur-xl
                    border border-indigo-600/40 text-white
                    focus:ring-2 focus:ring-purple-400 focus:border-purple-400
                    transition-all duration-300
                  "
                  placeholder={`Enter amount (${currency})`}
                  onChange={(e) => {
                    const val = Number(e.target.value);

                    if (!Number.isFinite(val)) {
                      setSelectedProduct(null);
                      setStep3Done(false);
                      return;
                    }

                    if (val >= min && val <= max) {
                      setSelectedProduct({
                        ...(p as any),
                        customAmount: val,
                      });
                      setStep3Done(true);
                    } else {
                      setSelectedProduct(null);
                      setStep3Done(false);
                    }
                  }}
                />

                {/* JSON DEBUG VIEW */}
                <div className="mt-3 text-[11px] text-indigo-300 bg-black/30 rounded-xl p-3 font-mono">
                  <div className="mb-1 text-indigo-200 font-semibold">
                    Backend Range JSON
                  </div>
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(p, null, 2)}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FIXED PRODUCTS (DATA BUNDLES) */}
      {!productsLoading && isFixed && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
          {products.map((p, index) => {
            const isSelected = selectedProduct?.id === p.id;

            const label = p.name;
            const amount = (p as any).price;
            const currency = (p as any).currency;
            const description = (p as any).rawDescription;

            const converted = convert(amount);

            return (
              <button
                key={`fixed-${p.id}-${amount}-${index}`}
                onMouseEnter={() => setHovered(label || null)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setSelectedProduct(p);
                  setStep3Done(true);
                }}
                className={`
                  group relative rounded-2xl px-5 py-5 text-left
                  bg-indigo-900/40 backdrop-blur-xl border border-indigo-700/40
                  shadow-md transition-all duration-300
                  ${
                    isSelected
                      ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] bg-purple-900/30 scale-[1.05]"
                      : hovered === label
                      ? "border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-[1.03]"
                      : "hover:border-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  }
                  active:scale-[0.97]
                `}
              >
                {isSelected && (
                  <div className="
                    absolute inset-0 rounded-2xl ring-2 ring-purple-400 pointer-events-none
                    animate-[pulse_1.5s_ease-in-out_infinite]
                  " />
                )}

                <div className="text-[16px] font-semibold text-white">
                  {label}
                </div>

                {/* Operator price */}
                <div className="text-indigo-200 text-sm mt-1">
                  {currency} {amount}
                </div>

                {/* Preferred currency price */}
                {converted && (
                  <div className="text-[11px] text-indigo-300 mt-0.5">
                    ≈ {preferredCurrency} {converted}
                  </div>
                )}

                {description && (
                  <div className="text-[12px] text-indigo-300 mt-3 line-clamp-2">
                    {description}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
