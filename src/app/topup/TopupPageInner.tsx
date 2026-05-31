"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Country, Operator, Product } from "@/components/topup/types";
import { Step1Recipient } from "@/components/topup/Step1Recipient";
import { Step2Operator } from "@/components/topup/Step2Operator";
import { Step3Products } from "@/components/topup/Step3Products";
import { Step4Review } from "@/components/topup/Step4Review";

import { usePhoneRules } from "@/hooks/usePhoneRules";
import { useOperators } from "@/hooks/useOperators";
import { useAutoDetectOperator } from "@/hooks/useAutoDetectOperator";
import { useProducts } from "@/hooks/useProducts";

import { getCountryCode } from "@/utils/topup";

export default function TopupPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://redatacom-end.onrender.com";

  const typeParam = searchParams.get("type") || "airtime";
  const topupType: "airtime" | "data" =
    typeParam === "data" ? "data" : "airtime";

  // Countries + phone
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phone, setPhone] = useState("");
  const [step1Done, setStep1Done] = useState(false);

  // Operators
  const {
    allOperators,
    displayOperators,
    setDisplayOperators,
    selectedOperator,
    setSelectedOperator,
    loading: operatorsLoading,
    step2Done,
    setStep2Done
  } = useOperators(step1Done, selectedCountry, API_BASE);

  // Products
  const {
    products,
    groupedProducts,
    loading: productsLoading,
    selectedProduct,
    setSelectedProduct,
    step3Done,
    setStep3Done
  } = useProducts(
    step2Done,
    selectedOperator,
    selectedCountry,
    topupType,
    API_BASE
  );

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const data = await res.json();
        if (Array.isArray(data.countries)) {
          setCountries(data.countries);
          setSelectedCountry(null);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }
    loadCountries();
  }, [API_BASE]);

  const phoneRules = usePhoneRules(selectedCountry, API_BASE);

  const isPhoneValid = useMemo(() => {
    if (!phoneRules) return false;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < phoneRules.minLength) return false;
    if (digits.length > phoneRules.maxLength) return false;
    if (phoneRules.regex) {
      try {
        const re = new RegExp(phoneRules.regex);
        if (!re.test(digits)) return false;
      } catch {}
    }
    return true;
  }, [phone, phoneRules]);

  // Auto-detect operator
  useAutoDetectOperator({
    step1Done,
    phone,
    country: selectedCountry,
    phoneRules,
    allOperators,
    apiBase: API_BASE,
    setSelectedOperator,
    setDisplayOperators,
    setStep2Done
  });

  // Continue to checkout
  const handleContinue = () => {
    if (!step3Done || !selectedCountry || !selectedOperator || !selectedProduct)
      return;

    const code = getCountryCode(selectedCountry);
    if (!code) return;

    const amount =
      (selectedProduct as any).customAmount ??
      selectedProduct.baseAmount ??
      (selectedProduct as any).amount;

    const currency =
      selectedProduct.baseCurrency ?? (selectedProduct as any).currency;

    const payload = {
      type: topupType,
      country: code,
      countryName: selectedCountry.name,
      dialCode: selectedCountry.dialCode,
      phone,
      countryFlag: selectedCountry.flag,
      operatorId: selectedOperator.operatorId,
      operatorName: selectedOperator.name,
      operatorLogo:
        (selectedOperator as any).logoUrls?.[0] || selectedOperator.logo,
      productId: selectedProduct.id,
      productName: selectedProduct.label || selectedProduct.name,
      amount,
      currency
    };

    router.push(
      `/checkout?payload=${encodeURIComponent(JSON.stringify(payload))}`
    );
  };

  // FULL RESET
  const handleRestart = () => {
    setSelectedCountry(null);
    setPhone("");
    setStep1Done(false);
    setSelectedOperator(null);
    setStep2Done(false);
    setSelectedProduct(null);
    setStep3Done(false);
    setTimeLeft(420);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // TIMER LOGIC
  const [timeLeft, setTimeLeft] = useState(420);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleRestart();
    }
  }, [timeLeft]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = (timeLeft / 420) * 100;

  return (
    <main className="relative min-h-screen bg-[#fafafa] text-neutral-900 px-4 py-10 overflow-hidden">

      {/* ⭐ COUNTRY FLAG BACKGROUND */}
      {selectedCountry && (
        <div
          className="
            absolute inset-0 opacity-[0.2]
            bg-center bg-no-repeat bg-contain
            pointer-events-none
          "
          style={{
            backgroundImage: `url('${selectedCountry.flag}')`
          }}
        />
      )}

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* Sticky premium header */}
        <div
          className="
            sticky top-0 z-50
            bg-[#fafafa]/80 backdrop-blur-xl
            border-b border-neutral-200
            mb-8 py-4
          "
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between px-1">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="
                  h-9 w-9 flex items-center justify-center rounded-full
                  border border-neutral-300 bg-white shadow-sm
                  hover:border-neutral-500 hover:shadow-md transition
                "
              >
                <img
                  src="/favicon.ico"
                  alt="Home"
                  className="h-10 w-10 object-contain"
                />
              </button>

              <div>
                <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight">
                  <img src="/logo-alone.png" alt="Redatacom" className="h-10 opacity-90" />
                </h1>
                <p className="text-neutral-600 text-xs md:text-[10px] mt-0.5 flex items-center gap-1">
                  <span className="text-emerald-500 font-semibold animate-pulse">
                    Global
                  </span>
                  <span>Airtime • Data • Bundles • PIN</span>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE: TIMER + RESTART */}
            <div className="flex items-center gap-4">

              {/* Circular Timer */}
              <div className="relative h-10 w-10 flex items-center justify-center">
                <svg className="absolute inset-0 h-full w-full">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke={timeLeft <= 60 ? "#ef4444" : "#10b981"}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={113}
                    strokeDashoffset={113 - (113 * progress) / 100}
                    className={timeLeft <= 60 ? "animate-pulse" : ""}
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className={`
                    text-[11px] font-semibold
                    ${timeLeft <= 60 ? "text-red-600 animate-pulse" : "text-neutral-700"}
                  `}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Restart Button */}
              <button
                type="button"
                onClick={handleRestart}
                disabled={timeLeft > 0}
                className={`
                  h-9 w-9 flex items-center justify-center rounded-full
                  border bg-white shadow-sm text-sm transition-all
                  ${
                    timeLeft <= 0
                      ? "border-purple-500 text-purple-600 animate-energy"
                      : "border-neutral-300 text-neutral-700 opacity-50 cursor-not-allowed"
                  }
                `}
              >
                ↻
              </button>
            </div>
          </div>
        </div>

        {/* Steps container */}
        <div className="max-w-3xl mx-auto space-y-6">

          <Step1Recipient
            apiBase={API_BASE}
            countries={countries}
            countriesLoading={countriesLoading}
            selectedCountry={selectedCountry}
            setSelectedCountry={(c) => {
              setSelectedCountry(c);
              setPhone("");
              setStep1Done(false);
            }}
            phone={phone}
            setPhone={setPhone}
            phoneRules={phoneRules}
            isPhoneValid={isPhoneValid}
            step1Done={step1Done}
            setStep1Done={setStep1Done}
          />

          <Step2Operator
            step1Done={step1Done}
            operatorsLoading={operatorsLoading}
            displayOperators={displayOperators}
            selectedOperator={selectedOperator}
            setSelectedOperator={setSelectedOperator}
            setStep2Done={setStep2Done}
          />

          <Step3Products
            step2Done={step2Done}
            productsLoading={productsLoading}
            products={products}
            groupedProducts={groupedProducts}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            step3Done={step3Done}
            setStep3Done={setStep3Done}
          />

          <Step4Review
            step3Done={step3Done}
            selectedCountry={selectedCountry}
            phone={phone}
            selectedOperator={selectedOperator}
            selectedProduct={selectedProduct}
            topupType={topupType}
            onContinue={handleContinue}
          />

        </div>
      </div>
    </main>
  );
}
