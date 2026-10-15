"use client";

import { useState } from "react";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpen(open === i ? null : i);
  };

  const faq = [
    {
      q: "What is an eSIM?",
      a: "An eSIM is a digital SIM card built into your device. It lets you activate mobile data plans instantly without inserting a physical SIM. All modern iPhones, Samsung Galaxy devices, Google Pixel phones, and many Xiaomi/Huawei models support eSIM."
    },
    {
      q: "Which countries does Redatacom support?",
      a: "Redatacom supports 150+ countries across Africa, Europe, Asia, the Middle East, Oceania, and the Americas. You can browse country‑specific plans on our Coverage page or explore region bundles like Africa, Europe+, Asia Lite, and Global."
    },
    {
      q: "Which networks do Redatacom eSIMs use?",
      a: "Our eSIM plans connect to top‑tier networks such as Vodacom, MTN, Orange, Airtel, Etisalat, Safaricom, Maroc Telecom, Telkom SA, and hundreds more. Network availability depends on the country and plan type."
    },
    {
      q: "Do Redatacom eSIMs support 4G and 5G?",
      a: "Yes. Most Redatacom eSIM plans support 4G LTE, and many countries also support 5G depending on the device and local operator."
    },
    {
      q: "How do I activate an eSIM?",
      a: "After purchasing a plan, you receive a QR code and activation instructions. Scan the QR code on your device, confirm installation, and your eSIM activates instantly. No physical SIM or store visit required."
    },
    {
      q: "Can I use my eSIM across multiple countries?",
      a: "Yes. Region plans (Africa, Europe, Asia+, Middle East, etc.) and Global plans allow seamless roaming across multiple supported countries without switching SIMs."
    },
    {
      q: "Can I keep my WhatsApp number?",
      a: "Yes. eSIM data does not affect your WhatsApp number or chats. You can continue using WhatsApp normally while traveling."
    },
    {
      q: "Does Redatacom support unlimited data plans?",
      a: "Yes. Many region and global plans include unlimited data options with fair‑usage policies depending on the operator."
    },
    {
      q: "Which devices support eSIM?",
      a: "Most modern smartphones support eSIM, including iPhone XR–16, Samsung S20–S25, Google Pixel 3–9, and many Xiaomi, Oppo, and Huawei models. Tablets and smartwatches may also support eSIM depending on the model."
    },
    {
      q: "How long does activation take?",
      a: "Activation is instant. In rare cases, operators may take a few minutes to process the request."
    },
    {
      q: "Do you store my card details?",
      a: "No. Payments are processed securely by our payment partners. Redatacom never sees or stores your full card number or CVV."
    },
    {
      q: "Do you offer refunds?",
      a: "Refunds are possible only if a transaction fails and the operator confirms that no value was delivered. Activated eSIMs cannot be refunded."
    },
    {
      q: "How do I contact support?",
      a: "You can open a support ticket on our Support page or email us at support@redatacom.com."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER */}
        <header className="
          w-full flex items-center justify-between 
          mb-10 py-4 px-2
          bg-white/5 backdrop-blur-xl 
          border border-white/10 
          rounded-xl
        ">
          <div 
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img 
              src="/logo.png" 
              alt="Redatacom" 
              className="h-8 w-auto object-contain"
            />
            <span className="
              text-white font-semibold tracking-wide 
              text-sm sm:text-base
            ">
              Redatacom
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.href = "/login")}
              className="
                px-4 py-2 rounded-lg 
                bg-white/10 border border-white/20 
                text-white text-sm font-medium
                hover:bg-purple-700 hover:border-purple-500 
                transition-all
              "
            >
              Login
            </button>

            <button
              onClick={() => (window.location.href = "/signup")}
              className="
                px-4 py-2 rounded-lg 
                bg-purple-700 text-white 
                font-semibold text-sm
                hover:bg-purple-800 transition-all
              "
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-2 flex items-center gap-2">
          Frequently Asked Questions
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          eSIM • Global Coverage • Regions • Devices • Networks
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
