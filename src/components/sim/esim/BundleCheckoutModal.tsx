"use client";

import { useState, useRef, useEffect } from "react";

interface Bundle {
  id: string;
  name: string;
  description: string;
  finalPriceUsd: number;
  validityDays: number;
}

interface BundleCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  bundle: Bundle | null;
  preferredCurrency: string | null;
  fxMidRate: number | null;
  fxZarRate: number | null;
  token: string | null;
  countryIso: string | null;
}

export default function BundleCheckoutModal({
  open,
  onClose,
  bundle,
  preferredCurrency,
  fxMidRate,
  fxZarRate,
  token,
  countryIso,
}: BundleCheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------------------------------------------------
     PARTICLE SHIMMER BACKGROUND (always runs)
  --------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 45;

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
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* ---------------------------------------------------
     EARLY RETURN (after hooks)
  --------------------------------------------------- */
  if (!open || !bundle) return null;

  /* ---------------------------------------------------
     PRICE CALCULATIONS
  --------------------------------------------------- */
  const usd = bundle.finalPriceUsd;

  const hasPreferred =
    preferredCurrency &&
    preferredCurrency !== "USD" &&
    fxMidRate;

  const localCost = hasPreferred ? usd * (fxMidRate as number) : null;
  const zarCost = fxZarRate ? usd * fxZarRate : null;

  /* ---------------------------------------------------
     PAYSTACK INIT
  --------------------------------------------------- */
  async function handlePay() {
    if (!fxZarRate || !token) return;

    setLoading(true);

    try {
      const amountZar = Number((usd * fxZarRate).toFixed(2));

      const payload = {
        type: "esim_purchase",
        bundleName: bundle.name,
        priceUsd: usd,
        countryIso,
        validityDays: bundle.validityDays,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/paystack/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountZar,
            totalChargeUSD: Number(usd.toFixed(2)),
            topupPayload: payload,
          }),
        }
      );

      const json = await res.json();

      if (!json.authorization_url) {
        console.error("Failed to initiate Paystack:", json);
        setLoading(false);
        return;
      }

      window.location.href = json.authorization_url;
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  /* ---------------------------------------------------
     UI
  --------------------------------------------------- */
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center p-4 z-[999]">
      <div
        className="
          relative w-full max-w-md rounded-3xl p-6
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-700
          border border-purple-400/30 shadow-2xl overflow-hidden
        "
      >
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />

        {/* Shine */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* HEADER */}
        <div className="relative z-10 mb-5">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Confirm Your Purchase
          </h2>
          <p className="text-sm text-purple-200 opacity-80 mt-1">
            Review your bundle details before checkout.
          </p>
        </div>

        {/* BUNDLE INFO */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner">
          <p className="text-white font-semibold">{bundle.name}</p>
          <p className="text-purple-200 text-sm opacity-80">
            {bundle.description}
          </p>
        </div>

        {/* PRICING */}
        <div className="relative z-10 space-y-2 mb-4">
          <p className="text-white">
            <strong>USD Price:</strong> ${usd.toFixed(2)}
          </p>

          {hasPreferred && localCost !== null && (
            <p className="text-white">
              <strong>{preferredCurrency}:</strong>{" "}
              {localCost.toFixed(2)}
            </p>
          )}

          {zarCost && (
            <p className="text-white">
              <strong>ZAR Charge:</strong> {zarCost.toFixed(2)}
            </p>
          )}

          {fxMidRate && (
            <p className="text-purple-200 text-sm opacity-80">
              FX: 1 USD = {fxMidRate.toFixed(4)} {preferredCurrency}
            </p>
          )}

          {fxZarRate && (
            <p className="text-purple-200 text-sm opacity-80">
              FX: 1 USD = {fxZarRate.toFixed(4)} ZAR
            </p>
          )}

          <p className="text-purple-200 text-sm opacity-80">
            Valid for <strong>{bundle.validityDays} days</strong>
          </p>

          {countryIso && (
            <p className="text-purple-200 text-sm opacity-80">
              Country: <strong>{countryIso}</strong>
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="
            relative z-10 w-full px-4 py-3 rounded-xl
            bg-green-600 text-white font-semibold
            hover:bg-green-700 transition
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
