"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProfileInner() {
  const router = useRouter();
  const params = useSearchParams();

  const countryName = params.get("country") || "";
  const countryCode = params.get("countryCode") || "";
  const dialCode = params.get("dialCode") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const operatorName = params.get("operatorName") || "";
  const operatorId = params.get("operatorId") || "";
  const flag = params.get("flag") || "";
  const pin = params.get("pin") || "";

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const isEmailValid = (() => {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  })();

  const canContinue = first.length > 1 && last.length > 1 && isEmailValid;

  const handleContinue = () => {
    if (!canContinue) return;

    router.push(
      `/signup/welcome?` +
        `first=${encodeURIComponent(first)}` +
        `&last=${encodeURIComponent(last)}` +
        `&email=${encodeURIComponent(email)}` +
        `&country=${encodeURIComponent(countryName)}` +
        `&countryCode=${encodeURIComponent(countryCode)}` +
        `&dialCode=${encodeURIComponent(dialCode)}` +
        `&flag=${encodeURIComponent(flag)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&operatorLogo=${encodeURIComponent(operatorLogo)}` +
        `&operatorName=${encodeURIComponent(operatorName)}` +
        `&operatorId=${encodeURIComponent(operatorId)}` +
        `&pin=${encodeURIComponent(pin)}`
    );
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-40"></canvas>
      </div>

      <div className="relative z-10 px-6 py-16 flex flex-col items-center">
        <img src="/logo3.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-center text-3xl font-bold mb-8 
               bg-gradient-to-r from-purple-300 via-white to-purple-300 
               bg-clip-text text-transparent drop-shadow-lg tracking-wide">
  Finish Your Setup
</h1>

        <p className="text-neutral-400 mt-2">We're Almost There...</p>

        <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
          {operatorLogo && (
            <img
              src={operatorLogo}
              className="h-10 w-auto object-contain drop-shadow-sm"
            />
          )}

          {flag && (
            <img
              src={flag}
              className="h-8 w-auto object-contain drop-shadow-sm rounded-md"
            />
          )}

          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-white">{operatorName}</span>
            <span className="text-[13px] text-neutral-300">
              {dialCode} {phone} • {countryName}
            </span>
          </div>
        </div>

        <div className="mt-10 w-full max-w-md rounded-3xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4">
            <input
              ref={firstInputRef}
              type="text"
              placeholder="First Name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                isEmailValid ? "border-white/30" : "border-red-500"
              } bg-white/20 text-white`}
            />

            <button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all ${
                !canContinue
                  ? "bg-white/10 text-neutral-500 cursor-not-allowed"
                  : "bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-[0.97]"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
