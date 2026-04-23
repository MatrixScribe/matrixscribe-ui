"use client";

import { useWalletStore } from "@/store/walletStore";
import Link from "next/link";

export default function WalletPage() {
  const { balance } = useWalletStore();

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Wallet</h1>
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
            Back
          </Link>
        </div>

        {/* Balance Card */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-500">Current Balance</div>
          <div className="text-3xl font-semibold mt-1">${balance.toFixed(2)}</div>
        </div>

        {/* Fund Wallet */}
        <Link
          href="/wallet/fund"
          className="block w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition text-center"
        >
          Fund Wallet
        </Link>

        {/* Start Topup */}
        <Link
          href="/"
          className="block w-full rounded-xl border border-neutral-300 py-3 text-sm font-medium hover:bg-neutral-100 transition text-center"
        >
          Start a Topup
        </Link>

        {/* Ledger */}
        <Link
          href="/wallet/ledger"
          className="block w-full rounded-xl border border-neutral-300 py-3 text-sm font-medium hover:bg-neutral-100 transition text-center"
        >
          View Ledger
        </Link>
      </div>
    </main>
  );
}
