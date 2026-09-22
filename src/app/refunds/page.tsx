"use client";

export default function RefundsPage() {
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
          >
            <img src="/favicon.ico" className="h-10 w-10 object-contain" />
          </button>

          <button
            onClick={() => (window.location.href = "/topup")}
            className="
              px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl
              text-white text-sm hover:bg-purple-700 hover:border-purple-500 
              transition-all shadow-sm hover:shadow-md
            "
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-2 flex items-center gap-2">
          
          Refund Policy
        </h1>

        <p className="text-neutral-400 text-xs mb-10">
          Instant delivery • Operator‑verified refunds • Secure processing
        </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Overview</h2>
            <p className="text-neutral-300">
              Redatacom processes airtime, data, bundle, and eSIM transactions instantly.
              Because value is delivered immediately to the operator, most transactions are
              final and non‑refundable.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. When Refunds Are Possible</h2>
            <p className="text-neutral-300">
              Refunds may be issued only when:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>The operator confirms that no value was delivered</li>
              <li>The transaction failed due to a technical error</li>
              <li>The payment was charged but the recharge was not completed</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Non‑Refundable Situations</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>Incorrect phone number entered</li>
              <li>Incorrect operator or country selected</li>
              <li>Successful delivery confirmed by operator</li>
              <li>eSIM QR code already activated</li>
              <li>Wallet top‑ups (non‑withdrawable)</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Refund Processing Time</h2>
            <p className="text-neutral-300">
              Refunds are processed within 1–7 business days depending on your bank or
              payment provider.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. How to Request a Refund</h2>
            <p className="text-neutral-300">
              To request a refund, contact our support team with your reference number:
            </p>
            <p className="mt-2 font-medium text-purple-300 text-lg">
              support@redatacom.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
