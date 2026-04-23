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

  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState<any>(null);

  // 🔥 Fetch hybrid pricing from backend
  useEffect(() => {
    async function loadPricing() {
      if (!country || !operator || !product || !amount) return;

      const res = await fetch("/api/pricing", {
        method: "POST",
        body: JSON.stringify({
          countryCode: country.code,
          operatorId: operator.id,
          productType: product.type,
          operatorCost: product.operatorCost ?? amount, // TEMP until ingestion
          amount,
          fxRate: 1, // TEMP until FX ingestion
        }),
      });

      const data = await res.json();
      setPricing(data);
    }

    loadPricing();
  }, [country, operator, product, amount]);

  async function handleConfirm() {
    if (!pricing) return;
    setLoading(true);

    const tx = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      country,
      operator,
      product,
      amount,
      total: pricing.finalPrice,
      pricingBreakdown: pricing,
    };

    // 🔥 Call backend topup API
    await fetch("/api/topup", {
      method: "POST",
      body: JSON.stringify(tx),
    });

    // Save local transaction
    addTransaction(tx);
    setLastTransaction(tx);

    // 🔥 Save ledger entry to backend
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
        runningBalance: null, // backend will compute later
      }),
    });

    refreshBalance();

    // Reset UI
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
                {amount ? `$${amount.toFixed(2)}` : "—"}
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
