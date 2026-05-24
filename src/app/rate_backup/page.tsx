"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function RatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ref = searchParams.get("reference");

  const [rating, setRating] = useState(0);

  const googleReviewLink = "https://g.page/r/YOUR_GOOGLE_REVIEW_LINK";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <h1 className="text-xl font-semibold text-neutral-800 mb-4">
        Rate Your Experience
      </h1>

      <div className="flex gap-3 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-4xl transition"
          >
            {star <= rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <button
        onClick={() => window.open(googleReviewLink, "_blank")}
        disabled={rating === 0}
        className="
          w-full max-w-xs bg-purple-600 text-white py-3 rounded-xl
          font-semibold shadow hover:bg-purple-700 transition
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Leave a Google Review
      </button>

      <button
        onClick={() => router.push(`/invoice?reference=${ref}`)}
        className="mt-4 text-neutral-500 underline text-sm"
      >
        Skip
      </button>
    </main>
  );
}
