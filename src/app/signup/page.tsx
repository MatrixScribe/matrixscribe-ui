"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function WelcomePage() {
  const router = useRouter();
  const params = useSearchParams();

  // REAL onboarding data from previous steps
  const first = params.get("first");
  const last = params.get("last");
  const country = params.get("country");
  const countryCode = params.get("countryCode");
  const dialCode = params.get("dialCode");
  const flag = params.get("flag");
  const phone = params.get("phone");
  const operatorLogo = params.get("operatorLogo");
  const operatorName = params.get("operatorName");
  const operatorId = params.get("operatorId");
  const pin = params.get("pin");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function completeSignup() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobileNumber: phone,
            pin,
            first,
            last,
            country,
            countryCode,
            dialCode,
            operatorId,
            operatorName,
            operatorLogo,
            flag
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Server error");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-neutral-900 mb-6">
        Welcome, {first}
      </h1>

      <p className="text-neutral-700 mb-6">
        You're almost done. Let's activate your Redatacom account.
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        onClick={completeSignup}
        disabled={loading}
        className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold"
      >
        {loading ? "Creating account..." : "Finish Setup"}
      </button>
    </main>
  );
}
