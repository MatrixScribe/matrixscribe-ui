"use client";

import { useState } from "react";

export default function SupportPage() {
  const [ref, setRef] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function submitTicket(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting your ticket…");

    const res = await fetch("/api/support-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ref, email, message }),
    });

    if (res.ok) {
      setStatus("Your ticket has been received. Our team will reach out shortly.");
      setRef("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-6">
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
          <img src="/logo-support.png" alt="Support" className="h-10 opacity-90" />
          Support Center
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          Global Airtime • Data • Bundles • eSIM • Wallet
        </p>

        {/* INTRO CARD */}
        <div className="
          bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 mb-10
          backdrop-blur-xl
        ">
          <h2 className="text-xl font-semibold text-white mb-2">
            We're Here For You
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            Every recharge matters. If something didn’t go as expected, or you simply need
            clarity, our team is ready to help — with care, speed, and attention.
          </p>
          <p className="text-neutral-300 mt-2">
            Please include your <strong>Reference Number</strong> so we can locate your
            transaction instantly.
          </p>
        </div>

        {/* SUPPORT FORM */}
        <section className="
          bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6
          backdrop-blur-xl
        ">
          <h2 className="text-xl font-semibold text-white mb-4">
            Open a Support Ticket
          </h2>

          <form onSubmit={submitTicket} className="space-y-5">

            {/* REF NUMBER */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Reference Number
              </label>
              <input
                type="text"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. 3ef6e0e0-f77f-4340-b3c0-e1dbdda8fe0a"
                className="
                  w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10
                  text-white placeholder-neutral-500
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-300
                  outline-none transition
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10
                  text-white placeholder-neutral-500
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-300
                  outline-none transition
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what happened — the more detail, the faster we can help."
                className="
                  w-full px-3 py-2 rounded-lg border border-white/20 bg-white/10
                  text-white placeholder-neutral-500
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-300
                  outline-none transition
                "
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-lg bg-purple-700 text-white font-semibold
                hover:bg-purple-800 transition shadow-sm hover:shadow-md
              "
            >
              Submit Ticket
            </button>

            {status && (
              <p className="text-sm mt-2 text-purple-300 font-medium">{status}</p>
            )}
          </form>
        </section>

        {/* DIRECT EMAIL */}
        <section className="mt-10 mb-20">
          <h2 className="text-xl font-semibold text-white mb-2">
            Prefer Email?
          </h2>
          <p className="text-neutral-300">
            You can reach us anytime at:
          </p>
          <p className="mt-2 font-medium text-purple-300 text-lg">
            support@redatacom.com
          </p>
          <p className="text-neutral-500 text-sm mt-1">
            We usually respond within 1–6 hours.
          </p>
        </section>

      </div>
    </main>
  );
}
