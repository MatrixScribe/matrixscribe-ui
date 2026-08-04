"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE } from "@/config/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginVerify() {
  const router = useRouter();
  const params = useSearchParams();

  const phone = params.get("phone") || "";

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: phone, pin })
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Incorrect PIN");
        setLoading(false);
        return;
      }

      useAuthStore.getState().setAuth(data.token, data.userId);
      router.push("/dashboard");

    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <div className="relative z-10 px-6 py-20 flex flex-col items-center">
        <img src="/logo-signup.png" className="h-12 opacity-90 mb-6" />
        <h1 className="text-3xl font-semibold tracking-tight">Enter PIN</h1>
        <p className="text-neutral-400 mt-2">PIN for {phone}</p>

        <div className="mt-10 w-full max-w-md rounded-3xl p-8 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
          <input
            type="password"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-center text-2xl tracking-widest"
          />

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading || pin.length !== 4}
            className={`
              w-full mt-6 py-4 rounded-xl text-sm font-semibold transition-all
              ${pin.length !== 4
                ? "bg-white/10 text-neutral-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg active:scale-[0.97]"
              }
            `}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </div>
      </div>
    </main>
  );
}
