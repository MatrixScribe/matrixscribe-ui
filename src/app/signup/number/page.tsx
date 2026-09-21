"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { Step2Operator } from "@/components/topup/Step2Operator";

/* ------------------------------------------------------------
   COUNTRY CODE RESOLVER (unchanged)
------------------------------------------------------------ */
function getSignupCountryCode(c: any) {
  if (!c) return null;

  const direct =
    c.code ||
    c.iso2 ||
    c.countryCode ||
    c.iso ||
    c.id ||
    null;

  if (direct) return direct;

  if (c.flag) {
    const match = c.flag.match(/\/([a-z]{2})\.svg$/i);
    if (match && match[1]) return match[1].toUpperCase();
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

  /* ------------------------------------------------------------
     LOAD COUNTRIES
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     SEE NETWORKS
  ------------------------------------------------------------ */
  const handleSeeNetworks = async () => {
    if (!selectedCountry) return;

    const code = getSignupCountryCode(selectedCountry);
    if (!code) return;

    setStep1Done(true);
    setStep2Visible(true);
    setStep2Done(false);
    setSelectedOperator(null);
    setOperatorsLoading(true);

    try {
      const url = `${API_BASE}/api/operators?country=${code}`;
      const res = await fetch(url);
      const data = await res.json();
      setDisplayOperators(data.operators || []);
    } catch (err) {
      console.error("Failed to load operators", err);
      setDisplayOperators([]);
    } finally {
      setOperatorsLoading(false);
    }
  };

  /* ------------------------------------------------------------
     CONTINUE
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     COSMIC PARTICLE BACKGROUND
  ------------------------------------------------------------ */
  useEffect(() => {
    const canvas = document.getElementById("cosmicCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: `rgba(${150 + Math.random() * 100}, ${50 + Math.random() * 50}, 255, 0.5)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ------------------------------------------------------------
     UI
  ------------------------------------------------------------ */
  return (
    <main className="relative min-h-screen bg-[#0b0b0f] text-white overflow-hidden">

      {/* Cosmic Particle Background */}
      <canvas
        id="cosmicCanvas"
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Nebula Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black opacity-40 pointer-events-none" />

      {/* Country Flag Overlay */}
      {selectedCountry && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url(${selectedCountry.flag})` }}
        />
      )}

      <div className="relative z-10 px-6 py-12 flex flex-col items-center">
<img src="/logo3.png" className="h-12 opacity-90 mb-6" />
        {/* HEADER */}
<h1 className="text-center text-3xl font-bold mb-8 
               bg-gradient-to-r from-purple-300 via-white to-purple-300 
               bg-clip-text text-transparent drop-shadow-lg tracking-wide">
  Welcome To Global Connectivity
</h1>

<img src="/createaccount.png" className=" w-auto h-10 opacity-100" />


        {/* TITANIUM CARD */}
        <div className="
          w-full max-w-xl rounded-3xl p-8
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-700/40
          border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
        ">

          {/* COUNTRY SELECTOR */}
          <div className="mb-8">
            <button
              onClick={() => setCountryModalOpen(true)}
              className="w-full rounded-2xl px-4 py-4 bg-white/5 border border-white/20 flex items-center justify-between hover:bg-white/10 transition"
            >
              <span className="flex items-center gap-3">
                {selectedCountry && (
                  <img
                    src={selectedCountry.flag}
                    className="h-7 w-7 rounded-md shadow-sm"
                  />
                )}
                <span className="text-white font-medium">
                  {selectedCountry?.name || "Select Country"}
                </span>
              </span>
              <span className="text-neutral-400 text-lg">›</span>
            </button>

            <CountrySelectorModal
              open={countryModalOpen}
              onClose={() => setCountryModalOpen(false)}
              onSelect={(c: any) => {
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
          <div className="mb-10">
            <div className="flex gap-3">
              <div className="w-28 rounded-2xl px-4 py-4 bg-white/5 border border-white/20 text-neutral-200">
                {selectedCountry?.dialCode || "+XX"}
              </div>

              <input
                type="tel"
                className="flex-1 rounded-2xl px-4 py-4 bg-white/5 border border-white/20 text-white placeholder:text-neutral-400"
                placeholder="enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* SEE NETWORKS */}
          {!step1Done && (
            <button
              onClick={handleSeeNetworks}
              disabled={!selectedCountry}
              className="w-full py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              See Networks
            </button>
          )}

          {/* NETWORKS GRID */}
          {step2Visible && (
            <div className="mt-8 animate-fadeIn">
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
            </div>
          )}

          {/* CONTINUE */}
          <button
            onClick={handleContinue}
            disabled={!step2Done}
            className={`w-full mt-8 py-4 rounded-2xl transition ${
              !step2Done
                ? "bg-white/10 text-neutral-400"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Continue
          </button>

        </div>
      </div>
    </main>
  );
}
