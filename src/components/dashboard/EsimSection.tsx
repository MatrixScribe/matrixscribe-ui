"use client";

import { useEffect, useState } from "react";
import SIMCard from "@/components/SIMCard";
import { BundlesModal } from "@/components/modals/BundlesModal";
import { CreateEsimModal } from "@/components/modals/CreateEsimModal";

export function EsimSection({ flag, cardholderName }: any) {
  const [eSims, setESims] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showBundles, setShowBundles] = useState(false);
  const [pendingEsimConfig, setPendingEsimConfig] = useState<any | null>(null);

  const [countries, setCountries] = useState<any[]>([]);
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

  // ⭐ Load + Normalize countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const json = await res.json();

        const normalized = (json.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso || c.iso2 || c.code,
          dialCode: c.dialCode || "",
          flag: c.flag || "",
        }));

        setCountries(normalized);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    }
    loadCountries();
  }, []);

  // ⭐ When user finishes CreateEsimModal
  const handleCreateEsimContinue = (config: any) => {
    const fixedCountry = {
      ...config.country,
      iso2: config.country.iso2 || config.country.iso,
    };

    // ⭐ Set config FIRST
    setPendingEsimConfig({
      ...config,
      country: fixedCountry,
    });

    // ⭐ THEN open BundlesModal AFTER state is applied
    setTimeout(() => {
      setShowCreate(false);
      setShowBundles(true);
    }, 0);
  };

  // ⭐ When user selects a bundle
  const handleBundleSelected = (bundle: any) => {
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
      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 rounded-xl bg-ffff text-purple-600 text-sm font-semibold hover:bg-yellow-500 transition-all"
        >
          + Create eSIM
        </button>
      </div>

      {/* CREATE MODAL */}
      <CreateEsimModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onContinue={handleCreateEsimContinue}
        countries={countries}
      />

      {/* BUNDLES MODAL */}
      <BundlesModal
        open={showBundles}
        onClose={() => setShowBundles(false)}
        countryIso={pendingEsimConfig?.country?.iso2}
        onSelectBundle={handleBundleSelected}
        onCountryChange={(iso2) => {
          setShowBundles(false);

          setPendingEsimConfig((prev) => ({
            ...prev,
            country: { ...prev.country, iso2 },
          }));

          setTimeout(() => {
            setShowBundles(true);
          }, 0);
        }}
        countries={countries}
      />

      {/* EMPTY STATE */}
      {eSims.length === 0 && (
        <p className="text-neutral-500 text-sm">No eSIMs added yet</p>
      )}

      {/* RENDER ESIMS */}
      <div className="flex flex-col gap-6">
        {eSims.map((sim, i) => (
          <SIMCard key={i} {...sim} simCategory={sim.label} />
        ))}
      </div>
    </div>
  );
}
