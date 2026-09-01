"use client";

import { useState, useMemo, useEffect } from "react";

import BundleCheckoutModal from "@/components/sim/esim/BundleCheckoutModal";
import BundleDetailsModal from "@/components/modals/BundleDetailsModal";
import { Country } from "@/components/topup/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type Bundle = any;

interface BundlesModalProps {
  open: boolean;
  onClose: () => void;
  groupName: string;
  bundles: Bundle[];
  loading: boolean;
  preferredCurrency: string | null;
  token: string | null;
  fxMidRate: number | null;
  countries: Country[];
}

const FIRST_THREE = [
  "Premium Unlimited",
  "Standard Fixed",
  "Standard Long Duration",
];

const LAST_THREE = [
  "Standard Unlimited Essential",
  "Standard Unlimited Lite",
  "Standard Unlimited Plus",
];

function normalizeIso(iso: string | undefined) {
  return (iso || "").toUpperCase().trim();
}

function normalizeCountry(c: any) {
  return {
    iso: normalizeIso(c?.iso || c?.country?.iso),
    name: c?.name || c?.country?.name || "",
    region: c?.region || c?.country?.region || "",
  };
}

export default function BundlesModal({
  open,
  onClose,
  groupName,
  bundles,
  loading,
  preferredCurrency,
  token,
  fxMidRate,
  countries,
}: BundlesModalProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsBundle, setDetailsBundle] = useState<Bundle | null>(null);

  const [selectedIso, setSelectedIso] = useState<string>("ALL");

  const [catalogueBundles, setCatalogueBundles] = useState<Bundle[]>([]);
  const [catalogueLoading, setCatalogueLoading] = useState(false);

  // eSIMGo networks per selected ISO
  const [isoNetworks, setIsoNetworks] = useState<any[]>([]);

  const safeCurrency = preferredCurrency || "USD";
  const safeRate = fxMidRate ?? 1;

  const isFirstThree = FIRST_THREE.includes(groupName);
  const isLastThree = LAST_THREE.includes(groupName);

  const countryMap = useMemo(() => {
    const map = new Map<string, Country>();
    countries.forEach((c) => {
      const iso = normalizeIso(c.iso || c.iso2);
      if (iso) map.set(iso, c);
    });
    return map;
  }, [countries]);

  const filterOptions = useMemo(() => {
    const map = new Map<string, string>();

    bundles.forEach((b) => {
      (b.countries || []).forEach((c: any) => {
        const { iso, name, region } = normalizeCountry(c);
        if (iso) map.set(iso, name);
        if (region) map.set(region, region);
      });

      (b.roamingEnabled || []).forEach((c: any) => {
        const { iso, name, region } = normalizeCountry(c);
        if (iso) map.set(iso, name);
        if (region) map.set(region, region);
      });

      (b.countryNetworks || []).forEach((n: any) => {
        const { iso, name, region } = normalizeCountry(n.country);
        if (iso) map.set(iso, name);
        if (region) map.set(region, region);
      });
    });

    const arr = [...map.entries()].map(([key, name]) => ({
      iso: key,
      name,
    }));

    arr.sort((a, b) => a.name.localeCompare(b.name));

    return [{ iso: "ALL", name: "All Regions" }, ...arr];
  }, [bundles]);

  // LAST THREE GROUPS → backend catalogue filtering (ISO ONLY)
  useEffect(() => {
    if (!open) return;
    if (!isLastThree) return;

    const iso = selectedIso === "ALL" ? "ALL" : selectedIso;

    const fetchCatalogue = async () => {
      try {
        setCatalogueLoading(true);

        const url = `${API_BASE}/api/esim/catalogue/full?group=${encodeURIComponent(
          groupName
        )}&countries=${iso}`;

        const res = await fetch(url);
        const json = await res.json();

        setCatalogueBundles(json.bundles?.bundles || []);
      } catch (err) {
        console.error("Failed to load catalogue bundles", err);
        setCatalogueBundles([]);
      } finally {
        setCatalogueLoading(false);
      }
    };

    fetchCatalogue();
  }, [selectedIso, groupName, open, isLastThree]);

  // FIRST THREE GROUPS → local filtering
  const locallyFilteredBundles = useMemo(() => {
    if (!isFirstThree) return [];

    if (selectedIso === "ALL") return bundles;

    const iso = selectedIso.toUpperCase();

    return bundles.filter((b) => {
      const matchCountry = (b.countries || []).some((c: any) => {
        const nc = normalizeCountry(c);
        return (
          nc.iso === iso ||
          nc.region.toUpperCase() === iso ||
          nc.name.toUpperCase() === iso
        );
      });

      const matchRoaming = (b.roamingEnabled || []).some((c: any) => {
        const nc = normalizeCountry(c);
        return (
          nc.iso === iso ||
          nc.region.toUpperCase() === iso ||
          nc.name.toUpperCase() === iso
        );
      });

      const matchNetworks = (b.countryNetworks || []).some((n: any) => {
        const nc = normalizeCountry(n.country);
        return (
          nc.iso === iso ||
          nc.region.toUpperCase() === iso ||
          nc.name.toUpperCase() === iso
        );
      });

      return matchCountry || matchRoaming || matchNetworks;
    });
  }, [bundles, selectedIso, isFirstThree]);

  const effectiveBundles = isFirstThree
    ? locallyFilteredBundles
    : catalogueBundles;

  const effectiveLoading = isFirstThree ? loading : catalogueLoading;

  // eSIMGo networks per selected ISO (for details modal)
