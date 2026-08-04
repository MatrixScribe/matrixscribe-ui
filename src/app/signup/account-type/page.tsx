"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountType() {
  const router = useRouter();
  const params = useSearchParams();

  const countryName = params.get("country") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const flag = params.get("flag") || "";

  const goNext = (type: string) => {
    router.push(
      `/signup/profile?type=${type}&country=${encodeURIComponent(
        countryName
      )}&flag=${encodeURIComponent(flag)}&phone=${encodeURIComponent(
        phone
      )}&operatorLogo=${encodeURIComponent(operatorLogo)}`
    );
  };

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-40"></canvas>
      </div>

      <div className="relative z-10 px-6 py-16 flex flex-col items-center">

        <img src="/logo3.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Choose Account Type
        </h1>

        <p className="text-neutral-600 mt-2">
          Select how you want to use Redatacom
        </p>

        <div className="mt-10 w-full max-w-xl grid grid-cols-1 gap-6">

          {/* Personal */}
          <div
            onClick={() => goNext("personal")}
            className="
              cursor-pointer rounded-3xl p-6 bg-white/40 backdrop-blur-xl
              border border-black/10 shadow hover:shadow-xl transition
            "
          >
            <h2 className="text-xl font-semibold">Personal</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Recharge for yourself and family
            </p>
          </div>

          {/* Business */}
          <div
            onClick={() => goNext("business")}
            className="
              cursor-pointer rounded-3xl p-6 bg-white/40 backdrop-blur-xl
              border border-black/10 shadow hover:shadow-xl transition
            "
          >
            <h2 className="text-xl font-semibold">Business</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Manage multiple numbers and employees
            </p>
          </div>

          {/* Agent */}
          <div
            onClick={() => goNext("agent")}
            className="
              cursor-pointer rounded-3xl p-6 bg-white/40 backdrop-blur-xl
              border border-black/10 shadow hover:shadow-xl transition
            "
          >
            <h2 className="text-xl font-semibold">Agent / Reseller</h2>
            <p className="text-neutral-600 text-sm mt-1">
              Earn by selling airtime & data
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
