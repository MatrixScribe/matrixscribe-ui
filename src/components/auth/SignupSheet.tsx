"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";

import { useCountrySelector } from "@/hooks/useCountrySelector";
import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";

export default function SignupSheet({ open, onClose }) {
  const { login } = useAuthStore();
  const { refreshBalance } = useWalletStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const {
    isOpen: countryOpen,
    open: openCountrySelector,
    close: closeCountrySelector,
    setCountry: chooseCountry,
    country,
  } = useCountrySelector();

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSignup() {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            country: country?.name || "",
            mobile,
            password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      // Auto-login
      const loginRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: email,
            password,
          }),
        }
      );

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        alert(loginData.error || "Auto-login failed");
        return;
      }

      login(loginData.user, loginData.token);
      await refreshBalance();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CountrySelectorModal
        isOpen={countryOpen}
        onClose={closeCountrySelector}
        onSelect={(c) => chooseCountry(c)}
      />

      <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Create your account</h2>

        <div className="space-y-4">
          <input className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <button
            onClick={openCountrySelector}
            className="w-full border border-neutral-300 rounded-xl px-3 py-3 text-left text-sm bg-neutral-50"
          >
            {country?.name || "Select Country"}
          </button>

          <input className="input" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={handleSignup} disabled={loading} className="w-full bg-neutral-900 text-white py-3 rounded-xl font-medium">
            {loading ? "Creating..." : "Create Account"}
          </button>

          <button onClick={onClose} className="w-full text-neutral-400 text-xs mt-6">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
