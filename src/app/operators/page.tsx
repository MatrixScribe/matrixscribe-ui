"use client";

import { useEffect, useState } from "react";

export default function OperatorsDirectory() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

  /** COUNTRY TYPE */
  interface Country {
    name: string;
    flag: string;
    iso2: string;
  }

  /** OPERATOR TYPE */
  interface Operator {
    operatorId: string;
    name: string;
    logo?: string;
    operatorType?: string;
    countryIso?: string;
  }

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [operators, setOperators] = useState<Operator[]>([]);
  const [showCountries, setShowCountries] = useState(false);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const extractIso2 = (flagUrl: string) => {
    const match = flagUrl?.match(/\/([a-z]{2})\.svg$/i);
    return match ? match[1].toUpperCase() : null;
  };

  /** LOAD COUNTRIES */
  useEffect(() => {
    fetch(`${API_BASE}/api/countries`)
      .then((r) => r.json())
      .then((d) => setCountries(d.countries || []));
  }, []);

  /** LOAD OPERATORS WHEN COUNTRY SELECTED */
  useEffect(() => {
    if (!selectedCountry) return;

    fetch(`${API_BASE}/api/operators?country=${selectedCountry}`)
      .then((r) => r.json())
      .then((d) => setOperators(d.operators || []));
  }, [selectedCountry]);

  const toggleFAQ = (i: number) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faq = [
    {
      q: "What is Redatacom?",
      a: "Redatacom is a global platform for fast, secure international mobile top‑ups. You can recharge your own number or send airtime/data to anyone worldwide in seconds."
    },
    {
      q: "What is an international top‑up?",
      a: "An international top‑up adds prepaid credit or data to a mobile number in another country. Once delivered, the recipient can call, text, or use mobile data immediately. Redatacom handles this securely and instantly."
    },
    {
      q: "Can I send top‑ups from abroad?",
      a: "Yes. With Redatacom, you can recharge any supported number from anywhere in the world — no account required."
    },
    {
      q: "How do I send a top‑up with Redatacom?",
      a: "Select a country, enter the number, choose an amount or bundle, and complete payment. Delivery is usually instant."
    },
    {
      q: "Can I send data bundles?",
      a: "Yes. If the operator supports data bundles, you can send them directly via Redatacom. If not, you can send regular airtime which the recipient can convert to data."
    },
    {
      q: "Which countries are most popular on Redatacom?",
      a: "Redatacom supports 150+ countries. Popular destinations include India, Mexico, Philippines, Afghanistan, and Sudan."
    },
    {
      q: "Which operators are most popular?",
      a: "Airtel, MTN, Digicel, Claro, Etisalat, Zain, and many more across 700+ networks globally are available on Redatacom."
    },
    {
      q: "What payment methods does Redatacom accept?",
      a: "We support major cards and secure online payments depending on your region."
    }
  ];
  return (
    <main className="min-h-screen bg-[#fafafa] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-[28px] font-semibold tracking-tight text-neutral-900">
            Global Networks Directory
          </h1>

          <div className="flex items-center gap-3 mt-3 sm:mt-0">

            {/* HOME BUTTON */}
            <button
  type="button"
  onClick={() => (window.location.href = "/")}
  className="
    h-9 w-9 flex items-center justify-center rounded-full
    border border-neutral-300 bg-white shadow-sm
    hover:border-neutral-500 hover:shadow-md transition
  "
  title="Home"
>
  <img
    src="/favicon.ico"
    alt="Home"
    className="h-10 w-10 object-contain"
  />
</button>

            {/* RECHARGE BUTTON */}
            <button
              onClick={() => (window.location.href = "/topup")}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur 
                text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
                transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy"
            >
              Recharge
            </button>
          </div>
        </div>

        {/* COUNTRY DROPDOWN */}
        <div className="relative mb-6">
          <button
            onClick={() => setShowCountries(!showCountries)}
            className="w-full border rounded-xl px-3 py-2 bg-white text-sm shadow-sm flex items-center justify-between"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <img
                  src={
                    countries.find((c) => extractIso2(c.flag) === selectedCountry)?.flag
                  }
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <span>
                  {
                    countries.find((c) => extractIso2(c.flag) === selectedCountry)
                      ?.name
                  }
                </span>
              </div>
            ) : (
              <span className="text-neutral-500">Select Country</span>
            )}
            <span>▾</span>
          </button>

          {showCountries && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-64 overflow-y-auto">
              {countries.map((c) => {
                const iso2 = extractIso2(c.flag);
                if (!iso2) return null;

                return (
                  <div
                    key={iso2}
                    onClick={() => {
                      setSelectedCountry(iso2);
                      setShowCountries(false);
                    }}
                    className="px-3 py-2 flex items-center gap-2 hover:bg-neutral-100 cursor-pointer"
                  >
                    <img src={c.flag} className="w-5 h-5 rounded-sm object-cover" />
                    <span>{c.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* OPERATOR GRID */}
        {selectedCountry && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
            {operators.map((op) => (
              <div
                key={op.operatorId}
                className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col items-center"
              >
                {op.logo && (
                  <img
                    src={op.logo}
                    className="h-10 object-contain mb-2"
                    alt={op.name}
                  />
                )}

                <div className="text-sm font-medium text-center mb-1">
                  {op.name}
                </div>

                <div className="text-[11px] text-neutral-500">
                  {op.operatorType || "Mobile Operator"}
                </div>
              </div>
            ))}
          </div>
        )}

        {!selectedCountry && (
          <p className="text-neutral-500 text-sm mt-10 text-center mb-12">
            Select a country to view operators.
          </p>
        )}

        {/* FAQ SECTION */}
        <div className="mb-10">
          <h2 className="text-[20px] font-semibold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <div
                key={i}
                className="border border-neutral-200 bg-white rounded-xl shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-800"
                >
                  {item.q}
                  <span className="text-neutral-500">
                    {openFAQ === i ? "▴" : "▾"}
                  </span>
                </button>

                {openFAQ === i && (
                  <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
