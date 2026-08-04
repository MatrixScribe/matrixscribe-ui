"use client";

import { useEffect, useState } from "react";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

type Bundle = {
  id: string;
  name: string;
  description: string;
  type: "unlimited" | "data";
  dataGb: number | null;
  validityDays: number;
  basePrice: number;
  finalPriceUsd: number;
  finalPriceFx: number | null;
  currency: string | null;
  family: "COSMIC_DAILY" | "TRAVEL_LITE" | "NEBULA_COUNTRY" | "INFINITY_GLOBAL" | null;
  isVirtual: boolean;
};

type Country = {
  iso2: string;
  name: string;
  flag: string;
};

interface BundlesModalProps {
  open: boolean;
  onClose: () => void;
  countryIso: string | null;
  onSelectBundle: (bundle: Bundle) => void;
  onCountryChange: (iso2: string) => void;
  countries: Country[];

  preferredCurrency: string | null;
  token: string | null;
  fxMidRate: number | null;
}

export default function BundlesModal({
  open,
  onClose,
  countryIso,
  onSelectBundle,
  onCountryChange,
  countries,
  preferredCurrency,
  token,
  fxMidRate,
}: BundlesModalProps) {
  const [loading, setLoading] = useState(false);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);

  // Load bundles with token (USD-only from backend)
  useEffect(() => {
    if (!open || !countryIso) return;

    const c = countries.find((x) => x.iso2 === countryIso);
    setSelectedCountry(c || null);

    setLoading(true);

    fetch(`${API_BASE}/api/esim/catalogue/${countryIso}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setBundles(Array.isArray(data.bundles) ? data.bundles : []);
      })
      .catch(() => setBundles([]))
      .finally(() => setLoading(false));
  }, [open, countryIso, token, countries]);

  if (!open) return null;

  // Group bundles by family
  const grouped: Record<string, Bundle[]> = {
    COSMIC_DAILY: [],
    TRAVEL_LITE: [],
    NEBULA_COUNTRY: [],
    INFINITY_GLOBAL: [],
  };

  bundles.forEach((b) => {
    if (b.family && grouped[b.family]) {
      grouped[b.family].push(b);
    }
  });

  const familyMeta = {
    COSMIC_DAILY: {
      title: <img src="/cosmicicon.png" className="w-auto h-9 opacity-100" />,
      desc: "Short‑term unlimited data",
      gradient: "from-black to-purple-500",
    },
    TRAVEL_LITE: {
      title: <img src="/travelicon.png" className="w-auto h-9 opacity-100" />,
      desc: "Data for business & leisure",
      gradient: "from-black to-blue-400",
    },
    NEBULA_COUNTRY: {
      title: <img src="/nebulaicon.png" className="w-auto h-9 opacity-100" />,
      desc: "Mid‑term unlimited data",
      gradient: "from-black to-pink-400",
    },
    INFINITY_GLOBAL: {
      title: <img src="/infinityicon.png" className="w-auto h-9 opacity-100" />,
      desc: "Premium long‑term roaming",
      gradient: "from-black to-ffff",
    },
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-FFFF backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-lg bg-neutral-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="p-5 bg-gradient-to-r from-black to-purple-700 text-white border-b border-purple-300/20">
            <img src="/selectplanicon1.png" className="w-auto h-12 opacity-100" />
            <h2 className="text-lg font-semibold tracking-wide"></h2>
            <p className="text-sm opacity-80"></p>
          </div>

          {/* BODY */}
          <div className="p-5 flex flex-col gap-6">
            {/* COUNTRY SELECTOR */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-purple-200 tracking-wide">
                
              </label>

              <button
                onClick={() => setCountryModalOpen(true)}
                className="
                  w-full px-4 py-3 rounded-2xl
                  bg-gradient-to-br from-white via-black to-purple-700
                  border border-purple-400/40
                  text-purple-100 text-sm
                  flex items-center justify-between
                  shadow-lg backdrop-blur-xl
                  hover:scale-[1.02] hover:shadow-purple-500/30
                  transition-all duration-200
                "
              >
                {selectedCountry ? (
                  <span className="flex items-center gap-3">
                    <img
                      src={selectedCountry.flag}
                      className="h-auto w-10 rounded-full shadow-md border border-white/20"
                    />
                    <span className="font-medium tracking-wide">{selectedCountry.name}</span>
                  </span>
                ) : (
                  <span className="text-purple-200/70">Select country</span>
                )}

                <span className="flex items-center gap-2">
                  <img src="/chip-gold.png" className="h-5 w-auto opacity-90 drop-shadow-md" />
                  <span className="text-purple-300 text-lg leading-none">›</span>
                </span>
              </button>
            </div>

            {/* LOADING */}
            {loading && (
              <p className="text-xs text-purple-200 animate-pulse">Loading bundles…</p>
            )}

            {/* FAMILY CARDS */}
            {!loading && (
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(grouped).map((familyKey) => {
                  const meta = familyMeta[familyKey as keyof typeof familyMeta];
                  const familyBundles = grouped[familyKey];

                  return (
                    <div
                      key={familyKey}
                      className={`
                        rounded-2xl p-4 cursor-pointer
                        bg-gradient-to-br ${meta.gradient}
                        border border-purple-400/40 shadow-lg
                        hover:scale-[1.02] transition-all
                      `}
                      onClick={() =>
                        setExpandedFamily(
                          expandedFamily === familyKey ? null : familyKey
                        )
                      }
                    >
                      <h3 className="text-lg font-bold text-purple-100">
                        {meta.title}
                      </h3>
                      <p className="text-xs text-purple-200">{meta.desc}</p>

                      {/* HORIZONTAL SLIDER */}
                      {expandedFamily === familyKey && (
                        <div
                          className="
                            mt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2
                          "
                        >
                          {familyBundles.map((b) => {
                            const usd = b.finalPriceUsd;

                            // ⭐ Client-side FX conversion
                            const hasPreferred =
                              preferredCurrency &&
                              preferredCurrency !== "USD" &&
                              fxMidRate;

                            const computedFx =
                              hasPreferred ? usd * (fxMidRate as number) : null;

                            return (
                              <button
                                key={b.id}
                                onClick={() => onSelectBundle(b)}
                                className="
                                  snap-center shrink-0 w-42 h-40 rounded-4xl
                                  bg-white border-purple-400
                                  flex flex-col justify-between p-4
                                  hover:bg-white hover:text-white transition
                                "
                              >
                                <p className="text-purple-600 text-sm font-bold leading-tight">
                                  {b.name}
                                </p>

                                <p className="text-[10px] text-neutral-600 line-clamp-2">
                                  {b.description}
                                </p>

                                {hasPreferred && computedFx !== null ? (
                                  <div className="mt-2">
                                    <p className="text-xl font-bold text-green-600">
                                      {preferredCurrency} {computedFx.toFixed(2)}
                                    </p>
                                    <p className="text-[10px] text-neutral-500">
                                      USD {usd.toFixed(2)}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-lg font-bold text-green-600 mt-2">
                                    USD {usd.toFixed(2)}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
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
              className="
                px-4 py-2 rounded-xl bg-neutral-700 text-purple-200 font-semibold
                hover:bg-neutral-600 transition
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* COUNTRY SELECTOR MODAL */}
      <CountrySelectorModal
        open={countryModalOpen}
        onClose={() => setCountryModalOpen(false)}
        onSelect={(c) => {
          setSelectedCountry(c);
          onCountryChange(c.iso2);
          setCountryModalOpen(false);
        }}
        countries={countries}
      />
    </>
  );
}
