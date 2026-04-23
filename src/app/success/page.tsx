"use client";

import Link from "next/link";
import { useTopupStore } from "@/store/topupStore";

export default function SuccessPage() {
  const { lastTransaction } = useTopupStore();

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <svg
              className="h-12 w-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold">Topup Successful</h1>
        <p className="text-neutral-600 max-w-sm mx-auto">
          Your transaction has been processed. Delivery is usually instant, but may
          take a few minutes depending on the operator.
        </p>

        {/* Summary Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4 text-left">
          <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
            Transaction Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Transaction ID</span>
              <span className="font-medium">{lastTransaction?.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Timestamp</span>
              <span className="font-medium">
                {new Date(lastTransaction?.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Country</span>
              <span className="font-medium flex items-center gap-2">
                {lastTransaction?.country?.flag} {lastTransaction?.country?.name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Operator</span>
              <span className="font-medium">{lastTransaction?.operator?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Product</span>
              <span className="font-medium">{lastTransaction?.product?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Amount</span>
              <span className="font-medium">
                ${lastTransaction?.amount?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition"
          >
            Send another topup
          </Link>

          <Link
            href="/history"
            className="block w-full rounded-xl border border-neutral-300 py-3 text-sm font-medium hover:bg-neutral-100 transition"
          >
            View history
          </Link>
        </div>
      </div>
    </main>
  );
}
