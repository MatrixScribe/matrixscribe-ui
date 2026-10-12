"use client";

import { useState, useEffect } from "react";
import EsimShop from "./EsimShop";
import MyEsims from "./MyEsims";
import BundlesModal from "@/components/modals/BundlesModal";
import { WalletData } from "@/types/wallet";

type EsimSectionProps = {
  flag?: string | null;
  cardholderName: string;
  isActive: boolean;
  wallet: WalletData;
};

export default function EsimSection({
  flag,
  cardholderName,
  isActive,
  wallet,
}: EsimSectionProps) {
  const [tab, setTab] = useState<"shop" | "my">("my");

  // Bundles modal state (from the old EsimSection)
  const [showBundles, setShowBundles] = useState(false);
  const [pendingEsimConfig, setPendingEsimConfig] = useState<any | null>(null);

  const [countries, setCountries] = useState<any[]>([]);
  const [fxZarRate, setFxZarRate] = useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Load FX rate
  useEffect(() => {
    async function loadZarRate() {
      try {
        const res = await fetch(`${API_BASE}/api/fx/sell/zar`);
        const json = await res.json();
        if (json.success && json.sell_rate) {
          setFxZarRate(Number(json.sell_rate));
        }
      } catch {}
    }
    loadZarRate();
  }, [API_BASE]);

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const json = await res.json();

        const normalized = (json.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso2 || c.iso || c.code,
          iso: c.iso || c.iso2 || c.code,
          dialCode: c.dialCode || "",
          flag: c.flag || "",
        }));

        setCountries(normalized);
      } catch {}
    }
    loadCountries();
  }, [API_BASE]);

  // Called by EsimShop when user selects a plan
  const handleCreateEsimContinue = (config: any) => {
    const fixedCountry = {
      ...config.country,
      iso2: config.country.iso2 || config.country.iso,
      iso: config.country.iso || config.country.iso2,
    };

    setPendingEsimConfig({
      ...config,
      country: fixedCountry,
    });

    setShowBundles(true);
  };

  // Called when checkout completes
  const handleCheckoutComplete = () => {
    setShowBundles(false);
    setPendingEsimConfig(null);

    // ⭐ Switch to "My eSIMs" tab so user sees their real eSIM
    setTab("my");
  };

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
          <img src="/esimshopicon.png" className="w-5 h-auto opacity-100" />
          <span>Shop</span>
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
            wallet={wallet}
            onCreateEsim={handleCreateEsimContinue}   // ⭐ Hook into BundlesModal
          />
        )}

        {tab === "my" && (
          <MyEsims
  cardholderName={cardholderName}
  isActive={isActive}
  userId={wallet.user_id ?? ""}     // ⭐ wallet gives us user_id
  token={
    typeof window !== "undefined"
      ? localStorage.getItem("token") || ""
      : ""
  }                                 // ⭐ token comes from localStorage
/>

        )}
      </div>

      {/* ⭐ BUNDLES MODAL (always available) */}
      {pendingEsimConfig && (
        <BundlesModal
          open={showBundles}
          onClose={() => setShowBundles(false)}
          groupName={pendingEsimConfig.label}
          groupKey={
            pendingEsimConfig.label === "Country eSIMs"
              ? "country"
              : pendingEsimConfig.label === "Regional eSIMs"
              ? "region"
              : pendingEsimConfig.label === "Unlimited eSIMs (Country)"
              ? "unlimited_country"
              : "unlimited_region"
          }
          bundles={[]}
          loading={false}
          preferredCurrency={"USD"}
          token={null}
          fxSellRate={1}
          countries={countries}
          count={0}
          fxZarRate={fxZarRate ?? 0}
          onCheckoutComplete={handleCheckoutComplete}   // ⭐ Switch tab + cleanup
        />
      )}
    </div>
  );
}
