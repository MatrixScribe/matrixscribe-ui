"use client";

import { useState } from "react";

export default function TestEsimPage() {
  const [slug, setSlug] = useState("south-africa");
  const [holafly, setHolafly] = useState(null);
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchHolaflyPackages(countrySlug) {
    const url = `https://holafly.com/esim/${countrySlug}/`;

    const html = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
    ).then(r => r.text());

    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/
    );

    if (!match) return [];

    const json = JSON.parse(match[1]);

    const product = json?.props?.pageProps?.product;

    if (!product || !product.variants) return [];

    return product.variants.map(v => ({
      id: v.id,
      name: v.name,
      price_usd: v.price?.usd || v.price?.amount || null,
      data_gb: v.data || null,
      validity: v.days || null,
    }));
  }

  async function runTest() {
    setLoading(true);
    setHolafly(null);
    setPlans(null);

    // 1️⃣ Fetch Holafly competitor packages
    const holaflyPackages = await fetchHolaflyPackages(slug);
    setHolafly(holaflyPackages);

    // 2️⃣ Send competitor data to backend
    await fetch("http://localhost:4000/api/esim/competitors/holafly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        countrySlug: slug,
        packages: holaflyPackages,
      }),
    });

    // 3️⃣ Fetch your eSIMGo plans
    const res = await fetch(
      `http://localhost:4000/api/esim/plans?country=${slug}`
    );
    const data = await res.json();
    setPlans(data.products);

    setLoading(false);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Holafly Competitor Pricing Test</h1>

      <label>Country Slug:</label>
      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        style={{ padding: 8, marginLeft: 10 }}
      />

      <button
        onClick={runTest}
        style={{ marginLeft: 20, padding: "8px 20px" }}
      >
        Run Test
      </button>

      {loading && <p>Loading...</p>}

      {holafly && (
        <div style={{ marginTop: 30 }}>
          <h2>Holafly Packages</h2>
          <pre>{JSON.stringify(holafly, null, 2)}</pre>
        </div>
      )}

      {plans && (
        <div style={{ marginTop: 30 }}>
          <h2>Your eSIMGo Plans (With Undercut Pricing)</h2>
          <pre>{JSON.stringify(plans, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
