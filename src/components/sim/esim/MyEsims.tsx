"use client";

import { useEffect, useState } from "react";
import { EsimCard } from "./EsimCard";
import { QRCodeModal } from "./QRCodeModal";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

type EsimMetadata = {
  id: string;
  order_id: string;
  request_id: string;
  iccid: string;
  status: string;
  expired: boolean;
  activated_at: string | null;
  expires_at: string | null;
  install_by: string | null;
  smdp_address: string | null;
  activation_code: string | null;
  qr_code: string | null;
  ios_install_url: string | null;
  android_install_url: string | null;
  tracking_supported: boolean;
  tracking_unsupported_reason: string | null;
  plan: {
    id: string;
    name: string;
    data_mb: number;
    validity_days: number;
    available_networks: string[];
  };
  usage: {
    data_used_mb: number;
    data_allowed_mb: number;
    data_remaining_mb: number;
  } | null;
  events: {
    status: string;
    occurred_at: string;
    iccid: string;
    eid: string | null;
  }[];
  locations: {
    operator: string;
    network: string;
    country: string;
    country_code: string;
    occurred_at: string;
  }[];
  coverage: {
    country_code: string;
    country_name: string;
    networks: string[];
  }[];
  coverage_count: number;
  device: {
    eid: string | null;
    euicc_manufacturer: string | null;
    device_hint: string | null;
    device_model: string | null;
    note: string | null;
  } | null;
};

type EsimItem = {
  id: string;
  user_id: string;
  plan_id: string | null;
  plan_name: string | null;
  country_code: string | null;
  validity_days: number | null;
  price_usd: string;
  amount_zar: string | null;
  iccid: string;
  smdp_address: string;
  matching_id: string;
  qr_url: string | null;
  activation_status: string;
  activated_at: string | null;
  expires_at: string | null;
  data_used_mb: number | null;
  data_allowed_mb: number | null;
  data_remaining_mb: number | null;
  ios_install_url: string | null;
  android_install_url: string | null;
  metadata: EsimMetadata | null;
};

type MyEsimsProps = {
  cardholderName: string;
  isActive: boolean;
  userId: string | number;
  token: string;
};

export default function MyEsims({
  cardholderName,
  isActive,
  userId,
  token,
}: MyEsimsProps) {
  console.log("🔵 MyEsims mounted with:", { userId, token });

  const [esims, setEsims] = useState<EsimItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState<string>("");

  useEffect(() => {
    async function loadEsims() {
      console.log("🔵 loadEsims() fired");

      try {
        setLoading(true);

        if (!token || !userId) {
          console.warn("⚠️ Missing token/userId — cannot fetch eSIMs");
          return;
        }

        const url = `${API_BASE}/api/esim/esimmerge/users/${userId}/esims`;
        console.log("🌍 Fetching real eSIMs from:", url);

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📥 Raw response:", res);

        const json = await res.json();
        console.log("📦 Parsed JSON:", json);

        const list = json.esims || [];
        console.log("📌 Final eSIM list:", list);

        setEsims(list);
      } catch (err) {
        console.error("❌ Failed to load eSIMs", err);
      } finally {
        console.log("⏹ Finished loading eSIMs");
        setLoading(false);
      }
    }

    loadEsims();
  }, [userId, token]);

  console.log("🟣 Rendering MyEsims — esims length:", esims.length);

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER CARD */}
      <div
        className="
        relative w-full rounded-3xl p-6 shadow-2xl
        bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-300
        text-white border border-neutral-600 overflow-hidden
      "
      >
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
          All Active eSims are listed Below
        </div>
      )}

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
        {esims.map((e) => {
          console.log("🟢 Rendering EsimCard for:", e.iccid);

          return (
            <EsimCard
              key={e.id}
              iccid={e.iccid}
              matchingId={e.matching_id}
              smdpAddress={e.smdp_address}
              qrBase64={e.qr_url || e.metadata?.qr_code ?? null}
              bundleName={e.plan_name || e.metadata?.plan?.name}
              countryIso={
                e.country_code || e.metadata?.coverage?.[0]?.country_code
              }
              validityDays={
                e.validity_days || e.metadata?.plan?.validity_days
              }
              expiry={e.expires_at || e.metadata?.expires_at}
              activatedAt={e.activated_at || e.metadata?.activated_at}
              status={e.activation_status || e.metadata?.status}
              dataUsed={
                e.data_used_mb ??
                e.metadata?.usage?.data_used_mb ??
                0
              }
              dataAllowed={
                e.data_allowed_mb ??
                e.metadata?.usage?.data_allowed_mb ??
                0
              }
              dataRemaining={
                e.data_remaining_mb ??
                e.metadata?.usage?.data_remaining_mb ??
                0
              }
              iosUrl={e.ios_install_url || e.metadata?.ios_install_url}
              androidUrl={
                e.android_install_url || e.metadata?.android_install_url
              }
              metadata={e.metadata}
              onShowQR={() => {
  console.log("🔵 Opening QR modal for:", e.iccid);

  const rawQR = e.qr_url || e.metadata?.qr_code || "";

  // If it's a URL, use it directly
  const normalizedQR =
    rawQR.startsWith("http")
      ? rawQR
      : `data:image/png;base64,${rawQR}`;

  setQrValue(normalizedQR);
  setQrOpen(true);
}}
            />
          );
        })}
      </div>

      {/* QR MODAL */}
      {qrOpen && (
        <QRCodeModal
          open={qrOpen}
          onClose={() => {
            console.log("🔵 Closing QR modal");
            setQrOpen(false);
          }}
          qrBase64={qrValue}
        />
      )}
    </div>
  );
}
