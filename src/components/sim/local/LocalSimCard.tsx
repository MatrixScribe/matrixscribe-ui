"use client";

import { useEffect, useRef, useState } from "react";

export function LocalSimCard({
  phone,
  cardholder,
  operatorLogo,
  flag,
  signupDate,
  simStatus,       // ⭐ NEW
  onTopUp,
}: {
  phone: string;
  cardholder: string;
  operatorLogo: string;
  flag: string;
  signupDate: string;
  simStatus: string;   // ⭐ NEW
  onTopUp?: () => void;
}) {
  console.log("LocalSimCard props:", {
    phone,
    cardholder,
    operatorLogo,
    flag,
    signupDate,
    simStatus,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* -------------------------------------------
     PARTICLES
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

  /* -------------------------------------------
     VERIFICATION TIMER
  ------------------------------------------- */
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes
  const [verified, setVerified] = useState(simStatus === "active");

  useEffect(() => {
    if (verified) return; // stop timer when verified

    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [verified]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" + sec : sec}`;
  };

  /* -------------------------------------------
     STATUS DOT COLORS
  ------------------------------------------- */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "pending_verification":
        return "bg-yellow-500";
      case "blocked":
        return "bg-red-600";
      case "suspended":
        return "bg-orange-500";
      default:
        return "bg-neutral-500";
    }
  };

  /* -------------------------------------------
     VERIFY BUTTON LOGIC
  ------------------------------------------- */
  const handleVerify = () => {
    // ⭐ For now: instant verification
    setVerified(true);
  };

  return (
    <div
      className="
        relative w-full max-w-sm p-6 rounded-2xl overflow-hidden
        bg-gradient-to-br from-black via-black to-silver text-white
        border border-ffff backdrop-blur-xl
        shadow-[0_0_25px_rgba(255,215,0,0.45)]
      "
      style={{
        clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 0 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
      />

      <div className="relative z-10">
        {/* Brand Row */}
        <div className="flex items-center justify-between mb-3">
          <img src="/logogrey.png" className="h-7 w-auto opacity-80" />
          <span className="text-[10px] opacity-50 tracking-wide">
            
          </span>
        </div>

              {/* Embossed Redatacom Logo */}
      <div className="absolute top-0 left-10 text-md font-extrabold tracking-widest opacity-30 select-none">
      PRIMARY SIM
      </div>

        {/* Operator + Flag */}
        <div className="flex items-center justify-between mb-5">
          {flag && (
            <img
              src={flag}
              className="h-auto w-15 rounded-md border border-white/20"
            />
          )}

          {operatorLogo && (
            <img
              src={operatorLogo}
              className="h-auto w-15 object-contain rounded-md bg-ffff"
            />
          )}
        </div>

        {/* Cardholder */}
        <div className="mt-2">
          <p className="text-[9px] opacity-40"></p>
          <p className="text-sm font-semibold tracking-wide">
            {cardholder?.trim().length ? cardholder : phone}
          </p>
        </div>

        {/* Phone + Chip */}
        <div className="flex items-center justify-between mt-1 relative">
          {/* STATUS DOT */}
          <div
            className={`absolute -top-2 right-0 h-3 w-3 rounded-full ${getStatusColor(
              verified ? "active" : simStatus
            )} animate-pulse`}
          />

          <p className="text-lg font-bold tracking-wide">{phone}</p>
          <img src="/chip-gold.png" className="h-auto w-16 opacity-50" />
        </div>

        {/* Signup date */}
        {signupDate && (
          <p className="mt-1 text-[9px] opacity-40">
            Member Since: {new Date(signupDate).toLocaleDateString()}
          </p>
        )}

        {/* Verification Section */}
        <div className="mt-4 flex items-center justify-between">
          {verified ? (
            <p className="text-[10px] text-green-400 font-semibold">
              SIM Verified ✓
            </p>
          ) : (
            <>
              <p className="text-[10px] opacity-60">
                Verify SIM • {formatTime(secondsLeft)}
              </p>

              <button
                className="
                  px-3 py-1 rounded-lg bg-purple-600 text-white text-xs
                  hover:bg-purple-700 transition
                "
                onClick={handleVerify}
              >
                Verify
              </button>
            </>
          )}
        </div>

        
      </div>
    </div>
  );
}
