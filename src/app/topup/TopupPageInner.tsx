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
    "https://redatacomend.onrender.com";

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

  // Continue to checkout (minimal payload)
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

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900 px-4 py-10">
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
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

            <div>
              <h1 className="text-[20px] md:text-[24px] font-semibold tracking-tight">
                {topupType === "airtime" ? "Airtime Top‑Up" : "Data Top‑Up"}
              </h1>
              <p className="text-neutral-600 text-xs md:text-[13px] mt-0.5">
                Complete the steps below to send a fast, global mobile top‑up.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="
              h-9 w-9 flex items-center justify-center rounded-full
              border border-neutral-300 bg-white shadow-sm
              text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy
            "
            title="Restart"
          >
            ↻
          </button>
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
    </main>
  );
}
