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
        <img src="/logo-signup.png" alt="Redatacom" className="h-8 opacity-100" />

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

        <p className="text-xl md:text-xl font-bold tracking-tight mb-1
          bg-gradient-to-r from-white via-purple-300 to-blue-400
          bg-clip-text text-transparent drop-shadow-xl">
          Instant eSIM activation. Worldwide airtime & data top‑ups.
        </p>

        <img src="/cosmicicon2.png" className=" w-auto h-50 opacity-90 mb-1" />

        <p className="text-xl md:text-xl font-bold tracking-tight mb-5
          bg-gradient-to-r from-blue-400 via-white to-purple-300
          bg-clip-text text-transparent drop-shadow-xl">
          One Platform. One cosmic experience
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

        <button
          onClick={() => router.push("/coverage")}
          className="
            px-10 py-4 rounded-2xl bg-ffff hover:bg-purple-700
            text-white font-semibold text-lg shadow-lg transition
          "
        >
          Check Networks
        </button>
      </section>

      {/* WHAT IS REDATACOM */}
      <section className="relative z-10 px-6 py-10 flex justify-center">
        <div className="
          max-w-4xl w-full rounded-3xl p-10
          bg-ffff
          
        ">
          <h2 className="text-3xl font-bold mb-6 
                         bg-gradient-to-r from-purple-300 via-white to-purple-300 
                         bg-clip-text text-transparent">
            What is Redatacom?
          </h2>

          <p className="text-xl font-bold mb-6 
                         bg-gradient-to-r from-purple-300 via-white to-purple-300 
                         bg-clip-text text-transparent">
            Your global connectivity hub offering instant eSIM activation,
            worldwide airtime & data top‑ups.  
            Built for anyone who needs seamless
            cross‑border or internal daily communication. Join the family Today!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white/5 rounded-xl border-ffff"><img src="/sim-local1.png" className=" w-auto h-auto opacity-100" />Link Local</div>
            <div className="p-4 bg-white/5 rounded-xl border-ffff"><img src="/sim-esim1.png" className=" w-auto h-auto opacity-100" />Get Esim</div>
            <div className="p-4 bg-white/5 rounded-xl border-ffff"><img src="/airtimeicon.png" className=" w-auto h-auto opacity-100" />Airtime</div>
            <div className="p-4 bg-white/5 rounded-xl border-ffff"><img src="/dataicon.png" className=" w-auto h-auto opacity-100" />Data</div>
            
          </div>

        </div>
      </section>


      {/* GLOBAL COVERAGE */}

      <section className="relative z-10 px-6 py-10 text-center">
        <h2 className="text-3xl font-bold mb-6 
                       bg-gradient-to-r from-purple-300 via-white to-purple-300 
                       bg-clip-text text-transparent">
          Global Coverage
        </h2>

        <p className="text-3xl md:text-xl font-bold tracking-tight mb-1
          bg-gradient-to-r from-white via-purple-300 to-blue-400
          bg-clip-text text-transparent drop-shadow-xl">
          Connect across 150+ countries with 700+ operators.  
          From Africa to Europe, Asia to the Americas.
        </p>

        <img
          src="/infinityicon1.png"
          className="mx-auto w-auto h-40 opacity-100"
        />
        <p className="text-xl md:text-xl font-bold tracking-tight mb-1
          bg-gradient-to-r from-white via-purple-300 to-blue-400
          bg-clip-text text-transparent drop-shadow-xl">
          Redatacom keeps you connected.
        </p>
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
      <section className="relative z-10 px-6 py-15 text-center">
        <button
          onClick={() => router.push("/signup/number")}
          className="
            px-12 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700
            text-white font-semibold text-xl shadow-lg transition
          "
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
<footer className="relative z-10 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 py-10 text-neutral-300">

  <div className="
    max-w-6xl mx-auto px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
    gap-10
  ">

    {/* Column 1 — Logo */}
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <img src="/icon-pin.png" className="h-20 w-auto opacity-100 mb-4" />
      <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
        
      </p>
    </div>

    {/* Column 2 — Company */}
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white font-semibold mb-3">Company</h3>
      <ul className="space-y-2 text-sm text-center md:text-left">
        <li><button onClick={() => router.push("/about")} className="hover:text-white transition">About</button></li>
        <li><button onClick={() => router.push("/coverage")} className="hover:text-white transition">Coverage Map</button></li>
        <li><button onClick={() => router.push("/compatibility")} className="hover:text-white transition">eSIM Compatibility</button></li>
        <li><button onClick={() => router.push("/security")} className="hover:text-white transition">Security & Compliance</button></li>
      </ul>
    </div>

    {/* Column 3 — Support */}
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white font-semibold mb-3">Support</h3>
      <ul className="space-y-2 text-sm text-center md:text-left">
        <li><button onClick={() => router.push("/support")} className="hover:text-white transition">Support Center</button></li>
        <li><button onClick={() => router.push("/faq")} className="hover:text-white transition">FAQ</button></li>
        <li><button onClick={() => router.push("/contact")} className="hover:text-white transition">Contact Us</button></li>
      </ul>
    </div>

    {/* Column 4 — Legal */}
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white font-semibold mb-3">Legal</h3>
      <ul className="space-y-2 text-sm text-center md:text-left">
        <li><button onClick={() => router.push("/terms")} className="hover:text-white transition">Terms of Service</button></li>
        <li><button onClick={() => router.push("/privacy")} className="hover:text-white transition">Privacy Policy</button></li>
        <li><button onClick={() => router.push("/refunds")} className="hover:text-white transition">Refund Policy</button></li>
        <li><button onClick={() => router.push("/cookies")} className="hover:text-white transition">Cookie Policy</button></li>
      </ul>
    </div>

  </div>

  {/* COPYRIGHT */}
  <div className="mt-10 text-center text-neutral-500 text-sm">
    © {new Date().getFullYear()} Redatacom
  </div>

</footer>


    </main>
  );
}
