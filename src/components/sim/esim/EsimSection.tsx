"use client";

import { useState } from "react";
import EsimShop from "./EsimShop";
import MyEsims from "./MyEsims";
import { WalletData } from "@/types/wallet";

type EsimSectionProps = {
  flag?: string | null;
  cardholderName: string;
  isActive: boolean;
  wallet: WalletData;   // ⭐ ADDED
};

export default function EsimSection({
  flag,
  cardholderName,
  isActive,
  wallet,            // ⭐ RECEIVED
}: EsimSectionProps) {
  const [tab, setTab] = useState<"shop" | "my">("shop");

  return (
    <div className="relative z-10 flex flex-col gap-6">

      {/* TABS */}
      <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 p-2">
        <button
          onClick={() => setTab("shop")}
          className={`
            flex-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all
            flex items-center justify-center gap-2
            ${tab === "shop"
              ? "bg-white text-purple-700 shadow-sm"
              : "bg-transparent text-neutral-600"}
          `}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-purple-500" />
          <span>eSIM Shop</span>
        </button>

        <button
          onClick={() => setTab("my")}
          className={`
            flex-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all
            flex items-center justify-center gap-2
            ${tab === "my"
              ? "bg-white text-purple-700 shadow-sm"
              : "bg-transparent text-neutral-600"}
          `}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-500" />
          <span>My eSIMs</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative">
        {tab === "shop" && (
          <EsimShop
            cardholderName={cardholderName}
            isActive={isActive}
            wallet={wallet}     // ⭐ PASSED DOWN
          />
        )}

        {tab === "my" && (
          <MyEsims
            cardholderName={cardholderName}
            isActive={isActive}
          />
        )}
      </div>
    </div>
  );
}
