"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { API_BASE } from "@/config/api";

export default function WelcomePage() {
  const router = useRouter();
  const params = useSearchParams();

  // Incoming data
  const first = params.get("first") || "";
  const last = params.get("last") || "";
  const email = params.get("email") || "";
  const country = params.get("country") || "";
  const countryCode = params.get("countryCode") || "";
  const dialCode = params.get("dialCode") || "";
  const flag = params.get("flag") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const operatorName = params.get("operatorName") || "";
  const operatorId = params.get("operatorId") || "";
  const pin = params.get("pin") || "";

  // Mask PIN (show last two digits)
  const maskedPin = `**${pin.slice(2)}`;

  useEffect(() => {
    const root = document.getElementById("welcome-root");
    if (root) setTimeout(() => root.classList.remove("opacity-0"), 50);
  }, []);

  const completeSignup = async () => {
    const res = await fetch(`${API_BASE}/api/auth/signup/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        pin,
        country,
        countryCode,
        dialCode,
        flag,
        operatorId,
        operatorName,
        operatorLogo,
        firstName: first,
        lastName: last,
        email,
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        stateOrProvince: ""
      })
    });

    const data = await res.json();

    if (data.success) {
      useAuthStore.getState().setAuth(data.token, data.userId);
      router.push("/dashboard");
      return;
    }

    // Handle duplicate email
    if (data.error === "Email already registered. Please log in instead.") {
      alert("This email is already registered. Please log in.");
      router.push("/login");
      return;
    }

    console.error("Signup failed:", data);
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-100"></canvas>
      </div>

      <div
        id="welcome-root"
        className="relative z-10 px-6 py-20 flex flex-col items-center opacity-0 transition-opacity duration-700"
      >
        <img src="/logo3.png" className="h-14 opacity-90 mb-10" />

        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome, {first}</h1>
          <p className="text-neutral-400 mt-3 text-lg">
            Your Redatacom account is ready
          </p>
        </div>

        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 shadow-xl flex flex-col items-center gap-4">
          {operatorLogo && (
            <img src={operatorLogo} className="h-12 w-auto object-contain drop-shadow-md" />
          )}

          {flag && (
            <img src={flag} className="h-10 w-auto object-contain drop-shadow-md rounded-md" />
          )}

          <p className="text-neutral-300 text-sm">
            {dialCode} {phone} • {country}
          </p>

          <p className="text-neutral-400 text-sm">Operator: {operatorName}</p>

          <p className="text-neutral-500 text-sm">PIN: {maskedPin}</p>
        </div>

        <button
          onClick={completeSignup}
          className="mt-12 px-10 py-4 rounded-2xl bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-[0.97]"
        >
          Continue to Dashboard
        </button>
      </div>
    </main>
  );
}
