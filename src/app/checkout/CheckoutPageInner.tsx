"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://sentiment-platform-zgr8.onrender.com";

  const payloadRaw = searchParams.get("payload");
  const payload = payloadRaw ? JSON.parse(payloadRaw) : null;

  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!payload) {
    return (
      <main className="p-10">
        <p className="text-red-500">Invalid checkout payload.</p>
      </main>
    );
  }

  const operatorAmount =
    payload.product?.customAmount ??
    payload.product?.baseAmount ??
    payload.amount;

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
        setQuote({ error: "Unable to calculate FX rate" });
      }
    }

    loadQuote();
  }, [API_BASE, operatorAmount, operatorCurrency]);

  async function handlePay() {
    if (!quote || quote.error) return;
    setLoading(true);

    const finalZar = Number(quote.paystackAmount.toFixed(2));

    const payRes = await fetch(`${API_BASE}/api/paystack/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountZar: finalZar,
        totalChargeUSD: quote.totalChargeUSD,
        topupPayload: {
          operatorId: payload.operatorId,
          operatorAmount: operatorAmount,
          operatorCurrency: operatorCurrency,
          phone: payload.phone,
          countryCode: payload.country,
          operatorCostUSD: quote.operatorCostUSD
        }
      })
    });

    const payData = await payRes.json();
    window.location.href = payData.authorization_url;
  }

  const hasQuote =
    quote &&
    !quote.error &&
    typeof quote.operatorCostUSD === "number" &&
    typeof quote.serviceFeeUSD === "number" &&
    typeof quote.totalChargeUSD === "number" &&
    typeof quote.sellRate === "number";

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Checkout</h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition"
          >
            Back
          </button>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Summary
          </h2>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-neutral-500">Country</span>
              <span className="font-medium flex items-center gap-2">
                {payload.countryFlag && (
                  <img
                    src={payload.countryFlag}
                    alt="flag"
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                )}
                {payload.countryName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Phone</span>
              <span className="font-medium">
                {payload.dialCode} {payload.phone}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Operator</span>
              <span className="font-medium flex items-center gap-2">
                {payload.operatorLogo && (
                  <img
                    src={payload.operatorLogo}
                    alt="operator logo"
                    className="w-6 h-6 rounded object-contain"
                  />
                )}
                {payload.operatorName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Product</span>
              <span className="font-medium">{payload.productName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Face Value</span>
              <span className="font-medium">
                {operatorAmount} {operatorCurrency}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
              Payment Breakdown
            </h2>

            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              FX Verified
            </span>
          </div>

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
                <span className="text-neutral-500">FX Rate</span>
                <span className="font-medium">
                  1 USD = {quote.sellRate.toFixed(4)} {operatorCurrency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal (USD)</span>
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
                  Approx. in {operatorCurrency}
                </span>
                <span className="font-semibold">
                  {quote.approxLocal.toFixed(2)} {operatorCurrency}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-neutral-200">
                <span className="text-neutral-500">You'll pay in ZAR</span>
                <span className="font-semibold">
                  {quote.paystackAmount.toFixed(2)} ZAR
                </span>
              </div>

            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-4 w-4 rounded-full bg-emerald-500" />
            <span>Secure Paystack Payment</span>
          </span>
        </div>

        <button
          onClick={handlePay}
          disabled={!hasQuote || loading}
          className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white 
                     hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing…" : "Pay with Paystack"}
        </button>
      </div>
    </main>
  );
}
