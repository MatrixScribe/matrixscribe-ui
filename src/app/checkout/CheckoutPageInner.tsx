"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function CheckoutPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://redatacom-end.onrender.com";

  const payloadRaw = searchParams.get("payload");
  const payload = payloadRaw ? JSON.parse(payloadRaw) : null;

  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 3D tilt ref
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  if (!payload) {
    return (
      <main className="p-10">
        <p className="text-red-500">Invalid checkout payload.</p>
      </main>
    );
  }

  const operatorAmount = payload.amount;
  const operatorCurrency = payload.currency;

  useEffect(() => {
    async function loadQuote() {
      try {
        const res = await fetch(`${API_BASE}/api/checkout/quote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operatorAmount,
            operatorCurrency,
            userCurrency: "USD"
          })
        });

        const data = await res.json();
        setQuote(data);
      } catch (e) {
        console.error("QUOTE ERROR", e);
        setQuote({ error: "Unable to calculate FX rate" });
      }
    }

    loadQuote();
  }, [API_BASE, operatorAmount, operatorCurrency]);

  async function handlePay() {
    if (!quote || quote.error) return;
    setLoading(true);

    const finalZar = Number(quote.paystackAmount.toFixed(2));

    try {
      const payRes = await fetch(`${API_BASE}/api/paystack/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountZar: finalZar,
          totalChargeUSD: quote.totalChargeUSD,
          topupPayload: {
            type: payload.type,
            operatorId: payload.operatorId,
            operatorName: payload.operatorName,
            operatorAmount: operatorAmount,
            operatorCurrency: operatorCurrency,
            phone: payload.phone,
            countryCode: payload.country,
            productId: payload.productId,
            productName: payload.productName,
            operatorCostUSD: quote.operatorCostUSD
          }
        })
      });

      const payData = await payRes.json();

      if (!payData || !payData.authorization_url) {
        alert("Payment initialization failed. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = payData.authorization_url;
    } catch (err) {
      console.error("PAYSTACK INIT ERROR", err);
      alert("Payment initialization failed. Please try again.");
      setLoading(false);
    }
  }

  const hasQuote =
    quote &&
    !quote.error &&
    typeof quote.operatorCostUSD === "number" &&
    typeof quote.serviceFeeUSD === "number" &&
    typeof quote.totalChargeUSD === "number" &&
    typeof quote.sellRate === "number";

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-lg space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight"></h1>
          <button
            onClick={() => router.back()}
            className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur 
              text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy"
          >
            Cancel
          </button>
        </div>

        {/* BOARDING PASS CARD */}
        <div
          ref={cardRef}
          className="
            bg-white rounded-3xl shadow-xl border border-neutral-200
            overflow-hidden relative transition-all duration-500
            animate-[goldPulse_2.2s_ease-in-out_infinite]
          "
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gold Pulse Keyframes */}
          <style>{`
            @keyframes goldPulse {
              0% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
              50% { box-shadow: 0 0 32px rgba(234,179,8,0.55); }
              100% { box-shadow: 0 0 0px rgba(234,179,8,0.0); }
            }
          `}</style>

          {/* PURPLE HEADER */}
          <div className="p-6 bg-gradient-to-r from-purple-700 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {payload.operatorLogo && (
                  <img
                    src={payload.operatorLogo}
                    className="h-15 w-15 object-contain rounded-md shadow"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{payload.operatorName}</h2>
                  <p className="text-xs opacity-80 tracking-wide">
                    Waiting to Deliver
                  </p>
                </div>
              </div>

              {payload.countryFlag && (
                <img
                  src={payload.countryFlag}
                  className="h-10 w-14 rounded shadow-sm object-cover"
                />
              )}
            </div>

            {/* Product Name */}
            <div className="mt-5">
              <p className="text-[18px] font-bold text-white animate-pulse tracking-tight">
                {payload.productName}
              </p>
              <p className="text-xs opacity-80">Ready</p>
            </div>

            {/* Route */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80">Country Location</p>
                <p className="text-lg font-semibold">{payload.countryName}</p>
              </div>

              <div className="font-bold text-2xl">
                <img
                  src="/logogrey.png"
                  alt="Home"
                  className="h-15 w-15 object-contain"
                />
              </div>

              <div>
                <p className="text-xs opacity-80">Phone Number</p>
                <p className="text-lg font-semibold">
                  {payload.dialCode} {payload.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="p-6 border-b border-dashed border-neutral-300">
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500 mb-4">
              Details
            </h3>

            {!quote && (
              <p className="text-neutral-500 text-sm">Calculating price…</p>
            )}

            {quote?.error && (
              <p className="text-red-500 text-sm">
                Unable to calculate FX rate. Please try again.
              </p>
            )}

            {hasQuote && (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Face Value</span>
                  <span className="font-medium">
                    {operatorAmount} {operatorCurrency}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">FX Rate</span>
                  <span className="font-medium">
                    1 USD = {quote.sellRate.toFixed(4)} {operatorCurrency}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium">
                    ${quote.operatorCostUSD.toFixed(4)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Service Fee</span>
                  <span className="font-medium">
                    ${quote.serviceFeeUSD.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="text-neutral-500">Total (USD)</span>
                  <span className="font-semibold">
                    ${quote.totalChargeUSD.toFixed(4)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Your Total in {operatorCurrency}
                  </span>
                  <span className="font-semibold">
                    {quote.approxLocal.toFixed(2)} {operatorCurrency}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="text-neutral-500">you’ll pay redatacom in ZAR</span>
                  <span className="font-semibold">
                    {quote.paystackAmount.toFixed(2)} ZAR
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="p-6"></div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePay}
          disabled={!hasQuote || loading}
          className="
            w-full rounded-2xl bg-purple-600 py-3 text-sm font-semibold text-white 
            hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg
          "
        >
          {loading ? "Processing…" : "Pay"}
        </button>
      </div>
    </main>
  );
}
