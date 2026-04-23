"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LedgerEntry = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  timestamp: string;
  operatorCost?: number | null;
  markupAmount?: number | null;
  feeAmount?: number | null;
  fxRate?: number | null;
  fxSpreadAmount?: number | null;
  runningBalance?: number | null;
};

export default function WalletLedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/ledger/list");
      const data = await res.json();
      setEntries(data || []);
    })();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Wallet Ledger</h1>
          <Link href="/wallet" className="text-sm text-neutral-500 hover:text-neutral-700">
            Back
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm space-y-3 text-sm">
          {entries.map((e) => (
            <div key={e.id} className="border-b border-neutral-200 last:border-0 pb-3 last:pb-0">
              <div className="flex justify-between">
                <span className="font-medium">{e.description}</span>
                <span
                  className={
                    e.type === "credit"
                      ? "text-emerald-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {e.type === "credit" ? "+" : "-"}
                  {e.currency} {e.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-500 text-xs mt-1">
                <span>{new Date(e.timestamp).toLocaleString()}</span>
                {e.runningBalance != null && (
                  <span>Balance: {e.currency} {e.runningBalance.toFixed(2)}</span>
                )}
              </div>

              {(e.operatorCost != null ||
                e.markupAmount != null ||
                e.feeAmount != null ||
                e.fxSpreadAmount != null) && (
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  {e.operatorCost != null && (
                    <div>Operator Cost: {e.currency} {e.operatorCost.toFixed(2)}</div>
                  )}
                  {e.markupAmount != null && (
                    <div>Markup: {e.currency} {e.markupAmount.toFixed(2)}</div>
                  )}
                  {e.feeAmount != null && (
                    <div>Fee: {e.currency} {e.feeAmount.toFixed(2)}</div>
                  )}
                  {e.fxSpreadAmount != null && (
                    <div>FX Spread: {e.currency} {e.fxSpreadAmount.toFixed(2)}</div>
                  )}
                  {e.fxRate != null && <div>FX Rate: {e.fxRate}</div>}
                </div>
              )}
            </div>
          ))}

          {entries.length === 0 && (
            <p className="text-neutral-500 text-sm">No ledger entries yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
