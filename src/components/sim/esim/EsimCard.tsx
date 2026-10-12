"use client";

import { useEffect, useRef, useState } from "react";
import { EsimDetailsModal } from "./EsimDetailsModal";

type EsimCardProps = {
  iccid: string;
  matchingId: string;
  smdpAddress: string;
  qrBase64: string | null;

  bundleName: string | null;
  countryIso: string | null;
  validityDays: number | null;

  expiry: string | null;
  activatedAt: string | null;
  status: string;

  dataUsed: number;
  dataAllowed: number;
  dataRemaining: number;

  iosUrl: string | null;
  androidUrl: string | null;

  metadata: any | null;

  onShowQR: () => void;
};

export function EsimCard(props: EsimCardProps) {
  const {
    iccid,
    matchingId,
    smdpAddress,
    qrBase64,
    bundleName,
    countryIso,
    validityDays,
    expiry,
    activatedAt,
    status,
    dataUsed,
    dataAllowed,
    dataRemaining,
    iosUrl,
    androidUrl,
    metadata,
    onShowQR,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  /* Particle background */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.8,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* STATUS */
  const normalizedStatus =
    status === "ACTIVE"
      ? "ACTIVE"
      : status === "EXPIRED"
      ? "EXPIRED"
      : "PENDING ACTIVATION";

  const statusColor =
    normalizedStatus === "ACTIVE"
      ? "bg-green-500"
      : normalizedStatus === "EXPIRED"
      ? "bg-red-500"
      : "bg-neutral-500";

  const expiresInDays = expiry
    ? Math.ceil(
        (new Date(expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const usagePercent =
    dataAllowed > 0 ? Math.round((dataUsed / dataAllowed) * 100) : 0;

  const installBy = metadata?.install_by
    ? new Date(metadata.install_by).toLocaleDateString()
    : null;

  const networks =
    metadata?.plan?.available_networks ||
    metadata?.available_networks ||
    [];

  const activationCode = metadata?.activation_code;

  const iphoneLink = activationCode
    ? `lpa:1$${smdpAddress}$${activationCode}`
    : iosUrl;

  const androidLink = activationCode
    ? `intent://esimactivation/${activationCode}#Intent;scheme=android;end`
    : androidUrl;

  /* COUNTRY FLAG */
  const flagCode =
    countryIso?.toLowerCase() ||
    metadata?.coverage?.[0]?.country_code?.toLowerCase() ||
    null;

  const flagUrl = flagCode
    ? `https://flagcdn.com/${flagCode}.svg`
    : null;

  return (
    <div className="relative w-full rounded-2xl p-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-500 text-white border border-neutral-600 shadow-xl overflow-hidden">

      {/* COUNTRY FLAG */}
      {flagUrl && (
        <img
          src={flagUrl}
          alt={countryIso || "Country"}
          className="absolute top-3 right-3 w-auto h-6 rounded-md border border-white/20 shadow-md"
        />
      )}

      {/* Metal texture */}
      <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />

      {/* Shine */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col gap-4">

        {/* Top row: status + country + validity */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] px-2 py-1 rounded-full ${statusColor} text-white uppercase tracking-wide`}
          >
            {normalizedStatus}
          </span>

          <div className="text-right text-[10px] opacity-80">
            <p>{countryIso || "Global"}</p>
            {validityDays && (
              <p>{validityDays} days validity</p>
            )}
          </div>
        </div>

        {/* Plan name */}
        <div>
          <p className="text-sm font-semibold">
            {bundleName || "Unnamed Plan"}
          </p>
          {expiresInDays !== null && (
            <p className="text-[11px] opacity-80">
              Expires in {expiresInDays} day{expiresInDays === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {/* Core identifiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] opacity-80">
          <p>ICCID: {iccid}</p>
          <p>Matching ID: {matchingId}</p>
          
          {installBy && <p>Install by: {installBy}</p>}
        </div>

        {/* Activation / expiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] opacity-80">
          <p>
            Activated:{" "}
            {activatedAt
              ? new Date(activatedAt).toLocaleString()
              : "Not activated"}
          </p>
          <p>
            Expires:{" "}
            {expiry
              ? new Date(expiry).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>

        {/* Networks */}
        {networks.length > 0 && (
          <p className="text-[11px] opacity-80">
            Networks: {networks.join(", ")}
          </p>
        )}

        {/* Usage bar */}
        <div className="mt-1">
          <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-400 h-full transition-all"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="text-[11px] opacity-80 mt-1">
            Usage: {dataUsed}MB / {dataAllowed}MB ({dataRemaining}MB left)
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-2">
          {/* Install buttons */}
          

          {/* QR button */}
          {qrBase64 && (
            <button
              onClick={onShowQR}
              className="w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
            >
              Show QR Code
            </button>
          )}

          {/* Details button */}
          <button
            onClick={() => setDetailsOpen(true)}
            className="w-full py-2 rounded-xl bg-neutral-700 text-white text-xs font-semibold hover:bg-neutral-600 transition"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Details modal */}
      {detailsOpen && (
        <EsimDetailsModal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          metadata={metadata}
        />
      )}
    </div>
  );
}
