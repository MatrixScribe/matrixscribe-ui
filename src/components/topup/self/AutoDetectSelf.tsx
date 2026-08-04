"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://redatacom-end.onrender.com/api";

type Operator = {
  operatorId: number;
  name: string;
  logo: string | null;
};

export default function AutoDetectSelf({
  userCountry,
  userPhone,
  setSelectedOperator,
  setDisplayOperators,
}: {
  userCountry: { name: string; flag?: string };
  userPhone: string;
  setSelectedOperator: (op: Operator | null) => void;
  setDisplayOperators: (ops: Operator[]) => void;
}) {
  const [countryCode, setCountryCode] = useState<string>("");
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loadingOps, setLoadingOps] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [suggested, setSuggested] = useState<Operator | null>(null);
  const [loadingSuggested, setLoadingSuggested] = useState(false);

  const cleanPhone = userPhone?.replace(/\D/g, "") || "";

  // quick debug
  console.log("AutoDetectSelf userPhone:", userPhone);
  console.log("AutoDetectSelf cleanPhone:", cleanPhone);
  console.log("AutoDetectSelf userCountry:", userCountry);

  useEffect(() => {
    if (userCountry?.flag) {
      const match = userCountry.flag.match(/\/([a-z]{2})\.svg$/i);
      if (match) {
        setCountryCode(match[1].toUpperCase());
        return;
      }
    }

    if (userCountry?.name) {
      setCountryCode(userCountry.name.slice(0, 2).toUpperCase());
    }
  }, [userCountry]);

  useEffect(() => {
    if (!countryCode) return;

    setLoadingOps(true);

    fetch(`${API_BASE}/operators?country=${countryCode}`)
      .then((r) => r.json())
      .then((data) => {
        const ops = data?.operators || [];
        setOperators(ops);
        setDisplayOperators(ops);
      })
      .catch(() => {
        setOperators([]);
        setDisplayOperators([]);
      })
      .finally(() => setLoadingOps(false));
  }, [countryCode]);

  useEffect(() => {
    if (!countryCode || !cleanPhone) return;

    setLoadingSuggested(true);

    fetch(
      `${API_BASE}/operators/auto-detect?phone=${encodeURIComponent(
        cleanPhone
      )}&country=${countryCode}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.operator?.operatorId) {
          setSuggested(data.operator);
          setSelectedOperator(data.operator);
        } else {
          setSuggested(null);
        }
      })
      .catch(() => setSuggested(null))
      .finally(() => setLoadingSuggested(false));
  }, [countryCode, cleanPhone]);

  return (
    <section className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden">
      <div className="relative z-10 bg-ffff border border-neutral-200 rounded-2xl p-4 shadow-sm">

        {/* PHONE DISPLAY – top right, like before */}
        <div className="flex items-center justify-between text-xs text-neutral-600 mb-3">
          <img src="/icon-recharge.png" className="w-auto h-10 opacity-100" />
          <span className="text-lg font-mono text-purple-800">
            {cleanPhone || "—"}
          </span>
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">
              {userCountry?.name || "Selected country"}
            </p>
          </div>

          {userCountry?.flag && (
            <img src={userCountry.flag} className="h-8 w-20 rounded-md" alt="" />
          )}
        </div>

        {/* SUGGESTED OPERATOR */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-neutral-700 mb-1">
            Detected operator:
          </p>

          <div className="min-h-[48px] flex items-center gap-3 rounded-xl border border-purple-300 bg-purple-50/60 px-3 py-2">
            {loadingSuggested && (
              <span className="text-xs text-purple-600 animate-pulse">
                Detecting best match…
              </span>
            )}

            {!loadingSuggested && suggested && (
              <>
                {suggested.logo && (
                  <img
                    src={suggested.logo}
                    className="h-7 w-7 rounded-sm object-contain bg-white"
                  />
                )}
                <span className="text-sm font-semibold text-neutral-900">
                  {suggested.name}
                </span>
              </>
            )}

            {!loadingSuggested && !suggested && (
              <span className="text-xs text-neutral-500">
                No suggested operator for this number.
              </span>
            )}
          </div>
        </div>

        {/* OPERATORS CAROUSEL */}
        <div className="mt-2">
          <p className="text-xs font-semibold text-neutral-700 mb-2">
            Detected operators in this country
          </p>

          {loadingOps && (
            <p className="text-xs text-neutral-500">Loading operators…</p>
          )}

          {!loadingOps && operators.length === 0 && (
            <p className="text-xs text-neutral-500">
              No operators found for this country.
            </p>
          )}

          {!loadingOps && operators.length > 0 && (
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2">
              {operators.map((op) => (
                <button
                  key={op.operatorId}
                  onClick={() => {
                    setSelectedId(op.operatorId);
                    setSelectedOperator(op);
                  }}
                  className={`
                    snap-center shrink-0
                    w-40 h-28
                    rounded-2xl border px-3 py-2
                    flex flex-col items-start justify-center
                    text-left text-xs transition
                    ${
                      selectedId === op.operatorId
                        ? "border-purple-600 bg-purple-50 shadow-sm"
                        : "border-neutral-200 bg-white hover:border-neutral-400"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {op.logo && (
                      <img
                        src={op.logo}
                        className="h-8 w-auto rounded-sm object-contain bg-white"
                      />
                    )}
                    <span className="text-[10px] font-semibold">
                      {op.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
