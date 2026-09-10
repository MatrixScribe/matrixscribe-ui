"use client";

import { useState, useEffect, useRef } from "react";
import { Country, Operator, Product } from "./types";

type Props = {
  step3Done: boolean;
  selectedCountry: Country | null;
  phone: string;
  setPhone: (v: string) => void;
  selectedOperator: Operator | null;
  selectedProduct: Product | null;
  topupType: "airtime" | "data";

  // ⭐ REQUIRED FIX — TopUpSection passes these
  preferredCurrency: string | null;
  preferredRate: number | null;

  onContinue: () => void;
};

export function Step4Review({
  step3Done,
  selectedCountry,
  phone,
  setPhone,
  selectedOperator,
  selectedProduct,
  topupType,

  // ⭐ NEW props
  preferredCurrency,
  preferredRate,

  onContinue,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const msisdn = selectedCountry
    ? `${selectedCountry.dialCode}${phone.replace(/\D/g, "")}`
    : "";

  const isPhoneValid =
    selectedCountry &&
    phone.length >= 6 &&
    /^\d+$/.test(phone.replace(/\D/g, ""));

  const step4Ready =
    step3Done &&
    !!selectedCountry &&
    !!selectedOperator &&
    !!selectedProduct &&
    isPhoneValid;

  const dotColor = step4Ready
    ? "bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]"
    : step3Done
    ? "bg-yellow-400 shadow-[0_0_14px_rgba(234,179,8,0.8)]"
    : "bg-neutral-300";

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

  const operatorAmount =
    (selectedProduct as any)?.customAmount ??
    (selectedProduct as any)?.price ??
    null;

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-3xl p-7 mt-10 transition-transform duration-300
        bg-purple-700 text-white
        border border-purple-500/40
        shadow-[0_20px_40px_rgba(0,0,0,0.25)]
        ${step3Done ? "opacity-100" : "opacity-40 pointer-events-none"}
        ${step4Ready ? "animate-[goldPulse_2s_ease-in-out_infinite]" : ""}
        ${clicked ? "scale-[1.02]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      <style>{`
        @keyframes goldPulse {
          0% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
          50% { box-shadow: 0 0 28px rgba(234,179,8,0.55); }
          100% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
        }
      `}</style>

      {clicked && (
        <div className="
          absolute inset-0 rounded-3xl pointer-events-none
          bg-yellow-400/20 blur-xl animate-[pulse_1.5s_ease-in-out_infinite]
        " />
      )}

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
        <h2 className="text-[19px] font-semibold tracking-tight">
          <img src="/review.png" className="w-55 h-auto opacity-100" />
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Final check before checkout
        </p>
      </div>

      {/* REVIEW CARD */}
      <div className="space-y-5 text-sm mb-8">
        {/* COUNTRY */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Country</span>
          <span className="font-medium flex items-center gap-2">
            {selectedCountry && (
              <img
                src={selectedCountry.flag}
                className="h-5 w-7 rounded shadow-sm"
              />
            )}
            {selectedCountry?.name}
          </span>
        </div>

        {/* PHONE INPUT */}
        <div>
          <label className="block text-white/70 mb-2">Phone Number</label>

          <div className="flex gap-3">
            <div
              className="
                w-28 rounded-2xl px-4 py-3 text-sm
                bg-white/20 backdrop-blur-xl
                border border-white/30
                flex items-center justify-center
                text-white font-medium
              "
            >
              {selectedCountry?.dialCode}
            </div>

            <input
              type="tel"
              className="
                flex-1 rounded-2xl px-4 py-3 text-sm
                bg-white/20 backdrop-blur-xl
                border border-white/30
                text-white
                placeholder:text-white/50
                focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300
                transition-all duration-300
              "
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {!isPhoneValid && phone.length > 0 && (
            <p className="text-xs text-yellow-300 mt-2">
              Invalid phone number
            </p>
          )}
        </div>

        {/* OPERATOR */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Network</span>
          <span className="font-medium flex items-center gap-2">
            {selectedOperator?.logo && (
              <img
                src={selectedOperator.logo}
                className="h-6 object-contain drop-shadow-sm"
              />
            )}
            {selectedOperator?.name}
          </span>
        </div>

        {/* PRODUCT */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Product</span>
          <span className="font-medium">
            {selectedProduct?.name}
          </span>
        </div>

        {/* AMOUNT */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Amount</span>
          <span className="font-medium flex flex-col items-end">
            {operatorAmount && (
              <span>
                {(selectedProduct as any)?.currency} {operatorAmount}
              </span>
            )}
          </span>
        </div>

        {/* TYPE */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Type</span>
          <span className="font-medium">
            {topupType === "airtime" ? "Airtime" : "Data"}
          </span>
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (!step4Ready) return;
            setClicked(true);
            setTimeout(() => onContinue(), 350);
          }}
          disabled={!step4Ready}
          className={`
            px-6 py-3 rounded-2xl text-sm font-semibold
            transition-all duration-300 shadow-md
            ${
              !step4Ready
                ? "bg-white/20 text-white/40 cursor-not-allowed"
                : clicked
                ? "bg-white text-purple-700 scale-[0.97]"
                : "bg-white text-purple-900 hover:bg-yellow-300 active:scale-[0.97]"
            }
          `}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
