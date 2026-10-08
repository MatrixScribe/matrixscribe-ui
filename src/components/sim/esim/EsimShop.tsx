"use client";

import { useEffect, useState, useRef } from "react";

import BundlesModal from "@/components/modals/BundlesModal";
import { PreferredCurrencyModal } from "@/components/wallet/PreferredCurrencyModal";

import { WalletData } from "@/types/wallet";
import { Country } from "@/types/country";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type Group = {
  name: string;
  key: "country" | "region" | "unlimited_country" | "unlimited_region";
  icon?: string;
  desc?: string;
};

type EsimmergePlan = {
  id: string;
  object: string;
  name: string;
  scope: "country" | "region" | "global";
  country_code?: string;
  country_name?: string;
  region_code?: string;
  global_code?: string;
  destination_code?: string;
  destination_name?: string;
  type: "fixed" | "unlimited";
  data_mb: number | null;
  minutes: number | null;
  sms: number | null;
  validity_days: number;
  quantity: number;
  price_usd: number;
  price_sar: number;
  currency: string;
  fair_usage?: string | null;
  supports_topup?: boolean;
  networks: string[];
  coverage: {
    country_code: string;
    country_name: string;
    networks: string[];
  }[];
  coverage_count: number;
  socials?: Record<string, { ios: boolean; android: boolean }>;
  updated_at?: string;
  basePrice?: number;
  finalPriceUsd?: number;
  finalPriceFx?: number;
  markupApplied?: boolean;
};

export function normalizePlan(
  plan: EsimmergePlan,
  countries: Country[]
) {
  const countryIso = plan.country_code || "";

  const countryMeta = countries.find(
    (c) => c.iso?.toUpperCase() === countryIso?.toUpperCase()
  );

  const coverage = (plan.coverage || []).map((c) => {
    const flagCountry = countries.find(
      (cc) => cc.iso?.toUpperCase() === c.country_code?.toUpperCase()
    );

    return {
      country_code: c.country_code,
      country_name: c.country_name,
      flag: flagCountry?.flag,
      networks: c.networks || [],
    };
  });

  return {
    id: plan.id,
    name: plan.name,
    type: plan.type,
    scope: plan.scope,
    data_mb: plan.data_mb,
    validity_days: plan.validity_days,
    price_usd: plan.price_usd,
    price_sar: plan.price_sar,
    currency: plan.currency,
    quantity: plan.quantity,
    supports_topup: !!plan.supports_topup,
    fair_usage: plan.fair_usage,
    available_networks: plan.networks || [],
    coverage,
    coverage_count: plan.coverage_count || coverage.length,
    country: countryIso
      ? {
          iso: countryIso.toUpperCase(),
          name: plan.country_name || countryMeta?.name || "",
          flag: countryMeta?.flag,
        }
      : undefined,
    country_name: plan.country_name,
    region: plan.region_code,
    region_code: plan.region_code,
    global_code: plan.global_code,
    destination_code: plan.destination_code,
    destination_name: plan.destination_name,
    socials: plan.socials || {},
    minutes: plan.minutes,
    sms: plan.sms,
    updated_at: plan.updated_at,
    object: plan.object,
    finalPriceUsd: plan.finalPriceUsd ?? plan.price_usd,
    finalPriceFx: plan.finalPriceFx ?? plan.price_usd,
    markupApplied: !!plan.markupApplied,
    original: plan,
  };
}

