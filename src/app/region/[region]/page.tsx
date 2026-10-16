"use client";

import { useEffect, useState, use } from "react";
import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function RegionPage({ params }: any) {
  const resolvedParams = use(params) as { region: string };
  const regionCode = resolvedParams.region.toLowerCase();

  const [plans, setPlans] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Region name map
  const regionNames: Record<string, string> = {
    afr: "Africa",
    asl: "Asia Lite",
    ass: "Asia+",
    asse: "Southeast Asia",
    asse4: "Southeast Asia Lite",
    assep: "Southeast Asia+",
    asy: "Asia One Year",
    aunz: "Australia & Asia",
    blk: "Balkans",
    eu: "Europe",
    eul: "Europe Lite",
    eus: "Europe+",
    euus: "EU & US",
    latam: "South America",
    med: "Mediterranean",
    mena: "Middle East",
    nam: "North America Lite",
    oc: "Oceania",
    wtlna: "North America",
    wtlsa: "South America Lite",
  };

  const regionName = regionNames[regionCode] || regionCode.toUpperCase();

  // SEO title + location
  const title = `${regionName} eSIM Region`;
  const location = regionName;

  // Load region plans + supported countries
  useEffect(() => {
    async function loadRegion() {
      try {
        const res = await fetch(
          `https://redatacom-end.onrender.com/api/esim/esimmerge/catalog?search=unlimited&region=${regionCode}`
        );
        const data = await res.json();

        const regionPlans = data.plans || [];
        setPlans(regionPlans);

        // Extract supported countries from coverage arrays
        const countryMap: Record<string, any> = {};

        regionPlans.forEach((plan: any) => {
          plan.coverage?.forEach((c: any) => {
            if (!countryMap[c.country_code]) {
              countryMap[c.country_code] = {
                iso2: c.country_code,
                name: c.country_name,
              };
            }
          });
        });

        setCountries(Object.values(countryMap));
      } catch (err) {
        console.error("Failed to load region data", err);
      }

      setLoading(false);
    }

    loadRegion();
  }, [regionCode]);

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 
        bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <header className="
          w-full flex items-center justify-between 
          mb-10 py-4 px-2
          bg-ffff
        ">
          <div 
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img 
              src="/logo-signup.png" 
               
              className="h-6 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/login")}
              className="
                px-4 py-2 rounded-lg bg-white/10 border border-white/20
                text-white text-sm font-medium hover:bg-purple-700 hover:border-purple-500
                transition-all
              "
            >
              Login
            </button>

            <button
              onClick={() => (window.location.href = "/signup/number")}
              className="
                px-4 py-2 rounded-lg bg-purple-700 text-white
                font-semibold text-sm hover:bg-purple-800 transition-all
              "
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* REGION TITLE */}
        <h1 className="
          text-3xl font-bold text-transparent bg-clip-text
          bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-6
        ">
          {regionName} eSIM Region
        </h1>

        {/* AUTO-GENERATED SEO TEXT */}
        <p className="text-neutral-400 text-sm mb-10">
          {generateSEOText(title, location)}
        </p>

        <p className="text-neutral-400 text-sm mb-10">
          Unlimited eSIM plans • Instant activation • Works across all supported countries
        </p>

        {/* SUPPORTED COUNTRIES */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Supported Countries</h2>

          {loading && (
            <p className="text-neutral-400 animate-pulse">Loading countries…</p>
          )}

          {!loading && countries.length === 0 && (
            <p className="text-neutral-400">No countries found for this region.</p>
          )}

          {!loading && countries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {countries.map((c: any) => (
                <div
                  key={c.iso2}
                  className="
                    bg-white/5 border border-white/10 rounded-xl p-4
                    flex flex-col items-center text-center
                    hover:bg-purple-900/20 hover:border-purple-400 transition
                  "
                >
                  <img
                    src={`https://s3.amazonaws.com/rld-flags/${c.iso2.toLowerCase()}.svg`}
                    className="h-10 w-16 rounded shadow mb-2"
                  />

                  <p className="text-sm font-medium text-white">{c.name}</p>

                  <button
                    onClick={() => (window.location.href = `/country/${c.iso2}`)}
                    className="
                      mt-3 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800
                      text-white text-xs font-medium transition
                    "
                  >
                    View Country eSIM
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* REGION PLANS */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Unlimited Region Plans</h2>

          {loading && (
            <p className="text-neutral-400 animate-pulse">Loading plans…</p>
          )}

          {!loading && plans.length === 0 && (
            <p className="text-neutral-400">No plans available for this region.</p>
          )}

          {!loading && plans.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {plans.slice(0, 5).map((p: any) => (
                  <div
                    key={p.id}
                    className="
                      bg-white/5 border border-white/10 rounded-xl p-5
                      hover:bg-purple-900/20 hover:border-purple-400 transition
                    "
                  >
                    {/* Region Flag */}
                    <div className="flex items-center gap-2 mb-3">
                      <img src="/logo.png" className="h-6 w-auto rounded" />
                      <span className="text-xs text-neutral-400">{regionName}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {p.name}
                    </h3>

                    <p className="text-neutral-300 text-sm mb-1">
                      {p.type === "unlimited"
                        ? "Unlimited Data"
                        : `${(p.data_mb / 1024).toFixed(0)}GB`}
                    </p>

                    <p className="text-neutral-300 text-sm mb-1">
                      {p.validity_days} day{p.validity_days > 1 ? "s" : ""}
                    </p>

                    <p className="text-neutral-400 text-xs mb-2">
                      {p.networks.slice(0, 5).join(", ")}…
                    </p>

                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="
                        w-full px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800
                        text-white font-medium transition
                      "
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>

              {plans.length > 5 && (
                <p className="text-neutral-400 text-sm mt-4">
                  +{plans.length - 5} more plans available
                </p>
              )}
            </>
          )}
        </section>

        {/* INTERNAL LINKS */}
        <InternalLinks />

        {/* SEO CONTENT */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">
            Why Choose Redatacom for {regionName}?
          </h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Instant eSIM activation across all supported countries</li>
            <li>Unlimited data options for seamless travel</li>
            <li>Works on all modern eSIM‑compatible devices</li>
            <li>Keep your WhatsApp number while traveling</li>
            <li>Secure online payments</li>
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center mt-16 mb-20">
          <p className="text-neutral-400 mb-2">Ready to activate?</p>

          <button
            onClick={() => (window.location.href = "/login")}
            className="
              px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800
              text-white font-semibold shadow-sm hover:shadow-md transition
            "
          >
            Get Your {regionName} eSIM
          </button>
        </div>

      </div>
    </main>
  );
}
