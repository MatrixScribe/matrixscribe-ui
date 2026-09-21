"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TopupPageInner() {
  const router = useRouter();

  useEffect(() => {
    // Instant redirect to signup flow
    router.replace("/login");
  }, [router]);

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
      {/* Optional tiny loader */}
      <div className="text-center opacity-70">
        <div className="animate-pulse text-lg">Redirecting…</div>
      </div>
    </main>
  );
}
