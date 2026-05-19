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
    "global airtime & data ",
    "power to connectivity"
  ];

  const subMessages = [
    "no accounts. no friction. just premium simplicity.",
    "send airtime & data in seconds, anywhere.",
    "click networks button to check your countries operators."
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
    <main className="min-h-screen bg-[#fdfdfd] text-neutral-900 flex flex-col relative overflow-hidden">

      {/* APPLE‑STYLE BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafafa] to-[#f5f5f5]" />

      {/* SOFT GLOW ACCENTS */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 h-72 w-72 bg-blue-300/20 blur-[120px] rounded-full" />

      {/* HEADER */}
      <header className="relative z-10 w-full border-b border-neutral-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">

          {/* LEFT: Operators Button */}
          <button
            onClick={() => router.push("/operators")}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur 
              text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy"
          >
            Networks
          </button>

          {/* CENTER: LOGO */}
          <div className="text-[20px] font-semibold tracking-tight text-neutral-900 absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="Redatacom" className="h-6 opacity-90" />
          </div>

          {/* RIGHT: Connected Stats */}
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-600">
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-energy"></span>
              <span></span>
            </div>

            <span className="font-semibold text-neutral-900">
              {operatorCount} Operators
            </span>
            <span className="text-neutral-400">|</span>
            <span className="font-semibold text-neutral-900">
              {countryCount} Countries
            </span>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">

        {/* WORLD MAP BACKDROP */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <img
            src="/world-map.svg"
            alt="World map"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="relative max-w-2xl w-full text-center mb-16">
          {/* AI TYPING HEADLINE */}
          <h1 className="text-[40px] md:text-[52px] font-semibold tracking-tight leading-tight text-neutral-900 mb-4">
            {typedText}
            <span className="inline-block w-1 h-7 md:h-8 bg-neutral-900 ml-1 animate-pulse" />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-900 mt-2">
              Simple. Intelligent. Instant.
            </span>
          </h1>
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={() => router.push("/topup")}
          className="relative z-10 w-full sm:w-56 mx-auto flex items-center justify-center gap-2 
            rounded-xl border border-neutral-300 bg-white/80 backdrop-blur 
            text-neutral-900 py-3.5 text-[17px] font-medium 
            hover:border-purple-500 hover:text-purple-600 
            transition-all shadow-sm hover:shadow-md animate-energy"
        >
          Start Recharge
        </button>

        {/* AI SUB‑MESSAGE TYPING EFFECT */}
        <div className="mt-6 text-center text-neutral-600 text-[15px] min-h-[22px]">
          {subTyped}
          <span className="inline-block w-1 h-4 bg-neutral-600 ml-1 animate-pulse" />
        </div>
      </section>

      {/* FOOTER LINKS */}
      <footer className="relative z-10 w-full bg-white/70 backdrop-blur-xl border-t border-neutral-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-6 text-xs text-neutral-500">
          <button onClick={() => router.push("/terms")} className="hover:text-neutral-800 transition">Terms</button>
          <button onClick={() => router.push("/privacy")} className="hover:text-neutral-800 transition">Privacy</button>
          <button onClick={() => router.push("/about")} className="hover:text-neutral-800 transition">About</button>
          <button onClick={() => router.push("/support")} className="hover:text-neutral-800 transition">Support</button>
        </div>
      </footer>
    </main>
  );
}
