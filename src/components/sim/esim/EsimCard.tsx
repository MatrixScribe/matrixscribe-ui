"use client";

import { useEffect, useRef } from "react";

type EsimStatus = "PENDING_ACTIVATION" | "ACTIVE" | "EXPIRED";

type EsimCardProps = {
  iccid: string;
  matchingId: string;
  smdpAddress: string;
  qrBase64: string | null;
  bundleName: string;
  countryIso: string | null;
  validityDays: number;
  expiry: string | null;
  activatedAt: string | null;
  status: string;
  dataUsed: number;
  dataAllowed: number;
  dataRemaining: number;
  iosUrl: string | null;
  androidUrl: string | null;
  onShowQR: () => void;
};

export function EsimCard({
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
  onShowQR,
}: EsimCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  return (
    <div className="relative w-full rounded-2xl p-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-400 text-white border border-neutral-600 shadow-lg overflow-hidden">
      {/* Metal */}
      <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />

      {/* Shine */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">

        {/* STATUS */}
        <span className={`text-[10px] px-2 py-1 rounded-full ${statusColor} text-white`}>
          {normalizedStatus}
        </span>

        {/* PLAN BADGE */}
        <p className="text-sm font-semibold">{bundleName}</p>

        {/* COUNTRY FLAG */}
        <p className="text-xs opacity-80">
          Country: {countryIso || "Global"}
        </p>

        {/* ICCID */}
        <p className="text-xs opacity-80">ICCID: {iccid}</p>

        {/* MATCHING ID */}
        <p className="text-xs opacity-80">Matching ID: {matchingId}</p>

        {/* SMDP+ */}
        <p className="text-xs opacity-80">SMDP+: {smdpAddress}</p>

        {/* ACTIVATED ON */}
        <p className="text-xs opacity-80">
          Activated: {activatedAt ? new Date(activatedAt).toLocaleString() : "Not activated"}
        </p>

        {/* EXPIRY */}
        <p className="text-xs opacity-80">
          Expires: {expiry ? new Date(expiry).toLocaleDateString() : "Unknown"}
        </p>

        {/* EXPIRES IN */}
        {expiresInDays !== null && (
          <p className="text-xs opacity-80">
            Expires in: {expiresInDays} days
          </p>
        )}

        {/* USAGE BAR */}
        <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-purple-500 h-full"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
        <p className="text-xs opacity-80">
          Usage: {dataUsed}MB / {dataAllowed}MB ({dataRemaining}MB left)
        </p>

        {/* INSTALL BUTTONS */}
        {iosUrl && (
          <a
            href={iosUrl}
            target="_blank"
            className="w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition text-center"
          >
            Install on iPhone
          </a>
        )}

        {androidUrl && (
          <a
            href={androidUrl}
            target="_blank"
            className="w-full py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition text-center"
          >
            Install on Android
          </a>
        )}

        {/* QR BUTTON */}
        {qrBase64 && (
          <button
            onClick={onShowQR}
            className="w-full py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
          >
            Show QR Code
          </button>
        )}
      </div>
    </div>
  );
}
