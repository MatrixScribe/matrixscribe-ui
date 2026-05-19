"use client";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  // ⭐ NEW: Connected timestamp
  connectedSince: null,

  hydrate: () => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedConnected = localStorage.getItem("connectedSince");

    // ⭐ NEW: hydrate userId + walletId
    const storedUserId = localStorage.getItem("userId");
    const storedWalletId = localStorage.getItem("walletId");

    set({
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      isLoggedIn: !!storedToken,
      connectedSince: storedConnected ? Number(storedConnected) : null,

      userId: storedUserId || null,
      walletId: storedWalletId || null,
    });
  },

  login: (user, token) => {
    const now = Date.now();

    // ⭐ Extract IDs
    const userId = user?.id;
    const walletId = user?.wallet_id;

    // ⭐ Persist everything
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("connectedSince", String(now));

    if (userId) localStorage.setItem("userId", userId);
    if (walletId) localStorage.setItem("walletId", walletId);

    set({
      user,
      token,
      isLoggedIn: true,
      connectedSince: now,

      userId,
      walletId,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("connectedSince");
    localStorage.removeItem("userId");
    localStorage.removeItem("walletId");

    set({
      user: null,
      token: null,
      isLoggedIn: false,
      connectedSince: null,
      userId: null,
      walletId: null,
    });
  },

  refreshUser: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.user) {
        const user = data.user;

        // ⭐ Extract IDs
        const userId = user?.id;
        const walletId = user?.wallet_id;

        localStorage.setItem("user", JSON.stringify(user));

        if (userId) localStorage.setItem("userId", userId);
        if (walletId) localStorage.setItem("walletId", walletId);

        // Keep existing timestamp or create one if missing
        const existing = localStorage.getItem("connectedSince");
        const ts = existing ? Number(existing) : Date.now();

        if (!existing) {
          localStorage.setItem("connectedSince", String(ts));
        }

        set({
          user,
          isLoggedIn: true,
          connectedSince: ts,
          userId,
          walletId,
        });
      }
    } catch (err) {
      console.error("refreshUser error:", err);
    }
  },
}));
