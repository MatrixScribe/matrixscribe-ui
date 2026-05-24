"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("reference");

  const [seconds, setSeconds] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push(`/rate?reference=${ref}`);
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [ref, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center">

        {/* Success Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-28 w-28 rounded-full bg-emerald-100 flex items-center justify-center animate-[popIn_0.5s_ease-out] shadow-md">
            <span className="text-emerald-600 text-6xl font-bold animate-[pulse_1.5s_infinite]">
              ✓
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-neutral-900">
          Payment Successful
        </h1>

        <p className="text-neutral-500 mt-3 text-base">
          Your top‑up is being delivered.
        </p>

        <p className="text-neutral-400 mt-1 text-sm">
          Redirecting to ratings in <span className="font-semibold">{seconds}</span> seconds
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push(`/rate?reference=${ref}`)}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
          >
            Go to Ratings Now
          </button>

          <button
            onClick={() => router.push(`/invoice?reference=${ref}`)}
            className="w-full text-neutral-500 underline text-sm"
          >
            Skip & View Invoice
          </button>
        </div>
      </div>
    </main>
  );
}
