"use client";

import { useState, useEffect, useRef } from "react";
import { FxRate } from "@/types/fx";

interface PreferredCurrencyModalProps {
  onClose: () => void;
  onSelect: (currency: string) => void;
}

export function PreferredCurrencyModal({
  onClose,
  onSelect,
}: PreferredCurrencyModalProps) {
  const [rates, setRates] = useState<FxRate[]>([]);
  const [search, setSearch] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------------------------------------------------
     LOAD FX RATES
  --------------------------------------------------- */
  useEffect(() => {
    async function loadFx() {
      const res = await fetch("https://redatacom-end.onrender.com/api/fx");
      const json = await res.json();
      setRates(json.rates || []);
    }
    loadFx();
  }, []);

  /* ---------------------------------------------------
     PARTICLE SHIMMER BACKGROUND
  --------------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
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

  /* ---------------------------------------------------
     FILTERED LIST
  --------------------------------------------------- */
  const filtered = rates.filter((r) =>
    r.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center p-4 z-[999]">
      <div
        className="
          relative w-full max-w-md rounded-3xl p-6
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-600
          border border-purple-400/30 shadow-2xl overflow-hidden
        "
      >
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
        />

        {/* Shine */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* HEADER */}
        <div className="relative z-10 mb-5">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Preferred Currency
          </h2>
          <p className="text-sm text-purple-200 opacity-80 mt-1">
            Select your display currency for bundles & pricing.
          </p>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            relative z-10 w-full px-4 py-3 mb-4 rounded-xl
            bg-white/10 text-white border border-purple-300/20
            placeholder-purple-200/60
            focus:bg-white/20 focus:ring-2 focus:ring-purple-300
            transition
          "
        />

        {/* LIST */}
        <div className="relative z-10 max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-purple-400/40">
          {filtered.map((r) => (
            <button
              key={r.currency}
              onClick={() => onSelect(r.currency)}
              className="
                w-full flex items-center justify-between
                px-4 py-3 rounded-xl
                bg-white/5 border border-purple-300/20
                hover:bg-purple-200/20 hover:border-purple-400/40
                transition-all duration-200
              "
            >
              <div>
                <p className="font-semibold text-white tracking-wide">
                  {r.currency}
                </p>
                <p className="text-xs text-purple-200 opacity-80">
                  1 USD = {r.mid_rate.toFixed(4)} {r.currency}
                </p>
              </div>

              <p className="text-[10px] text-purple-200 opacity-70">
                {new Date(r.updated_at).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            relative z-10 mt-5 w-full px-4 py-3 rounded-xl
            bg-white/10 text-white font-medium
            hover:bg-white/20 transition
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
