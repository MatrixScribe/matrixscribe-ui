"use client";

import { Product } from "./types";
import { useState, useEffect, useRef } from "react";

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

  const [hovered, setHovered] = useState<string | null>(null);

  const isRange = products.some((p) => p.kind === "custom");
  const isFixed = !isRange && products.length > 0;

  const dotColor = selectedProduct
    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
    : step2Done
    ? "bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
    : "bg-neutral-300";

  // ------------------------------------
  // ⭐ 3D TILT EFFECT
  // ------------------------------------
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
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

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-3xl p-7 mb-10 transition-transform duration-300
        bg-gradient-to-br from-white/90 to-white/60
        backdrop-blur-2xl border border-white/40
        shadow-[0_20px_40px_rgba(0,0,0,0.06)]
        hover:shadow-[0_25px_50px_rgba(0,0,0,0.10)]
        ${step2Done ? "opacity-100" : "opacity-40 pointer-events-none"}
        ${selectedProduct ? "animate-[neonPulse_1.8s_ease-in-out_infinite]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Neon Pulse Keyframes */}
      <style>{`
        @keyframes neonPulse {
          0% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
          50% { box-shadow: 0 0 25px rgba(168,85,247,0.45); }
          100% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
        }
      `}</style>

      {/* Floating Glow */}
      <div className="
        absolute inset-0 rounded-3xl pointer-events-none
        bg-gradient-to-br from-purple-500/10 to-transparent
        opacity-0 hover:opacity-100 transition duration-700
      " />

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
        <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
          Select Network Product
        </h2>

        <p className="text-neutral-500 text-sm mt-1 transition-all duration-300">
          {selectedProduct
            ? "Nice choice! You can change it anytime."
            : hovered
            ? `Thinking about ${hovered}? Looks good…`
            : "Pick the perfect amount or bundle."}
        </p>
      </div>

      {/* LOADING SKELETON */}
      {productsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="
                h-24 rounded-2xl bg-neutral-200/60 backdrop-blur-xl
                animate-pulse border border-neutral-300
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
                className="
                  rounded-2xl p-5 bg-white/70 backdrop-blur-xl
                  border border-neutral-200 shadow-sm
                  hover:shadow-md transition-all duration-300
                "
              >
                <label className="text-sm text-neutral-600 font-medium">
                  Enter Amount ({p.baseCurrency} {p.minBaseAmount} – {p.maxBaseAmount})
                </label>

                <input
                  type="number"
                  className="
                    w-full mt-3 rounded-2xl px-4 py-3 text-sm
                    bg-white/80 backdrop-blur-xl
                    border border-neutral-300
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                    transition-all duration-300
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

      {/* FIXED PRODUCTS */}
      {!productsLoading && isFixed && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
          {products.map((p) => {
            const isSelected = selectedProduct?.id === p.id;

            return (
              <button
                key={p.id}
                onMouseEnter={() => setHovered(p.label ?? p.name ?? null)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setSelectedProduct(p);
                  setStep3Done(true);
                }}
                className={`
                  group relative rounded-2xl px-5 py-5 text-left
                  bg-white/70 backdrop-blur-xl border shadow-sm
                  transition-all duration-300
                  ${
                    isSelected
                      ? "border-purple-500 shadow-[0_10px_25px_rgba(168,85,247,0.25)] bg-purple-50 scale-[1.03]"
                      : hovered === (p.label || p.name)
                      ? "border-purple-400 shadow-md scale-[1.02]"
                      : "border-neutral-200 hover:border-purple-300 hover:shadow-md"
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

                <div className="text-[16px] font-semibold text-neutral-900">
                  {p.label || p.name}
                </div>

                <div className="text-neutral-600 text-sm mt-1">
                  {p.baseCurrency || p.currency} {p.baseAmount || p.amount}
                </div>

                {p.description && (
                  <div className="text-[12px] text-neutral-500 mt-3 line-clamp-2">
                    {p.description}
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
