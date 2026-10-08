"use client";

import { useState, useMemo } from "react";

import BundleCheckoutModal from "@/components/sim/esim/BundleCheckoutModal";
import BundleDetailsModal from "@/components/modals/BundleDetailsModal";
import { Country } from "@/types/country";
import { normalizePlan } from "@/components/sim/esim/EsimShop";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type NormalizedBundle = {
  id: string;
  name: string;
  type: "fixed" | "unlimited";
  scope: "country" | "region" | "global";

  data_mb: number | null;
  validity_days: number;

  price_usd: number;
  price_sar: number;
  currency: string;
  quantity: number;

  finalPriceUsd?: number;
  finalPriceFx?: number;
  markupApplied?: boolean;

  supports_topup: boolean;
  fair_usage?: string | null;

  available_networks: string[];

  coverage: {
    country_code: string;
    country_name: string;
    flag?: string;
    networks: string[];
  }[];
  coverage_count: number;

  country?: {
    iso: string;
    name: string;
    flag?: string;
  };

  country_name?: string;
  region?: string | null;
  region_code?: string | null;
  global_code?: string | null;

  destination_code?: string;
  destination_name?: string;

  socials?: Record<string, { ios: boolean; android: boolean }>;

  minutes?: number | null;
  sms?: number | null;

  updated_at?: string;
  object?: string;

  original?: any;
};

interface BundlesModalProps {
  open: boolean;
  onClose: () => void;

  groupName: string;
  groupKey: "country" | "region" | "unlimited_country" | "unlimited_region";

  bundles: NormalizedBundle[];
  loading: boolean;

  preferredCurrency: string;
  fxSellRate: number;
  token: string | null;

  countries: Country[];
  count: number;

  fxZarRate: number;
}

