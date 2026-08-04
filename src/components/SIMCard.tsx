"use client";

import { useEffect, useRef } from "react";

export default function SIMCard({
  type,
  phone,
  cardholder,
  simCategory,
  operatorLogo,
  flag,
  operatorName,
  bundle,
  onTopUp,
  color,
  icon,
  alerts,
  autoRenew,
}: {
  type: "local" | "esim";
  phone: string;
  cardholder: string;
  simCategory: string;
  operatorLogo?: string;
  flag?: string;
  operatorName?: string;
  bundle?: any;
  onTopUp?: () => void;

  // eSIM‑specific customizations
  color?: string;
  icon?: string;
  alerts?: boolean;
  autoRenew?: boolean;
}) {
  const themes = {
    local: {
      bg: "from-yellow-600 via-yellow-800 to-yellow-500",
      border: "border-yellow-600/40",
      text: "text-white",
      chip: "/chip-gold.svg",
      label: "Local SIM",
      brandLogo: "/logo-ww.png",
      glow: "shadow-[0_0_25px_rgba(255,215,0,0.45)]",
    },
    esim: {
      bg: "from-purple-500 via-purple-600 to-purple-800",
      border: "border-purple-400/40",
      text: "text-white",
      chip: "/chip-gold.svg",
      label: "eSIM",
      brandLogo: "/logo-esimp.png",
      glow: "shadow-[0_0_25px_rgba(168,85,247,0.45)]",
    },
  } as const;

  const theme = themes[type];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle background
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
      className={`
        relative w-full max-w-sm p-6 rounded-2xl overflow-hidden
        bg-gradient-to-br ${theme.bg} ${theme.text}
        border ${theme.border} backdrop-blur-xl
        ${theme.glow}
        shadow-xl
      `}
      style={{
        clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)",
      }}
    >
      {/* Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Brand Row */}
        <div className="flex items-center justify-between mb-0">
          <img src={theme.brandLogo} className="w-30 h-auto opacity-100" />
          <span className="text-green-400 opacity-100 tracking-wide">
            {theme.label}
          </span>
        </div>

        {/* Operator + Flag */}
        <div className="flex items-center justify-between mb-3">
          {flag && (
            <img
              src={flag}
              className="h-auto w-20 rounded-md border border-white/20"
            />
          )}
          {operatorLogo && (
            <img
              src={operatorLogo}
              className="h-auto w-20 object-contain rounded-md bg-ffff"
            />
          )}
        </div>

        {/* SIM Category */}
        <p className="text-xs font-semibold opacity-40">{simCategory}</p>

        {/* Cardholder */}
        <div className="mt-2">
          <p className="text-[9px] opacity-40">SIM CARD HOLDER</p>
          <p className="text-sm font-semibold tracking-wide">{cardholder}</p>
        </div>

        {/* Phone + Chip */}
        <div className="flex items-center justify-between mt-1">
          <p className="text-xl font-bold tracking-wide">{phone}</p>
          <img src={theme.chip} className="h-10 opacity-100" />
        </div>

        {/* ⭐ LOCAL SIM DETAILS (full signup data) */}
        {type === "local" && (
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20">
            <p className="text-[11px] opacity-80">Local SIM Details</p>

            <div className="mt-1 text-[10px] opacity-70 space-y-1">
              <p>Phone: {phone}</p>
              <p>Operator: {operatorName}</p>
              <p>Country: {flag ? "Selected" : "—"}</p>
              <p>Category: {simCategory}</p>
            </div>
          </div>
        )}

        {/* ⭐ eSIM CUSTOMIZATION PANEL */}
        {type === "esim" && (
          <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20 space-y-2">
            <p className="text-[11px] opacity-80">eSIM Settings</p>

            <div className="text-[10px] opacity-70 space-y-1">
              <p>Icon: {icon}</p>
              <p>Theme Color: {color}</p>
              <p>Usage Alerts: {alerts ? "Enabled" : "Disabled"}</p>
              <p>Auto Renew: {autoRenew ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        )}

        {/* ⭐ BUNDLE SECTION */}
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

            <p className="text-[10px] opacity-70 mt-1">{bundle.description}</p>

            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] opacity-70">Your Price:</p>
              <p className="text-sm font-bold text-yellow-300">
                ${bundle.undercutPrice || bundle.basePrice}
              </p>
            </div>
          </div>
        )}

        {/* Top Up Button (LOCAL ONLY) */}
        {type === "local" && onTopUp && (
          <button
            onClick={onTopUp}
            className="
              mt-2 w-full py-2 rounded-xl 
              bg-ffff text-purple-700 
              font-semibold 
              hover:bg-white transition
            "
          >
            Top Up
          </button>
        )}
      </div>
    </div>
  );
}
