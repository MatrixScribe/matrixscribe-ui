"use client";

import { useEffect, useState } from "react";
import BundlesModal from "@/components/modals/BundlesModal";
import { WalletData } from "@/types/wallet";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type Country = {
  name: string;
  iso2: string;
  flag: string;
};

type Bundle = {
  id: string;
  name: string;
  description: string;
  type: "unlimited" | "data";
  dataGb: number | null;
  validityDays: number;
  basePrice: number;
  finalPrice: number;
  isVirtual?: boolean;
};

type EsimShopProps = {
  cardholderName: string;
  wallet: WalletData;   // ⭐ from EsimSection
};

function EsimShop({ cardholderName, wallet }: EsimShopProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [countryBundles, setCountryBundles] = useState<Bundle[]>([]);
  const [globalBundles, setGlobalBundles] = useState<Bundle[]>([]);

  const [loadingCountryBundles, setLoadingCountryBundles] = useState(false);
  const [loadingGlobalBundles, setLoadingGlobalBundles] = useState(false);

  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [showBundlesModal, setShowBundlesModal] = useState(false);

  /* ---------------------------------------------
     ⭐ Preferred currency + FX + token (correct)
     --------------------------------------------- */
  const preferredCurrency = wallet?.preferred_currency ?? null;
  const fxMidRate = wallet?.fx_mid_rate ?? null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ---------------------------------------------
     Load countries
     --------------------------------------------- */
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const json = await res.json();

        const normalized = (json.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso || c.iso2 || c.code,
          flag: c.flag || "",
        }));

        setCountries(normalized);
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }

    loadCountries();
  }, []);

  /* ---------------------------------------------
     Load global catalogue
     --------------------------------------------- */
  useEffect(() => {
    async function loadGlobal() {
      try {
        setLoadingGlobalBundles(true);

        const res = await fetch(`${API_BASE}/api/esim/catalogue`);
        const json = await res.json();

        setGlobalBundles(json.bundles || []);
      } catch (err) {
        console.error("Failed to load global catalogue", err);
      } finally {
        setLoadingGlobalBundles(false);
      }
    }

    loadGlobal();
  }, []);

  /* ---------------------------------------------
     Load country catalogue (token-aware)
     --------------------------------------------- */
  useEffect(() => {
    if (!selectedCountry) return;

    async function loadCountry() {
      try {
        setLoadingCountryBundles(true);

        const res = await fetch(
          `${API_BASE}/api/esim/catalogue/${selectedCountry.iso2}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const json = await res.json();
        setCountryBundles(json.bundles || []);
      } catch (err) {
        console.error("Failed to load country bundles", err);
        setCountryBundles([]);
      } finally {
        setLoadingCountryBundles(false);
      }
    }

    loadCountry();
  }, [selectedCountry, token]);

  /* ---------------------------------------------
     Purchase flow
     --------------------------------------------- */
  async function handlePurchase(bundle: Bundle, countryIso: string | null) {
  try {
    setPurchaseLoading(true);

    if (!token) {
      alert("You must be logged in to purchase an eSIM.");
      setPurchaseLoading(false);
      return;
    }

    const res = await fetch(`${API_BASE}/api/esims/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bundleName: bundle.name,
        priceUsd: bundle.finalPriceUsd,
        countryIso,
        validityDays: bundle.validityDays,
      }),
    });

    const json = await res.json();

    if (!json.success) {
      alert(json.error || "Failed to purchase eSIM");
    } else {
      alert("eSIM purchased and added to your inventory.");
    }
  } catch (err) {
    console.error("Purchase error", err);
    alert("Error purchasing eSIM");
  } finally {
    setPurchaseLoading(false);
  }
}

  return (
    <div className="flex flex-col gap-10">
      {/* COSMIC HEADER CARD */}
      <div
        className="
          relative w-full rounded-3xl p-6 shadow-2xl
          bg-gradient-to-br from-neutral-950 via-purple-900 to-purple-400
          text-white border border-purple-500/40
          overflow-hidden
        "
      >
        {/* Cosmic overlays */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shine-effect" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl" />

        {/* ESIM SHOP LABEL */}
        <div className="absolute top-6 left-6 text-xs tracking-[0.35em] uppercase opacity-60">
          REDATACOM • COSMIC ESIM
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-200/80">
              Global Connectivity
            </p>
            <p className="text-xl font-semibold">
              Plans & Bundles for{" "}
              <span className="text-purple-200">{cardholderName}</span>
            </p>
            <p className="text-xs text-purple-100/80 max-w-md">
              Choose destination‑based or global eSIM bundles with premium routing,
              fair pricing, and instant activation.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <img
              src="/sim-esim1.png"
              className="h-12 w-auto opacity-90 drop-shadow-lg"
            />
            <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 border border-purple-200/40">
              Cosmic Titanium • v1.0
            </span>
          </div>
        </div>
      </div>

      {/* COUNTRY SELECTOR PANEL */}
      <div className="relative bg-white/90 rounded-2xl p-4 shadow-sm border border-neutral-200/70 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-neutral-700">
              Destination / Home Country
            </p>
            <p className="text-[11px] text-neutral-500">
              Select where you’ll use this eSIM to see local bundles.
            </p>
          </div>

          {selectedCountry && (
            <div className="flex items-center gap-2 text-[11px] text-neutral-600">
              <img
                src={selectedCountry.flag}
                className="h-10 w-auto rounded-full border border-neutral-200"
              />
            </div>
          )}
        </div>

        {countriesLoading ? (
          <p className="text-xs text-neutral-500">Loading countries...</p>
        ) : (
          <select
            value={selectedCountry?.iso2 || ""}
            onChange={(e) => {
              const iso = e.target.value;
              const found = countries.find((c) => c.iso2 === iso) || null;
              setSelectedCountry(found);
            }}
            className="
              w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm
              bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/60
            "
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.iso2} value={c.iso2}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        {selectedCountry && (
          <button
            onClick={() => setShowBundlesModal(true)}
            className="
              mt-3 w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold
              hover:bg-purple-700 transition shadow-sm
            "
          >
            Showing All Bundles for {selectedCountry.name}
          </button>
        )}
      </div>

      {/* BUNDLES MODAL */}
      {selectedCountry && (
        <BundlesModal
          open={showBundlesModal}
          onClose={() => setShowBundlesModal(false)}
          countryIso={selectedCountry.iso2}
          onSelectBundle={(bundle) => {
            handlePurchase(bundle, selectedCountry.iso2);
            setShowBundlesModal(false);
          }}
          onCountryChange={(iso2) => {
            const found = countries.find((c) => c.iso2 === iso2) || null;
            setSelectedCountry(found);
          }}
          countries={countries}
          preferredCurrency={preferredCurrency}   // ⭐ FIXED
          token={token}                           // ⭐ FIXED
          fxMidRate={fxMidRate}                   // ⭐ FIXED
        />
      )}
    </div>
  );
}

export default EsimShop;
