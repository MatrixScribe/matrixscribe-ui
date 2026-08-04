"use client";

import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/store/userStore";

import { LocalSimSection } from "@/components/sim/local/LocalSimSection";
import EsimSection from "@/components/sim/esim/EsimSection";
import ProfileSection from "@/components/profile/ProfileSection";
import WalletPage from "@/components/wallet/WalletPage";
import TopUpSection from "@/components/topup/TopUpSection";
import ParticleBackground from "@/components/ParticleBackground";
import { TopupModal } from "@/components/wallet/TopupModal";

export default function Dashboard() {
  const [countries, setCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const { loading, user, wallet, simCards, loadUser } = useUserStore();
  const [tab, setTab] = useState<"local" | "esim" | "profile" | "wallet" | "topup">("local");
  const [showTopupModal, setShowTopupModal] = useState(false);

  // Load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch("https://redatacom-end.onrender.com/api/countries");
        const data = await res.json();
        if (Array.isArray(data.countries)) {
          setCountries(data.countries);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }
    loadCountries();
  }, []);

  // Load user
  useEffect(() => {
    loadUser();
  }, []);

  // ⭐ Listen for WalletPage → Topup event
useEffect(() => {
  const handler = () => setShowTopupModal(true);
  window.addEventListener("open-topup-modal", handler);
  return () => window.removeEventListener("open-topup-modal", handler);
}, []);


  // SIM card (if exists)
  const sim = simCards?.[0] || null;

  const phone = sim?.msisdn || user?.phone || "";
  const operatorLogo = sim?.network_logo_url || "/generic-sim-grey.png";
  const operatorName = sim?.network || "";
  const flag = sim?.flag_url || user?.country_flag || "";
  const signupDate = sim?.created_at || user?.created_at || "";
  const country = user?.country || "";

  const cardholderName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || phone;

  // Enriched user
  const enrichedUser = useMemo(() => {
    return {
      ...user,
      operator_name: operatorName,
      operator_logo: operatorLogo,
      country_flag: flag,
      signup_date: signupDate,
      primary_phone: phone,
    };
  }, [user, operatorName, operatorLogo, flag, signupDate, phone]);

  if (loading) {
    return <p className="text-black p-10">Loading dashboard...</p>;
  }

  if (!user) {
    return <p className="text-black p-10">Not authenticated</p>;
  }

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* PARTICLE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* HEADER */}
      <div className="relative z-10 px-6 py-6 flex items-center justify-between">
        <img src="/SimCards1.png" className="h-6 w-auto opacity-90" alt="Dashboard Logo" />

        <div className="flex items-center gap-4">
          <p className="font-semibold text-sm text-neutral-800">{cardholderName}</p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="p-2 rounded-lg bg-ffff text-purple-700 hover:bg-red-200 transition flex items-center justify-center"
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v10" />
              <path d="M7.5 4.5a8 8 0 1 0 9 0" />
            </svg>
          </button>
        </div>
      </div>
{/* TABS — MOBILE OPTIMIZED WITH PARTICLES */}
<div className="relative z-10 px-6 mb-3 flex flex-col gap-3">

  {/* PARTICLE LAYER INSIDE TABS */}
  <div className="absolute inset-0 pointer-events-none opacity-50">
    <ParticleBackground />
  </div>

  {/* ROW 1 — PRIMARY TABS */}
  <div className="relative flex items-center gap-2 rounded-2xl px-2 py-2 bg-ffff">

    <button
      onClick={() => setTab("local")}
      className={`
        flex-1 px-5 py-3 rounded-xl transition-all
        ${tab === "local" ? "bg-purple-100 text-purple-700 shadow-md" : "bg-white text-neutral-700"}
      `}
    >
      <img src="/sim-local1.png" className="h-18 w-auto opacity-90 mx-auto" />
    </button>

    <button
      onClick={() => setTab("esim")}
      className={`
        flex-1 px-5 py-3 rounded-xl transition-all
        ${tab === "esim" ? "bg-purple-100 text-purple-700 shadow-md" : "bg-white text-neutral-700"}
      `}
    >
      <img src="/sim-esim1.png" className="h-18 w-auto opacity-90 mx-auto" />
    </button>

  </div>

  {/* ROW 2 — SECONDARY TABS */}
  <div className="relative flex items-center gap-2 rounded-2xl px-1 py-1 bg-ffff">

    <button
      onClick={() => setTab("wallet")}
      className={`
        flex-1 px-4 py-3 rounded-xl transition-all flex items-center justify-center
        ${tab === "wallet" ? "bg-purple-300 text-purple-300 shadow-md" : "bg-ffff text-neutral-700"}
      `}
    >
      <img src="/WalletIcon.png" className="h-12 w-auto opacity-80" />
    </button>

    <button
      onClick={() => setTab("profile")}
      className={`
        flex-1 px-4 py-3 rounded-xl transition-all flex items-center justify-center
        ${tab === "profile" ? "bg-purple-300 text-blue-700 shadow-md" : "bg-ffff text-neutral-700"}
      `}
    >
      <img src="/profile-icon.png" className="h-12 w-auto opacity-80" />
    </button>

    <button
      onClick={() => setTab("topup")}
      className={`
        flex-1 px-4 py-3 rounded-xl transition-all flex items-center justify-center
        ${tab === "topup" ? "bg-orange-400 text-purple-300 shadow-md" : "bg-ffff text-neutral-700"}
      `}
    >
      <img src="/topup-icon.png" className="h-12 w-auto opacity-80" />
    </button>

  </div>
</div>


      {/* CONTENT */}
      <div className="relative z-10 px-6 mt-6 flex flex-col gap-10">

        {tab === "local" && (
          <LocalSimSection
  phone={phone}
  cardholderName={cardholderName}
  simCategory={sim?.type || "Local SIM"}
  operatorLogo={operatorLogo}
  flag={flag}
  country={country}
  signupDate={signupDate}
  simStatus={sim?.simStatus || "active"}
  isActive={sim?.isActive ?? true}
/>
        )}

        {tab === "esim" && (
          <EsimSection
            flag={flag}
            cardholderName={cardholderName}
            isActive={true}
            wallet={wallet}
          />
        )}

        {tab === "profile" && <ProfileSection user={enrichedUser} />}

        {tab === "wallet" && (
  <>
    <WalletPage />

    {showTopupModal && (
      <TopupModal
        preferredCurrency={wallet?.preferred_currency}
        onClose={() => setShowTopupModal(false)}
        onComplete={() => {
          loadUser();        // ⭐ refresh wallet after callback
          setShowTopupModal(false);
        }}
      />
    )}
  </>
)}

      </div>
    </main>
  );
}
