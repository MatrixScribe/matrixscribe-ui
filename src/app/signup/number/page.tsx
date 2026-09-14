// src/app/signup/number/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { Step2Operator } from "@/components/topup/Step2Operator";

/* ------------------------------------------------------------
   ⭐ FINAL FIX: Extract country code from flag URL
------------------------------------------------------------ */
function getSignupCountryCode(c: any) {
  if (!c) return null;

  // 1. Try normal fields
  const direct =
    c.code ||
    c.iso2 ||
    c.countryCode ||
    c.iso ||
    c.id ||
    null;

  if (direct) return direct;

  // 2. Extract from flag URL: ".../za.svg"
  if (c.flag) {
    const match = c.flag.match(/\/([a-z]{2})\.svg$/i);
    if (match && match[1]) {
      return match[1].toUpperCase(); // "ZA"
    }
  }

  return null;
}

export default function SignupNumber() {
  const router = useRouter();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const [countries, setCountries] = useState<any[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  const [phone, setPhone] = useState("");

  const [step1Done, setStep1Done] = useState(false);
  const [step2Visible, setStep2Visible] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  const [operatorsLoading, setOperatorsLoading] = useState(false);
  const [displayOperators, setDisplayOperators] = useState<any[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const data = await res.json();
        setCountries(data.countries || []);
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }
    loadCountries();
  }, [API_BASE]);

  // ⭐ GUARANTEED WORKING FETCH
  const handleSeeNetworks = async () => {
    if (!selectedCountry) return;

    const code = getSignupCountryCode(selectedCountry);
    console.log("Resolved country code:", code);

    if (!code) {
      console.error("No valid country code found:", selectedCountry);
      return;
    }

    setStep1Done(true);
    setStep2Visible(true);
    setStep2Done(false);
    setSelectedOperator(null);
    setOperatorsLoading(true);

    try {
      const url = `${API_BASE}/api/operators?country=${code}`;
      console.log("Fetching operators →", url);

      const res = await fetch(url);
      const data = await res.json();

      console.log("Operators response:", data);

      setDisplayOperators(data.operators || []);
    } catch (err) {
      console.error("Failed to load operators", err);
      setDisplayOperators([]);
    } finally {
      setOperatorsLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedOperator || !selectedCountry) return;

    const code = getSignupCountryCode(selectedCountry);

    const fullMsisdn =
      "+" +
      selectedCountry.dialCode.replace(/\D/g, "") +
      phone.replace(/\D/g, "");

    router.push(
      `/signup/pin?` +
        `country=${encodeURIComponent(selectedCountry.name)}` +
        `&countryCode=${encodeURIComponent(code)}` +
        `&dialCode=${encodeURIComponent(selectedCountry.dialCode)}` +
        `&flag=${encodeURIComponent(selectedCountry.flag)}` +
        `&phone=${encodeURIComponent(fullMsisdn)}` +
        `&operatorLogo=${encodeURIComponent(selectedOperator.logo || "")}` +
        `&operatorName=${encodeURIComponent(selectedOperator.name || "")}` +
        `&operatorId=${encodeURIComponent(
          selectedOperator.operatorId || selectedOperator.id || ""
        )}`
    );
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">

      {/* Country Flag Background */}
      {selectedCountry && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.08]"
          style={{ backgroundImage: `url(${selectedCountry.flag})` }}
        />
      )}

      <div className="relative z-10 px-6 py-12 flex flex-col items-center">

        {/* COUNTRY SELECTOR */}
        <div className="mb-8 w-full max-w-xl">
          <button
            onClick={() => setCountryModalOpen(true)}
            className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 flex items-center justify-between"
          >
            <span className="flex items-center gap-3">
              {selectedCountry && (
                <img
                  src={selectedCountry.flag}
                  className="h-7 w-7 rounded-md shadow-sm"
                />
              )}
              <span className="text-white font-medium">
                {selectedCountry?.name || "Country"}
              </span>
            </span>
            <span className="text-neutral-400 text-lg">›</span>
          </button>

          <CountrySelectorModal
            open={countryModalOpen}
            onClose={() => setCountryModalOpen(false)}
            onSelect={(c: any) => {
              console.log("COUNTRY OBJECT:", c);
              setSelectedCountry(c);
              setPhone("");
              setStep1Done(false);
              setStep2Visible(false);
              setStep2Done(false);
              setDisplayOperators([]);
              setSelectedOperator(null);
            }}
            countries={countries}
          />
        </div>

        {/* PHONE INPUT */}
        <div className="mb-10 w-full max-w-xl">
          <div className="flex gap-3">
            <div className="w-28 rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-neutral-200">
              {selectedCountry?.dialCode || "+XX"}
            </div>

            <input
              type="tel"
              className="flex-1 rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white"
              placeholder="enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* SEE NETWORKS BUTTON */}
        {!step1Done && (
          <button
            onClick={handleSeeNetworks}
            disabled={!selectedCountry}
            className="w-full max-w-xl py-4 rounded-2xl bg-purple-600 text-white"
          >
            See Networks
          </button>
        )}

        {/* NETWORKS GRID */}
        {step2Visible && (
          <Step2Operator
            operatorsLoading={operatorsLoading}
            displayOperators={displayOperators}
            selectedOperator={selectedOperator}
            setSelectedOperator={(op) => {
              setSelectedOperator(op);
              setStep2Done(true);
            }}
            setStep2Done={setStep2Done}
          />
        )}

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleContinue}
          disabled={!step2Done}
          className={`w-full max-w-xl py-4 rounded-2xl ${
            !step2Done
              ? "bg-white/10 text-neutral-400"
              : "bg-ffff text-white"
          }`}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
