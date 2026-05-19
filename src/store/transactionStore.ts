"use client";

import { create } from "zustand";

export interface Transaction {
  id: string;
  timestamp: string;
  country: any;
  operator: any;
  product: any;
  amount: number;
  total: number;
  pricingBreakdown?: any;
  type?: string;
}

interface TransactionState {
  history: Transaction[];
  addTransaction: (tx: Transaction) => void;
  fetchHistory: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  history: [],

  addTransaction: (tx) =>
    set((state) => ({
      history: [tx, ...state.history],
    })),

  fetchHistory: async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/transactions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // If backend returned HTML (401), this prevents a crash
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Transaction API returned non‑JSON:", text);
        return;
      }

      if (!Array.isArray(data.history)) return;

      // ⭐ Normalize transactions so UI never crashes
      const normalized = data.history.map((tx: any) => ({
        ...tx,
        operator: tx.operator || { name: "Wallet Load" },
        product: tx.product || { name: "" },
        country: tx.country || { name: "", flag: "" },
        total: Number(tx.total || tx.amount || 0),
      }));

      set({ history: normalized });
    } catch (err) {
      console.error("Failed to fetch transaction history:", err);
    }
  },
}));
