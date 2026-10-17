"use client";

import { useState, useRef, useEffect } from "react";

interface BundleCheckoutModalProps {
  open: boolean;
  onClose: () => void;
  bundle: any | null;
  preferredCurrency: string | null;
  fxSellRate: number | null;
  fxZarRate: number | null;
  token: string | null;
  countryIso: string | null;
  onCheckoutComplete?: () => void;
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
  onCheckoutComplete,
}: BundleCheckoutModalProps) {
  const [loading, setLoading] = useState(false);

  // ⭐ Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponValid, setCouponValid] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [sharePercent, setSharePercent] = useState(0);
  const [validating, setValidating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ⭐ RESET COUPON WHEN MODAL OPENS */
  useEffect(() => {
    if (open) {
      setCouponCode("");
      setCouponValid(false);
      setDiscountPercent(0);
      setSharePercent(0);
    }
  }, [open]);

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

  /* ⭐ PRICE LOGIC */
  const rawUsd = bundle.finalPriceUsd ?? bundle.price_usd;
  const safeUsd = isNaN(rawUsd) ? 0 : rawUsd;

  /* ⭐ DISCOUNT LOGIC — only applied if couponValid === true */
  const appliedDiscount = couponValid ? discountPercent : 0;
  const discountedUsd = safeUsd * (1 - appliedDiscount / 100);

  /* ⭐ FX CONVERSION */
  const hasPreferred =
    preferredCurrency &&
    preferredCurrency !== "USD" &&
    fxSellRate !== null;

  const preferredCurrencyPrice =
    hasPreferred && fxSellRate !== null
      ? Number((discountedUsd * fxSellRate).toFixed(2))
      : null;

  const hasZarRate = fxZarRate !== null && fxZarRate > 0;

  const discountedZar =
    hasZarRate
      ? Number((discountedUsd * (fxZarRate as number)).toFixed(2))
      : null;

  const effectiveCountryIso =
    bundle.country?.iso ?? bundle.countryIso ?? countryIso ?? null;

  const validityDays =
    bundle.validity_days ?? bundle.validityDays ?? bundle.validity_days ?? 0;

  const description =
    bundle.description ?? bundle.fair_usage ?? "eSIM data bundle";

  /* ⭐ VALIDATE COUPON */
  async function validateCoupon() {
    setValidating(true);
    setCouponValid(false);
    setDiscountPercent(0);
    setSharePercent(0);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/affiliate/coupon/validate?code=${couponCode.trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (json.success && json.coupon) {
        setCouponValid(true);
        setDiscountPercent(json.coupon.discount_percent);
        setSharePercent(json.coupon.influencer_share_percent);
      } else {
        setCouponValid(false);
      }
    } catch (err) {
      console.error("Coupon validation failed:", err);
      setCouponValid(false);
    }

    setValidating(false);
  }

  /* ⭐ HANDLE PAYMENT */
  async function handlePay() {
    if (!bundle) return;
    if (!hasZarRate || !token) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/esim/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountZar: discountedZar,
            bundleId: bundle.id,
            bundleName: bundle.name,
            priceUsd: discountedUsd,
            countryIso: effectiveCountryIso ?? "",
            validityDays,
            couponCode: couponValid ? couponCode.trim() : null,
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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />

        {/* HEADER */}
        <div className="relative z-10 mb-5 text-center">
          <img src="/esimcheckout.png" className="w-auto h-10 opacity-100" />
          <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Checkout
          </h2>
        </div>

        {/* ⭐ COUPON FIELD */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-neutral-900/40 border border-purple-300/30 shadow-inner">
          <label className="block text-xs text-purple-100 mb-1">
            Enter Discount Code or Continue to Payment
          </label>

          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="
              w-full rounded-lg px-3 py-2 text-sm
              bg-neutral-800 text-white border border-purple-300/40
              focus:outline-none focus:ring-2 focus:ring-purple-400
            "
          />

          <button
            onClick={validateCoupon}
            disabled={validating || !couponCode.trim()}
            className="
              mt-2 w-full px-3 py-2 rounded-lg
              bg-purple-600 text-white text-sm font-semibold
              hover:bg-purple-700 disabled:opacity-40
            "
          >
            {validating ? "Validating…" : "Validate"}
          </button>

          {couponValid && (
            <p className="mt-2 text-green-300 text-xs">
              Valid! Discount Applied: {discountPercent}%
            </p>
          )}

          {!couponValid && couponCode.trim() && !validating && (
            <p className="mt-2 text-red-300 text-xs">
              Invalid coupon code.
            </p>
          )}
        </div>

        {/* PRICE BLOCK */}
        <div className="relative z-10 mb-4 p-4 rounded-xl bg-neutral-900/40 border border-purple-300/20 shadow-inner space-y-3">

          {/* ORIGINAL USD */}
          <div className="flex justify-between text-xs text-white">
            <span className="opacity-80">USD</span>
            <span className="font-bold">${safeUsd.toFixed(2)}</span>
          </div>

          {/* ORIGINAL PREFERRED CURRENCY */}
          {hasPreferred && (
            <div className="flex justify-between text-lg text-purple-200">
              <span className="opacity-80">{preferredCurrency}</span>
              <span className="font-bold">
                {(safeUsd * fxSellRate).toFixed(2)}
              </span>
            </div>
          )}

          {/* DISCOUNT */}
          {couponValid && (
            <div className="flex justify-between text-xs text-yellow-300">
              <span className="opacity-80">Discount Applied</span>
              <span className="font-bold">-{discountPercent}%</span>
            </div>
          )}

          {/* FINAL USD */}
          

          {/* FINAL PREFERRED CURRENCY */}
          {preferredCurrencyPrice !== null && (
            <div className="flex justify-between text-lg text-purple-200">
              <span className="opacity-80">{preferredCurrency} Total</span>
              <span className="font-bold">{preferredCurrencyPrice.toFixed(2)}</span>
            </div>
          )}

          {/* FINAL ZAR */}
          {discountedZar !== null && (
            <div className="flex justify-between text-xs text-green-300">
              <span className="opacity-80">You'll pay Redatcom in ZAR</span>
              <span className="font-bold">{discountedZar.toFixed(2)} ZAR</span>
            </div>
          )}

          {/* COUNTRY */}
          {effectiveCountryIso && (
            <p className="text-purple-200 text-xs opacity-80">
              Country: <strong>{effectiveCountryIso}</strong>
            </p>
          )}

          {/* VALIDITY */}
          <p className="text-purple-200 text-xs opacity-80">
            Valid for <strong>{validityDays} days</strong>
          </p>
        </div>

        {/* BUTTONS */}
        <button
          onClick={async () => {
            await handlePay();
            onCheckoutComplete?.();
          }}
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
