"use client";

export default function ContactPage() {
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
          
          Contact Us
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          Global Airtime • Data • Bundles • eSIM
        </p>

        {/* CONTACT CARD */}
        <section className="
          bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6
          backdrop-blur-xl mb-10
        ">
          <h2 className="text-xl font-semibold text-white mb-3">
            We're Here to Help
          </h2>
          <p className="text-neutral-300 leading-relaxed">
            Whether you have a question, need assistance with a recharge, or want to learn
            more about our services, the Redatacom team is ready to assist you.
          </p>
        </section>

        {/* DIRECT EMAIL */}
        <section className="
          bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6
          backdrop-blur-xl mb-10
        ">
          <h2 className="text-xl font-semibold text-white mb-3">
            Email Us
          </h2>
          <p className="text-neutral-300">
            You can reach our support team anytime at:
          </p>
          <p className="mt-2 font-medium text-purple-300 text-lg">
            support@redatacom.com
          </p>
          <p className="text-neutral-500 text-sm mt-1">
            We typically respond within 1–6 hours.
          </p>
        </section>

        {/* BUSINESS DETAILS */}
        <section className="
          bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6
          backdrop-blur-xl mb-10
        ">
          <h2 className="text-xl font-semibold text-white mb-3">
            Business Information
          </h2>

          <ul className="space-y-1 text-neutral-300 text-sm">
            <li>Redatacom</li>
            <li>3 Narmada Street, Crown North</li>
            <li>Johannesburg, Gauteng</li>
            <li>Republic of South Africa</li>
            <li>2024 / 101 823 / 07</li>
          </ul>
        </section>

        {/* SUPPORT CTA */}
        <section className="text-center mb-20">
          <p className="text-neutral-300 mb-2">Need help with a specific transaction?</p>
          <button
            onClick={() => (window.location.href = "/support")}
            className="
              px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800
              text-white font-semibold shadow-sm hover:shadow-md transition
            "
          >
            Open a Support Ticket
          </button>
        </section>

      </div>
    </main>
  );
}
