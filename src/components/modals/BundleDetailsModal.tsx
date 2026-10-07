"use client";

import { useEffect, useRef, useState } from "react";
import { NormalizedBundle } from "@/types/esim"; // adjust path

export default function BundleDetailsModal({
  open,
  onClose,
  bundle,
  preferredCurrency,
  fxSellRate,
}: {
  open: boolean;
  onClose: () => void;
  bundle: NormalizedBundle | null;
  preferredCurrency: string;
  fxSellRate: number;
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
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
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
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* ---------------------------------------------------
     PRICE
  --------------------------------------------------- */
  const usd = bundle.finalPriceUsd ?? bundle.price_usd;
const converted = usd * fxSellRate;


  /* ---------------------------------------------------
     DROPDOWNS
  --------------------------------------------------- */
  const [showCoverage, setShowCoverage] = useState(false);
  const [showNetworks, setShowNetworks] = useState(false);
  const [showSocials, setShowSocials] = useState(false);
  const [showTech, setShowTech] = useState(false);

  /* ---------------------------------------------------
     UI
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
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />

        {/* HEADER */}
        <div className="relative z-10 bg-white p-5 border-b border-purple-300/30">
          <p className="text-[10px] tracking-[0.3em] text-black uppercase">
            PLAN DETAILS
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-widest text-black">
            {bundle.name.toUpperCase()}
            
          </h2>

          <h3 className="mt-2 text-xs font-extrabold tracking-widest text-black">
            {bundle.id}
          </h3>

          <p className="text-xs text-purple-600 opacity-80 mt-1">
            {bundle.scope.toUpperCase()} PLAN
          </p>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col gap-6 text-white p-6">

          {/* SUMMARY GRID */}
          <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <div>
              <p className="text-xs opacity-70">Data</p>
              <p className="text-sm font-semibold">
                {bundle.type === "unlimited"
                  ? "Unlimited"
                  : `${(bundle.data_mb || 0) / 1024} GB`}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Validity</p>
              <p className="text-sm font-semibold">
                {bundle.validity_days} Days
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Country</p>
              <p className="text-sm font-semibold">
                {bundle.country?.name || bundle.country_name}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Destination</p>
              <p className="text-sm font-semibold">
                {bundle.destination_name}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Region</p>
              <p className="text-sm font-semibold">
                {bundle.region_code || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-70">Top‑Up Support</p>
              <p className="text-sm font-semibold">
                {bundle.supports_topup ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {/* PRICE */}
          <div className="bg-black/30 p-4 rounded-2xl border border-purple-300/20">
            <p className="text-xs opacity-70">Price</p>
            <p className="text-2xl font-bold text-green-400">
              {preferredCurrency} {converted.toFixed(2)}
            </p>
          </div>

          {/* COVERAGE */}
          <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <button
              onClick={() => setShowCoverage(!showCoverage)}
              className="w-full flex justify-between items-center text-sm font-semibold"
            >
              <span>{bundle.coverage_count} Countries</span>
              <span className="text-purple-300">
                {showCoverage ? "▲" : "▼"}
              </span>
            </button>

            {showCoverage && (
              <div className="mt-4 grid grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2">
                {bundle.coverage.map((c, idx) => (
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
                      {c.country_name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NETWORKS */}
          <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <button
              onClick={() => setShowNetworks(!showNetworks)}
              className="w-full flex justify-between items-center text-sm font-semibold"
            >
              <span>Networks</span>
              <span className="text-purple-300">
                {showNetworks ? "▲" : "▼"}
              </span>
            </button>

            {showNetworks && (
              <div className="mt-4 flex flex-col gap-3">
                {bundle.available_networks.map((n, i) => (
                  <div
                    key={i}
                    className="bg-black/30 p-3 rounded-xl border border-purple-300/20 shadow-inner"
                  >
                    <p className="text-sm font-bold">{n}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SOCIALS */}
          {bundle.socials && (
            <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
              <button
                onClick={() => setShowSocials(!showSocials)}
                className="w-full flex justify-between items-center text-sm font-semibold"
              >
                <span>Social App Support</span>
                <span className="text-purple-300">
                  {showSocials ? "▲" : "▼"}
                </span>
              </button>

              {showSocials && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {Object.entries(bundle.socials).map(([app, support], idx) => (
                    <div
                      key={idx}
                      className="bg-black/30 p-3 rounded-xl border border-purple-300/20 shadow-inner"
                    >
                      <p className="text-sm font-bold capitalize">{app}</p>
                      <p className="text-xs opacity-70">
                        iOS: {support.ios ? "Yes" : "No"}
                      </p>
                      <p className="text-xs opacity-70">
                        Android: {support.android ? "Yes" : "No"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TECH INFO */}
          <div className="bg-black/20 p-4 rounded-2xl border border-purple-300/20">
            <button
              onClick={() => setShowTech(!showTech)}
              className="w-full flex justify-between items-center text-sm font-semibold"
            >
              <span>Technical Info</span>
              <span className="text-purple-300">
                {showTech ? "▲" : "▼"}
              </span>
            </button>

            {showTech && (
              <div className="mt-4 flex flex-col gap-2 text-xs opacity-80">
                <p>Plan ID: {bundle.id}</p>
                <p>eSim Type: {bundle.object}</p>
                <p>Country Code: {bundle.country?.iso}</p>
                <p>Destination Code: {bundle.destination_code}</p>
                <p>Region Code: {bundle.region_code || "N/A"}</p>
                <p>Global Code: {bundle.global_code || "N/A"}</p>
                <p>Minutes: {bundle.minutes ?? "0"}</p>
                <p>SMS: {bundle.sms ?? "0"}</p>
                <p>Fair Usage: {bundle.fair_usage ?? "No Throttle"}</p>
                <p>Quantity: {bundle.quantity}</p>
                <p>Updated At: {bundle.updated_at}</p>
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 py-3 rounded-xl bg-neutral-700 text-purple-200 font-semibold hover:bg-neutral-600 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
