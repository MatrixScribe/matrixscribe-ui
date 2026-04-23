"use client";

import { create } from "zustand";

interface Transaction {
  id: string;
  timestamp: string;
  country: any;
  operator: any;
  product: any;
  amount: number;
  total: number;
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
