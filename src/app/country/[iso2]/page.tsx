"use client";

import { useEffect, useState, use } from "react";

import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function CountryPage({ params }: any) {
  // Unwrap dynamic params (Next.js App Router)
  const resolvedParams = use(params) as { iso2: string };
  const iso2 = resolvedParams.iso2.toUpperCase();

  const [country, setCountry] = useState<any | null>(null);
  const [operators, setOperators] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [loadingOps, setLoadingOps] = useState(true);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Extract ISO2 from flag URL
  const extractIso2 = (flagUrl: string) => {
    const match = flagUrl?.match(/\/([a-z]{2})\.svg$/i);
    return match ? match[1].toUpperCase() : null;
  };

  // Load country info
  useEffect(() => {
    async function loadCountry() {
      try {
        const res = await fetch("https://redatacom-end.onrender.com/api/countries");
        const data = await res.json();

        const found = (data.countries || []).find(
          (c: any) => extractIso2(c.flag) === iso2
        );

        setCountry(found || null);
      } catch (err) {
        console.error("Failed to load country", err);
      }
      setLoadingCountry(false);
    }

    loadCountry();
  }, [iso2]);

  // Load operators
  useEffect(() => {
    async function loadOperators() {
      try {
        const res = await fetch(
          `https://redatacom-end.onrender.com/api/operators?country=${iso2}`
        );
        const data = await res.json();
        setOperators(data.operators || []);
      } catch (err) {
        console.error("Failed to load operators", err);
        setOperators([]);
      }
      setLoadingOps(false);
    }

    loadOperators();
  }, [iso2]);

  // Load eSIM plans
  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(
          `https://redatacom-end.onrender.com/api/esim/esimmerge/catalog?scope=country&country=${iso2}`
        );
        const data = await res.json();
        setPlans(data.plans || []);
      } catch (err) {
        console.error("Failed to load plans", err);
        setPlans([]);
      }
      setLoadingPlans(false);
    }

    loadPlans();
  }, [iso2]);

  // SEO title + location
  const title = country ? `${country.name} eSIM` : "Country eSIM";
  const location = country?.name;

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

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            {/* Login */}
            <button
              onClick={() => (window.location.href = "/login")}
              className="
                px-4 py-2 rounded-lg
                bg-white/10 border border-white/20
                text-white text-sm font-medium
                hover:bg-purple-700 hover:border-purple-500
                transition-all
              "
            >
              Login
            </button>

            {/* Signup */}
            <button
              onClick={() => (window.location.href = "/signup/number")}
              className="
                px-4 py-2 rounded-lg
                bg-purple-700 text-white
                font-semibold text-sm
                hover:bg-purple-800 transition-all
              "
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* TITLE */}
        {loadingCountry ? (
          <p className="text-neutral-400 animate-pulse">Loading country…</p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={country?.flag}
                className="h-10 w-16 rounded shadow"
              />

              <h1 className="
                text-3xl font-bold text-transparent bg-clip-text
                bg-gradient-to-r from-purple-300 via-white to-purple-300
              ">
                {country?.name} eSIM
              </h1>
            </div>

            {/* AUTO-GENERATED SEO TEXT */}
            <p className="text-neutral-400 text-sm mb-10">
              {generateSEOText(title, location)}
            </p>

            <p className="text-neutral-400 text-sm mb-10">
              Instant activation • No roaming fees • Works on all eSIM devices
            </p>
          </>
        )}

        {/* PLANS SECTION */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Available eSIM Plans</h2>

          {loadingPlans && (
            <p className="text-neutral-400 animate-pulse">Loading plans…</p>
          )}

          {!loadingPlans && plans.length === 0 && (
            <p className="text-neutral-400">No plans available for this country.</p>
          )}

          {!loadingPlans && plans.length > 0 && (
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
                    {/* Flag */}
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={country?.flag}
                        className="h-6 w-10 rounded shadow"
                      />
                      <span className="text-xs text-neutral-400">
                        {country?.name}
                      </span>
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {p.name}
                    </h3>

                    {/* Data */}
                    <p className="text-neutral-300 text-sm mb-1">
                      {p.type === "unlimited"
                        ? "Unlimited Data"
                        : `${(p.data_mb / 1024).toFixed(0)}GB`}
                    </p>

                    {/* Duration */}
                    <p className="text-neutral-300 text-sm mb-1">
                      {p.validity_days} day{p.validity_days > 1 ? "s" : ""}
                    </p>

                    {/* Networks */}
                    <p className="text-neutral-400 text-xs mb-2">
                      {p.networks.join(", ")}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="
                        w-full px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800
                        text-white font-medium transition
                      "
                    >
                      Activate Now
                    </button>
                  </div>
                ))}
              </div>

              {/* More Plans Indicator */}
              {plans.length > 5 && (
                <p className="text-neutral-400 text-sm mt-4">
                  +{plans.length - 5} more plans available
                </p>
              )}
            </>
          )}
        </section>

        {/* OPERATORS SECTION */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Mobile Networks</h2>

          {loadingOps && (
            <p className="text-neutral-400 animate-pulse">Loading operators…</p>
          )}

          {!loadingOps && operators.length === 0 && (
            <p className="text-neutral-400">No operators found.</p>
          )}

          {!loadingOps && operators.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {operators.map((op: any) => (
                <div
                  key={op.operatorId}
                  className="
                    bg-white/5 border border-white/10 rounded-xl p-4
                    flex flex-col items-center text-center
                    hover:bg-purple-900/20 hover:border-purple-400 transition
                  "
                >
                  {op.logo && (
                    <img src={op.logo} className="h-8 object-contain mb-2" />
                  )}

                  <p className="text-sm font-medium text-white">{op.name}</p>
                  <p className="text-xs text-neutral-400">
                    {op.operatorType || "Mobile Operator"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEO CONTENT */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">
            Why Choose Redatacom in {country?.name}?
          </h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Instant eSIM activation — no physical SIM needed</li>
            <li>Affordable data plans for tourists and business travelers</li>
            <li>Works on all modern iPhone, Samsung, Huawei, and Xiaomi devices</li>
            <li>Keep your WhatsApp number while traveling</li>
            <li>Secure online payments</li>
          </ul>
        </section>

        {/* INTERNAL LINKS */}
        <InternalLinks />

        {/* FAQ SECTION */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

          <div className="space-y-4 text-neutral-300 text-sm">
            <div>
              <p className="font-medium text-white">
                Does Redatacom work in {country?.name}?
              </p>
              <p>Yes, Redatacom supports multiple operators in this region.</p>
            </div>

            <div>
              <p className="font-medium text-white">
                Can I keep my WhatsApp number?
              </p>
              <p>Yes, eSIM data does not affect your WhatsApp number.</p>
            </div>

            <div>
              <p className="font-medium text-white">
                Does this eSIM support 5G?
              </p>
              <p>Most operators support 4G/5G depending on the device.</p>
            </div>
          </div>
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
            Get Your {country?.name} eSIM
          </button>
        </div>

      </div>
    </main>
  );
}
