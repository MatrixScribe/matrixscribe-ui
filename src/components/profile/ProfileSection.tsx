"use client";

import { useEffect, useState, useRef } from "react";

export default function ProfileSection({ user, wallet }: { user: any; wallet: any }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const [profile, setProfile] = useState<any>(null);
  const [pinSaving, setPinSaving] = useState(false);
  const [newPin, setNewPin] = useState("");

  const verified = user?.simCards?.[0]?.status === "ACTIVE";

  // ⭐ Particle Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* -------------------------------------------
     PARTICLES FOR MAGNETIC STRIPE
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

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (json.success) {
        setProfile(json.profile);
      }
    }

    loadProfile();
  }, []);

  // Change PIN
  async function changePin() {
    if (newPin.length !== 4) {
      alert("PIN must be 4 digits");
      return;
    }

    setPinSaving(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/api/auth/change-pin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPin }),
    });

    const json = await res.json();
    setPinSaving(false);

    alert(json.success ? "PIN updated" : "Failed to update PIN");
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-neutral-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">

      {/* ⭐ PROFILE CARD — Titanium + Particle Stripe */}
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

        {/* Holographic Shine Sweep */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* Embossed Redatacom Logo */}
        <div className="absolute top-20 left-6 text-xl font-extrabold tracking-widest opacity-20 select-none">
          MEMBER DETAILS
        </div>

        {/* Soft Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        {/* ⭐ Magnetic Stripe with Particles + Logo */}
      <div className="absolute top-0 left-0 w-full h-14 overflow-hidden border-b border-ffff">

        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-r from-balck via-gray-500 to-purple-300 opacity-70" />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-100"
        />
          {/* Logo + Badge */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <img
              src="/logogrey.png"
              className="h-6 opacity-80"
              alt="Redatacom Logo"
            />
              
          </div>
        </div>

        <div className="relative z-10 mt-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight drop-shadow-lg"></h2>

            {verified && (
              <span className="px-4 py-1 rounded-full bg-green-500 text-white text-sm font-semibold shadow-lg">
                VERIFIED ✓
              </span>
            )}
          </div>

          {/* Operator + Flag */}
          <div className="flex items-center gap-4 mb-6">
            <img src={user.operator_logo} className="h-13 w-auto rounded-xl" />
            <img src={user.country_flag} className="h-12 w-auto rounded-lg" />
          </div>

          {/* Profile Grid */}
          <div className="grid grid-cols-2 gap-6 text-white">

            <div>
              <p className="text-xs opacity-80">Account Holder</p>
              <p className="text-lg font-semibold drop-shadow">
                {profile.first_name} {profile.last_name}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-80">Email Address</p>
              <p className="text-xs font-semibold drop-shadow">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-xs opacity-80">Primary Phone</p>
              <p className="text-lg font-semibold drop-shadow">{profile.phone}</p>
            </div>

            <div>
              <p className="text-xs opacity-80">Country</p>
              <p className="text-lg font-semibold drop-shadow">{profile.country}</p>
            </div>

            <div>
              <p className="text-xs opacity-80">Global Network Operator</p>
              <p className="text-xl font-semibold drop-shadow">{profile.operator_id}</p>
            </div>

          </div>
        </div>
      </div>

      {/* ⭐ PIN RESET ONLY */}
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-800">
          <img src="/pin-reset.png" alt="Wallet Icon" className="h-18 w-auto opacity-80" />
        </h2>

        <input
          type="password"
          maxLength={4}
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
          placeholder="Enter new 4‑digit PIN"
          className="w-full px-4 py-3 rounded-xl bg-neutral-100 border border-neutral-300"
        />

        <button
          onClick={changePin}
          disabled={pinSaving}
          className={`w-full py-4 rounded-xl text-purple-600 font-semibold transition ${
            pinSaving ? "bg-neutral-400" : "bg-ffff hover:bg-black"
          }`}
        >
          {pinSaving ? "Updating..." : "Request OTP"}
        </button>
      </div>
    </div>
  );
}
