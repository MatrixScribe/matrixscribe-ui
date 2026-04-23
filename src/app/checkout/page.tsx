"use client";

import Link from "next/link";
import { useTopupStore } from "@/store/topupStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useWalletStore } from "@/store/walletStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    country,
    operator,
    product,
    amount,
    setCountry,
    setOperator,
    setProduct,
    setAmount,
    setLastTransaction,
  } = useTopupStore();

  const { addTransaction } = useTransactionStore();
  const { refreshBalance } = useWalletStore();

  const safeAmount = Number(amount ?? 0); // ⭐ FIX: always a number

  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState<any>(null);

  // Fetch hybrid pricing
  useEffect(() => {
    async function loadPricing() {
      if (!country || !operator || !product || !safeAmount) return;

      const res = await fetch("/api/pricing", {
        method: "POST",
        body: JSON.stringify({
          countryCode: country.code,
          operatorId: operator.id,
          productType: product.type,
          operatorCost: product.operatorCost ?? safeAmount,
          amount: safeAmount,
          fxRate: 1,
        }),
      });

      const data = await res.json();
      setPricing(data);
    }

    loadPricing();
  }, [country, operator, product, safeAmount]);

  async function handleConfirm() {
    if (!pricing) return;
    setLoading(true);

    const tx = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      country,
      operator,
      product,
      amount: safeAmount, // ⭐ FIX: always number
      total: pricing.finalPrice,
      pricingBreakdown: pricing,
    };

    await fetch("/api/topup", {
      method: "POST",
      body: JSON.stringify(tx),
    });

    addTransaction(tx);
    setLastTransaction(tx);

    await fetch("/api/ledger/add", {
      method: "POST",
      body: JSON.stringify({
        id: tx.id,
        type: "debit",
        amount: pricing.finalPrice,
        currency: "USD",
        description: `Topup: ${product?.name} (${operator?.name})`,
        timestamp: tx.timestamp,

        operatorCost: pricing.operatorCost,
        corridorMarkup: pricing.corridorMarkup,
        operatorMarkup: pricing.operatorMarkup,
        productMarkup: pricing.productMarkup,
        tierMarkup: pricing.tierMarkup,
        totalMarkupPct: pricing.totalMarkupPercent,
        markupAmount: pricing.markupAmount,
        feeAmount: pricing.feeAmount,
        fxRate: pricing.fxRate,
        fxSpreadAmount: pricing.fxSpreadAmount,
        runningBalance: null,
      }),
    });

    refreshBalance();

    setCountry(null);
    setOperator(null);
    setProduct(null);
    setAmount(null);

    router.push("/success");
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Checkout</h1>
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-700 transition"
          >
            Back
          </Link>
        </div>

        {/* Summary Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Country</span>
              <span className="font-medium flex items-center gap-2">
                {country?.flag} {country?.name || "—"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Operator</span>
              <span className="font-medium">{operator?.name || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Product</span>
              <span className="font-medium">{product?.name || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Amount</span>
              <span className="font-medium">
                {safeAmount ? `$${safeAmount.toFixed(2)}` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Payment
          </h2>

          {!pricing && (
            <p className="text-neutral-500 text-sm">Calculating price…</p>
          )}

          {pricing && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Operator Cost</span>
                <span className="font-medium">
                  ${pricing.operatorCost.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Markup</span>
                <span className="font-medium">
                  ${pricing.markupAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Platform Fee</span>
                <span className="font-medium">
                  ${pricing.feeAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-neutral-200">
                <span className="text-neutral-500">Total</span>
                <span className="font-semibold">
                  ${pricing.finalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!pricing || loading}
          className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white 
                     hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Confirm Topup"}
        </button>
      </div>
    </main>
  );
}