export default function EsimShop({ cardholderName, wallet }: { cardholderName: string; wallet: WalletData }) {
  const [groups] = useState<Group[]>([
    {
      name: "Country eSIMs",
      key: "country",
      desc: "Local country bundles with focused coverage.",
    },
    {
      name: "Regional eSIMs",
      key: "region",
      desc: "Multi-country regional roaming bundles.",
    },
    {
      name: "Unlimited eSIMs (Country)",
      key: "unlimited_country",
      desc: "Unlimited data plans by country.",
    },
    {
      name: "Unlimited eSIMs (Region)",
      key: "unlimited_region",
      desc: "Unlimited data plans by region.",
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const [showBundlesModal, setShowBundlesModal] = useState(false);

  const [preferredCurrency, setPreferredCurrency] = useState(
    wallet?.preferred_currency ?? "USD"
  );
  const [fxSellRate, setFxSellRate] = useState(wallet?.fx_sell_rate ?? 1);

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ⭐ Particle background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const count = 45;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* ⭐ Load countries */
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const json = await res.json();

        const normalized = (json.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso2 || c.iso || c.code,
          iso: c.iso || c.iso2 || c.code,
          flag: c.flag,
          dialCode: c.dialCode || "",
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

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <div className="relative w-full rounded-3xl p-6 shadow-2xl bg-gradient-to-br from-neutral-950 via-purple-900 to-purple-600 text-white border border-purple-500/40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        <div className="absolute top-6 left-6 text-xs tracking-[0.35em] uppercase opacity-60">
          REDATACOM ESIM
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-200/80">
              Welcome
            </p>

            <p className="text-xl font-semibold">
              <span className="text-purple-200">{cardholderName}</span>
            </p>

            <p className="text-xs text-purple-100/80 max-w-md">
              Live eSIM Catalog | Country • Region • Unlimited
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <img
              src="/sim-esim1.png"
              className="h-12 w-auto opacity-90 drop-shadow-lg"
            />

            <button
              onClick={() => setShowCurrencyModal(true)}
              className="text-[10px] px-3 py-1 rounded-full bg-purple-600/40 border border-purple-200/40 hover:bg-purple-700/50 transition"
            >
              Currency: {preferredCurrency}
            </button>
          </div>
        </div>
      </div>

      {/* GROUP SELECTOR */}
      <div className="relative bg-ffff rounded-2xl p-4 shadow-sm border border-neutral-200/70 backdrop-blur overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
        />

        <p className="relative z-10 text-xs font-semibold text-neutral-700">
          <img src="/selectbundleicon.png" className="w-auto h-10 opacity-100" />
        </p>

        {countriesLoading ? (
          <p className="relative z-10 text-xs text-neutral-500">
            Finding all plans globally. This may take a moment...
          </p>
        ) : (
          <div className="relative z-10 grid grid-cols-2 gap-3">
            {groups.map((g) => (
              <button
                key={g.name}
                onClick={() => {
                  setSelectedGroup(g);
                  setShowBundlesModal(true);
                }}
                className="relative group w-full h-70 rounded-3xl overflow-hidden shadow-xl border border-purple-500/40 bg-gradient-to-r from-purple-600 via-black to-black opacity-100 text-white transition-all hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-30 mix-blend-overlay pointer-events-none" />

                <div className="absolute inset-0 pointer-events-none shine-effect" />

                <div className="relative z-10 mt-16 px-6 flex flex-col gap-1 text-left">
                  <span className="text-lg font-bold tracking-wide">
                    {g.name}
                  </span>

                  {g.desc && (
                    <span className="text-[11px] text-purple-200/80">
                      {g.desc}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BUNDLES MODAL */}
      {showBundlesModal && selectedGroup && (
        <BundlesModal
          open={true}
          onClose={() => {
            setShowBundlesModal(false);
            setSelectedGroup(null);
          }}
          groupName={selectedGroup.name}
          groupKey={selectedGroup.key}
          bundles={[]}          // ⭐ BundlesModal fetches plans itself
          loading={false}
          preferredCurrency={preferredCurrency}
          fxSellRate={fxSellRate}
          fxZarRate={null}
          token={token}
          countries={countries}
          count={0}
        />
      )}

      {/* CURRENCY MODAL */}
      {showCurrencyModal && (
        <PreferredCurrencyModal
          onClose={() => setShowCurrencyModal(false)}
          onSelect={(currency, rate) => {
            setPreferredCurrency(currency);
            setFxSellRate(rate);
            setShowCurrencyModal(false);
          }}
        />
      )}
    </div>
  );
}
