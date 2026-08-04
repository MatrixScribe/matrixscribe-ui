"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalletCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    async function verify() {
      const reference = searchParams.get("reference");
      if (!reference) {
        setStatus("error");
        return;
      }

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://redatacom-end.onrender.com/api/wallet/topup/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reference }),
        }
      );

      const json = await res.json();

      if (json.success) {
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setStatus("error");
      }
    }

    verify();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      {status === "loading" && (
        <p className="text-neutral-700 text-lg">Verifying payment…</p>
      )}
      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">
          Wallet topped up successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-lg font-semibold">
          Payment verification failed.
        </p>
      )}
    </main>
  );
}
