"use client";

import { useRef, useEffect } from "react";
import { WalletData } from "@/types/wallet";

interface WalletCardProps {
  wallet: WalletData;
  onTopup: () => void;
  onSelectCurrency: () => void;
  onViewHistory: () => void;
}

export function WalletCard({
  wallet,
  onTopup,
  onSelectCurrency,
  onViewHistory,
}: WalletCardProps) {
  const usd = Number(wallet.usd_balance ?? 0);
  const preferred = wallet.preferred_currency;
  const local = Number(wallet.local_equivalent ?? 0);
  const fxMidRate = Number(wallet.fx_mid_rate ?? 0);
  const fxUpdatedAt = wallet.fx_updated_at;

  const hasPreferred = Boolean(preferred);

  // ⭐ Masked User ID (last 4 digits)
  const maskedUserId = wallet.user_id
    ? `•••• •••• ${wallet.user_id.toString().slice(-4)}`
    : "•••• ••••";

  // ⭐ Masked Wallet ID (last 4 digits)
  const maskedWalletId = wallet.wallet_id
    ? `•••• •••• ${wallet.wallet_id.toString().slice(-4)}`
    : "•••• ••••";

  // ⭐ Particle Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* -------------------------------------------
     PARTICLES FOR MAGNETIC STRIPE
  ------------------------------------------- */
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

  return (
    <div
      className="
        relative w-full rounded-3xl p-6 shadow-2xl
        bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-300
        text-white border border-neutral-600
        overflow-hidden
      "
    >
      {/* Brushed Metal Texture */}
      <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-30 mix-blend-overlay pointer-events-none" />

      {/* ⭐ Magnetic Stripe with Particles + Logo */}
      <div className="absolute top-0 left-0 w-full h-14 overflow-hidden border-b border-ffff">

        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-r from-balck via-purple-300 to-green-500 opacity-70" />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-100"
        />

        {/* Logo + Badge */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <img
            src="/logogrey.png"
            className="h-6 opacity-80"
            alt="Redatacom Logo"
          />

        </div>
      </div>

      {/* Holographic Shine Sweep */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      {/* Embossed Redatacom Logo */}
      <div className="absolute top-20 left-6 text-2xl font-extrabold tracking-widest opacity-20 select-none">
        REDATACOM WALLET
      </div>

      {/* Soft Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mt-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-purple-300 font-medium opacity-80 tracking-wide">
            {hasPreferred ? `${preferred}` : "Preferred Currency: Not Set"}
          </p>

          <button
            onClick={onSelectCurrency}
            className="
              px-4 py-1 rounded-lg text-sm font-semibold
              bg-ffff hover:bg-purple-200 text-white
              border border-white/20
              transition
            "
          >
            {hasPreferred ? "Change" : "Set"}
          </button>
        </div>

        {/* Member Since */}
        <p className="text-xs uppercase tracking-widest opacity-60 mb-1">
          Member Since {new Date().getFullYear()}
        </p>

        {/* ⭐ Masked User + Wallet IDs */}
        <p className="text-xs font-mono tracking-widest opacity-70 mb-1">
          User {maskedUserId}
        </p>

        <p className="text-xs font-mono tracking-widest opacity-70 mb-4">
          Wallet ID {maskedWalletId}
        </p>

        {/* Actual Balance */}
        {!hasPreferred || preferred === "USD" ? (
          <p className="text-4xl font-extrabold tracking-widest drop-shadow-xl">
            USD {usd.toFixed(2)}
          </p>
        ) : (
          <>
            <p className="text-4xl font-extrabold tracking-widest drop-shadow-xl">
              {preferred} {local.toFixed(2)}
            </p>

            <p className="text-sm opacity-80 mt-2">${usd.toFixed(2)}</p>

            {fxUpdatedAt && (
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                <p className="text-xs opacity-90">
                  1 USD = {fxMidRate.toFixed(4)} {preferred}
                </p>
                <p className="text-xs opacity-60">
                  {new Date(fxUpdatedAt).toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}

        {/* Divider */}
        <div className="mt-6 mb-4 h-px bg-white/10" />

        {/* Top Up Button */}
        <button
          onClick={onTopup}
          disabled={!hasPreferred}
          className={`
            w-full px-5 py-3 rounded-xl font-semibold shadow-lg
            transition-all duration-200
            ${
              hasPreferred
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }
          `}
        >
          {hasPreferred ? "Top Up Wallet" : "Set Currency First"}
        </button>

        {/* View History Button */}
        <button
          onClick={onViewHistory}
          className="
            mt-3 w-full px-5 py-3 rounded-xl font-semibold
            bg-white/10 hover:bg-white/20
            border border-white/20
            text-white transition
          "
        >
          View History
        </button>
      </div>
    </div>
  );
}
