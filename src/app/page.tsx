"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Country = {
  name: string;
  isoName: string;
  flag: string;
};

type Operator = {
  operatorId: string;
  name: string;
  logo?: string;
  operatorType?: string;
};

export default function Home() {
  const router = useRouter();

  const [countries, setCountries] = useState<Country[]>([]);
  const [operators, setOperators] = useState<Operator[]>([]);

  // Typing headline
  const [typedText, setTypedText] = useState("");
  const [headlineIndex, setHeadlineIndex] = useState(0);

  // Typing sub-message
  const [subTyped, setSubTyped] = useState("");
  const [subIndex, setSubIndex] = useState(0);

  const headlines = [
    "re-data yourself & others",
    "global airtime & data",
    "--connectivity--"
  ];

  const subMessages = [
    "no accounts. no friction. just premium simplicity.",
    "send airtime & data in seconds, anywhere.",
    "click networks button to check your country availability."
  ];

  // Typing effect for headline
  useEffect(() => {
    const current = headlines[headlineIndex];
    let i = 0;

    setTypedText("");

    const interval = setInterval(() => {
      setTypedText(current.slice(0, i));
      i++;

      if (i > current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        }, 1500);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [headlineIndex]);

  // Typing effect for sub-message
  useEffect(() => {
    const current = subMessages[subIndex];
    let i = 0;

    setSubTyped("");

    const interval = setInterval(() => {
      setSubTyped(current.slice(0, i));
      i++;

      if (i > current.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSubIndex((prev) => (prev + 1) % subMessages.length);
        }, 1500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [subIndex]);

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/countries`
        );
        const data = await res.json();

        const list: Country[] = data.countries || [];
        setCountries(list);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    }

    loadCountries();
  }, []);

  const countryCount = countries.length;
  const operatorCount = countryCount > 0 ? countryCount * 5 : 0;

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-white text-neutral-900">

      {/* HEADER — NOW PURPLE */}
      <header className="relative z-10 w-full border-b border-purple-500/30 bg-gradient-to-r from-purple-700 to-purple-600 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">

          {/* LEFT: Networks */}
          <button
  onClick={() => router.push("/operators")}
  className="
    px-3 py-1.5 rounded-lg
    bg-white
    border border-yellow-400
    text-purple-700 text-sm font-semibold
    shadow-sm
    animate-greenPulse
    transition-all
  "
>
  Networks
</button>

<style>{`
  @keyframes greenPulse {
    0% { box-shadow: 0 0 0px rgba(16,185,129,0.0); }
    50% { box-shadow: 0 0 14px rgba(16,185,129,0.55); }
    100% { box-shadow: 0 0 0px rgba(16,185,129,0.0); }
  }
  .animate-greenPulse {
    animation: greenPulse 2.2s ease-in-out infinite;
  }
`}</style>

          {/* CENTER LOGO */}
          <div className="
            hidden md:block
            text-[20px] font-semibold tracking-tight text-white absolute left-1/2 -translate-x-1/2
          ">
            <img src="/logo3.png" alt="Redatacom" className="h-6 opacity-90" />
          </div>

          {/* RIGHT: Stats */}
          <div className="flex items-center gap-2 text-sm font-medium text-purple-100">
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <span className="font-semibold text-white">
              {operatorCount} Operators
            </span>
            <span className="text-purple-200">|</span>
            <span className="font-semibold text-white">
              {countryCount} Countries
            </span>
          </div>

        </div>

        {/* MOBILE LOGO */}
        <div className="md:hidden w-full flex justify-center py-2">
          <img src="/logo.png" alt="Redatacom" className="h-6 opacity-90" />
        </div>
      </header>

      {/* HERO — NOW WHITE, CLEAN, INTERACTIVE */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">

        {/* Soft floating glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-300/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-10 h-56 w-56 bg-purple-400/10 blur-[100px] rounded-full" />
        </div>

        {/* Background subtle icon */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.06]">
          <img
            src="/loop-icon.svg"
            alt="background-icon"
            className="w-[420px] md:w-[520px] animate-spin-slow"
          />
        </div>

        {/* HEADLINE */}
        <div className="relative max-w-2xl w-full text-center mb-16">
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-tight text-neutral-900 mb-4">
            {typedText}
            <span className="inline-block w-1 h-7 md:h-8 bg-neutral-900 ml-1 animate-pulse" />

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-900 mt-2">
              Simple. Intelligent. Instant.
            </span>
          </h1>
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={() => router.push("/topup")}
          className="
            relative z-10 w-full sm:w-56 mx-auto flex items-center justify-center gap-2 
            rounded-xl border border-purple-300 bg-white backdrop-blur 
            text-purple-700 py-3.5 text-[17px] font-medium 
            hover:bg-purple-50 hover:border-purple-400 
            transition-all shadow-sm hover:shadow-md
          "
        >
          Start Recharge
        </button>

        {/* SUB MESSAGE */}
        <div className="mt-6 text-center text-neutral-600 text-[15px] min-h-[22px]">
          {subTyped}
          <span className="inline-block w-1 h-4 bg-neutral-600 ml-1 animate-pulse" />
        </div>

        {/* Animations */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 40s linear infinite;
          }
        `}</style>

      </section>

      {/* FOOTER — NOW PURPLE */}
      <footer className="relative z-10 w-full bg-gradient-to-r from-purple-700 to-purple-600 backdrop-blur-xl border-t border-purple-500/30 py-4 text-purple-100">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs">

          {/* LEFT LINKS */}
          <div className="flex items-center gap-6">
            <button onClick={() => router.push("/terms")} className="hover:text-white transition">Terms</button>
            <button onClick={() => router.push("/privacy")} className="hover:text-white transition">Privacy</button>
            <button onClick={() => router.push("/about")} className="hover:text-white transition">About</button>
            <button onClick={() => router.push("/support")} className="hover:text-white transition">Support</button>
          </div>

          {/* SHARE */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Redatacom",
                  text: "Instant global airtime & data top‑ups.",
                  url: window.location.href
                });
              } else {
                alert("Sharing not supported on this device");
              }
            }}
            className="
    px-3 py-1.5 rounded-lg
    bg-white
    border border-yellow-400
    text-purple-700 text-sm font-semibold
    shadow-sm
    animate-greenPulse
    transition-all
  "
>
  Share
</button>

<style>{`
  @keyframes greenPulse {
    0% { box-shadow: 0 0 0px rgba(16,185,129,0.0); }
    50% { box-shadow: 0 0 14px rgba(16,185,129,0.55); }
    100% { box-shadow: 0 0 0px rgba(16,185,129,0.0); }
  }
  .animate-greenPulse {
    animation: greenPulse 2.2s ease-in-out infinite;
  }
`}</style>

        </div>
      </footer>
    </main>
  );
}
