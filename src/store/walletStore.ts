"use client";

import { create } from "zustand";

interface WalletState {
  balance: number;
  walletId: string | null;

  setBalance: (b: number) => void;
  setWalletId: (id: string | null) => void;

  refreshBalance: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  walletId: null,

  setBalance: (b) => set({ balance: b }),
  setWalletId: (id) => set({ walletId: id }),

  refreshBalance: async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const token = localStorage.getItem("token");

      console.log("Refreshing wallet from:", `${API_BASE}/api/wallet/balance`);

      const res = await fetch(`${API_BASE}/api/wallet/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("WALLET BALANCE RESPONSE:", data);

      set({ balance: data.balance ?? 0 });

      if (data.walletId) {
        set({ walletId: data.walletId });
      }
    } catch (err) {
      console.error("Failed to refresh wallet balance:", err);
    }
  },
}));
