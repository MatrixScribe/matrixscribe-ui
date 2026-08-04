"use client";

import { useEffect, useState } from "react";

const API_BASE = "https://redatacom-end.onrender.com/api";

type Operator = {
  operatorId: number;
  name: string;
  logo: string | null;
};

type Props = {
  countryName: string;
  flag?: string;
  phone: string;
  onSelectOperator: (payload: {
    operatorId: number;
    name: string;
    logo: string | null;
    countryCode: string;
    phone: string;
  }) => void;
};

export function DashboardAutoDetect({
  countryName,
  flag,
  phone,
  onSelectOperator,
}: Props) {
  const [countryCode, setCountryCode] = useState<string>("");
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loadingOps, setLoadingOps] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // ⭐ NEW: Suggested operator (auto-detected)
  const [suggested, setSuggested] = useState<Operator | null>(null);
  const [loadingSuggested, setLoadingSuggested] = useState(false);

  // Extract ISO2 from flag URL or fallback from countryName
  useEffect(() => {
    if (flag) {
      const match = flag.match(/\/([a-z]{2})\.svg$/i);
      if (match) {
        setCountryCode(match[1].toUpperCase());
        return;
      }
    }

    if (countryName) {
      setCountryCode(countryName.slice(0, 2).toUpperCase());
    }
  }, [flag, countryName]);

  // Load ALL operators for the country (once per countryCode)
  useEffect(() => {
    if (!countryCode) return;

    setLoadingOps(true);

    fetch(`${API_BASE}/operators?country=${countryCode}`)
      .then((r) => r.json())
      .then((data) => {
        setOperators(data.operators || []);
      })
      .catch(() => setOperators([]))
      .finally(() => setLoadingOps(false));
  }, [countryCode]);

  // ⭐ NEW: Auto-detect suggested operator (ONE CALL, NO SELECTION)
  useEffect(() => {
    if (!countryCode || !phone) return;

    const digits = phone.replace(/\D/g, "");
    if (!digits) return;

    setLoadingSuggested(true);

    fetch(
      `${API_BASE}/operators/auto-detect?phone=${encodeURIComponent(
        digits
      )}&country=${countryCode}`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.operator?.operatorId) {
          setSuggested(data.operator);
        } else {
          setSuggested(null);
        }
      })
      .catch(() => setSuggested(null))
      .finally(() => setLoadingSuggested(false));
  }, [countryCode, phone]);

  // ⭐ PARTICLE BACKGROUND
  useEffect(() => {
    const canvas = document.getElementById(
      "topupParticleCanvas"
    ) as HTMLCanvasElement;

    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
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
        ctx.fillStyle = "rgba(120, 60, 255, 0.35)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden">

      {/* PARTICLE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <canvas
          id="topupParticleCanvas"
          className="w-full h-full"
        ></canvas>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 bg-white/80 border border-neutral-200 rounded-2xl p-4 shadow-sm backdrop-ffff">

        {/* PHONE DISPLAY */}
        <div className="flex items-center justify-between text-xs text-neutral-600 mb-3">
          <img src="/icon-recharge.png" className="w-auto h-10 opacity-100" />
          <span className="text-lg font-mono text-purple-800">
            {phone || "—"}
          </span>
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500">
            
            </p>
            <p className="text-sm font-semibold text-neutral-900">
              {countryName || "Selected country"}
            </p>
          </div>

          {flag && <img src={flag} className="h-8 w-20 rounded-md" alt="" />}
        </div>

        

        {/* ⭐ NEW: SUGGESTED OPERATOR */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-neutral-700 mb-1">
            Detected operator:
          </p>

          <div className="min-h-[48px] flex items-center gap-3 rounded-xl border border-purple-300 bg-purple-50/60 px-3 py-2">
            {loadingSuggested && (
              <span className="text-xs text-purple-600 animate-pulse">
                Detecting best match…
              </span>
            )}

            {!loadingSuggested && suggested && (
              <>
                {suggested.logo && (
                  <img
                    src={suggested.logo}
                    className="h-7 w-7 rounded-sm object-contain bg-white"
                  />
                )}
                <span className="text-sm font-semibold text-neutral-900">
                  {suggested.name}
                </span>
              </>
            )}

            {!loadingSuggested && !suggested && (
              <span className="text-xs text-neutral-500">
                No suggested operator for this number.
              </span>
            )}
          </div>
        </div>

        {/* OPERATORS CAROUSEL */}
        <div className="mt-2">
          <p className="text-xs font-semibold text-neutral-700 mb-2">
            Detected operators in this country
          </p>

          {loadingOps && (
            <p className="text-xs text-neutral-500">Loading operators…</p>
          )}

          {!loadingOps && operators.length === 0 && (
            <p className="text-xs text-neutral-500">
              No operators found for this country.
            </p>
          )}

          {!loadingOps && operators.length > 0 && (
            <div
              className="
                flex gap-3 overflow-x-auto snap-x snap-mandatory
                scrollbar-hide py-2
              "
            >
              {operators.map((op) => (
                <button
                  key={op.operatorId}
                  onClick={() => {
                    setSelectedId(op.operatorId);
                    onSelectOperator({
                      operatorId: op.operatorId,
                      name: op.name,
                      logo: op.logo || null,
                      countryCode,
                      phone,
                    });
                  }}
                  className={`
                    snap-center shrink-0
                    w-40 h-28
                    rounded-2xl border px-3 py-2
                    flex flex-col items-start justify-center
                    text-left text-xs transition
                    ${
                      selectedId === op.operatorId
                        ? "border-purple-600 bg-purple-50 shadow-sm"
                        : "border-neutral-200 bg-white hover:border-neutral-400"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {op.logo && (
                      <img
                        src={op.logo}
                        className="h-8 w-auto rounded-sm object-contain bg-white"
                      />
                    )}
                    <span className="text-[10px] font-semibold line-clamp-10">
                      {op.name}
                    </span>
                  </div>

                  <span className="mt-1 text-[10px] text-neutral-500"></span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
