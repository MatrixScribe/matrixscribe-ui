"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { usePhoneRules } from "@/hooks/usePhoneRules";
import { useOperators } from "@/hooks/useOperators";
import { useAutoDetectOperator } from "@/hooks/useAutoDetectOperator";

export default function SignupNumber() {
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  // Countries
  const [countries, setCountries] = useState<any[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  // Phone
  const [phone, setPhone] = useState("");

  // Step logic
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  // Operators
  const {
    allOperators,
    displayOperators,
    setDisplayOperators,
    selectedOperator,
    setSelectedOperator,
    loading: operatorsLoading
  } = useOperators(step1Done, selectedCountry, API_BASE);

  // Phone rules
  const phoneRules = usePhoneRules(selectedCountry, API_BASE);

  const isPhoneValid = (() => {
    if (!phoneRules) return false;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < phoneRules.minLength) return false;
    if (digits.length > phoneRules.maxLength) return false;
    if (phoneRules.regex) {
      try {
        const re = new RegExp(phoneRules.regex);
        if (!re.test(digits)) return false;
      } catch {}
    }
    return true;
  })();

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
    setStep2Done
  });

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const data = await res.json();
        if (Array.isArray(data.countries)) {
          setCountries(data.countries);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }
    loadCountries();
  }, [API_BASE]);

  // Carousel logic
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const cardWidth = el.children[0]?.clientWidth || 1;
    const scrollLeft = el.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(index);
  };

  const handleContinue = () => {
  if (!selectedOperator || !isPhoneValid || !selectedCountry) return;

  router.push(
  `/signup/pin?` +
  `country=${encodeURIComponent(selectedCountry.name)}` +
  `&countryCode=${encodeURIComponent(selectedCountry.iso2)}` +
  `&dialCode=${encodeURIComponent(selectedCountry.dialCode)}` +
  `&flag=${encodeURIComponent(selectedCountry.flag)}` +
  `&phone=${encodeURIComponent(phone)}` +
  `&operatorLogo=${encodeURIComponent(selectedOperator.logo || "")}` +
  `&operatorName=${encodeURIComponent(selectedOperator.name || "")}` +
  `&operatorId=${encodeURIComponent(selectedOperator.operatorId || "")}`
);
};

  // Particle animation
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 60;

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
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
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
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">

      {/* Animated Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-99"></canvas>
      </div>

      {/* Country Flag Background */}
      {selectedCountry && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: `url(${selectedCountry.flag})` }}
        />
      )}

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-12 flex flex-col items-center">

        {/* HEADER */}
        <img src="/logo-signup.png" className="h-12 opacity-90 mb-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          <span className="text-purple-700 font-semibold animate-pulse">•</span>  
        <span className="text-emerald-500 font-semibold animate-pulse">•</span> 
        </h1>
        <h1 className="text-2xl font-semibold tracking-tight">
          
             Join Global Connectivity
             
        </h1>
        <p className="text-neutral-300 mt-2">
          <img src="/hta-w.png" className="h-20 w-auto opacity-90" />
        </p>

        {/* SIM BANNER */}
<div className="w-full max-w-xl mb-0 flex items-center justify-center gap-4">
  {/* Local SIM */}
  <div className="
    flex flex-col items-center justify-center 
    bg-ffff
    rounded-2xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
    <img src="/sim-local.png" className="h-20 w-auto opacity-90" />
    <p className="text-xs text-neutral-300 mt-0 tracking-wide">Link Your Network</p>
  </div>

  {/* eSIM */}
 <div className="
    flex flex-col items-center justify-center 
    bg-ffff
    rounded-2xl px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
    <img src="/sim-esim1.png" className="h-20 w-auto opacity-90" />
    <p className="text-xs text-neutral-300 mt-0 tracking-wide">Activate Global eSim</p>
  </div>

