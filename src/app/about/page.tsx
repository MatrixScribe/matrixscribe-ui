"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-6">
          {/* HOME BUTTON */}
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
            <img
              src="/favicon.ico"
              alt="Home"
              className="h-10 w-10 object-contain"
            />
          </button>

          {/* RECHARGE BUTTON */}
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
          
          About Redatacom
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          Global Airtime • Data • Bundles • eSIM
        </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* MISSION */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
            <p className="text-neutral-300">
              Redatacom was created with one purpose: to make global mobile connectivity
              simple, instant, and accessible to everyone. Whether you're supporting family
              abroad, recharging your own number, or sending digital value across borders,
              we believe the process should be fast, transparent, and friction‑free.
            </p>
          </section>

          {/* WHAT WE DO */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">What We Do</h2>
            <p className="text-neutral-300">
              We provide instant prepaid mobile Airtime, Data Bundles, and Digital Top‑Ups
              to over 170+ countries and thousands of operators worldwide. Our platform
              connects directly with global telecom partners to ensure fast delivery,
              accurate routing, and reliable service.
            </p>
            <p className="mt-2 text-neutral-300">
              With Redatacom, connectivity is more than a service — it’s empowerment.
            </p>
          </section>

          {/* WHY REDATACOM */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Why Redatacom?</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>Instant global airtime & data delivery</li>
              <li>Secure payments powered by trusted partners</li>
              <li>No accounts, no friction — just simplicity</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Premium user experience built for speed</li>
              <li>Reliable routing through global telecom networks</li>
            </ul>
          </section>

          {/* PHILOSOPHY */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Our Philosophy</h2>
            <p className="italic text-purple-300 font-medium text-lg">
              “Connectivity is power.”
            </p>
            <p className="mt-2 text-neutral-300">
              We believe that staying connected should never be complicated. Our platform
              is designed to remove barriers, reduce friction, and deliver digital value
              instantly — anywhere in the world.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
