"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ⭐ ADDED: SEO imports
import InternalLinks from "@/components/InternalLinks";
import { generateSEOText } from "@/lib/seo";

export default function LandingPage() {
  const router = useRouter();

  // ⭐ ADDED: SEO title + location
  const title = "Redatacom — Global eSIM & Airtime Platform";
  const location = "Worldwide";

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
        <img src="/logo-signup.png" alt="Redatacom" className="h-8 opacity-100" />

        <button
          onClick={() => router.push("/login")}
          className="
            px-5 py-2 rounded-xl
            bg-white/10 border border-white/20
            text-white font-medium text-sm
            backdrop-blur-xl
            hover:bg-purple-700
          "
        >
          Login | Join
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

        {/* ⭐ ADDED: SEO TEXT */}
        <p className="text-neutral-400 text-sm mb-10">
          {generateSEOText(title, location)}
        </p>

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

      {/* ⭐ ADDED: FULL-WIDTH GRID CLUSTERS */}
      <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">

        {/* COUNTRY CLUSTER */}
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
          Popular Countries
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {["QA", "RS", "CN", "US", "AE", "AU", "EG", "SG", "GB", "ZA", "AR", "IN"].map((iso) => (
            <button
              key={iso}
              onClick={() => router.push(`/country/${iso}`)}
              className="bg-ffff rounded-xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-400 transition"
            >
              <img
                src={`https://s3.amazonaws.com/rld-flags/${iso.toLowerCase()}.svg`}
                className="h-10 w-16 mx-auto mb-2 rounded shadow"
              />
            </button>
          ))}
        </div>

        {/* REGION CLUSTER */}
        <h2 className="text-3xl font-bold mt-20 mb-6 bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
          Regions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {["afr", "eu", "mena", "latam", "asy", "oc", "nam"].map((r) => (
            <button
              key={r}
              onClick={() => router.push(`/region/${r}`)}
              className="bg-ffff rounded-xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-400 transition"
            >
              
              <p className="text-xl text-white font-medium">{r.toUpperCase()}</p>
            </button>
          ))}
        </div>

        {/* DEVICE CLUSTER */}
        <h2 className="text-3xl font-bold mt-20 mb-6 bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
          Popular Devices
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            ["apple", "iphone-18"],
            ["apple", "iphone-18-pro-max"],
            ["samsung", "galaxy-s26-ultra"],
            ["google", "pixel-10-pro"],
            ["xiaomi", "mi-14"],
            ["huawei", "p70-pro"]
          ].map(([brand, model]) => (
            <button
              key={model}
              onClick={() => router.push(`/device/${brand}/${model}`)}
              className="bg-ffff rounded-xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-400 transition"
            >
              <img src="/phoneoutline.png" className="h-15 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">{model.replace(/-/g, " ")}</p>
            </button>
          ))}
        </div>

        {/* TRAVEL CLUSTER */}
        <h2 className="text-3xl font-bold mt-20 mb-6 bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
          Popular Travel eSIMs
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            "JFK-airport-esim",
            "DXB-airport-esim",
            "Shanghai-airport-esim",
            "Greece-esim",
            "UAE-esim",
            "London-esim"
          ].map((slug) => (
            <button
              key={slug}
              onClick={() => router.push(`/travel/${slug}`)}
              className="bg-ffff rounded-xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-400 transition"
            >
              <img src="/cosmicesim.png" className="h-15 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">{slug.replace(/-/g, " ")}</p>
            </button>
          ))}
        </div>

        {/* COMPARISON CLUSTER */}
        <h2 className="text-3xl font-bold mt-20 mb-6 bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent">
          Popular Comparisons
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            "Redatacom-vs-airalo",
            "Redatacom-vs-holafly",
            "eSim-vs-physical-sim",
            "eSim-vs-roaming",
            "Global-eSim-vs-local-sim",
            "Africa-eSim-vs-europe-esim"
          ].map((slug) => (
            <button
              key={slug}
              onClick={() => router.push(`/compare/${slug}`)}
              className="bg-ffff rounded-xl p-4 text-center hover:bg-purple-900/20 hover:border-purple-400 transition"
            >
              <img src="/vsicon.png" className="h-15 mx-auto mb-2" />
              <p className="text-sm text-white font-medium">{slug.replace(/-/g, " ")}</p>
            </button>
          ))}
        </div>

      </section>

      {/* ⭐ ADDED: INTERNAL LINKS */}
      <InternalLinks />

      {/* FOOTER (unchanged) */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 py-10 text-neutral-300">
        <div className="
          max-w-6xl mx-auto px-6
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
          gap-10
        ">
          {/* Column 1 — Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img src="/icon-pin.png" className="h-20 w-auto opacity-100 mb-4" />
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
