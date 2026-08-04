"use client";

import { useState, useRef } from "react";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { usePhoneRules } from "@/hooks/usePhoneRules";
import { useOperators } from "@/hooks/useOperators";
import { useAutoDetectOperator } from "@/hooks/useAutoDetectOperator";
import { LocalSimCard } from "./LocalSimCard";

export function AddLocalSimModal({
  open,
  onClose,
  onSave,
  countries,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (sim: any) => void;
  countries: any[];
}) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [phone, setPhone] = useState("");

  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  // Operators
  const {
    allOperators,
    displayOperators,
    setDisplayOperators,
    selectedOperator,
    setSelectedOperator,
  } = useOperators(step1Done, selectedCountry, API_BASE);

  // Phone rules
  const phoneRules = usePhoneRules(selectedCountry, API_BASE);

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

  // Carousel logic
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const cardWidth = el.children[0]?.clientWidth || 1;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(index);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div
        className="
          w-[90%] max-w-sm rounded-2xl
          bg-white/10 border border-white/20
          backdrop-blur-xl shadow-xl text-white
          max-h-[85vh] overflow-y-auto
          p-6
        "
      >
        <h2 className="text-lg font-semibold mb-6">Add Local SIM</h2>

        {/* LIVE PREVIEW */}
        {selectedCountry && phone.length > 3 && (
          <div className="mb-6">
            <LocalSimCard
              phone={phone}
              cardholder="" // removed
              simCategory="Local SIM"
              operatorLogo={
                selectedOperator?.logo ||
                selectedOperator?.logoUrls?.[0] ||
                "/logo-ww.png"
              }
              flag={selectedCountry.flag}
              signupDate="Preview"
            />
          </div>
        )}

        {/* COUNTRY SELECTOR */}
        <div className="mb-5">
          <label className="text-xs opacity-80">Country</label>

          <button
            onClick={() => setCountryModalOpen(true)}
            className="
              w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/20
              flex items-center justify-between
              hover:bg-white/20 transition
            "
          >
            <span className="flex items-center gap-3">
              {selectedCountry && (
                <img
                  src={selectedCountry.flag}
                  className="h-6 w-6 rounded-md shadow"
                />
              )}
              <span className="text-white">
                {selectedCountry?.name || "Select Country"}
              </span>
            </span>

            <span className="text-neutral-300 text-lg">›</span>
          </button>

          <CountrySelectorModal
            open={countryModalOpen}
            onClose={() => setCountryModalOpen(false)}
            onSelect={(c: any) => {
              setSelectedCountry(c);
              setPhone("");
              setSelectedOperator(null);
              setStep1Done(true);
              setCountryModalOpen(false);
            }}
            countries={countries}
          />
        </div>

        {/* PHONE INPUT */}
        <div className="mb-5">
          <label className="text-xs opacity-80">Phone Number</label>

          <div className="flex gap-3 mt-1">
            <div
              className="
                w-24 px-3 py-3 rounded-xl bg-white/10 border border-white/20
                flex items-center justify-center text-neutral-200
              "
            >
              {selectedCountry?.dialCode || "+??"}
            </div>

            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setStep1Done(true);
              }}
              placeholder="Enter number"
              className="
                flex-1 px-4 py-3 rounded-xl
                bg-white/10 border border-white/20
                text-white placeholder-neutral-400
              "
            />
          </div>
        </div>

        {/* OPERATOR CAROUSEL */}
        {step1Done && displayOperators.length > 0 && (
          <div className="mb-6">
            <label className="block text-xs text-neutral-300 mb-3">
              <span className="text-emerald-500 font-semibold animate-pulse">
                •
              </span>{" "}
              Networks Found
            </label>

            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="
                flex gap-4 overflow-x-auto snap-x snap-mandatory
                scrollbar-none py-4
              "
              style={{ scrollSnapType: "x mandatory" }}
            >
              {displayOperators.map((op: any, index: number) => {
                const isActive = index === activeIndex;
                const isSelected =
                  selectedOperator?.operatorId === op.operatorId;

                return (
                  <div
                    key={op.operatorId}
                    onClick={() => {
                      setSelectedOperator(op);
                      setStep2Done(true);
                    }}
                    className={`
                      snap-center shrink-0 cursor-pointer
                      transition-all duration-300
                      ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-90 opacity-60"
                      }
                      ${
                        isSelected
                          ? "ring-2 ring-black shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                          : ""
                      }
                    `}
                    style={{
                      width: "160px",
                      height: "220px",
                    }}
                  >
                    <div
                      className="
                        w-full h-full rounded-2xl overflow-hidden
                        bg-white/10 border border-white/20
                        flex flex-col items-center justify-center
                        relative
                      "
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{
                          backgroundImage: `url(${
                            op.logo ||
                            op.logoUrls?.[0] ||
                            "/placeholder-operator.png"
                          })`,
                        }}
                      />

                      {selectedCountry && (
                        <img
                          src={selectedCountry.flag}
                          className="
                            absolute top-3 right-3 h-6 w-6 rounded-md shadow-md
                          "
                        />
                      )}

                      <img
                        src={
                          op.logo ||
                          op.logoUrls?.[0] ||
                          "/placeholder-operator.png"
                        }
                        className="h-12 w-auto object-contain relative z-20"
                      />

                      <p className="mt-2 text-white font-medium relative z-10">
                        {op.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 sticky bottom-0 bg-white/5 py-2 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl bg-white/10 text-white font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!selectedCountry || !phone.trim() || !selectedOperator) return;

              onSave({
                phone,
                simCategory: "Local SIM",
                operatorLogo:
                  selectedOperator.logo ||
                  selectedOperator.logoUrls?.[0] ||
                  "/logo-ww.png",
                flag: selectedCountry.flag,
                signupDate: "New",
                country: selectedCountry.name,
                dialCode: selectedCountry.dialCode,
                operator: selectedOperator.name,
              });
            }}
            className="
              w-1/2 py-3 rounded-xl
              bg-purple-600 text-white font-semibold
              hover:bg-purple-700 transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
