"use client";

import { create } from "zustand";

interface LedgerEntry {
  id: string;
  type: "credit" | "debit";
  amount: number;
  timestamp: string;
  description: string;
}

interface WalletLedgerState {
  ledger: LedgerEntry[];
  addEntry: (entry: LedgerEntry) => void;
  getBalance: () => number;
}

export const useWalletLedgerStore = create<WalletLedgerState>((set, get) => ({
  ledger: [],

  addEntry: (entry) =>
    set((state) => ({
      ledger: [entry, ...state.ledger],
    })),

  getBalance: () => {
    return get().ledger.reduce((acc, entry) => {
      return entry.type === "credit"
        ? acc + entry.amount
        : acc - entry.amount;
    }, 0);
  },
}));
