"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function WalletSuccessContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const txId = searchParams.get("txId");

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <span className="text-2xl">✅</span>
        </div>

        <h1 className="text-xl font-semibold">Topup successful</h1>

        <p className="text-sm text-neutral-600">
          Your wallet has been updated and the transaction has been recorded.
        </p>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm space-y-2">
          {amount && (
            <div className="flex justify-between">
              <span className="text-neutral-500">Amount</span>
              <span className="font-medium">${Number(amount).toFixed(2)}</span>
            </div>
          )}

          {txId && (
            <div className="flex justify-between">
              <span className="text-neutral-500">Transaction ID</span>
              <span className="font-mono text-xs">{txId}</span>
            </div>
          )}
        </div>

        <Link
          href="/wallet"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition"
        >
          Back to wallet
        </Link>

        <Link
          href="/"
          className="block text-xs text-neutral-500 hover:text-neutral-700 mt-2"
        >
          Start another topup
        </Link>
      </div>
    </main>
  );
}

export default function WalletSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
          <div className="mx-auto max-w-md text-center text-sm text-neutral-500">
            Loading transaction details…
          </div>
        </main>
      }
    >
      <WalletSuccessContent />
    </Suspense>
  );
}
