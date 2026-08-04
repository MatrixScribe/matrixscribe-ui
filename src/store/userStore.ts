import { create } from "zustand";
import { useAuthStore } from "./authStore";
import { API_BASE } from "@/config/api";

interface Wallet {
  usd_balance: number;
  preferred_currency: string | null;
  local_equivalent: number | null;
  fx_mid_rate: number | null;
  fx_updated_at: string | null;
}

interface UserState {
  loading: boolean;
  user: any | null;
  wallet: Wallet | null;
  simCards: any[];
  esims: any[];
  loadUser: () => Promise<void>;
  setUser: (user: any) => void;
  updateProfile: (data: any) => Promise<boolean>;
  topupWallet: (currency: string, amount: number) => Promise<boolean>;
  applyTopup: (amountUsd: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  loading: true,
  user: null,
  wallet: null,
  simCards: [],
  esims: [],

  loadUser: async () => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) return set({ loading: false });

    // 1️⃣ Fetch user
    const resUser = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dataUser = await resUser.json();
    if (!dataUser.authenticated) return set({ loading: false });

    // 2️⃣ Fetch wallet (⭐ CRITICAL FIX)
    const resWallet = await fetch(`${API_BASE}/api/wallet`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dataWallet = await resWallet.json();

    set({
      user: dataUser.user,
      wallet: dataWallet.wallet || null,   // ⭐ updated wallet with FX + preferred currency
      simCards: dataUser.simCards,
      esims: dataUser.esims,
      loading: false
    });
  } catch (err) {
    console.error("ME FETCH ERROR:", err);
    set({ loading: false });
  }
},

  setUser: (user) =>
    set({
      user,
      wallet: user.wallet || null
    }),

  updateProfile: async (data) => {
    try {
      const token = useAuthStore.getState().token;

      const res = await fetch(`${API_BASE}/api/user/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      if (!json.success) return false;

      set({
        user: json.user,
        wallet: json.user.wallet || null
      });

      return true;
    } catch (err) {
      console.error("PROFILE UPDATE ERROR:", err);
      return false;
    }
  },

  topupWallet: async (currency, amount) => {
    try {
      const token = useAuthStore.getState().token;

      const res = await fetch(`${API_BASE}/api/wallet/topup/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currency, amount })
      });

      const json = await res.json();
      if (!json.success) return false;

      window.location.href = json.authorization_url;
      return true;
    } catch (err) {
      console.error("TOPUP ERROR:", err);
      return false;
    }
  },

  applyTopup: (amountUsd) => {
    const wallet = useUserStore.getState().wallet;
    if (!wallet) return;

    const updated = {
      ...wallet,
      usd_balance: wallet.usd_balance + amountUsd
    };

    set({ wallet: updated });
  }
}));