export default function BundlesModal({
  open,
  onClose,
  groupName,
  groupKey,
  bundles,
  loading,
  preferredCurrency,
  fxSellRate,
  token,
  countries,
  count,
  fxZarRate,
}: BundlesModalProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<NormalizedBundle | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsBundle, setDetailsBundle] = useState<NormalizedBundle | null>(null);

  const [selectedIso, setSelectedIso] = useState<string>("NONE");
  const [filteredBundles, setFilteredBundles] = useState<NormalizedBundle[]>([]);
  const [fetching, setFetching] = useState(false);

  if (!open) return null;

  async function fetchPlansForIso(iso: string) {
    if (iso === "NONE") return;

    setFetching(true);

    try {
      let url = `${API_BASE}/api/esim/esimmerge/catalog`;

      if (groupKey === "country") url += `?scope=country&country=${iso}`;
      if (groupKey === "region") url += `?scope=regional&region=${iso}`;
      if (groupKey === "unlimited_country") url += `?search=unlimited&country=${iso}`;
      if (groupKey === "unlimited_region") url += `?scope=unlimited&region=${iso}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);

      const json = await res.json();
      const plans = json.plans || json.data || [];

      const normalized = plans.map((p: any) => normalizePlan(p, countries));
      setFilteredBundles(normalized);
    } catch (err) {
      console.error("Failed to fetch filtered plans", err);
      setFilteredBundles([]);
    } finally {
      setFetching(false);
    }
  }

  const REGION_OPTIONS = [
    { iso: "EU", name: "Europe (EU)" },
    { iso: "MENA", name: "Middle East & North Africa (MENA)" },
    { iso: "AFR", name: "Africa (AFR)" },
    { iso: "LATAM", name: "Latin America (LATAM)" },
    { iso: "NAM", name: "North America (NAM)" },
    { iso: "APAC", name: "Asia Pacific (APAC)" },
    { iso: "SEA", name: "South‑East Asia (SEA)" },
    { iso: "OCE", name: "Oceania (OCE)" },
    { iso: "CIS", name: "Central Asia (CIS)" },
    { iso: "GLOBAL", name: "Global (GLOBAL)" },
  ];

  const filterOptions = useMemo(() => {
    if (groupKey === "country" || groupKey === "unlimited_country") {
      return countries.map((c) => ({
        iso: (c.iso || c.iso2).toUpperCase(),
        name: c.name,
      }));
    }

    return REGION_OPTIONS;
  }, [groupKey, countries]);

  const convertPrice = (usd: number) => {
    return (usd * fxSellRate).toFixed(2);
  };

  const computePrice = (b: NormalizedBundle) => {
    const baseUsd = b.markupApplied
      ? (b.finalPriceUsd ?? b.price_usd)
      : b.price_usd;

    const safeUsd = isNaN(baseUsd) ? 0 : baseUsd;
    return convertPrice(safeUsd);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-neutral-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="p-5 bg-gradient-to-r from-black to-purple-700 text-white border-b border-purple-300/20">
            <img src="/selectplanicon1.png" className="w-auto h-12 opacity-100" />
            <h2 className="text-lg font-semibold tracking-wide">
              {filteredBundles.length} plans found
            </h2>
            <p className="text-sm opacity-80">
              Filter available plans in {groupName}
            </p>
          </div>

          {/* FILTER */}
          <div className="p-4 bg-neutral-800/40 border-b border-purple-300/20">
            <select
              value={selectedIso}
              onChange={async (e) => {
                const iso = e.target.value;
                setSelectedIso(iso);
                await fetchPlansForIso(iso);
              }}
              className="w-full px-3 py-2 rounded-xl bg-white text-sm border border-neutral-300 focus:ring-2 focus:ring-purple-500"
            >
              <option value="NONE">Select a filter</option>
              {filterOptions.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* PLANS */}
          <div className="p-5">
            {fetching && (
              <p className="text-xs text-purple-200 animate-pulse">
                Loading plans…
              </p>
            )}

            {!fetching && filteredBundles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBundles.map((b) => {
                  const isUnlimited = b.type === "unlimited";
                  const dataLabel = isUnlimited
                    ? "Unlimited"
                    : `${(b.data_mb || 0) / 1024} GB`;

                  return (
                    <div
                      key={b.id}
                      className="
                        relative rounded-3xl overflow-hidden
                        bg-gradient-to-br from-neutral-950 via-purple-900 to-black
                        border border-purple-500/40 shadow-xl
                        text-white p-4 flex flex-col gap-4
                      "
                    >
                      {/* HEADER */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {b.country?.flag ? (
                            <img
                              src={b.country.flag}
                              className="h-6 w-8 rounded-md border border-white/20"
                            />
                          ) : (
                            <span className="px-2 py-1 text-[10px] rounded-md bg-purple-700/60 border border-purple-300/40">
                              {b.region?.toUpperCase() || b.scope.toUpperCase()}
                            </span>
                          )}
                          <span className="text-sm font-bold tracking-wide">
                            {b.name}
                          </span>
                        </div>

                        <span className="px-2 py-1 text-[10px] rounded-md bg-purple-600/40 border border-purple-300/40">
                          {b.scope.toUpperCase()}
                        </span>
                      </div>

                      {/* BODY */}
                      <div className="flex flex-col gap-2 text-xs opacity-90">
                        <div className="flex justify-between">
                          <span>Data</span>
                          <span className="font-semibold">{dataLabel}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Validity</span>
                          <span className="font-semibold">
                            {b.validity_days} Days
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Networks</span>
                          <span className="font-semibold">
                            {b.available_networks.slice(0, 2).join(", ")}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Countries</span>
                          <span className="font-semibold">
                            {b.coverage.length}
                          </span>
                        </div>

                        {b.supports_topup && (
                          <span className="px-2 py-1 mt-1 text-[10px] rounded-md bg-green-700/40 border border-green-300/40 w-fit">
                            Supports Top‑Up
                          </span>
                        )}
                      </div>

                      {/* PRICE */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xl font-bold text-green-400">
                          {preferredCurrency} {computePrice(b)}
                        </span>
                      </div>

                      {/* BUTTONS */}
                      <div className="flex flex-col gap-2 mt-3">
                        <button
                          onClick={() => {
                            setDetailsBundle(b);
                            setDetailsOpen(true);
                          }}
                          className="w-full py-2 rounded-xl bg-neutral-700 text-white text-xs font-bold hover:bg-neutral-600 transition"
                        >
                          More Details
                        </button>

                        <button
                          onClick={() => {
                            const normalized = normalizePlan(b, countries);
                            setSelectedBundle(normalized);
                            setCheckoutOpen(true);
                          }}
                          className="w-full py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-purple-300/20 flex justify-end bg-neutral-900/60">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-700 text-purple-200 font-semibold hover:bg-neutral-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      <BundleDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        bundle={detailsBundle}
        preferredCurrency={preferredCurrency}
        fxSellRate={fxSellRate}
      />

      {/* CHECKOUT MODAL */}
      <BundleCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bundle={selectedBundle}
        preferredCurrency={preferredCurrency}
        fxSellRate={fxSellRate}
        fxZarRate={fxZarRate}
        countryIso={selectedBundle?.country?.iso ?? null}
        token={token}
      />
    </>
  );
}
