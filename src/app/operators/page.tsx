"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTopupStore } from "@/store/topupStore";

export default function OperatorsDirectory() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

  interface Country {
    name: string;
    flag: string;
    iso2: string;
  }

  interface Operator {
    operatorId: string;
    name: string;
    logo?: string;
    operatorType?: string;
  }

  interface FixedBundle {
    id: string;
    price: number;
    currency: string;
    name: string;
    rawDescription?: string;
  }

  interface RangeProduct {
    type: "RANGE";
    currency: string;
    min: number;
    max: number;
  }

  const router = useRouter();
  const setOperator = useTopupStore((s) => s.setOperator);
  const setProduct = useTopupStore((s) => s.setProduct);

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [operators, setOperators] = useState<Operator[]>([]);
  const [showCountries, setShowCountries] = useState(false);

  const [expandedOperator, setExpandedOperator] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [rangeProduct, setRangeProduct] = useState<RangeProduct | null>(null);
  const [fixedProducts, setFixedProducts] = useState<FixedBundle[]>([]);

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

  /** LOAD OPERATORS */
  useEffect(() => {
    if (!selectedCountry) return;

    fetch(`${API_BASE}/api/operators?country=${selectedCountry}`)
      .then((r) => r.json())
      .then((d) => setOperators(d.operators || []));
  }, [selectedCountry]);

  /** LOAD PRODUCTS FOR OPERATOR */
  const loadProducts = async (operatorId: string) => {
    setLoadingProducts(true);
    setRangeProduct(null);
    setFixedProducts([]);

    const res = await fetch(`${API_BASE}/api/products?operatorId=${operatorId}`);
    const data = await res.json();

    if (data.type === "RANGE") {
      setRangeProduct({
        type: "RANGE",
        currency: data.currency,
        min: data.min,
        max: data.max
      });
    }

    if (data.type === "FIXED" && Array.isArray(data.bundles)) {
      setFixedProducts(data.bundles);
    }

    setLoadingProducts(false);
  };

  const handleOperatorClick = (op: Operator) => {
    if (expandedOperator === op.operatorId) {
      setExpandedOperator(null);
      return;
    }

    setExpandedOperator(op.operatorId);
    loadProducts(op.operatorId);
  };

  const handleFixedProductClick = (operator: Operator, bundle: FixedBundle) => {
    setOperator(operator);
    setProduct({
      id: bundle.id,
      name: bundle.name,
      baseAmount: bundle.price,
      baseCurrency: bundle.currency
    });
    router.push("/topup");
  };

  const handleRangeClick = (operator: Operator, range: RangeProduct) => {
    setOperator(operator);
    setProduct({
      id: "custom",
      kind: "custom",
      minBaseAmount: range.min,
      maxBaseAmount: range.max,
      baseCurrency: range.currency
    });
    router.push("/topup");
  };

  const toggleFAQ = (i: number) => {
    setOpenFAQ(openFAQ === i ? null : i);
  };

  const faq = [
    { q: "What is Redatacom?", a: "Redatacom is a global platform for fast, secure international mobile top‑ups." },
    { q: "What is an international top‑up?", a: "It adds prepaid credit or data to a mobile number in another country." },
    { q: "Can I send top‑ups from abroad?", a: "Yes, from anywhere in the world." },
    { q: "How do I send a top‑up?", a: "Select a country, choose operator, pick product, pay." },
    { q: "Can I send data bundles?", a: "Yes, if supported by the operator." }
  ];

  return (
    <main className="relative min-h-screen bg-[#fafafa] px-4 py-10 overflow-hidden">

      {/* ⭐ COUNTRY FLAG BACKGROUND */}
      {selectedCountry && (
        <div
          className="
            absolute inset-0 opacity-[0.08]
            bg-center bg-no-repeat bg-contain
            pointer-events-none
          "
          style={{
            backgroundImage: `url('${
              countries.find((c) => extractIso2(c.flag) === selectedCountry)?.flag
            }')`
          }}
        />
      )}

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-[28px] font-semibold tracking-tight text-neutral-900">
            <img src="/logo-gnd.png" alt="Redatacom" className="h-10 opacity-90" />
          </h1>

          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <button
              type="button"
              onClick={() => (window.location.href = "/")}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-300 bg-white shadow-sm hover:border-neutral-500 hover:shadow-md transition"
            >
              <img src="/favicon.ico" alt="Home" className="h-10 w-10 object-contain" />
            </button>

            <button
              onClick={() => (window.location.href = "/topup")}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm hover:shadow-md"
            >
              Recharge
            </button>
          </div>
        </div>

        {/* COUNTRY SELECTOR */}
        <div className="relative mb-6">
          <button
            onClick={() => setShowCountries(!showCountries)}
            className="w-full border rounded-xl px-3 py-2 bg-white text-sm shadow-sm flex items-center justify-between"
          >
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                <img
                  src={countries.find((c) => extractIso2(c.flag) === selectedCountry)?.flag}
                  className="h-5 w-7 rounded shadow-sm object-cover"
                />
                <span>{countries.find((c) => extractIso2(c.flag) === selectedCountry)?.name}</span>
              </div>
            ) : (
              <span className="text-neutral-500">Select Country to see Networks and Plans</span>
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
                    <img src={c.flag} className="h-5 w-7 rounded shadow-sm object-cover" />
                    <span>{c.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* OPERATORS */}
        {selectedCountry && (
          <div className="space-y-4 mb-12">
            {operators.map((op) => (
              <div key={op.operatorId} className="border rounded-xl bg-white shadow-sm">

                {/* Operator Header */}
                <button
                  onClick={() => handleOperatorClick(op)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    {op.logo && <img src={op.logo} className="h-8 object-contain" />}
                    <div>
                      <div className="text-sm font-medium">{op.name}</div>
                      <div className="text-[11px] text-neutral-500">{op.operatorType || "Mobile Operator"}</div>
                    </div>
                  </div>
                  <span className="text-neutral-500">{expandedOperator === op.operatorId ? "▴" : "▾"}</span>
                </button>

                {/* Products */}
                {expandedOperator === op.operatorId && (
                  <div className="px-4 pb-4">

                    {loadingProducts && <p className="text-sm text-neutral-500">Loading products…</p>}

                    {/* RANGE PRODUCT */}
                    {!loadingProducts && rangeProduct && (
                      <button
                        onClick={() => handleRangeClick(op, rangeProduct)}
                        className="w-full border rounded-lg px-3 py-3 bg-neutral-50 hover:bg-purple-50 hover:border-purple-400 transition text-left"
                      >
                        <div className="font-medium">Custom Airtime</div>
                        <div className="text-[12px] text-neutral-600">
                          {rangeProduct.currency} {rangeProduct.min} – {rangeProduct.currency} {rangeProduct.max}
                        </div>
                      </button>
                    )}

                    {/* FIXED PRODUCTS */}
                    {!loadingProducts && fixedProducts.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                        {fixedProducts.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => handleFixedProductClick(op, b)}
                            className="border rounded-lg px-3 py-2 text-xs bg-neutral-50 hover:bg-purple-50 hover:border-purple-400 transition"
                          >
                            <div className="font-medium">{b.name}</div>
                            <div className="text-neutral-600 text-[11px]">
                              {b.currency} {b.price}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>
            ))}
          </div>
        )}

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-[20px] font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="border border-neutral-200 bg-white rounded-xl shadow-sm">
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-800"
                >
                  {item.q}
                  <span className="text-neutral-500">{openFAQ === i ? "▴" : "▾"}</span>
                </button>

                {openFAQ === i && (
                  <div className="px-4 pb-4 text-sm text-neutral-600 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
