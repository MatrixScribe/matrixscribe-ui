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

  // ------------------------------------
  // ⭐ ADVANCED TYPING ENGINE (20 lines, multi-line)
  // ------------------------------------
  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const headlines = [
    "its all here",
    "recharge globally",
    "do you need",
    "quick",
    "worldwide",
    "booundry-less",
    "the power of connectivity",
    "700+ operators",
    "fast",
    "global",
    "its a worldwide affair",
    "from 150+ countries",
    "hey there, get your fix ",
    "looking for",
    "no strings attached",
    "powered by global telecom",
    "be anywhere",
    "recharge reborn",
    "instantly global",
    "you found"
  ];

  useEffect(() => {
    const currentLine = headlines[lineIndex % headlines.length];
    const typingSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentLine.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentLine.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTypedText(currentLine.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  // ------------------------------------
  // Sub‑message typing (unchanged)
  // ------------------------------------
  const [subTyped, setSubTyped] = useState("");
  const [subIndex, setSubIndex] = useState(0);

  const subMessages = [
    "no accounts. no friction. premium simplicity.",
    "send airtime & data in seconds, globally...",
    "click networks to check your country availability"
  ];

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

  // ------------------------------------
  // Load countries
  // ------------------------------------
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

        {/* Background GIF / Map */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.10] flex items-center justify-center">
          <img
            src="/logo2.gif"
            alt="background"
            className="w-[900px] max-w-none"
          />
        </div>

        {/* Soft glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-80 w-80 bg-purple-300/20 blur-[140px] rounded-full pointer-events-none" />

        {/* HEADLINE BLOCK */}
        <div className="relative max-w-3xl w-full text-center mb-10 px-2">

          {/* MULTI-LINE TYPING HEADLINE */}
          <h1 className="text-[34px] md:text-[52px] font-semibold tracking-tight leading-tight text-neutral-900 whitespace-pre-line">
            {typedText}
            <span className="inline-block w-1 h-7 md:h-8 bg-neutral-900 ml-1 animate-pulse" />
          </h1>

          {/* PURPLE SUBHEAD — RESPONSIVE SIZE */}
          <span className="
            block mt-6 
            text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-900
            text-[20px] md:text-[32px] font-semibold tracking-tight
          ">
            Airtime • Data • Bundles • PIN
          </span>
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

          <div className="flex items-center gap-6">
            <button onClick={() => router.push("/terms")} className="hover:text-neutral-900 transition">Terms</button>
            <button onClick={() => router.push("/privacy")} className="hover:text-neutral-900 transition">Privacy</button>
            <button onClick={() => router.push("/about")} className="hover:text-neutral-900 transition">About</button>
            <button onClick={() => router.push("/support")} className="hover:text-neutral-900 transition">Support</button>
          </div>

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
