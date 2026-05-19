"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";

export default function LoginSheet({ open, onClose, onOpenSignup }) {
  const { login } = useAuthStore();
  const { refreshBalance } = useWalletStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleLogin() {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      login(data.user, data.token);
      await refreshBalance();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>

      <div className="space-y-4">
        <input
          className="w-full border border-neutral-300 rounded-xl px-3 py-3 text-sm"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          className="w-full border border-neutral-300 rounded-xl px-3 py-3 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-neutral-900 text-white py-3 rounded-xl font-medium"
        >
          {loading ? "Connecting..." : "Login"}
        </button>

        <button
          onClick={() => {
            onClose();
            onOpenSignup();
          }}
          className="w-full text-neutral-600 text-sm mt-4"
        >
          Create an account
        </button>

        <button
          onClick={onClose}
          className="w-full text-neutral-400 text-xs mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );
}
