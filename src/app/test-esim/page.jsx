"use client";

import { useState } from "react";

export default function TestEsimPage() {
  const [slug, setSlug] = useState("united-arab-emirates");
  const [airalo, setAiralo] = useState(null);
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAiraloPackages(countrySlug) {
    const html = await fetch(`https://www.airalo.com/country/${countrySlug}`)
      .then(r => r.text());

    const match = html.match(/window\.__APOLLO_STATE__ = (.*?);\s*<\/script>/);

    if (!match) return [];

    const apolloState = JSON.parse(match[1]);

    const packages = Object.values(apolloState)
      .filter(v => v && v.__typename === "Package");

    return packages.map(p => ({
      id: p.id,
      name: p.name,
      price_usd: p.priceUsd,
      data_gb: p.dataGb,
      validity: p.validity,
    }));
  }

  async function runTest() {
    setLoading(true);
    setAiralo(null);
    setPlans(null);

    const airaloPackages = await fetchAiraloPackages(slug);
    setAiralo(airaloPackages);

    await fetch("http://localhost:4000/api/esim/competitors/airalo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        countrySlug: slug,
        packages: airaloPackages
      })
    });

    const res = await fetch(
      `http://localhost:4000/api/esim/plans?country=${slug}`
    );
    const data = await res.json();
    setPlans(data.products);

    setLoading(false);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>eSIM Competitor Pricing Test</h1>

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

      {airalo && (
        <div style={{ marginTop: 30 }}>
          <h2>Airalo Packages</h2>
          <pre>{JSON.stringify(airalo, null, 2)}</pre>
        </div>
      )}

      {plans && (
        <div style={{ marginTop: 30 }}>
          <h2>Your eSIMGo Plans (Undercut)</h2>
          <pre>{JSON.stringify(plans, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
