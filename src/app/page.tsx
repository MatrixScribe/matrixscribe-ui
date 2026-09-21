"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();

  /* ------------------------------------------------------------
     COSMIC PARTICLE BACKGROUND
  ------------------------------------------------------------ */
  useEffect(() => {
    const canvas = document.getElementById("cosmicCanvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 80;

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
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: `rgba(${150 + Math.random() * 100}, ${50 + Math.random() * 50}, 255, 0.5)`
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
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0b0b0f] text-white overflow-hidden">

      {/* Cosmic Background */}
      <canvas
        id="cosmicCanvas"
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Nebula Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black opacity-40 pointer-events-none" />

      {/* TOP NAV */}
      <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <img src="/logo-signup.png" alt="Redatacom" className="h-8 opacity-90" />

        {/* Login Button */}
        <button
          onClick={() => router.push("/login")}
          className="
            px-5 py-2 rounded-xl 
            bg-white/10 border border-white/20 
            text-white font-medium text-sm 
            backdrop-blur-xl 
            hover:bg-white/20 transition
          "
        >
          Login
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">

        <h1 className="
          text-4xl md:text-6xl font-bold tracking-tight mb-6
          bg-gradient-to-r from-purple-300 via-white to-purple-300
          bg-clip-text text-transparent drop-shadow-xl
        ">
          Your Gateway to Global Telecom
        </h1>

        <p className="text-neutral-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          Instant eSIM activation. Worldwide airtime & data top‑ups.  
          One platform. One cosmic experience.
        </p>

        <button
          onClick={() => router.push("/signup/number")}
          className="
            px-10 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700
            text-white font-semibold text-lg shadow-lg transition
          "
        >
          Get Started
        </button>

        <div className="mt-10 flex gap-6 text-neutral-400 text-sm">
          <div className="flex flex-col items-center">
            <span className="text-purple-300 text-2xl font-bold">150+</span>
            Countries
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-300 text-2xl font-bold">700+</span>
            Operators
          </div>
          <div className="flex flex-col items-center">
            <span className="text-purple-300 text-2xl font-bold">∞</span>
            Connectivity
          </div>
        </div>
      </section>

      {/* WHAT IS REDATACOM */}
      <section className="relative z-10 px-6 py-24 flex justify-center">
        <div className="
          max-w-4xl w-full rounded-3xl p-10
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-700/40
          border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          backdrop-blur-xl text-white
        ">
          <h2 className="text-3xl font-bold mb-6 
                         bg-gradient-to-r from-purple-300 via-white to-purple-300 
                         bg-clip-text text-transparent">
            What is Redatacom?
          </h2>

          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            Redatacom is your global connectivity hub — offering instant eSIM activation,
            worldwide airtime & data top‑ups, and a secure telecom wallet.  
            Built for travelers, families, businesses, and anyone who needs seamless
            cross‑border communication.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">eSIM</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">Airtime</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">Data</div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">Wallet</div>
          </div>
        </div>
      </section>

      {/* GLOBAL COVERAGE */}
      <section className="relative z-10 px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6 
                       bg-gradient-to-r from-purple-300 via-white to-purple-300 
                       bg-clip-text text-transparent">
          Global Coverage
        </h2>

        <p className="text-neutral-300 max-w-2xl mx-auto mb-12">
          Connect across 150+ countries with 700+ operators.  
          From Africa to Europe, Asia to the Americas — Redatacom keeps you connected.
        </p>

        <img
          src="/worldmap.png"
          className="mx-auto w-full max-w-3xl opacity-80"
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-10 
                       bg-gradient-to-r from-purple-300 via-white to-purple-300 
                       bg-clip-text text-transparent">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto text-neutral-300">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <span className="text-purple-300 text-4xl font-bold">1</span>
            <p className="mt-4">Choose your country</p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <span className="text-purple-300 text-4xl font-bold">2</span>
            <p className="mt-4">Select your operator or eSIM plan</p>
          </div>

          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <span className="text-purple-300 text-4xl font-bold">3</span>
            <p className="mt-4">Recharge or activate instantly</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-6 py-24 text-center">
        <button
          onClick={() => router.push("/signup/number")}
          className="
            px-12 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700
            text-white font-semibold text-xl shadow-lg transition
          "
        >
          Start Your Global Connectivity Journey
        </button>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 py-6 text-neutral-400 text-center">
        © {new Date().getFullYear()} Redatacom — Global Connectivity
      </footer>
    </main>
  );
}
