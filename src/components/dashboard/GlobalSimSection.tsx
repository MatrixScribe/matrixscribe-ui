"use client";

import SIMCard from "@/components/SIMCard";
import { useState } from "react";

export function GlobalSimSection({ flag, cardholderName }: any) {
  const [globalSims, setGlobalSims] = useState<any[]>([]);

  const addGlobalSim = () => {
    if (globalSims.length >= 1) {
      alert("You can only have 1 Global SIM.");
      return;
    }

    const label = prompt("Label this Global SIM:");
    if (!label) return;

    setGlobalSims([
      {
        type: "global",
        phone: "—",
        simCategory: label, // ⭐ label appears on card
        operatorLogo: "/logo3.png",
        operatorName: "Redatacom",
        flag,
        cardholder: cardholderName,
        label,
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* ⭐ Action Buttons Row */}
      <div className="flex gap-3 justify-start">

        {/* Add Global SIM */}
        <button
          onClick={addGlobalSim}
          className="
            px-4 py-2 rounded-xl
            bg-black text-yellow-300 text-sm font-semibold
            hover:bg-gray-900
            transition-all
          "
        >
          + Add Global SIM
        </button>

        {/* Bundles */}
        <button
          onClick={() => alert('Global bundles coming soon')}
          className="
            px-4 py-2 rounded-xl
            bg-black text-yellow-300 text-sm font-semibold
            hover:bg-gray-900
            transition-all
          "
        >
          + Bundles
        </button>

        {/* Usage */}
        <button
          onClick={() => alert('Global usage dashboard coming soon')}
          className="
            px-4 py-2 rounded-xl
            bg-black text-yellow-300 text-sm font-semibold
            hover:bg-gray-900
            transition-all
          "
        >
          Usage
        </button>

        {/* Settings */}
        <button
          onClick={() => alert('Global SIM settings coming soon')}
          className="
            px-4 py-2 rounded-xl
            bg-black text-yellow-300 text-sm font-semibold
            hover:bg-gray-900
            transition-all
          "
        >
          Settings
        </button>

      </div>

      {/* Empty State */}
      {globalSims.length === 0 && (
        <p className="text-neutral-500 text-sm">No Global SIM added yet</p>
      )}

      {/* Render Global SIM Card */}
      <div className="flex flex-col gap-6">
        {globalSims.map((sim, i) => (
          <SIMCard
            key={i}
            {...sim}
            simCategory={sim.label} // ⭐ ensure label renders on card
          />
        ))}
      </div>
    </div>
  );
}
