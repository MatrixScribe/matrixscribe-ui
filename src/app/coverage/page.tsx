"use client";

import { useEffect, useState } from "react";

export default function CoveragePage() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [operators, setOperators] = useState<any[]>([]);
  const [loadingOps, setLoadingOps] = useState(false);

  // Extract ISO2 from flag URL
  const extractIso2 = (flagUrl: string) => {
    const match = flagUrl?.match(/\/([a-z]{2})\.svg$/i);
    return match ? match[1].toUpperCase() : null;
  };

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch("https://redatacom-end.onrender.com/api/countries");
        const data = await res.json();
        setCountries(data.countries || []);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
      setLoading(false);
    }

    loadCountries();
  }, []);

  // Load operators for selected country
  async function loadOperators(flagUrl: string) {
    setLoadingOps(true);

    const iso2 = extractIso2(flagUrl);

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

  // When clicking a country card
  function handleCountryClick(country: any) {
    setSelectedCountry(country);
    loadOperators(country.flag);
  }

  // Close modal
  function closeModal() {
    setSelectedCountry(null);
    setOperators([]);
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 
        bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="
              h-9 w-9 flex items-center justify-center rounded-full
              border border-white/20 bg-white/10 backdrop-blur-xl
              shadow-sm hover:bg-white/20 hover:border-white/40 transition
            "
          >
            <img src="/favicon.ico" className="h-10 w-10 object-contain" />
          </button>

          <button
            onClick={() => (window.location.href = "/topup")}
            className="
              px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl
              text-white text-sm hover:bg-purple-700 hover:border-purple-500 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap
            "
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="
          text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-300 via-white to-purple-300 
          mb-2 flex items-center gap-2
        ">
          
          Global Coverage Map
        </h1>

        <p className="text-neutral-400 text-xs mb-10">
          150+ Countries • 700+ Operators • Infinite Connectivity
        </p>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-neutral-400 mt-20 animate-pulse">
            Loading global coverage…
          </div>
        )}

        {/* GRID OF COUNTRIES */}
        {!loading && (
          <div className="
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6
          ">
            {countries.map((c, i) => (
              <div
                key={i}
                onClick={() => handleCountryClick(c)}
                className="
                  bg-ffff 
                  backdrop-blur-xl shadow-lg p-4 flex flex-col items-center 
                  hover:bg-purple-900/20 hover:border-purple-400 
                  transition-all cursor-pointer
                "
              >
                <img
                  src={c.flag}
                  alt={c.name}
                  className="h-10 w-14 object-cover rounded shadow-md mb-3"
                />
                <p className="text-sm font-medium text-white text-center">
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER CTA */}
        <div className="text-center mt-16 mb-20">
          <p className="text-neutral-400 mb-2">Ready to recharge?</p>
          <button
            onClick={() => (window.location.href = "/topup")}
            className="
              px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800
              text-white font-semibold shadow-sm hover:shadow-md transition
            "
          >
            Start a Recharge
          </button>
        </div>

      </div>

      {/* COUNTRY OPERATORS MODAL */}
{selectedCountry && (
  <div className="
    fixed inset-0 bg-black/60 backdrop-blur-xl z-50 
    flex items-center justify-center p-4
  ">
    <div className="
      bg-[#0b0b0f] border border-white/10 rounded-2xl shadow-2xl 
      w-full max-w-xl 
      max-h-[80vh] overflow-y-auto
      p-6
    ">
      {/* Modal Header */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#0b0b0f] pb-2">
        <div className="flex items-center gap-3">
          <img
            src={selectedCountry.flag}
            className="h-8 w-12 rounded shadow"
          />
          <h2 className="
            text-xl font-semibold text-transparent bg-clip-text 
            bg-gradient-to-r from-purple-300 via-white to-purple-300
          ">
            {selectedCountry.name}
          </h2>
        </div>

        <button
          onClick={closeModal}
          className="
            px-3 py-1 rounded-lg bg-white/10 border border-white/20 
            text-white text-sm hover:bg-white/20 transition
          "
        >
          Close
        </button>
      </div>

      {/* Operators Loading */}
      {loadingOps && (
        <p className="text-neutral-400 text-sm animate-pulse">
          Loading networks…
        </p>
      )}

      {/* Operators Grid */}
      {!loadingOps && operators.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4 pb-4">
          {operators.map((op) => (
            <button
              key={op.operatorId}
              onClick={() => (window.location.href = "/login")}
              className="
                bg-white/5 border border-white/10 rounded-xl p-3 
                flex flex-col items-center text-center w-full
                hover:bg-purple-900/20 hover:border-purple-400 
                transition cursor-pointer
              "
            >
              {op.logo && (
                <img
                  src={op.logo}
                  className="h-8 object-contain mb-2"
                />
              )}
              <p className="text-sm font-medium text-white">{op.name}</p>
              <p className="text-xs text-neutral-400">
                {op.operatorType || "Mobile Operator"}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* No Operators */}
      {!loadingOps && operators.length === 0 && (
        <p className="text-neutral-400 text-sm mt-4">
          No operators found for this country.
        </p>
      )}
    </div>
  </div>
)}


    </main>
  );
}
