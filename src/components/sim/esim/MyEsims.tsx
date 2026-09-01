"use client";

import { useEffect, useState } from "react";
import { EsimCard } from "./EsimCard";
import { QRCodeModal } from "./QRCodeModal";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type MyEsimsProps = {
  cardholderName: string;
};

type EsimItem = {
  id: string;
  iccid: string;
  matching_id: string;
  smdp_address: string;
  qr_base64: string | null;
  bundle_name: string;
  country_iso: string | null;
  validity_days: number;
  expiry: string | null;
  status: "PENDING_ACTIVATION" | "ACTIVE" | "EXPIRED";
};

export default function MyEsims({ cardholderName }: MyEsimsProps) {
  const [esims, setEsims] = useState<EsimItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string>("");

  useEffect(() => {
    async function loadEsims() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_BASE}/api/esim/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await res.json();
        setEsims(json.esims || []);
      } catch (err) {
        console.error("Failed to load eSIMs", err);
      } finally {
        setLoading(false);
      }
    }

    loadEsims();
  }, []);

  return (
    <div className="flex flex-col gap-8">

      {/* HEADER CARD */}
      <div className="
        relative w-full rounded-3xl p-6 shadow-2xl
        bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-300
        text-white border border-neutral-600 overflow-hidden
      ">
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shine-effect" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute top-16 left-6 text-2xl font-extrabold tracking-widest opacity-20">
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
          <img src="/icon-esimp.png" className="h-10 opacity-80" />
        </div>
      </div>

      {/* EMPTY / LOADING */}
      {loading && <p className="text-xs text-neutral-500">Loading your eSIMs...</p>}
      {!loading && esims.length === 0 && (
        <p className="text-xs text-neutral-500">
          You don’t have any eSIMs yet. Purchase one from the eSIM Shop.
        </p>
      )}

      {/* ESIM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {esims.map((e) => (
          <EsimCard
            key={e.id}
            iccid={e.iccid}
            matchingId={e.matching_id}
            smdpAddress={e.smdp_address}
            qrBase64={e.qr_base64}
            bundleName={e.bundle_name}
            countryIso={e.country_iso}
            validityDays={e.validity_days}
            expiry={e.expiry}
            status={e.status}
            onShowQR={() => {
              setQrValue(e.qr_base64 || "");
              setQrOpen(true);
            }}
          />
        ))}
      </div>

      {/* QR MODAL */}
      {qrOpen && (
        <QRCodeModal
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          qrBase64={qrValue}
        />
      )}
    </div>
  );
}
