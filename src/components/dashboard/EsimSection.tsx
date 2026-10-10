"use client";

import { useEffect, useState } from "react";

import SIMCard from "@/components/SIMCard";
import BundlesModal from "@/components/modals/BundlesModal";

// ⭐ NEW: Import MyEsims
import MyEsims from "@/components/MyEsims";

export function EsimSection({ flag, cardholderName }: any) {
  const [eSims, setESims] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showBundles, setShowBundles] = useState(false);
  const [pendingEsimConfig, setPendingEsimConfig] = useState<any | null>(null);

  const [countries, setCountries] = useState<any[]>([]);
  const [fxZarRate, setFxZarRate] = useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function loadZarRate() {
      try {
        const res = await fetch(`${API_BASE}/api/fx/sell/zar`);
        const json = await res.json();

        if (json.success && json.sell_rate) {
          setFxZarRate(Number(json.sell_rate));
        } else {
          console.warn("ZAR sell rate missing:", json);
          setFxZarRate(null);
        }
      } catch (err) {
        console.error("Failed to load ZAR FX rate", err);
        setFxZarRate(null);
      }
    }

    loadZarRate();
  }, [API_BASE]);

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
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    }

    loadCountries();
  }, [API_BASE]);

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

    setTimeout(() => {
      setShowCreate(false);
      setShowBundles(true);
    }, 0);
  };

  const handleCheckoutComplete = (bundle: any) => {
    setShowBundles(false);

    setESims((prev) => [
      ...prev,
      {
        type: "esim",
        phone: "—",
        simCategory: pendingEsimConfig.label,
        operatorLogo: "/logo3.png",
        operatorName: "Redatacom",
        flag: pendingEsimConfig.country.flag || flag,
        cardholder: cardholderName,
        label: pendingEsimConfig.label,
        bundle,
        country: pendingEsimConfig.country,
        icon: pendingEsimConfig.icon,
        color: pendingEsimConfig.color,
        alerts: pendingEsimConfig.alerts,
        autoRenew: pendingEsimConfig.autoRenew,
      },
    ]);

    setPendingEsimConfig(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* CREATE BUTTON */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 rounded-xl bg-ffff text-purple-600 text-sm font-semibold hover:bg-yellow-500 transition-all"
        >
          + Create eSIM
        </button>
      </div>

      {/* BUNDLES MODAL */}
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
        />
      )}

      {/* LOCAL TEMPORARY ESIMS */}
      {eSims.length === 0 && (
        <p className="text-neutral-500 text-sm">No eSIMs added yet</p>
      )}

      <div className="flex flex-col gap-6">
        {eSims.map((sim, i) => (
          <SIMCard key={i} {...sim} simCategory={sim.label} />
        ))}
      </div>

      {/* ⭐ REAL ESIMS FROM BACKEND */}
      <MyEsims cardholderName={cardholderName} isActive={true} />
    </div>
  );
}
