"use client";

import { useState, useRef, useEffect } from "react";

interface Bundle {
  id: string;
  name: string;
  description: string;
  finalPriceUsd: number;
  validityDays: number;
  countryIso?: string | null;
}

interface BundleCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  bundle: Bundle | null;
  preferredCurrency: string | null;
  fxSellRate: number | null;
  fxZarRate: number | null;
  token: string | null;
  countryIso: string | null;
}

export default function BundleCheckoutModal({
  open,
  onClose,
  bundle,
  preferredCurrency,
  fxSellRate,
  fxZarRate,
  token,
  countryIso,
}: BundleCheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* PARTICLE BACKGROUND */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    const count = 55;

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
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
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
        ctx.fillStyle = "rgba(255,255,255,0.20)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  if (!open || !bundle) return null;

  /* PRICE CALCULATIONS */
  const usd = Number(bundle.finalPriceUsd ?? 0);

  const hasPreferred =
    preferredCurrency &&
    preferredCurrency !== "USD" &&
    fxSellRate !== null;

  const localCost =
    hasPreferred && fxSellRate !== null ? usd * fxSellRate : null;

  const hasZarRate = fxZarRate !== null && fxZarRate > 0;
  const zarCost = hasZarRate ? usd * (fxZarRate as number) : null;

  const effectiveCountryIso =
    bundle.countryIso ?? countryIso ?? null;

  async function handlePay() {
    if (!bundle) return;
    if (!hasZarRate || !token) return;

    setLoading(true);

    try {
      const amountZar = Number((usd * (fxZarRate as number)).toFixed(2));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/esim/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountZar,
            bundleId: bundle.id,
            bundleName: bundle.name,
            priceUsd: usd,
            countryIso: effectiveCountryIso ?? "",
            validityDays: bundle.validityDays,
          }),
        }
      );

      const json = await res.json();

      if (!json.success || !json.authorization_url) {
        console.error("Failed to initiate eSIM checkout:", json);
        setLoading(false);
        return;
      }

      window.location.href = json.authorization_url;
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-[999]">
      <div
  className="
    relative w-full max-w-md rounded-3xl p-6
    bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-700
    border border-purple-400/30 shadow-2xl
    max-h-[90vh] overflow-y-auto
  "
>

        {/* PARTICLE CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />

        {/* COSMIC SHINE */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-purple-500/10 to-transparent animate-[pulse_4s_infinite]" />

        {/* HEADER */}
        <div className="relative z-10 mb-5 text-center">
          <img src="/esimcheckout.png" className="w-auto h-10 opacity-100" />
          <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Checkout
          </h2>
          <p className="text-sm text-purple-200 opacity-80 mt-1">
            The power of connectivity
          </p>
        </div>

        {/* BUNDLE CARD */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-white/10 border border-white/20 shadow-inner backdrop-blur-sm">
          <p className="text-white font-bold text-lg">{bundle.name}</p>
          <p className="text-purple-200 text-sm opacity-80 mt-1">
            {bundle.description}
          </p>
        </div>

        {/* PRICE BLOCK */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-neutral-900/40 border border-purple-300/20 shadow-inner space-y-3">
          <div className="flex justify-between text-white">
            <span className="opacity-80">USD</span>
            <span className="font-bold">${usd.toFixed(2)}</span>
          </div>

          {hasPreferred && localCost !== null && (
            <div className="flex justify-between text-white">
              <span className="opacity-80">Your Currency: {preferredCurrency}</span>
              <span className="font-bold">
                {localCost.toFixed(2)} {preferredCurrency}
              </span>
            </div>
          )}

          {zarCost !== null && (
            <div className="flex justify-between text-green-300">
              <span className="opacity-80">You'll pay Redatcom in ZAR</span>
              <span className="font-bold">{zarCost.toFixed(2)} ZAR</span>
            </div>
          )}

          {/* FX BLOCK */}
          <div className="pt-2 border-t border-purple-300/20 space-y-1">
            {fxSellRate !== null && preferredCurrency && (
              <p className="text-purple-200 text-xs opacity-80">
                1 USD = {fxSellRate.toFixed(4)} {preferredCurrency}
              </p>
            )}

            {hasZarRate && (
              <p className="text-purple-200 text-xs opacity-80">
                1 USD = {(fxZarRate as number).toFixed(4)} ZAR
              </p>
            )}
          </div>

          {/* COUNTRY */}
          {effectiveCountryIso && (
            <p className="text-purple-200 text-xs opacity-80">
              Country: <strong>{effectiveCountryIso}</strong>
            </p>
          )}

          {/* VALIDITY */}
          <p className="text-purple-200 text-xs opacity-80">
            Valid for <strong>{bundle.validityDays} days</strong>
          </p>
        </div>

        {/* VALUE SUMMARY */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-purple-900/40 border border-purple-300/30 shadow-inner">
          <p className="text-purple-100 text-sm">
            <strong className="text-white">After Payment:</strong>
          </p>
          <ul className="mt-2 text-xs text-purple-200 space-y-1">
            <li>• Instant activation</li>
            <li>• No roaming fees</li>
            <li>• Premium network coverage</li>
            <li>• Track usage, view & scan QR code</li>
          </ul>
        </div>

        {/* BUTTONS */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="
            relative z-10 w-full px-4 py-3 rounded-xl
            bg-green-600 text-white font-semibold
            hover:bg-green-700 transition shadow-lg
            disabled:opacity-40 disabled:cursor-not-allowed
            animate-[pulse_2s_infinite]
          "
        >
          {loading ? "Processing…" : "Continue to Payment"}
        </button>

        <button
          onClick={onClose}
          className="
            relative z-10 mt-3 w-full px-4 py-3 rounded-xl
            bg-white/10 text-white font-medium
            hover:bg-white/20 transition
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
