"use client";

import { create } from "zustand";
import { useWalletLedgerStore } from "./walletLedgerStore";

interface WalletState {
  balance: number;
  refreshBalance: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,

  refreshBalance: () => {
    const ledgerBalance = useWalletLedgerStore.getState().getBalance();
    set({ balance: ledgerBalance });
  },
}));
