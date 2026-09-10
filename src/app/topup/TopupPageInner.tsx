"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ⭐ FIXED — only import Country
import { Country } from "@/components/topup/types";

import { Step1Recipient } from "@/components/topup/Step1Recipient";
import { Step2Operator } from "@/components/topup/Step2Operator";
import { Step3Products } from "@/components/topup/Step3Products";
import { Step4Review } from "@/components/topup/Step4Review";

import { usePhoneRules } from "@/hooks/usePhoneRules";
import { useOperators } from "@/hooks/useOperators";
import { useAutoDetectOperator } from "@/hooks/useAutoDetectOperator";
import { useProducts } from "@/hooks/useProducts";

import { getCountryCode } from "@/utils/topup";

// ⭐ ADD THIS IMPORT
import { usePreferredCurrency } from "@/components/context/PreferredCurrencyContext";

export default function TopupPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://redatacom-end.onrender.com";

  const typeParam = searchParams.get("type") || "airtime";
  const topupType: "airtime" | "data" =
    typeParam === "data" ? "data" : "airtime";

  // ⭐ ADD THIS HOOK
  const { preferredCurrency, preferredRate } = usePreferredCurrency();

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
    setStep2Done,
  } = useOperators(step1Done, selectedCountry, API_BASE);

  // Products
  const {
    products,
    groupedProducts,
    loading: productsLoading,
    selectedProduct,
    setSelectedProduct,
    step3Done,
    setStep3Done,
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
    setStep2Done,
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
      currency,

      // ⭐ ADD THESE TO PAYLOAD IF YOU WANT THEM IN CHECKOUT
      preferredCurrency,
      preferredRate,
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
      {/* COUNTRY FLAG BACKGROUND */}
      {selectedCountry && (
        <div
          className="
            absolute inset-0 opacity-[0.2]
            bg-center bg-no-repeat
            bg-cover sm:bg-contain
            pointer-events-none
          "
          style={{
            backgroundImage: `url('${selectedCountry.flag}')`,
          }}
        />
      )}

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">
        {/* Sticky premium header */}
        {/* ... unchanged ... */}

        {/* Steps container */}
        <div className="max-w-3xl mx-auto space-y-6">
          <Step1Recipient
            countries={countries}
            countriesLoading={countriesLoading}
            selectedCountry={selectedCountry}
            setSelectedCountry={(c) => {
              setSelectedCountry(c);
              setPhone("");
              setStep1Done(false);
            }}
            step1Done={step1Done}
            setStep1Done={setStep1Done}
          />

          <Step2Operator
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
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            step3Done={step3Done}
            setStep3Done={setStep3Done}
          />

          <Step4Review
            step3Done={step3Done}
            selectedCountry={selectedCountry}
            phone={phone}
            setPhone={setPhone}
            selectedOperator={selectedOperator}
            selectedProduct={selectedProduct}
            topupType="airtime"
            preferredCurrency={preferredCurrency}
            preferredRate={preferredRate}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </main>
  );
}