</div>
        {/* GLASS CARD */}
        <div
          className="
            mt-0 w-full max-w-xl rounded-3xl p-8
            bg-ffff
            shadow-[0_20px_40px_rgba(0,0,0,0.4)]
            transition-transform duration-300
          "
        >

          {/* COUNTRY SELECTOR */}
          <div className="mb-8">
            <label className="block text-sm text-neutral-300 mb-2">
              
            </label>

            <button
              onClick={() => setCountryModalOpen(true)}
              className="
                w-full rounded-2xl px-4 py-4 text-sm
                bg-ffff
                border border-white/20
                flex items-center justify-between
                hover:bg-white/20 transition
              "
            >
              <span className="flex items-center gap-3">
                {selectedCountry && (
                  <img
                    src={selectedCountry.flag}
                    className="h-7 w-7 rounded-md shadow-sm"
                  />
                )}
                <span className="text-white font-medium">
                  {selectedCountry?.name || "Country"}
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
    setStep1Done(true); // <-- FIX: load operators immediately
  }}
  countries={countries}
/>

          </div>

          {/* PHONE INPUT */}
          <div className="mb-10">
            <label className="block text-sm text-neutral-300 mb-2">
              
            </label>

            <div className="flex gap-3">
              <div
                className="
                  w-28 rounded-2xl px-4 py-4 text-sm
                  bg-ffff
                  border border-white/20
                  flex items-center justify-center
                  text-neutral-200 font-medium
                "
              >
                {selectedCountry?.dialCode}
              </div>

              <input
                type="tel"
                className="
                  flex-1 rounded-2xl px-4 py-4 text-sm
                  bg-ffff
                  border border-white/20
                  text-white
                  placeholder:text-neutral-400
                  focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                "
                placeholder="enter phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setStep1Done(true);
                }}
              />
            </div>
          </div>

          {/* OPERATOR CAROUSEL */}
{step1Done && (displayOperators.length > 0 || selectedOperator) && (
  <div className="mb-5">
    <label className="block text-sm text-neutral-300 mb-3">
      <span className="text-emerald-500 font-semibold animate-pulse">•</span>{" "}
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
      {(displayOperators.length > 0 ? displayOperators : [selectedOperator]).map(
        (op: any, index: number) => {
          if (!op) return null;

          const isActive = index === activeIndex;
          const isSelected = selectedOperator?.operatorId === op.operatorId;

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
                ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"}
                ${
                  isSelected
                    ? "ring-2 ring-black shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    : ""
                }
              `}
              style={{
                width: "180px",
                height: "260px"
              }}
            >
              <div
                className="
                  w-full h-full rounded-2xl overflow-hidden
                  bg-ffff
                  flex flex-col items-center justify-center
                  relative
                "
              >
                {/* Operator Logo as Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{
                    backgroundImage: `url(${
                      op.logo ||
                      op.logoUrls?.[0] ||
                      "/placeholder-operator.png"
                    })`
                  }}
                />

                {/* Country Flag Badge */}
                {selectedCountry && (
                  <img
                    src={selectedCountry.flag}
                    className="
                      absolute top-3 right-3 h-7 w-7 rounded-md shadow-md
                    "
                  />
                )}

                {/* Main Operator Logo */}
                <img
                  src={
                    op.logo ||
                    op.logoUrls?.[0] ||
                    "/placeholder-operator.png"
                  }
                  className="h-15 w-auto object-contain relative z-20"
                />

                {/* Operator Name */}
                <p className="mt-0 text-white font-medium relative z-10">
                  {op.name}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  </div>
)}

          {/* CONTINUE BUTTON */}
<button
  onClick={handleContinue}
  disabled={!step2Done}
  className={`
    w-full py-4 rounded-2xl text-sm font-semibold
    transition-all duration-300
    ${
      !step2Done
        ? "bg-white/10 text-neutral-400 cursor-not-allowed"
        : "bg-ffff text-white shadow-lg hover:bg-purple-700 active:scale-[0.97]"
    }
  `}
>
  Continue
</button>
        </div>
      </div>
    </main>
  );
}
