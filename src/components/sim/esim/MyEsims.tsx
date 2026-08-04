"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type MyEsimsProps = {
  cardholderName: string;
  isActive: boolean;
};

type EsimItem = {
  id: string;
  label: string | null;
  country_iso: string | null;
  flag: string | null;
  bundle_id: string | null;
  activation_code: string | null;
  smdp_address: string | null;
  qr_code: string | null;
  usage_used: number;
  usage_total: number | null;
  expiry: string | null;
  device_confirmed: boolean;
  status: string;
};

export default function MyEsims({ cardholderName }: MyEsimsProps) {
  const [esims, setEsims] = useState<EsimItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string>("");

  // ------------------------------------------------------------
  // LOAD USER ESIMS
  // ------------------------------------------------------------
  useEffect(() => {
    async function loadEsims() {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          setEsims([]);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/api/esims/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setEsims(json.esims || []);
      } catch (err) {
        console.error("Failed to load user eSIMs", err);
        setEsims([]);
      } finally {
        setLoading(false);
      }
    }

    loadEsims();
  }, []);

  // ------------------------------------------------------------
  // HELPERS
  // ------------------------------------------------------------
  function formatExpiry(expiry: string | null) {
    if (!expiry) return "Unknown";
    return new Date(expiry).toLocaleDateString();
  }

  function formatUsage(used: number, total: number | null) {
    if (!total) return "Usage not available";
    return `${used}GB / ${total}GB`;
  }

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <div className="flex flex-col gap-8">

      {/* HEADER CARD */}
      <div
        className="
          relative w-full rounded-3xl p-6 shadow-2xl
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-300
          text-white border border-neutral-600
          overflow-hidden
        "
      >
        {/* Brushed Metal */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-30 mix-blend-overlay" />

        {/* Shine */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        {/* Embossed Label */}
        <div className="absolute top-16 left-6 text-2xl font-extrabold tracking-widest opacity-20 select-none">
          MY ESIMS
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-70">
              Redatacom Inventory
            </p>
            <p className="text-lg font-semibold">
              Active & Saved eSIMs for {cardholderName}
            </p>
          </div>

          <img src="/icon-esimp.png" className="h-10 w-auto opacity-80" />
        </div>
      </div>

      {/* EMPTY / LOADING */}
      {loading && (
        <p className="text-xs text-neutral-500">Loading your eSIMs...</p>
      )}

      {!loading && esims.length === 0 && (
        <p className="text-xs text-neutral-500">
          You don’t have any eSIMs yet. Purchase one from the eSIM Shop.
        </p>
      )}

      {/* ESIM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {esims.map((e) => (
          <div
            key={e.id}
            className="
              relative rounded-2xl p-4 bg-gradient-to-br
              from-neutral-900 via-neutral-800 to-purple-400
              text-white border border-neutral-600 shadow-lg overflow-hidden
            "
          >
            {/* Metal */}
            <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />

            {/* Shine */}
            <div className="absolute inset-0 pointer-events-none shine-effect" />

            <div className="relative z-10 flex flex-col gap-2">

              {/* STATUS */}
              <div className="flex items-center justify-between">
                <span
                  className={`
                    text-[10px] px-2 py-1 rounded-full
                    ${
                      e.status === "active"
                        ? "bg-green-500 text-white"
                        : e.status === "expired"
                        ? "bg-red-500 text-white"
                        : "bg-neutral-500 text-white"
                    }
                  `}
                >
                  {e.status.toUpperCase()}
                </span>

                {e.flag && (
                  <img
                    src={e.flag}
                    className="h-5 w-8 rounded-md border border-white/30"
                  />
                )}
              </div>

              {/* LABEL */}
              <p className="text-sm font-semibold">
                {e.label || "Unnamed eSIM"}
              </p>

              {/* COUNTRY */}
              <p className="text-xs opacity-80">
                Country: {e.country_iso || "Global / Multi‑Region"}
              </p>

              {/* USAGE */}
              <p className="text-xs opacity-80 mt-1">
                Usage: {formatUsage(e.usage_used, e.usage_total)}
              </p>

              {/* EXPIRY */}
              <p className="text-xs opacity-80">
                Expiry: {formatExpiry(e.expiry)}
              </p>

              {/* DEVICE CONFIRMATION */}
              {e.device_confirmed && (
                <p className="text-[10px] text-green-300 mt-1">
                  ✓ Device confirmed
                </p>
              )}

              {/* ACTIONS */}
              <div className="mt-3 flex flex-col gap-2">

                {/* QR CODE */}
                {e.qr_code && (
                  <button
                    onClick={() => {
                      setQrValue(e.qr_code || "");
                      setQrOpen(true);
                    }}
                    className="
                      w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold
                      hover:bg-purple-700 transition
                    "
                  >
                    Show QR Code
                  </button>
                )}

                {/* RENEW */}
                <button
                  className="
                    w-full py-2 rounded-xl bg-white text-purple-700 text-xs font-semibold
                    hover:bg-purple-100 transition
                  "
                  onClick={() => alert("Renew / Top‑Up flow coming soon")}
                >
                  Renew / Top‑Up
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR MODAL */}
      {qrOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">eSIM QR Code</h2>

            <p className="text-xs text-neutral-600 mb-4 break-all">
              {qrValue || "No QR data"}
            </p>

            <button
              onClick={() => setQrOpen(false)}
              className="mt-2 w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
