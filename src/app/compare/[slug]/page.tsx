"use client";

import { use } from "react";
import { parseComparisonSlug, formatName } from "@/lib/compare";
import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function ComparePage({ params }: any) {
  const resolved = use(params) as { slug: string };
  const { slug } = resolved;

  const { left, right } = parseComparisonSlug(slug);

  const leftName = formatName(left);
  const rightName = formatName(right);

  // SEO title + location (comparison pages do not use location)
  const title = `${leftName} vs ${rightName}`;
  const location = undefined;

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
          A complete comparison of features, coverage, pricing, and travel benefits.
        </p>

        {/* COMPARISON SUMMARY */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>

          <p className="text-neutral-300 text-sm leading-relaxed">
            This comparison explores the differences between {leftName} and {rightName}, 
            including coverage, supported countries, device compatibility, activation process, 
            and travel benefits. Whether you're choosing an eSIM provider, comparing travel options, 
            or evaluating technology, this guide helps you make an informed decision.
          </p>
        </section>

        {/* KEY POINTS */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Key Differences</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Coverage and supported countries</li>
            <li>Network quality and roaming support</li>
            <li>Device compatibility</li>
            <li>Activation process</li>
            <li>Travel convenience</li>
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
          <h2 className="text-xl font-semibold mb-3">Comparison FAQ</h2>

          <ul className="text-neutral-300 text-sm space-y-2">
            <li>Most modern devices support eSIM.</li>
            <li>Global plans work in 100+ countries.</li>
            <li>Region plans allow roaming across multiple countries.</li>
            <li>Activation is instant via QR code.</li>
            <li>You can keep your WhatsApp number.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
