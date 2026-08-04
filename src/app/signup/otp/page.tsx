"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const params = useSearchParams();

  // Incoming user data
  const countryName = params.get("country") || "";
  const phone = params.get("phone") || "";
  const operatorLogo = params.get("operatorLogo") || "";
  const flag = params.get("flag") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(30);

  const isComplete = otp.every((d) => d !== "");

  // Auto countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (!isComplete) return;

    // For now, skip OTP verification
    router.push(
  `/signup/pin?` +
    `country=${encodeURIComponent(countryName)}` +
    `&countryCode=${encodeURIComponent(params.get("countryCode") || "")}` +
    `&dialCode=${encodeURIComponent(params.get("dialCode") || "")}` +
    `&flag=${encodeURIComponent(flag)}` +
    `&phone=${encodeURIComponent(phone)}` +
    `&operatorLogo=${encodeURIComponent(operatorLogo)}` +
    `&operatorName=${encodeURIComponent(params.get("operatorName") || "")}` +
    `&operatorId=${encodeURIComponent(params.get("operatorId") || "")}`
);

  };

  // Purple Particle animation
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
        ctx.fillStyle = "rgba(168, 85, 247, 0.45)"; // Purple particles
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">

      {/* Purple Particle Background */}
      <div className="absolute inset-10 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-100"></canvas>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-16 flex flex-col items-center">

        {/* HEADER */}
        <img src="/logo3.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Verify Your Number
        </h1>

        <p className="text-neutral-600 mt-2">
          Enter the 6‑digit code sent to you
        </p>

        {/* USER INFO CARD */}
        <div
          className="
            mt-10 w-full max-w-md rounded-3xl p-6
            bg-white/40 backdrop-blur-xl border border-black/10
            shadow-[0_20px_40px_rgba(0,0,0,0.15)]
          "
        >
          <div className="flex items-center gap-4">
            {flag && (
              <img src={flag} className="h-10 w-10 rounded-md shadow-md" />
            )}

            <div className="flex flex-col">
              <p className="text-sm text-neutral-600">{countryName}</p>
              <p className="text-lg font-semibold text-black">{phone}</p>
            </div>

            {operatorLogo && (
              <img
                src={operatorLogo}
                className="h-10 w-10 ml-auto object-contain"
              />
            )}
          </div>
        </div>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-4 mt-10 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el!)}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`
                w-14 h-14 text-center text-2xl font-semibold rounded-2xl
                bg-white/60 backdrop-blur-xl border border-black/20
                text-black focus:ring-2 focus:ring-purple-500
                transition-all duration-200
                ${digit ? "scale-110 shadow-[0_0_20px_rgba(168,85,247,0.6)]" : ""}
              `}
            />
          ))}
        </div>

        {/* RESEND TIMER */}
        <p className="text-neutral-500 text-sm mb-8">
          {timer > 0 ? (
            <>Resend code in {timer}s</>
          ) : (
            <span className="text-purple-600 cursor-pointer">Resend Code</span>
          )}
        </p>

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className={`
            w-full max-w-md py-4 rounded-2xl text-sm font-semibold
            transition-all duration-300
            ${
              !isComplete
                ? "bg-black/10 text-neutral-400 cursor-not-allowed"
                : "bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-[0.97]"
            }
          `}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
