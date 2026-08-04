"use client";

import { WalletCard } from "./WalletCard";
import { WalletData } from "@/types/wallet";

interface WalletSectionProps {
  wallet: WalletData;
  onTopup: () => void;
  onSelectCurrency: () => void;
  onViewHistory: () => void;   // ⭐ ADD THIS
}

export function WalletSection({
  wallet,
  onTopup,
  onSelectCurrency,
  onViewHistory,
}: WalletSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-neutral-900"></h2>

      <WalletCard
        wallet={wallet}
        onTopup={onTopup}
        onSelectCurrency={onSelectCurrency}
        onViewHistory={onViewHistory}   // ⭐ PASS IT DOWN
      />
    </div>
  );
}
