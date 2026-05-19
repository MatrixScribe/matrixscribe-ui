"use client";

import { Country, PhoneRules } from "./types";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { useState } from "react";

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

  // Dot color logic
  const dotColor = step1Done
    ? "bg-emerald-500 animate-pulse hover:animate-energy"
    : selectedCountry || phone.length > 0
    ? "bg-yellow-400"
    : "bg-neutral-300";

  return (
    <div
      className="
        relative bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 mb-6
        transition-all duration-500
        hover:shadow-lg hover:-translate-y-[2px]
        animate-[fadeIn_0.5s_ease-out]
      "
    >
      {/* Step Dot */}
      <div
        className={`
          absolute top-4 right-4 h-2.5 w-2.5 rounded-full 
          transition-all shadow-sm cursor-default
          ${dotColor}
        `}
      />

      {/* Animated Title */}
      <h2
        className="
          text-[15px] font-semibold mb-4 relative
          transition-all duration-300
          hover:text-purple-600
        "
      >
        1. Recipient Details
        <span
          className="
            absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-500 
            transition-all duration-300 group-hover:w-full
          "
        />
      </h2>

      {countriesLoading && (
        <p className="text-sm text-neutral-500 animate-pulse">
          Loading countries…
        </p>
      )}

      {!countriesLoading && (
        <div className="flex flex-col gap-6">

          {/* COUNTRY SELECT */}
          <div className="group">
            <label className="block text-sm text-neutral-600 mb-1">
              Country
            </label>

            <button
              onClick={() => setCountryModalOpen(true)}
              className="
                w-full bg-white border border-neutral-300 rounded-xl px-3 py-3 text-sm 
                flex items-center justify-between 
                transition-all duration-300
                hover:border-purple-500 hover:shadow-md active:scale-[0.98]
              "
            >
              <span className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-[2px]">
                {selectedCountry && (
                  <img
                    src={selectedCountry.flag}
                    className="
                      h-5 w-5 rounded-sm transition-transform duration-300 
                      group-hover:scale-110 group-hover:-translate-y-[1px]
                    "
                  />
                )}
                {selectedCountry?.name || "Select Country"}
              </span>

              <span
                className="
                  text-neutral-400 transition-transform duration-300 
                  group-hover:rotate-90 group-hover:text-purple-500
                "
              >
                ›
              </span>
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
          <div className="group">
            <label className="block text-sm text-neutral-600 mb-1">
              Phone Number
            </label>

            <div className="flex gap-2">
              <div
                className="
                  w-24 bg-neutral-100 border border-neutral-300 rounded-xl 
                  px-3 py-3 text-sm flex items-center justify-center
                  transition-all duration-300
                  group-hover:border-neutral-400
                "
              >
                {selectedCountry?.dialCode}
              </div>

              <input
                type="tel"
                className="
                  flex-1 bg-white border border-neutral-300 rounded-xl 
                  px-3 py-3 text-sm 
                  transition-all duration-300
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                  hover:border-neutral-400
                  placeholder:text-neutral-400 placeholder:transition-all placeholder:duration-300
                  focus:placeholder:text-neutral-300
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
              <p className="text-xs text-neutral-500 mt-1">
                Must be {phoneRules.minLength}–{phoneRules.maxLength} digits
              </p>
            )}

            {!isPhoneValid && phone.length > 0 && (
              <p className="text-xs text-red-500 mt-1 animate-[fadeIn_0.3s_ease-out]">
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
                px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 shadow-sm
                ${
                  !isPhoneValid || !selectedCountry
                    ? "bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed"
                    : "bg-white border-neutral-300 text-neutral-800 hover:border-purple-500 hover:text-purple-600 hover:shadow-md hover:-translate-y-[1px] active:scale-[0.98]"
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
