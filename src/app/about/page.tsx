"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* HEADER BUTTONS */}
        <div className="flex items-center justify-between mb-0">
          {/* HOME BUTTON */}
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
              px-3 py-1.5 rounded-lg border border-neutral-300 bg-white/80 backdrop-blur 
              text-neutral-700 text-sm hover:border-purple-500 hover:text-purple-600 
              transition-all shadow-sm hover:shadow-md whitespace-nowrap animate-energy
            "
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-purple-900 mt-4 mb-2">
          <img src="/logo-about.png" alt="Redatacom" className="h-10 opacity-90" />
        </h1>

         <p className="text-neutral-600 text-xs md:text-[10px] mt-0.5 flex items-center gap-1">
            <span className="text-emerald-500 font-semibold animate-pulse">
              Global
            </span>
            <span>Airtime • Data • Bundles • PIN</span>
          </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Our Mission
            </h2>
            <p>
              Redatacom was created with one purpose: to make global mobile connectivity
              simple, instant, and accessible to everyone. Whether you're supporting family
              abroad, recharging your own number, or sending digital value across borders,
              we believe the process should be fast, transparent, and friction‑free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              What We Do
            </h2>
            <p>
              We provide instant prepaid mobile Airtime, Data Bundles, and Digital Top‑Ups
              to over 170+ countries and thousands of operators worldwide. Our platform
              connects directly with global telecom partners to ensure fast delivery,
              accurate routing, and reliable service.
            </p>
            <p className="mt-2">
              With Redatacom, connectivity is more than a service — it’s empowerment.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Why Redatacom?
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Instant global airtime & data delivery</li>
              <li>Secure payments powered by trusted partners</li>
              <li>No accounts, no friction — just simplicity</li>
              <li>Transparent pricing with no hidden fees</li>
              <li>Premium user experience built for speed</li>
              <li>Reliable routing through global telecom networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Our Philosophy
            </h2>
            <p className="italic text-purple-700 font-medium">
              “Connectivity is power.”
            </p>
            <p className="mt-2">
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
