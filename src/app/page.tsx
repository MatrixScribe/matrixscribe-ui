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

      {/* HEADER — UNCHANGED */}
      <header className="relative z-10 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
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
            text-[20px] font-semibold tracking-tight text-neutral-900 absolute left-1/2 -translate-x-1/2
          ">
            <img src="/logo3.png" alt="Redatacom" className="h-6 opacity-90" />
          </div>

          {/* RIGHT: Stats */}
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            <span className="font-semibold">{operatorCount} Operators</span>
            <span className="text-neutral-400">|</span>
            <span className="font-semibold">{countryCount} Countries</span>
          </div>

        </div>

        {/* MOBILE LOGO */}
        <div className="md:hidden w-full flex justify-center py-2">
          <img src="/logo.png" alt="Redatacom" className="h-6 opacity-90" />
        </div>
      </header>

      {/* HERO — TELECOM GLOBAL STYLE */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20 bg-white">

        {/* World map background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
          <img
            src="/favicon.ico"
            alt="world-map"
            className="w-[900px] max-w-none"
          />
        </div>

        {/* Soft glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-80 w-80 bg-purple-300/20 blur-[140px] rounded-full pointer-events-none" />

        {/* HEADLINE */}
        <div className="relative max-w-3xl w-full text-center mb-10">
          <h1 className="text-[42px] md:text-[56px] font-semibold tracking-tight leading-tight text-neutral-900">
            {typedText}
            <span className="inline-block w-1 h-8 bg-neutral-900 ml-1 animate-pulse" />

            <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900">
              global airtime & data. instant. reliable.
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

      </section>

      {/* FOOTER — UNCHANGED */}
      <footer className="relative z-10 w-full bg-white/80 backdrop-blur-xl border-t border-neutral-200 py-4 text-neutral-700">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs">

          {/* LEFT LINKS */}
          <div className="flex items-center gap-6">
            <button onClick={() => router.push("/terms")} className="hover:text-neutral-900 transition">Terms</button>
            <button onClick={() => router.push("/privacy")} className="hover:text-neutral-900 transition">Privacy</button>
            <button onClick={() => router.push("/about")} className="hover:text-neutral-900 transition">About</button>
            <button onClick={() => router.push("/support")} className="hover:text-neutral-900 transition">Support</button>
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

        </div>
      </footer>
    </main>
  );
}
