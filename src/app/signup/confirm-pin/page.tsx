"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmPin() {
  const router = useRouter();
  const params = useSearchParams();

  // Incoming data from previous page
  const originalPin = params.get("pin") || "";
  const countryName = params.get("country") || "";
  const countryCode = params.get("countryCode") || "";
  const dialCode = params.get("dialCode") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const operatorName = params.get("operatorName") || "";
  const operatorId = params.get("operatorId") || "";
  const flag = params.get("flag") || "";

  // PIN state
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [shake, setShake] = useState(false);

  const isComplete = pin.every((d) => d !== "");

  // Auto-focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (!isComplete) return;

    const finalPin = pin.join("");

    if (finalPin !== originalPin) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // Pass everything to profile page
    router.push(
      `/signup/profile?` +
        `pin=${encodeURIComponent(finalPin)}` +
        `&country=${encodeURIComponent(countryName)}` +
        `&countryCode=${encodeURIComponent(countryCode)}` +
        `&dialCode=${encodeURIComponent(dialCode)}` +
        `&flag=${encodeURIComponent(flag)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&operatorLogo=${encodeURIComponent(operatorLogo)}` +
        `&operatorName=${encodeURIComponent(operatorName)}` +
        `&operatorId=${encodeURIComponent(operatorId)}`
    );
  };

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <div className="relative z-10 px-6 py-16 flex flex-col items-center">
        <img src="/logo3.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Confirm Your PIN
        </h1>

        <p className="text-neutral-600 mt-2">Re‑enter your 4‑digit PIN</p>

        <div
          className={`
            mt-10 w-full max-w-md rounded-3xl p-8
            bg-white/40 backdrop-blur-xl border border-black/10 shadow
            ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}
          `}
        >
          <div className="flex justify-center gap-4 mb-10">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el!)}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-16 h-16 text-center text-3xl font-semibold rounded-2xl bg-white/60 border border-black/20"
              />
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className={`w-full py-4 rounded-2xl text-sm font-semibold ${
              !isComplete
                ? "bg-black/10 text-neutral-400 cursor-not-allowed"
                : "bg-purple-600 text-white shadow-lg"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
