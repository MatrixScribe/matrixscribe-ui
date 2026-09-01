"use client";

import { useEffect, useRef, useState } from "react";
import { Country } from "@/components/topup/types";

export default function BundleDetailsModal({
  open,
  onClose,
  bundle,
  groupName,
  countries,
  preferredCurrency,
  fxMidRate,
  networksForIso,
}: {
  open: boolean;
  onClose: () => void;
  bundle: any;
  groupName: string;
  countries: Country[];
  preferredCurrency?: string | null;
  fxMidRate?: number | null;
  networksForIso?: any[];
}) {
  if (!open || !bundle) return null;

  /* ---------------------------------------------------
     PARTICLE BACKGROUND
  --------------------------------------------------- */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const count = 70;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
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
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* ---------------------------------------------------
     DATA EXTRACTION
  --------------------------------------------------- */
  const safeCurrency = preferredCurrency || "USD";
  const safeRate = fxMidRate ?? 1;

  const usd = Number(bundle.finalPrice ?? bundle.price ?? 0);
  const converted = usd * safeRate;

  const regionName =
    bundle.countries?.[0]?.name ||
    bundle.roamingEnabled?.[0]?.name ||
    "Unknown Region";

  const allowance = bundle.allowances?.[0] || {};
  const unlimited = bundle.unlimited || allowance.unlimited || false;
  const throttleSpeed = allowance.throttleSpeed || null;
  const throttleAtMb = allowance.throttleAtMb || null;

  const safeCountriesArr = Array.isArray(countries) ? countries : [];

  const mapCountry = (iso: string) =>
    safeCountriesArr.find(
      (c) =>
        c.iso?.toUpperCase() === iso?.toUpperCase() ||
        c.iso2?.toUpperCase() === iso?.toUpperCase()
    );

  const baseCountries = (bundle.countries || []).map((c: any) => ({
    name: c.name,
    flag: mapCountry(c.iso)?.flag || null,
  }));

  const roamingCountries = (bundle.roamingEnabled || []).map((c: any) => ({
    name: c.name,
    flag: mapCountry(c.iso)?.flag || null,
  }));

  /* ---------------------------------------------------
     NETWORKS (from eSIMGo per ISO, fallback to bundle.countryNetworks)
  --------------------------------------------------- */
  const networks =
    networksForIso && networksForIso.length > 0
      ? networksForIso
      : bundle.countryNetworks || [];

  /* ---------------------------------------------------
     DROPDOWN STATE
  --------------------------------------------------- */
  const [showCoverage, setShowCoverage] = useState(false);
  const [showRoaming, setShowRoaming] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);

  /* ---------------------------------------------------
     MOMENTUM SCROLLING FOR ROAMING SLIDER
  --------------------------------------------------- */
  const roamingRef = useRef<HTMLDivElement | null>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  useEffect(() => {
    const slider = roamingRef.current;
    if (!slider) return;

    const handleDown = (e: any) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleLeave = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleDown);
    slider.addEventListener("mouseleave", handleLeave);
    slider.addEventListener("mouseup", handleUp);
    slider.addEventListener("mousemove", handleMove);

    return () => {
      slider.removeEventListener("mousedown", handleDown);
      slider.removeEventListener("mouseleave", handleLeave);
      slider.removeEventListener("mouseup", handleUp);
      slider.removeEventListener("mousemove", handleMove);
    };
  }, [showRoaming]);

  /* ---------------------------------------------------
     UI — AIRLINE TICKET VOUCHER STYLE
  --------------------------------------------------- */
  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="
          relative w-full max-w-xl rounded-3xl p-0
          bg-gradient-to-br from-neutral-950 via-purple-900 to-black
          border border-purple-500/40 shadow-[0_0_40px_rgba(120,60,255,0.45)]
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* PARTICLES */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        />

        {/* METAL TEXTURE */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />

        {/* SHINE */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* TICKET TOP STRIPE */}
        <div className="relative z-10 bg-white p-5 border-b border-purple-300/30">
          <p className="text-[10px] tracking-[0.3em] text-black uppercase">
            READY TO ACTIVATE
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-widest text-black">
            {bundle.name.replace(/\s+/g, "-").toUpperCase()}
          </h2>

          <p className="text-xs text-purple-600 opacity-80 mt-1">
            {regionName}
          </p>
        </div>

        {/* PERFORATION DIVIDER */}
        <div className="relative z-10 flex items-center justify-between px-5 py-2">
          <div className="h-4 w-4 bg-black rounded-full border border-purple-300/40"></div>
          <div className="flex-1 border-t border-dashed border-purple-300/40 mx-2"></div>
          <div className="h-4 w-4 bg-black rounded-full border border-purple-300/40"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col gap-6 text-white p-6">
          {/* IMAGE */}
          {bundle.imageUrl && (
            <img
              src={bundle.imageUrl}
              className="w-full h-48 object-cover rounded-xl border border-purple-300/30 shadow-lg"
            />
          )}

          {/* SUMMARY GRID */}
          <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <div>
              <p className="text-xs opacity-70">Data</p>
              <p className="text-sm font-semibold">
                {bundle.dataAmount === -1
                  ? "Unlimited"
                  : `${bundle.dataAmount / 1000}GB`}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Duration</p>
              <p className="text-sm font-semibold">{bundle.duration} Days</p>
            </div>

            <div>
              <p className="text-xs opacity-70">Speed</p>
              <p className="text-sm font-semibold">
                {bundle.speed?.join(" / ") || "3G / 4G / 5G"}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Unlimited</p>
              <p className="text-sm font-semibold">
                {unlimited ? "Yes" : "No"}
              </p>
            </div>

            {throttleSpeed && (
              <div>
                <p className="text-xs opacity-70">Surfing Speed</p>
                <p className="text-xs font-semibold">
                  {throttleSpeed} kbps
                  {throttleAtMb && ` after ${throttleAtMb} MB`}
                </p>
              </div>
            )}
          </div>

          {/* PRICE */}
          <div className="bg-black/30 p-4 rounded-2xl border border-purple-300/20">
            <p className="text-xs opacity-70">Price</p>
            <p className="text-2xl font-bold text-green-400">
              {safeCurrency} {converted.toFixed(2)}
            </p>

            {safeCurrency !== "USD" && (
              <p className="text-[10px] opacity-60">USD {usd.toFixed(2)}</p>
            )}
          </div>

          {/* COVERAGE DROPDOWN */}
          <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <button
              onClick={() => setShowCoverage(!showCoverage)}
              className="w-full flex justify-between items-center text-sm font-semibold"
            >
              <span>Coverage</span>
              <span className="text-purple-300">
                {showCoverage ? "▲" : "▼"}
              </span>
            </button>

            {showCoverage && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {baseCountries.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    {c.flag && (
                      <img
                        src={c.flag}
                        className="h-8 w-8 rounded-full border border-white/20 object-cover shadow-md"
                      />
                    )}
                    <span className="text-[10px] text-purple-200">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ROAMING DROPDOWN */}
          {roamingCountries.length > 0 && (
            <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
              <button
                onClick={() => setShowRoaming(!showRoaming)}
                className="w-full flex justify-between items-center text-sm font-semibold"
              >
                <span>Countries</span>
                <span className="text-purple-300">
                  {showRoaming ? "▲" : "▼"}
                </span>
              </button>

              {showRoaming && (
                <div
                  ref={roamingRef}
                  className="
                    mt-4 flex gap-4 overflow-x-auto
                    scrollbar-none cursor-grab select-none
                    px-1 py-2
                  "
                >
                  {roamingCountries.map((c, idx) => (
                    <div key={idx} className="flex-shrink-0">
                      {c.flag && (
                        <img
                          src={c.flag}
                          className="
                            h-10 w-10 rounded-full
                            border border-white/20
                            object-cover shadow-md
                            hover:scale-110 transition-transform
                          "
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* NETWORKS DROPDOWN */}
          {networks.length > 0 && (
            <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
              <button
                onClick={() => setShowNetworks(!showNetworks)}
                className="w-full flex justify-between items-center text-sm font-semibold"
              >
                <span>Potential Networks</span>
                <span className="text-purple-300">
                  {showNetworks ? "▲" : "▼"}
                </span>
              </button>

              {showNetworks && (
                <div className="mt-4 flex flex-col gap-3">
                  {networks.map((n: any, i: number) => (
                    <div
                      key={i}
                      className="bg-black/30 p-3 rounded-xl border border-purple-300/20 shadow-inner"
                    >
                      <p className="text-sm font-bold">
                        {n.name || n.country?.name}
                      </p>

                      <ul className="ml-4 list-disc text-xs">
                        {(n.networks || [])?.map(
  (net: any, j: number) => (
    <li key={j}>
      {net.brandName || net.name} —{" "}
      {(net.speed || net.speeds)?.join(" / ") ||
        "Unknown"}
    </li>
  )
)}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 py-3 rounded-xl bg-neutral-700 text-purple-200 font-semibold hover:bg-neutral-600 transition"
              onClick={onClose}
            >
              Close
            </button>

            <button className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
