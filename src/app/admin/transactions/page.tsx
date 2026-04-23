"use client";

import { useTransactionStore } from "@/store/transactionStore";

export default function AdminTransactions() {
  const { history } = useTransactionStore();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Transactions</h1>

      <div className="space-y-3">
        {history.map((tx) => (
          <div
            key={tx.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="font-medium">{tx.product?.name}</div>
            <div className="text-xs text-neutral-500">
              {tx.operator?.name} — {tx.country?.name}
            </div>
            <div className="text-sm mt-1">${tx.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
