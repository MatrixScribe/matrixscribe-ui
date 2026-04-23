"use client";

import { useWalletLedgerStore } from "@/store/walletLedgerStore";

export default function AdminLedger() {
  const { ledger } = useWalletLedgerStore();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Wallet Ledger</h1>

      <div className="space-y-3">
        {ledger.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Type</span>
              <span
                className={`font-semibold ${
                  entry.type === "credit" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {entry.type.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Amount</span>
              <span className="font-medium">${entry.amount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Description</span>
              <span className="font-medium">{entry.description}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Timestamp</span>
              <span className="font-medium">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
