"use client";

import { use } from "react";
import { classifyTravelSlug } from "@/lib/travel";
import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function TravelPage({ params }: any) {
  const resolved = use(params) as { slug: string };
  const { slug } = resolved;

  const { isAirport, isEsim, location } = classifyTravelSlug(slug);

  const title = isAirport ? `${location} Airport eSIM` : `${location} eSIM`;

  return (
    <main className="px-6 py-10 relative">

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
          {title}
        </h1>

        {/* AUTO-GENERATED SEO TEXT */}
        <p className="text-neutral-400 text-sm mb-10">
          {generateSEOText(title, location)}
        </p>

        <p className="text-neutral-400 text-sm mb-10">
          Instant eSIM activation • Global coverage • Works on all modern devices
        </p>

        {/* LOCAL INFO */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">
            About {location}
          </h2>

          <p className="text-neutral-300 text-sm leading-relaxed">
            {isAirport
              ? `${location} Airport is one of the busiest travel hubs in the region. Travelers often look for fast and reliable mobile data options upon arrival.`
              : `${location} is a popular travel destination with millions of visitors each year. Staying connected is essential for navigation, communication, and travel planning.`}
          </p>
        </section>

        {/* WHY ESIM */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Why Choose eSIM?</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>No physical SIM needed</li>
            <li>Instant activation via QR code</li>
            <li>Keep your WhatsApp number</li>
            <li>Works across multiple countries</li>
            <li>Supports 4G and 5G networks</li>
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
          <h2 className="text-xl font-semibold mb-3">Travel FAQ</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>eSIM activation is instant.</li>
            <li>You can keep your WhatsApp number.</li>
            <li>Region plans allow roaming across multiple countries.</li>
            <li>Global plans work in 100+ countries.</li>
            <li>Most modern devices support eSIM.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
