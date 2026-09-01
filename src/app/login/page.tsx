"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CountrySelectorModal } from "@/components/country/CountrySelectorModal";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const setAuth = useAuthStore((s) => s.setAuth);

  const [countries, setCountries] = useState<any[]>([]);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  // mode: phone or email
  const [mode, setMode] = useState<"phone" | "email">("phone");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [pin, setPin] = useState(["", "", "", ""]);

  // load countries
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const data = await res.json();
        if (Array.isArray(data.countries)) {
          setCountries(data.countries);
        }
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    }
    loadCountries();
  }, [API_BASE]);

  const handlePinChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`);
      next?.focus();
    }
  };

  const login = async () => {
    const pinCode = pin.join("");

    let identifier = "";

    if (mode === "email") {
      if (!email.trim()) {
        alert("Please enter your email");
        return;
      }
      identifier = email.trim();
    } else {
      if (!selectedCountry) {
        alert("Please select your country");
        return;
      }
      if (!phone.trim()) {
        alert("Please enter your phone number");
        return;
      }

      // full MSISDN: +<countryCode><localNumber>
      identifier =
        "+" +
        selectedCountry.dialCode.replace(/\D/g, "") +
        phone.replace(/\D/g, "");
    }

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier,
        pin: pinCode,
      }),
    });

    const json = await res.json();
    console.log("LOGIN RESPONSE:", json);

    if (json.token) {
      setAuth(json.token, json.userId);
      router.push("/dashboard");
    } else {
      alert(json.error || "Login failed");
    }
  };

  // particle background
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
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <canvas id="particleCanvas" className="w-full h-full opacity-99"></canvas>
      </div>

      {selectedCountry && mode === "phone" && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: `url(${selectedCountry.flag})` }}
        />
      )}

      <div className="relative z-10 px-6 py-12 flex flex-col items-center">
        <img src="/logo-signup.png" className="h-12 opacity-90 mb-6" />

        <h1 className="text-2xl font-semibold tracking-tight">
          Login to Your Account
        </h1>

        <div className="mt-6 w-full max-w-xl rounded-3xl p-8 bg-ffff shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

          {/* mode toggle */}
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => setMode("phone")}
              className={`px-4 py-2 rounded-xl ${
                mode === "phone"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-neutral-300"
              }`}
            >
              Enter my number
            </button>

            <button
              onClick={() => setMode("email")}
              className={`px-4 py-2 rounded-xl ${
                mode === "email"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-neutral-300"
              }`}
            >
              Use my email
            </button>
          </div>

          {/* phone mode */}
          {mode === "phone" && (
            <>
              <div className="mb-8">
                <button
                  onClick={() => setCountryModalOpen(true)}
                  className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    {selectedCountry && (
                      <img src={selectedCountry.flag} className="h-7 w-7 rounded-md" />
                    )}
                    <span className="text-white font-medium">
                      {selectedCountry?.name || "Country"}
                    </span>
                  </span>
                  <span className="text-neutral-400 text-lg">›</span>
                </button>

                <CountrySelectorModal
                  open={countryModalOpen}
                  onClose={() => setCountryModalOpen(false)}
                  onSelect={(c: any) => {
                    setSelectedCountry(c);
                    setPhone("");
                  }}
                  countries={countries}
                />
              </div>

              <div className="mb-10">
                <div className="flex gap-3">
                  <div className="w-28 rounded-2xl px-4 py-4 bg-ffff border border-white/20 flex items-center justify-center text-neutral-200 font-medium">
                    {selectedCountry?.dialCode}
                  </div>

                  <input
                    type="tel"
                    className="flex-1 rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white placeholder:text-neutral-400"
                    placeholder="enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* email mode */}
          {mode === "email" && (
            <div className="mb-10">
              <input
                type="email"
                className="w-full rounded-2xl px-4 py-4 bg-ffff border border-white/20 text-white placeholder:text-neutral-400"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {/* PIN */}
          <div className="mt-8">
            <label className="block text-sm text-neutral-300 mb-3">
              Enter PIN
            </label>

            <div className="flex justify-between mb-6">
              {pin.map((digit, i) => (
                <input
                  key={i}
                  id={`pin-${i}`}
                  type="password"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(e.target.value, i)}
                  className="w-14 h-14 border border-white/20 rounded-xl bg-ffff text-center text-2xl font-semibold text-white"
                />
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={login}
                className="w-full py-4 rounded-2xl bg-ffff text-purple-600 font-semibold hover:bg-purple-700 active:scale-[0.97] transition"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup/number")}
                className="w-full py-4 rounded-2xl bg-ffff text-white font-medium hover:bg-white/20 transition"
              >
                Create Account
              </button>

              <button
                onClick={() => router.push("/reset-pin")}
                className="w-full py-3 text-neutral-300 text-sm underline hover:text-white transition"
              >
                Reset PIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
