"use client";

import Link from "next/link";
import { useTransactionStore } from "@/store/transactionStore";

export default function HistoryPage() {
  const { history } = useTransactionStore();

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Transaction History</h1>
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-700">
            Back
          </Link>
        </div>

        {history.length === 0 && (
          <p className="text-neutral-500">No transactions yet.</p>
        )}

        <div className="space-y-4">
          {history.map((tx) => (
            <div
              key={tx.id}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">ID</span>
                <span className="font-medium">{tx.id}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Timestamp</span>
                <span className="font-medium">
                  {new Date(tx.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Country</span>
                <span className="font-medium flex items-center gap-2">
                  {tx.country.flag} {tx.country.name}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Operator</span>
                <span className="font-medium">{tx.operator.name}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Product</span>
                <span className="font-medium">{tx.product.name}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Amount</span>
                <span className="font-semibold">${tx.amount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Total</span>
                <span className="font-semibold">${tx.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
