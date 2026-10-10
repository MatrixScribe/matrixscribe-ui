"use client";

import { useEffect, useState } from "react";
import { EsimCard } from "./EsimCard";
import { QRCodeModal } from "./QRCodeModal";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type MyEsimsProps = {
  cardholderName: string;
  isActive: boolean;
};

type EsimItem = {
  id: string;
  iccid: string;
  matching_id: string;
  smdp_address: string;
  qr_url: string | null;
  plan_name: string;
  country_code: string | null;
  validity_days: number;
  expires_at: string | null;
  activated_at: string | null;
  activation_status: string;
  data_used_mb: number;
  data_allowed_mb: number;
  data_remaining_mb: number;
  ios_install_url: string | null;
  android_install_url: string | null;
};

export default function MyEsims({ cardholderName, isActive }: MyEsimsProps) {
  const [esims, setEsims] = useState<EsimItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string>("");

  useEffect(() => {
    async function loadEsims() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) return;

        const res = await fetch(
          `${API_BASE}/api/esim/esimmerge/users/${userId}/esims`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

      {/* ACTIVE STATUS */}
      {!isActive && (
        <div className="p-4 rounded-xl bg-neutral-100 border text-neutral-700">
          You do not have an active eSIM yet. Purchase one from the eSIM Shop.
        </div>
      )}

      {isActive && (
        <div className="p-4 rounded-xl bg-green-600 text-white shadow-lg">
          Your eSIM is active ✓
        </div>
      )}

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
            qrBase64={e.qr_url}
            bundleName={e.plan_name}
            countryIso={e.country_code}
            validityDays={e.validity_days}
            expiry={e.expires_at}
            activatedAt={e.activated_at}
            status={e.activation_status}
            dataUsed={e.data_used_mb}
            dataAllowed={e.data_allowed_mb}
            dataRemaining={e.data_remaining_mb}
            iosUrl={e.ios_install_url}
            androidUrl={e.android_install_url}
            onShowQR={() => {
              setQrValue(e.qr_url || "");
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
