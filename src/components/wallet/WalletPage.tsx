"use client";

import { useState, useEffect } from "react";
import { WalletSection } from "./WalletSection";
import { PreferredCurrencyModal } from "./PreferredCurrencyModal";
import { WalletHistory } from "./WalletHistory";
import { WalletData } from "@/types/wallet";
import { useUserStore } from "@/store/userStore";   // ⭐ NEW — global wallet loader

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { loadUser } = useUserStore();   // ⭐ load global wallet

  async function loadWallet() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://redatacom-end.onrender.com/api/wallet",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();
    setWallet(json.wallet);
  }

  useEffect(() => {
    loadWallet();
  }, []);

  async function handleSelectCurrency(currency: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://redatacom-end.onrender.com/api/user/preferred-currency",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currency }),
      }
    );

    const json = await res.json();
    if (!json.success) return;

    setShowModal(false);

    // ⭐ CRITICAL FIX — refresh GLOBAL wallet (Dashboard → EsimSection → EsimShop → BundlesModal)
    await loadUser();

    // ⭐ Refresh local wallet (WalletPage UI)
    await loadWallet();
  }

  if (!wallet) {
    return (
      <div className="p-6 text-center text-neutral-600">
        Loading wallet...
      </div>
    );
  }

  return (
    <>
      {/* Wallet View */}
      {!showHistory && (
        <WalletSection
          wallet={wallet}
          onTopup={() => {
  // ⭐ Trigger Dashboard modal via global store
  const event = new CustomEvent("open-topup-modal");
  window.dispatchEvent(event);
}}
          onSelectCurrency={() => setShowModal(true)}
          onViewHistory={() => setShowHistory(true)}
        />
      )}

      {/* History View */}
      {showHistory && (
        <div className="mt-6">
          <button
            onClick={() => setShowHistory(false)}
            className="
              mb-4 px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300
              font-medium
            "
          >
            Back to Wallet
          </button>

          <WalletHistory transactions={[]} />
        </div>
      )}

      {/* Currency Modal */}
      {showModal && (
        <PreferredCurrencyModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelectCurrency}
        />
      )}
    </>
  );
}
