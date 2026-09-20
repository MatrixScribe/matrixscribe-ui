"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPinPage() {
  const router = useRouter();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const [identifier, setIdentifier] = useState("");
  const [step, setStep] = useState<"request" | "verify" | "newpin">("request");

  const [otp, setOtp] = useState("");
  const [newPin, setNewPin] = useState("");

  /* -------------------------------------------
     STEP 1 — REQUEST OTP
  ------------------------------------------- */
  const requestOtp = async () => {
    if (!identifier.trim()) {
      alert("Enter your email or phone number");
      return;
    }

    const res = await fetch(`${API_BASE}/api/auth/reset-pin/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    });

    const json = await res.json();
    if (json.success) {
      setStep("verify");
    } else {
      alert(json.error || "Failed to send OTP");
    }
  };

  /* -------------------------------------------
     STEP 2 — VERIFY OTP
  ------------------------------------------- */
  const verifyOtp = async () => {
    const res = await fetch(`${API_BASE}/api/auth/reset-pin/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, otp }),
    });

    const json = await res.json();
    if (json.success) {
      setStep("newpin");
    } else {
      alert(json.error || "Invalid OTP");
    }
  };

  /* -------------------------------------------
     STEP 3 — SET NEW PIN
  ------------------------------------------- */
  const completeReset = async () => {
    if (!/^\d{4}$/.test(newPin)) {
      alert("PIN must be exactly 4 digits");
      return;
    }

    const res = await fetch(`${API_BASE}/api/auth/reset-pin/complete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, newPin }),
    });

    const json = await res.json();
    if (json.success) {
      alert("PIN reset successfully");
      router.push("/login");
    } else {
      alert(json.error || "Failed to reset PIN");
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-99"></canvas>
      </div>

      <div className="relative z-10 px-6 py-12 flex flex-col items-center">
        <img src="/logo-signup.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          <img src="/loginicon.png" className="w-auto h-25 opacity-100" />
        </h1>

        <div className="mt-6 w-full max-w-xl rounded-3xl p-8 bg-ffff shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

          {/* STEP 1 — REQUEST OTP */}
          {step === "request" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Reset PIN</h2>

              <input
                type="text"
                className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white placeholder:text-neutral-400 mb-6"
                placeholder="Enter email or phone number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />

              <button
                onClick={requestOtp}
                className="w-full py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                Send OTP
              </button>
            </>
          )}

          {/* STEP 2 — VERIFY OTP */}
          {step === "verify" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Enter OTP</h2>

              <input
                type="text"
                maxLength={6}
                className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white placeholder:text-neutral-400 mb-6"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={verifyOtp}
                className="w-full py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          {/* STEP 3 — NEW PIN */}
          {step === "newpin" && (
            <>
              <h2 className="text-xl font-semibold mb-6">Set New PIN</h2>

              <input
                type="password"
                maxLength={4}
                className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white placeholder:text-neutral-400 mb-6"
                placeholder="New 4-digit PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />

              <button
                onClick={completeReset}
                className="w-full py-4 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              >
                Reset PIN
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
}
