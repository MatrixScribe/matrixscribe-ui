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
          {history.map((tx) => {
            const p = tx.pricingBreakdown || {};

            return (
              <div
                key={tx.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm space-y-4"
              >
                {/* Header */}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Topup</span>
                  <span className="font-medium">
                    {tx.operator.name} ({tx.product.name})
                  </span>
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

                {/* Amounts */}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Amount</span>
                  <span className="font-semibold">${tx.amount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Final Price</span>
                  <span className="font-semibold">${tx.total.toFixed(2)}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200 pt-3" />

                {/* Pricing Breakdown */}
                <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Pricing Breakdown
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Operator Cost</span>
                    <span className="font-medium">
                      ${p.operatorCost?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Corridor Markup</span>
                    <span className="font-medium">{p.corridorMarkup}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Operator Markup</span>
                    <span className="font-medium">{p.operatorMarkup}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Product Markup</span>
                    <span className="font-medium">{p.productMarkup}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tier Markup</span>
                    <span className="font-medium">{p.tierMarkup}%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total Markup</span>
                    <span className="font-medium">
                      ${p.markupAmount?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">Platform Fee</span>
                    <span className="font-medium">
                      ${p.feeAmount?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">FX Spread</span>
                    <span className="font-medium">
                      ${p.fxSpreadAmount?.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-500">FX Rate</span>
                    <span className="font-medium">
                      1 USD = {p.fxRate} {tx.country.currency}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-200 pt-3" />

                {/* Running Balance */}
                {p.runningBalance !== undefined && p.runningBalance !== null && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Running Balance</span>
                    <span className="font-semibold">
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
