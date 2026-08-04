"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewSelf({
  userCountry,
  userPhone,
  selectedOperator,
  selectedProduct,
  wallet
}) {
  const [clicked, setClicked] = useState(false);

  const ready =
    !!selectedOperator &&
    !!selectedProduct &&
    !!userCountry &&
    !!userPhone;

  // 3D tilt
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
        relative rounded-3xl p-7 mt-10 transition-transform duration-300
        bg-purple-700 text-white
        border border-purple-500/40
        shadow-[0_20px_40px_rgba(0,0,0,0.25)]
        ${ready ? "animate-[goldPulse_2s_ease-in-out_infinite]" : "opacity-40 pointer-events-none"}
        ${clicked ? "scale-[1.02]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gold Pulse Keyframes */}
      <style>{`
        @keyframes goldPulse {
          0% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
          50% { box-shadow: 0 0 28px rgba(234,179,8,0.55); }
          100% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
        }
      `}</style>

      {/* Glow on click */}
      {clicked && (
        <div className="
          absolute inset-0 rounded-3xl pointer-events-none
          bg-yellow-400/20 blur-xl animate-[pulse_1.5s_ease-in-out_infinite]
        " />
      )}

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[19px] font-semibold tracking-tight">
          Review
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Confirm your recharge details
        </p>
      </div>

      {/* REVIEW CARD */}
      <div className="space-y-5 text-sm mb-8">

        {/* COUNTRY */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Country</span>
          <span className="font-medium flex items-center gap-2">
            {userCountry?.flag && (
              <img
                src={userCountry.flag}
                className="h-5 w-7 rounded shadow-sm"
              />
            )}
            {userCountry?.name}
          </span>
        </div>

        {/* PHONE */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Phone Number</span>
          <span className="font-medium">{userPhone}</span>
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
            {selectedProduct?.type === "RANGE"
              ? `${selectedProduct.amount} ${selectedProduct.currency}`
              : selectedProduct?.bundle?.name}
          </span>
        </div>

        {/* WALLET */}
        <div className="flex justify-between items-center">
          <span className="text-white/70">Wallet Balance</span>
          <span className="font-medium">
            ${Number(wallet?.usd_balance || 0).toFixed(2)} {wallet?.currency}
          </span>
        </div>
      </div>

      {/* CONTINUE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            if (!ready) return;
            setClicked(true);
            setTimeout(() => alert("Proceed to checkout"), 350);
          }}
          disabled={!ready}
          className={`
            px-6 py-3 rounded-2xl text-sm font-semibold
            transition-all duration-300 shadow-md
            ${
              !ready
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
