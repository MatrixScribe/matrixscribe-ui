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
    body: JSON.stringify({ ref, email, message })
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
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-10 relative">

      {/* Soft Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-300/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-0">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="
              h-9 w-9 flex items-center justify-center rounded-full
              border border-neutral-300 bg-white shadow-sm
              hover:border-neutral-500 hover:shadow-md transition
            "
            title="Home"
          >
            <img src="/favicon.ico" alt="Home" className="h-10 w-10 object-contain" />
          </button>

          <button
            onClick={() => (window.location.href = "/topup")}
            className="
              px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur 
              text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy
            "
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-bold text-purple-900 mb-1 flex items-center gap-2 mt-4">
          <img src="/logo-support.png" alt="Support" className="h-10 opacity-90" />
        </h1>

        {/* SUBTITLE */}
        <div className="mb-8">
          <p className="text-neutral-600 text-xs md:text-[10px] mt-0.5 flex items-center gap-1">
            <span className="text-emerald-500 font-semibold animate-pulse">Global</span>
            <span>Airtime | Data | Bundles | PIN</span>
          </p>
        </div>

        {/* INTRO CARD */}
        <div className="
          bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 mb-10
          backdrop-blur-xl
        ">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            We're Here For You
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            Every recharge matters. If something didn’t go as expected, or you simply need
            clarity, our team is ready to help — with care, speed, and attention.
          </p>
          <p className="text-neutral-700 mt-2">
            Please share your <strong>Reference Number</strong> so we can locate your
            transaction instantly.
          </p>
        </div>

        {/* SUPPORT FORM */}
        <section className="
          bg-white border border-neutral-200 rounded-2xl shadow-sm p-6
          backdrop-blur-xl
        ">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Open a Support Ticket
          </h2>

          <form onSubmit={submitTicket} className="space-y-5">

            {/* REF NUMBER */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Reference Number
              </label>
              <input
                type="text"
                required
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="e.g. 3ef6e0e0-f77f-4340-b3c0-e1dbdda8fe0a"
                className="
                  w-full px-3 py-2 rounded-lg border border-neutral-300
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                  outline-none transition
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full px-3 py-2 rounded-lg border border-neutral-300
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                  outline-none transition
                "
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what happened — the more detail, the faster we can help."
                className="
                  w-full px-3 py-2 rounded-lg border border-neutral-300
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-200
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
              <p className="text-sm mt-2 text-purple-700 font-medium">{status}</p>
            )}
          </form>
        </section>

        {/* DIRECT EMAIL */}
        <section className="mt-10 mb-20">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            Prefer Email?
          </h2>
          <p className="text-neutral-700">
            You can reach us anytime at:
          </p>
          <p className="mt-2 font-medium text-purple-700 text-lg">
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