useEffect(() => {
  if (!open) return;

  if (selectedIso === "ALL") {
    setIsoNetworks([]);
    return;
  }

  const fetchNetworks = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/esim/networks/${selectedIso}`
      );

      const json = await res.json();

      // backend returns: { iso, countryNetworks: [...] }
      setIsoNetworks(json.countryNetworks || []);
    } catch (err) {
      console.error("Failed to fetch networks", err);
      setIsoNetworks([]);
    }
  };

  fetchNetworks();
}, [selectedIso, open]);

  if (!open) return null;

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
          <div className="p-5 bg-gradient-to-r from-black to-purple-700 text-white border-b border-purple-300/20">
            <img src="/selectplanicon1.png" className="w-auto h-12 opacity-100" />
            <h2 className="text-lg font-semibold tracking-wide">
              {effectiveBundles.length} bundles found
            </h2>
            <p className="text-sm opacity-80">
              Filter available plans in {groupName}
            </p>
          </div>

          <div className="p-4 bg-neutral-800/40 border-b border-purple-300/20">
            <select
              value={selectedIso}
              onChange={(e) => setSelectedIso(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white text-sm border border-neutral-300 focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.map((c) => (
                <option key={c.iso} value={c.iso}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-5">
            {effectiveLoading && (
              <p className="text-xs text-purple-200 animate-pulse">
                Loading bundles…
              </p>
            )}

            {!effectiveLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {effectiveBundles.map((b: any) => {
                  const regionName =
                    b.countries?.[0]?.region ||
                    b.roamingEnabled?.[0]?.region ||
                    b.countries?.[0]?.name ||
                    b.roamingEnabled?.[0]?.name ||
                    "Unknown Region";

                  const usd = Number(b.finalPrice ?? b.price ?? 0);
                  const converted = safeRate ? usd * safeRate : usd;
                  const formattedConverted = converted.toFixed(2);

                  const allowance = b.allowances?.[0] || {};
                  const unit = allowance.unit || "BYTES";
                  const unlimited =
                    b.unlimited || allowance.unlimited || false;

                  const throttleSpeed = allowance.throttleSpeed || null;
                  const throttleAtMb = allowance.throttleAtMb || null;

                  const baseCountries = (b.countries || []).map((c: any) => {
                    const iso = normalizeIso(c.iso);
                    const match = countryMap.get(iso);
                    return {
                      name: c.name,
                      iso,
                      flag: match?.flag || null,
                    };
                  });

                  const badges: string[] = [];
                  if (unlimited) badges.push(<img src="/infinityicon.png" className="w-auto h-5 opacity-100" />);
                  if (b.speed?.includes("5G")) badges.push("5G");
                  if (throttleSpeed) badges.push("Cosmic");
                  if (b.countries?.length > 1) badges.push("Multi‑Country");

                  return (
                    <div
                      key={b.name}
                      className="relative rounded-3xl overflow-hidden shadow-xl border border-purple-500/40 bg-gradient-to-br from-neutral-950 via-purple-900 to-black text-white p-4"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className="text-md font-bold">
                              {regionName}
                            </span>
                            <span className="text-[11px] opacity-80">
                              {b.dataAmount === -1
                                ? "Unlimited"
                                : `${b.dataAmount / 1000}GB`}{" "}
                              • {b.duration} Days
                            </span>

                            {b.speed && (
                              <span className="text-[10px] opacity-70">
                                Speed: {b.speed.join(" / ")}
                              </span>
                            )}

                            <span className="text-[10px] opacity-70">
                              Unit: {unit}
                            </span>

                            <span className="text-[10px] opacity-70">
                              Unlimited: {unlimited ? "Yes" : "No"}
                            </span>

                            {throttleSpeed && (
                              <span className="text-[10px] opacity-70">
                                {throttleSpeed} kbps
                                {throttleAtMb &&
                                  ` after ${throttleAtMb} MB`}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-xl font-bold text-green-400">
                              {safeCurrency} {formattedConverted}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2 py-1 text-[10px] rounded-full bg-purple-700/60 border border-purple-300/40"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        <div>
                          <ul className="flex flex-col gap-2">
                            {baseCountries.map((c) => (
                              <li
                                key={c.iso}
                                className="flex items-center gap-2"
                              >
                                {c.flag && (
                                  <img
                                    src={c.flag}
                                    className="h-4 w-6 rounded-sm border"
                                  />
                                )}
                                <span>{c.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setDetailsBundle(b);
                              setDetailsOpen(true);
                            }}
                            className="w-full py-2 rounded-xl bg-ffff text-white text-xs font-bold hover:bg-gray-700 transition"
                          >
                            More Details
                          </button>

                          <button
                            onClick={() => {
                              setSelectedBundle(b);
                              setCheckoutOpen(true);
                            }}
                            className="w-full py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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

      <BundleDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        bundle={detailsBundle}
        groupName={groupName}
        countries={countries}
        preferredCurrency={safeCurrency}
        fxMidRate={safeRate}
        networksForIso={isoNetworks} // ⭐ networks from eSIMGo per selected ISO
      />

      <BundleCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        bundle={selectedBundle}
        preferredCurrency={safeCurrency}
        fxMidRate={safeRate}
        token={token}
      />
    </>
  );
}
