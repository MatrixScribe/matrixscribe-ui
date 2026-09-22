"use client";

import { useState } from "react";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpen(open === i ? null : i);
  };

  const faq = [
    {
      q: "What is Redatacom?",
      a: "Redatacom is a global digital platform that enables instant mobile airtime, data bundles, eSIM plans, and digital top‑ups across 150+ countries and 700+ operators."
    },
    {
      q: "How do mobile top‑ups work?",
      a: "You select a country, choose an operator, pick a product, and complete payment. The value is delivered instantly to the recipient’s mobile number."
    },
    {
      q: "What is an eSIM?",
      a: "An eSIM is a digital SIM card that allows you to activate mobile data plans without needing a physical SIM. Most modern smartphones support eSIM."
    },
    {
      q: "How long does delivery take?",
      a: "Top‑ups and eSIM activations are usually delivered instantly. In rare cases, operators may take a few minutes to process the request."
    },
    {
      q: "Can I send top‑ups internationally?",
      a: "Yes. You can recharge numbers in any supported country from anywhere in the world."
    },
    {
      q: "Do you store my card details?",
      a: "No. Payments are processed securely by our payment partners. Redatacom never sees or stores your full card number or CVV."
    },
    {
      q: "What if I entered the wrong number?",
      a: "Top‑ups are instant and irreversible once delivered. Always double‑check the number before confirming payment."
    },
    {
      q: "How do I contact support?",
      a: "You can open a support ticket on our Support page or email us directly at support@redatacom.com."
    },
    {
      q: "Is my data safe?",
      a: "Yes. We use industry‑standard encryption, secure payment gateways, and fraud‑monitoring systems to protect your information."
    },
    {
      q: "Do you offer refunds?",
      a: "Refunds are only possible if a transaction fails and the operator confirms that no value was delivered."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-6">
          {/* HOME */}
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="
              h-9 w-9 flex items-center justify-center rounded-full
              border border-white/20 bg-white/10 backdrop-blur-xl
              shadow-sm hover:bg-white/20 hover:border-white/40 transition
            "
            title="Home"
          >
            <img src="/favicon.ico" alt="Home" className="h-10 w-10 object-contain" />
          </button>

          {/* RECHARGE */}
          <button
            onClick={() => (window.location.href = "/topup")}
            className="
              px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl
              text-white text-sm hover:bg-purple-700 hover:border-purple-500 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap
            "
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-2 flex items-center gap-2">
          Frequently Asked Questions
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          Global Airtime • Data • Bundles • eSIM 
        </p>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div
              key={i}
              className="border border-white/10 bg-white/5 rounded-xl backdrop-blur-xl shadow"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-white"
              >
                {item.q}
                <span className="text-neutral-400">{open === i ? "▴" : "▾"}</span>
              </button>

              {open === i && (
                <div className="px-4 pb-4 text-sm text-neutral-300 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CONTACT CTA */}
        <section className="mt-12 mb-20 text-center">
          <p className="text-neutral-300 mb-2">Still need help?</p>
          <button
            onClick={() => (window.location.href = "/support")}
            className="
              px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800
              text-white font-semibold shadow-sm hover:shadow-md transition
            "
          >
            Contact Support
          </button>
        </section>

      </div>
    </main>
  );
}
