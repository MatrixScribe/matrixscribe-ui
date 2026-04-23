"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWalletLedgerStore } from "@/store/walletLedgerStore";
import { useWalletStore } from "@/store/walletStore";
import { useEffect } from "react";

export default function WalletSuccessPage() {
  const params = useSearchParams();
  const reference = params.get("reference");

  const { addEntry } = useWalletLedgerStore();
  const { refreshBalance } = useWalletStore();

  useEffect(() => {
    async function verify() {
      if (!reference) return;

      const res = await fetch(`/api/paystack/verify?reference=${reference}`);
      const data = await res.json();

      if (data.status === "success") {
        addEntry({
          id: reference,
          type: "credit",
          amount: data.amount / 100,
          timestamp: new Date().toISOString(),
          description: "Wallet deposit via Paystack",
        });

        refreshBalance();
      }
    }

    verify();
  }, [reference]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-lg space-y-8 text-center">
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

        <h1 className="text-2xl font-semibold">Wallet Funded</h1>
        <p className="text-neutral-600 max-w-sm mx-auto">
          Your wallet has been successfully funded. You can now send airtime, data, or utilities instantly.
        </p>

        <Link
          href="/"
          className="block w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
