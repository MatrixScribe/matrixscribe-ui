"use client";

import { useRef, useEffect } from "react";
import { WalletData } from "@/types/wallet";

interface WalletCardProps {
  wallet: WalletData;
  onTopup: () => void;            // kept for compatibility
  onSelectCurrency: () => void;
  onViewHistory: () => void;      // kept for compatibility
}

export function WalletCard({
  wallet,
  onTopup,
  onSelectCurrency,
  onViewHistory,
}: WalletCardProps) {
  const preferred = wallet.preferred_currency;
  const hasPreferred = Boolean(preferred);

  // Masked IDs
  const maskedUserId = wallet.user_id
    ? ` ${wallet.user_id.toString().slice(-100)}`
    : "•••• ••••";

  const maskedWalletId = wallet.wallet_id
    ? ` ${wallet.wallet_id.toString().slice(-100)}`
    : "•••• ••••";

  // Particle canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      {/* Magnetic Stripe */}
      <div className="absolute top-0 left-0 w-full h-14 overflow-hidden border-b border-ffff">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-purple-300 to-green-500 opacity-70" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <img src="/logogrey.png" className="h-6 opacity-80" alt="Redatacom Logo" />
        </div>
      </div>

      {/* Shine */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      {/* Embossed Logo */}
      <div className="absolute top-20 left-6 text-4xl font-extrabold tracking-widest opacity-20 select-none">
        MY CURRENCY
      </div>

      {/* Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mt-16">
        {/* Preferred Currency */}
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

        {/* Masked IDs */}
        <p className="text-xs font-mono tracking-widest opacity-70 mb-1">
          User ID {maskedUserId}
        </p>

        <p className="text-xs font-mono tracking-widest opacity-70 mb-4">
          Wallet ID {maskedWalletId}
        </p>

        {/* Divider */}
        <div className="mt-6 mb-4 h-px bg-white/10" />

        {/* Preferred Currency Only — No Balance */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner">
          <p className="text-sm opacity-90">
            Your preferred currency determines how bundle prices are displayed.
          </p>
          <p className="text-xs opacity-60 mt-1">
            Direct checkout is used for all purchases.
          </p>
        </div>
      </div>
    </div>
  );
}
