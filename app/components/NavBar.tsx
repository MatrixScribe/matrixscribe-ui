"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-sandstone bg-surface shadow-subtle">
      <div className="px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="font-medium text-sm text-charcoal">
          MatrixScribe
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-charcoal-light hover:text-charcoal">
            Dashboard
          </Link>
          <Link href="/entities" className="text-charcoal-light hover:text-charcoal">
            Entities
          </Link>
          <Link href="/about" className="text-charcoal-light hover:text-charcoal">
            About
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-charcoal-light"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-sandstone bg-surface text-sm">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" className="block text-charcoal-light hover:text-charcoal">
              Dashboard
            </Link>
            <Link href="/entities" className="block text-charcoal-light hover:text-charcoal">
              Entities
            </Link>
            <Link href="/about" className="block text-charcoal-light hover:text-charcoal">
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
