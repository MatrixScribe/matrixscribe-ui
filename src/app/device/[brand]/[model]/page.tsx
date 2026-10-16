"use client";

import { use } from "react";
import { devices, formatDeviceName, isKnownModel } from "@/lib/devices";
import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function DevicePage({ params }: any) {
  const resolved = use(params) as { brand: string; model: string };

  const brand = resolved.brand.toLowerCase();
  const model = resolved.model.toLowerCase();

  const displayName = formatDeviceName(model);
  const known = isKnownModel(brand, model);

  // SEO title + location (device pages do not use location)
  const title = `${displayName} eSIM Compatibility`;
  const location = undefined;

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 
        bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

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
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
              text-white text-sm font-medium hover:bg-purple-700 hover:border-purple-500 transition-all"
            >
              Login
            </button>

            <button
              onClick={() => (window.location.href = "/signup/number")}
              className="px-4 py-2 rounded-lg bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition-all"
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-4
        ">
          {displayName} eSIM Compatibility
        </h1>

        {/* AUTO-GENERATED SEO TEXT */}
        <p className="text-neutral-400 text-sm mb-10">
          {generateSEOText(title, location)}
        </p>

        {/* KNOWN / UNKNOWN MODEL */}
        {!known && (
          <p className="text-neutral-400 text-sm mb-6">
            This device is not yet in our official compatibility list, but most modern {brand} devices support eSIM. 
            You can still follow the activation steps below.
          </p>
        )}

        {known && (
          <p className="text-neutral-400 text-sm mb-6">
            The {displayName} fully supports eSIM activation, global roaming, region bundles, and Redatacom travel plans.
          </p>
        )}

        {/* ACTIVATION STEPS */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">How to Activate eSIM on {displayName}</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Open Settings → Mobile / Cellular</li>
            <li>Select “Add eSIM” or “Add Mobile Plan”</li>
            <li>Scan the QR code you receive after purchase</li>
            <li>Confirm installation</li>
            <li>Your eSIM activates instantly</li>
          </ul>
        </section>

        {/* LINKS */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-3">Popular eSIM Options</h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window.location.href = "/global")}
              className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-sm"
            >
              Global eSIM Plans
            </button>

            <button
              onClick={() => (window.location.href = "/coverage")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
            >
              Browse All Countries
            </button>

            <button
              onClick={() => (window.location.href = "/region/afr")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
            >
              Africa Region Plans
            </button>

            <button
              onClick={() => (window.location.href = "/region/eu")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
            >
              Europe Region Plans
            </button>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <InternalLinks />

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-xl font-semibold mb-3">Device FAQ</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Most modern {brand} devices support eSIM.</li>
            <li>You can keep your WhatsApp number while using eSIM.</li>
            <li>eSIM activation is instant — no physical SIM needed.</li>
            <li>Region plans allow roaming across multiple countries.</li>
            <li>Global plans work in 100+ countries.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
