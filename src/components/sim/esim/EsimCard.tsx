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
  status: EsimStatus;
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
  status,
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

  const statusColor =
    status === "ACTIVE"
      ? "bg-green-500"
      : status === "EXPIRED"
      ? "bg-red-500"
      : "bg-neutral-500";

  return (
    <div className="relative w-full rounded-2xl p-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-400 text-white border border-neutral-600 shadow-lg overflow-hidden">
      {/* Metal */}
      <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />

      {/* Shine */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-2">

        {/* STATUS */}
        <span className={`text-[10px] px-2 py-1 rounded-full ${statusColor} text-white`}>
          {status.replace("_", " ")}
        </span>

        {/* BUNDLE NAME */}
        <p className="text-sm font-semibold">{bundleName}</p>

        {/* COUNTRY */}
        <p className="text-xs opacity-80">
          Country: {countryIso || "Global"}
        </p>

        {/* ICCID */}
        <p className="text-xs opacity-80">ICCID: {iccid}</p>

        {/* MATCHING ID */}
        <p className="text-xs opacity-80">Matching ID: {matchingId}</p>

        {/* SMDP+ */}
        <p className="text-xs opacity-80">SMDP+: {smdpAddress}</p>

        {/* VALIDITY */}
        <p className="text-xs opacity-80">
          Validity: {validityDays} days
        </p>

        {/* EXPIRY */}
        <p className="text-xs opacity-80">
          Expiry: {expiry ? new Date(expiry).toLocaleDateString() : "Unknown"}
        </p>

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
