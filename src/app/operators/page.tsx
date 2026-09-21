"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OperatorsDirectory() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b0b0f] text-white">
      <div className="text-center opacity-70">
        <div className="animate-pulse text-lg">Redirecting…</div>
      </div>
    </main>
  );
}
