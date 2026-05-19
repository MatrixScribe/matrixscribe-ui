"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-40 transition-all ${
        scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-semibold text-purple-600">
          Redatacom
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-6 text-sm text-neutral-700">
          <Link href="/operators" className="hover:text-purple-600 transition">
            Operators
          </Link>

          <Link href="/topup" className="hover:text-purple-600 transition">
            Recharge
          </Link>
        </nav>
      </div>
    </header>
  );
}
