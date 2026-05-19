"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { useTransactionStore } from "@/store/transactionStore";
import Link from "next/link";

export default function WalletPage() {
  const { balance, setBalance } = useWalletStore();
  const { history, fetchHistory } = useTransactionStore();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    async function loadBalance() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/api/wallet/balance`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBalance(data.balance ?? 0);
      } catch (err) {
        console.error("Failed to load wallet balance:", err);
      }
    }

    loadBalance();
    fetchHistory?.();
  }, [API_BASE, setBalance, fetchHistory]);

  const recent = history.slice(-20).reverse();

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

        {/* Balance Card — Premium */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 shadow-lg">
          <div className="text-sm opacity-80">Current Balance</div>
          <div className="text-4xl font-bold mt-1 tracking-tight">
            ${balance.toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/wallet/pay"
            className="block w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition text-center"
          >
            LOAD WALLET
          </Link>

          <Link
            href="/wallet/ledger"
            className="block w-full rounded-xl border border-neutral-300 py-3 text-sm font-medium hover:bg-neutral-100 transition text-center"
          >
            Airtime Ledger
          </Link>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Wallet Transaction History
          </h2>

          {recent.length === 0 && (
            <p className="text-neutral-500 text-sm">No transactions yet.</p>
          )}

          {recent.map((tx) => {
            const p = tx.pricingBreakdown || {};
            const isWalletLoad = tx.type === "wallet_load";

            const icon = isWalletLoad
              ? "/icons/wallet-load.svg"
              : tx.product?.name?.toLowerCase().includes("data")
              ? "/icons/data.svg"
              : "/icons/airtime.svg";

            return (
              <div
                key={tx.id}
                className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${
                  isWalletLoad
                    ? "bg-gradient-to-r from-emerald-50 to-emerald-100"
                    : "bg-gradient-to-r from-neutral-50 to-neutral-100"
                }`}
              >
                {/* Icon + Title + Amount */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <img src={icon} className="h-4 w-4 opacity-70" alt="" />
                    <span className="font-medium">
                      {isWalletLoad
                        ? "Wallet Top‑Up via Paystack"
                        : tx.operator?.name || "Unknown Operator"}
                    </span>
                  </div>

                  <span
                    className={`font-semibold ${
                      isWalletLoad ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {isWalletLoad
                      ? `+$${tx.total.toFixed(2)}`
                      : `-$${tx.total.toFixed(2)}`}
                  </span>
                </div>

                {/* Paystack Badge */}
                {isWalletLoad && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/70 border border-emerald-200 w-fit shadow-sm">
                    <div className="h-3 w-10 flex items-center justify-center overflow-hidden">
                      <img
                        src="/logos/paystack.png"
                        alt="Paystack"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 tracking-wide">
                      
                    </span>
                  </div>
                )}

                {/* Timestamp */}
                <div className="text-xs text-neutral-500">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>

                {/* Product + Country */}
                {!isWalletLoad && (
                  <div className="text-sm text-neutral-700">
                    {tx.product?.name || ""} — {tx.country?.flag || ""}{" "}
                    {tx.country?.name || ""}
                  </div>
                )}

                {/* Running Balance */}
                {!isWalletLoad &&
                  p.runningBalance !== undefined &&
                  p.runningBalance !== null && (
                    <div className="flex justify-between text-xs pt-2 border-t border-neutral-200">
                      <span className="text-neutral-500">Balance After</span>
                      <span className="font-medium">
                        ${p.runningBalance.toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
