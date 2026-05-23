"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("reference");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/rate?reference=${ref}`);
    }, 4000);
    return () => clearTimeout(timer);
  }, [ref, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center">

        {/* Animated Green Check */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center animate-[popIn_0.5s_ease-out]">
            <span className="text-emerald-600 text-5xl font-bold animate-[pulse_1.5s_infinite]">
              ✓
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-neutral-800">
          Payment Successful
        </h1>

        <p className="text-neutral-500 mt-2">
          Your top‑up is being delivered…
        </p>

        <p className="text-xs text-neutral-400 mt-1">
          Ref: {ref}
        </p>

        <style>{`
          @keyframes popIn {
            0% { transform: scale(0.4); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </main>
  );
}
