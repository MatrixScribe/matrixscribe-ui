"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import Link from "next/link";

export default function Header({ onOpenLogin, onOpenSignup, onOpenProfile }) {
  const { isLoggedIn, logout, user } = useAuthStore();
  const { balance } = useWalletStore();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <header className="py-4 px-4 border-b border-neutral-200 bg-white" />
    );
  }

  return (
    <header className="flex items-center justify-between py-4 px-4 border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600" />
        <span className="text-lg font-semibold tracking-tight">Topup</span>
      </div>

      {!isLoggedIn ? (
        <button
          onClick={onOpenLogin}
          className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-sm font-medium"
        >
          Connect
        </button>
      ) : (
        <div className="flex items-center gap-3">

          {/* USERNAME BUTTON */}
          <button
            onClick={onOpenProfile}
            className="px-4 py-1.5 rounded-full bg-white border border-neutral-300 text-sm font-medium flex items-center gap-2"
          >
            {user.username}
            <span className="text-emerald-600 text-xs font-semibold">● Connected</span>
          </button>

          {/* ⭐ WALLET BALANCE → NOW CLICKABLE */}
          <Link
            href="/wallet"
            className="px-4 py-1.5 rounded-full bg-white border border-neutral-300 text-sm font-medium hover:bg-neutral-100 transition"
          >
            ${balance.toFixed(2)}
          </Link>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-full bg-red-500 text-white text-sm font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
