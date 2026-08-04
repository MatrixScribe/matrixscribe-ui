"use client";

import { useState, useRef, useEffect } from "react";

import { LocalSimCard } from "./LocalSimCard";
import { DashboardAutoDetect } from "@/components/DashboardAutoDetect";
import { DashboardTopupProducts } from "@/components/DashboardTopupProducts";

import { AddLocalSimModal } from "./AddLocalSimModal";
import { EditLocalSimModal } from "./EditLocalSimModal";
import { DeleteLocalSimModal } from "./DeleteLocalSimModal";

export function LocalSimSection({
  phone,
  cardholderName,
  simCategory,
  operatorLogo,
  flag,
  country,
  signupDate,
  simStatus,
  isActive, // ⭐ passed from Dashboard
}) {
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  /* ------------------------------------------------------------
     LOAD COUNTRIES (for modal)
  ------------------------------------------------------------ */
  const [countries, setCountries] = useState<any[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
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
  }, [API_BASE]);

  /* ------------------------------------------------------------
     PRIMARY SIM SEED
  ------------------------------------------------------------ */
  const [localSims, setLocalSims] = useState<any[]>([
    {
      id: "primary",
      phone,
      simCategory,
      operatorLogo,
      flag,
      signupDate,
      country,
      cardholderName,
      simStatus,
      isPrimary: true,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* ------------------------------------------------------------
     MODALS
  ------------------------------------------------------------ */
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSim, setEditingSim] = useState<any | null>(null);
  const [deletingSim, setDeletingSim] = useState<any | null>(null);

  /* ------------------------------------------------------------
     TOPUP FLOW
  ------------------------------------------------------------ */
  const [selectedOperator, setSelectedOperator] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  /* ------------------------------------------------------------
     SWIPE ENGINE
  ------------------------------------------------------------ */
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const cardWidth = container.clientWidth * 0.85;
    const gap = 16;
    const offset =
      index * (cardWidth + gap) - (container.clientWidth - cardWidth) / 2;

    container.scrollTo({ left: offset, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    const cardWidth = container.clientWidth * 0.85;
    const gap = 16;
    const total = cardWidth + gap;

    const index = Math.round(container.scrollLeft / total);
    setCurrentIndex(index);
  };

  /* ------------------------------------------------------------
     ADD SIM
  ------------------------------------------------------------ */
  const handleAddLocalSim = (sim: any) => {
    const newSim = {
      ...sim,
      id: `sim-${Date.now()}`,
      isPrimary: false,
    };

    setLocalSims((prev) => [...prev, newSim]);
    setShowAddModal(false);

    setTimeout(() => {
      scrollToIndex(localSims.length);
    }, 50);
  };

  /* ------------------------------------------------------------
     EDIT SIM
  ------------------------------------------------------------ */
  const handleEditLocalSim = (updated: any) => {
    setLocalSims((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
    );
    setEditingSim(null);
  };

  /* ------------------------------------------------------------
     DELETE SIM
  ------------------------------------------------------------ */
  const handleDeleteLocalSim = () => {
    if (!deletingSim) return;
    if (deletingSim.isPrimary) {
      setDeletingSim(null);
      return;
    }

    setLocalSims((prev) => prev.filter((s) => s.id !== deletingSim.id));
    setDeletingSim(null);
    setCurrentIndex(0);
  };

  const currentSim = localSims[currentIndex] || localSims[0];

  /* ------------------------------------------------------------
     RENDER
  ------------------------------------------------------------ */
  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Local SIMs</h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-ffff text-purple-700 font-semibold hover:bg-white transition"
        >
          + Add Local SIM
        </button>
      </div>

      {/* SWIPEABLE SIM CARDS */}
      <div
        ref={scrollRef}
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory
          scrollbar-hide py-2
        "
        onScroll={handleScroll}
      >
        {localSims.map((sim, i) => (
          <div key={sim.id || i} className="shrink-0 snap-center w-[85%] mx-auto">
            <LocalSimCard
              phone={sim.phone}
              cardholder={sim.cardholderName}
              simCategory={sim.simCategory}
              operatorLogo={sim.operatorLogo}
              flag={sim.flag}
              signupDate={sim.signupDate}
              simStatus={sim.simStatus}
              onTopUp={() => {
                const el = document.getElementById("dashboard-autodetect");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* ACTIONS */}
            <div className="mt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => setEditingSim(sim)}
                className="px-3 py-1 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                Edit
              </button>

              <button
                disabled={sim.isPrimary}
                onClick={() => !sim.isPrimary && setDeletingSim(sim)}
                className={`
                  px-3 py-1 rounded-full
                  ${
                    sim.isPrimary
                      ? "bg-purple-600 text-white cursor-not-allowed"
                      : "bg-red-600/80 text-white hover:bg-red-600"
                  }
                `}
              >
                {sim.isPrimary ? "Primary SIM" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION DOTS */}
      {localSims.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {localSims.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`
                w-2 h-2 rounded-full
                ${i === currentIndex ? "bg-purple-600" : "bg-neutral-300"}
              `}
            />
          ))}
        </div>
      )}

      {/* AUTO-DETECT — ONLY RUN IF TAB ACTIVE + VALID MSISDN */}
      {isActive &&
        currentSim &&
        currentSim.phone &&
        currentSim.phone.length >= 10 && (
          <div id="dashboard-autodetect">
            <DashboardAutoDetect
              countryName={currentSim.country}
              flag={currentSim.flag}
              phone={currentSim.phone}
              onSelectOperator={(op) => {
                setSelectedOperator(op);
                setSelectedProduct(null);
              }}
            />
          </div>
        )}

      {/* PRODUCTS */}
      {isActive && selectedOperator && (
        <DashboardTopupProducts
          operatorId={selectedOperator.operatorId}
          operatorName={selectedOperator.name}
          onSelectProduct={(prod) => setSelectedProduct(prod)}
        />
      )}

      {/* ADD SIM MODAL */}
      <AddLocalSimModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddLocalSim}
        countries={countries}
      />

      {/* EDIT SIM MODAL */}
      {editingSim && (
        <EditLocalSimModal
          open={!!editingSim}
          onClose={() => setEditingSim(null)}
          sim={editingSim}
          countries={countries}
          onSave={handleEditLocalSim}
        />
      )}

      {/* DELETE SIM MODAL */}
      {deletingSim && (
        <DeleteLocalSimModal
          open={!!deletingSim}
          onClose={() => setDeletingSim(null)}
          onConfirm={handleDeleteLocalSim}
          isPrimary={!!deletingSim.isPrimary}
        />
      )}
    </div>
  );
}
