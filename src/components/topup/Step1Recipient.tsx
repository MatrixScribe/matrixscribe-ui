"use client";

import { Country, PhoneRules } from "./types";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { useState, useEffect, useRef } from "react";

type Props = {
  apiBase: string;
  countries: Country[];
  countriesLoading: boolean;
  selectedCountry: Country | null;
  setSelectedCountry: (c: Country | null) => void;
  phone: string;
  setPhone: (v: string) => void;
  phoneRules: PhoneRules | null;
  isPhoneValid: boolean;
  step1Done: boolean;
  setStep1Done: (v: boolean) => void;
};

export function Step1Recipient(props: Props) {
  const {
    countries,
    countriesLoading,
    selectedCountry,
    setSelectedCountry,
    phone,
    setPhone,
    phoneRules,
    isPhoneValid,
    step1Done,
    setStep1Done
  } = props;

  const [countryModalOpen, setCountryModalOpen] = useState(false);

  const dotColor = step1Done
    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
    : selectedCountry || phone.length > 0
    ? "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
    : "bg-neutral-300";

  // ------------------------------------
  // ⭐ 3D TILT EFFECT
  // ------------------------------------
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-3xl p-7 mb-10 transition-transform duration-300
        ${step1Done ? "animate-[neonPulse_1.8s_ease-in-out_infinite]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* ⭐ Neon Pulse Keyframes */}
      <style>{`
        @keyframes neonPulse {
          0% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
          50% { box-shadow: 0 0 25px rgba(168,85,247,0.45); }
          100% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
        }
      `}</style>

      {/* White Card Background */}
      <div
        className="
          absolute inset-0 rounded-3xl
          bg-gradient-to-br from-white/90 to-white/60
          backdrop-blur-2xl border border-white/40
          shadow-[0_20px_40px_rgba(0,0,0,0.06)]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">

        {/* Step Dot */}
        <div
          className={`
            absolute top-5 right-5 h-3 w-3 rounded-full 
            transition-all duration-300
            ${dotColor}
          `}
        />

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
            Enter Phone Number
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            We'll detect your network in the next step
          </p>
        </div>

        {countriesLoading && (
          <p className="text-sm text-neutral-500 animate-pulse">
            Loading countries…
          </p>
        )}

        {!countriesLoading && (
          <div className="flex flex-col gap-8">

            {/* COUNTRY SELECT */}
            <div>
              <label className="block text-sm text-neutral-600 mb-2">
                Country
              </label>

              <button
                onClick={() => setCountryModalOpen(true)}
                className="
                  w-full rounded-2xl px-4 py-4 text-sm
                  bg-white/70 backdrop-blur-xl
                  border border-neutral-200
                  flex items-center justify-between
                  transition-all duration-300
                  hover:border-purple-500 hover:shadow-lg
                  active:scale-[0.98]
                "
              >
                <span className="flex items-center gap-3">
                  {selectedCountry && (
                    <img
                      src={selectedCountry.flag}
                      className="h-7 w-7 rounded-md shadow-sm"
                    />
                  )}
                  <span className="text-neutral-800 font-medium">
                    {selectedCountry?.name || "Select Country"}
                  </span>
                </span>

                <span className="text-neutral-400 text-lg">›</span>
              </button>

              <CountrySelectorModal
                open={countryModalOpen}
                onClose={() => setCountryModalOpen(false)}
                onSelect={(c: Country) => {
                  setSelectedCountry(c);
                  setPhone("");
                  setStep1Done(false);
                }}
                countries={countries}
              />
            </div>

            {/* PHONE INPUT */}
            <div>
              <label className="block text-sm text-neutral-600 mb-2">
                Phone Number
              </label>

              <div className="flex gap-3">
                <div
                  className="
                    w-28 rounded-2xl px-4 py-4 text-sm
                    bg-neutral-100/70 backdrop-blur-xl
                    border border-neutral-200
                    flex items-center justify-center
                    text-neutral-700 font-medium
                  "
                >
                  {selectedCountry?.dialCode}
                </div>

                <input
                  type="tel"
                  className="
                    flex-1 rounded-2xl px-4 py-4 text-sm
                    bg-white/70 backdrop-blur-xl
                    border border-neutral-200
                    transition-all duration-300
                    focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                    hover:border-neutral-400
                    placeholder:text-neutral-400
                  "
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setStep1Done(false);
                  }}
                />
              </div>

              {phoneRules && (
                <p className="text-xs text-neutral-500 mt-2">
                  enter phone number as it appears internationally
                </p>
              )}

              {!isPhoneValid && phone.length > 0 && (
                <p className="text-xs text-red-500 mt-2">
                  Invalid phone number
                </p>
              )}
            </div>

            {/* NEXT BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!isPhoneValid || !selectedCountry) return;
                  setStep1Done(true);
                }}
                disabled={!isPhoneValid || !selectedCountry}
                className={`
                  px-7 py-3 rounded-2xl text-sm font-semibold
                  transition-all duration-300
                  ${
                    !isPhoneValid || !selectedCountry
                      ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                      : "bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-[0.97]"
                  }
                `}
              >
                Continue
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
