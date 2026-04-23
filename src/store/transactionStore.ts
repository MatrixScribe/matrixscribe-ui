"use client";

import { create } from "zustand";

export interface Transaction {
  id: string;
  timestamp: string;
  country: any;
  operator: any;
  product: any;
  amount: number;          // always number (never null)
  total: number;
  pricingBreakdown?: any;  // optional, matches checkout
}

interface TransactionState {
  history: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  history: [],
  addTransaction: (tx) =>
    set((state) => ({
      history: [tx, ...state.history],
    })),
}));
