"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CreatePin() {
  const router = useRouter();
  const params = useSearchParams();

  // Incoming data from /signup/number
  const countryName = params.get("country") || "";
  const countryCode = params.get("countryCode") || "";
  const dialCode = params.get("dialCode") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const operatorName = params.get("operatorName") || "";
  const operatorId = params.get("operatorId") || "";
  const flag = params.get("flag") || "";

  // PIN state
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const isComplete = pin.every((d) => d !== "");

  // Auto-focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
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
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (!isComplete) return;

    const finalPin = pin.join("");

    router.push(
      `/signup/profile?` +
        `pin=${encodeURIComponent(finalPin)}` +
        `&country=${encodeURIComponent(countryName)}` +
        `&countryCode=${encodeURIComponent(countryCode)}` +
        `&dialCode=${encodeURIComponent(dialCode)}` +
        `&flag=${encodeURIComponent(flag)}` +
        `&phone=${encodeURIComponent(phone)}` +
        `&operatorLogo=${encodeURIComponent(operatorLogo)}` +
        `&operatorName=${encodeURIComponent(operatorName)}` +
        `&operatorId=${encodeURIComponent(operatorId)}`
    );
  };

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">

      {/* Animated Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-99"></canvas>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-16 flex flex-col items-center">
        <img src="/logo3.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Create Your PIN
        </h1>

        <p className="text-neutral-400 mt-2">Choose a 4‑digit PIN</p>

        {/* Operator + Country Summary */}
        <div className="mt-6 flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
          {operatorLogo && (
            <img
              src={operatorLogo}
              className="h-10 w-auto object-contain drop-shadow-sm"
            />
          )}
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-white">
              {operatorName}
            </span>
            <span className="text-[13px] text-neutral-300">
              {dialCode} {phone} • {countryName}
            </span>
          </div>
        </div>

        {/* PIN BOX */}
        <div className="mt-10 w-full max-w-md rounded-3xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
          <div className="flex justify-center gap-4 mb-10">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el!)}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-16 h-16 text-center text-3xl font-semibold rounded-2xl bg-white/20 border border-white/30 text-white"
              />
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all ${
              !isComplete
                ? "bg-white/10 text-neutral-500 cursor-not-allowed"
                : "bg-purple-600 text-white shadow-lg hover:shadow-purple-500/40"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
