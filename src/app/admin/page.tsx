"use client";

import { useWalletLedgerStore } from "@/store/walletLedgerStore";
import { useTransactionStore } from "@/store/transactionStore";

export default function AdminHome() {
  const { ledger } = useWalletLedgerStore();
  const { history } = useTransactionStore();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-500">Total Transactions</div>
          <div className="text-3xl font-semibold mt-1">{history.length}</div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-500">Ledger Entries</div>
          <div className="text-3xl font-semibold mt-1">{ledger.length}</div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-500">Active Operators</div>
          <div className="text-3xl font-semibold mt-1">—</div>
        </div>
      </div>
    </div>
  );
}
