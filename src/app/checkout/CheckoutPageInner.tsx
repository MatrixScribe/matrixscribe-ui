"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⭐ FIXED — fallback to backend URL
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

    // ⭐ FIXED — correct Paystack endpoint
    const payRes = await fetch(`${API_BASE}/api/paystack/initialize`, {
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
      {/* ... unchanged UI ... */}
    </main>
  );
}
