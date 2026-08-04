"use client";

import { useEffect, useRef, useState } from "react";

type EsimStatus =
  | "blank"
  | "activating"
  | "labelled"
  | "bundled"
  | "pending_payment"
  | "activating_esim"
  | "active"
  | "expired";

type EsimCardProps = {
  label: string;
  cardholder: string;
  bundle: any;
  flag: string | null;
  status: EsimStatus;
  usage?: { used: number; total: number } | null;
  expiry?: string | null;
  deviceConfirmed: boolean;
  onActivate: () => void;
  onSetLabel: (newLabel: string) => void;
  onBuyData: () => void;
  onPay: () => void;
  onEditLabel: () => void;
  onDelete: () => void;
  onShowQR: () => void;
  onRenew: () => void;
  onRequestDeviceConfirm: () => void; // ⭐ NEW
};

export function EsimCard({
  label,
  cardholder,
  bundle,
  flag,
  status,
  usage,
  expiry,
  deviceConfirmed,
  onActivate,
  onSetLabel,
  onBuyData,
  onPay,
  onEditLabel,
  onDelete,
  onShowQR,
  onRenew,
  onRequestDeviceConfirm,
}: EsimCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [localLabel, setLocalLabel] = useState(label);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => setLocalLabel(label), [label]);

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

  const canSaveLabel = localLabel.trim().length > 0;

  return (
    <div className="relative w-[85%] shrink-0 snap-center mx-auto">
      {status === "active" && (
        <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full z-20">
          ACTIVE
        </div>
      )}

      {status === "expired" && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full z-20">
          EXPIRED
        </div>
      )}

      <button
        onClick={onDelete}
        className="absolute top-3 right-3 z-20 bg-black text-red-400 text-xs px-2 py-1 rounded-full"
      >
        Delete
      </button>

      <div
        className={`
          relative p-6 rounded-2xl overflow-hidden
          text-white border border-purple-400/40 backdrop-blur-xl
          shadow-[0_0_25px_rgba(168,85,247,0.45)]
          transition-all duration-500
          ${deviceConfirmed ? "scale-[1.02]" : "scale-100 opacity-95"}
        `}
        style={{
          background: `linear-gradient(135deg, #7c3aed, #4c1d95)`,
          clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <img src="/logo-esimp.png" className="w-auto h-10 opacity-95" />
          </div>

          <div className="flex items-center justify-between mb-3">
            {flag ? (
              <img
                src={flag}
                className="h-auto w-16 rounded-md border border-white/20"
              />
            ) : (
              <div className="w-16 h-10 rounded-md border border-white/10 opacity-20" />
            )}

            <img
              src="/icon-esimp.png"
              className="h-auto w-16 object-contain rounded-md"
            />
          </div>

          <div className="mt-1 flex items-center gap-2">
            <p className="text-lg font-semibold opacity-100">
              {label || "New eSIM"}
            </p>

            {status !== "blank" && status !== "activating" && (
              <button
                onClick={onEditLabel}
                className="text-xs text-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
            )}
          </div>

          <div className="mt-2">
            <p className="text-[9px] opacity-40">eSIM</p>
            <p className="text-xs font-semibold tracking-wide">{cardholder}</p>
          </div>

          <div className="flex justify-end mt-3 relative">
            <div
              className={`absolute -top-3 right-6 h-2 w-2 rounded-full ${
                status === "active"
                  ? "bg-green-400 animate-pulse"
                  : "bg-red-500 animate-pulse"
              }`}
            ></div>

            <img src="/chip-gold.png" className="h-auto w-16 opacity-100" />
          </div>

          {status === "activating" && (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/20">
              <p className="text-[11px] opacity-80 mb-1">Give your eSIM a name</p>
              <input
                value={localLabel}
                onChange={(e) => setLocalLabel(e.target.value)}
                placeholder="Home | Travel | Work"
                className="w-full px-3 py-2 rounded-xl text-yellow-400"
              />
              <button
                onClick={() => {
                  if (!canSaveLabel) return;
                  onSetLabel(localLabel.trim());
                }}
                disabled={!canSaveLabel}
                className={`
                  mt-2 w-full py-2 rounded-xl text-sm font-semibold
                  ${
                    canSaveLabel
                      ? "bg-white text-purple-700"
                      : "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                  }
                `}
              >
                Save
              </button>
            </div>
          )}

          {bundle && (
            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80 font-semibold">
                  {bundle.type === "unlimited"
                    ? `Unlimited • ${bundle.validityDays} Days`
                    : `${bundle.dataGb}GB • ${bundle.validityDays} Days`}
                </p>

                {bundle.isVirtual && (
                  <span className="text-[10px] px-2 py-1 rounded-full bg-purple-600 text-white">
                    Smart Bundle
                  </span>
                )}
              </div>

              <p className="text-[10px] opacity-70 mt-1">
                {bundle.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] opacity-70">Your Price:</p>
                <p className="text-sm font-bold text-yellow-300">
                  ${bundle.finalPrice}
                </p>
              </div>

              {deviceConfirmed && (
                <div className="mt-2 flex items-center gap-1 text-green-300 text-[11px] animate-fadeIn">
                  <span className="text-green-400">✓</span>
                  <span>Device confirmed</span>

                  <span
                    className="ml-1 text-white/70 cursor-pointer text-[12px]"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                  >
                    ⓘ
                  </span>

                  {showTooltip && (
                    <div className="absolute mt-6 ml-4 p-2 rounded-lg bg-black/80 text-white text-[10px] w-40 shadow-lg z-50">
                      You confirmed your device supports eSIM installation.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {status === "active" && (
            <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
              <p className="text-xs opacity-80 font-semibold">Usage</p>
              <p className="text-[11px] opacity-70">
                {usage
                  ? `${usage.used}GB / ${usage.total}GB`
                  : "Usage not available"}
              </p>

              <p className="text-xs opacity-80 font-semibold mt-2">Expiry</p>
              <p className="text-[11px] opacity-70">
                {expiry || "Unknown"}
              </p>
            </div>
          )}

          {status === "bundled" && !deviceConfirmed && (
            <div className="mt-4 p-3 rounded-xl bg-yellow-500/20 border border-yellow-400 text-yellow-200 text-xs animate-fadeIn">
              <p className="font-semibold">Confirm Device Compatibility</p>
              <p className="opacity-80">
                Please confirm your device supports eSIM before continuing.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {status === "blank" && (
          <button
            onClick={onActivate}
            className="w-full py-2 rounded-xl bg-white text-purple-700 font-semibold"
          >
            Activate
          </button>
        )}

        {status === "labelled" && !bundle && (
          <button
            onClick={onBuyData}
            className="w-full py-2 rounded-xl bg-white text-purple-700 font-semibold"
          >
            Buy Data
          </button>
        )}

        {status === "bundled" && !deviceConfirmed && (
          <button
            onClick={onRequestDeviceConfirm}
            className="w-full py-2 rounded-xl bg-yellow-400 text-purple-900 font-semibold"
          >
            Confirm device compatibility
          </button>
        )}

        {status === "bundled" && deviceConfirmed && (
          <button
            onClick={onPay}
            className="w-full py-2 rounded-xl font-semibold transition-all duration-300 bg-yellow-400 text-purple-900 hover:bg-yellow-300 scale-[1.02]"
          >
            Pay
          </button>
        )}

        {status === "active" && (
          <>
            <button
              onClick={onShowQR}
              className="w-full py-2 rounded-xl bg-purple-600 text-white font-semibold"
            >
              Show QR Code
            </button>

            <button
              onClick={onRenew}
              className="w-full py-2 rounded-xl bg-white text-purple-700 font-semibold"
            >
              Renew Plan
            </button>
          </>
        )}

        {status === "expired" && (
          <button
            onClick={onRenew}
            className="w-full py-2 rounded-xl bg-yellow-400 text-purple-900 font-semibold"
          >
            Renew Plan
          </button>
        )}
      </div>
    </div>
  );
}
