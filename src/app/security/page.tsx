"use client";

export default function SecurityPage() {
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
          
          Security & Compliance
        </h1>

        <p className="text-neutral-400 text-xs mb-10">
          Protecting your data • Securing your transactions • Ensuring global compliance
        </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Our Security Commitment</h2>
            <p className="text-neutral-300">
              Redatacom is built with a security‑first architecture. Every recharge, eSIM
              activation, and wallet transaction is protected by industry‑standard
              encryption, fraud monitoring, and secure routing through trusted telecom
              partners.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Encryption & Data Protection</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>All data is encrypted in transit (TLS 1.2+)</li>
              <li>All sensitive data is encrypted at rest</li>
              <li>No full card numbers or CVV are ever stored</li>
              <li>Secure payment gateways handle all card processing</li>
              <li>Strict access controls protect internal systems</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Fraud Prevention</h2>
            <p className="text-neutral-300">
              Redatacom uses automated and manual fraud‑detection systems to protect users
              and operators from abuse.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>IP and device fingerprinting</li>
              <li>Velocity checks</li>
              <li>Transaction pattern analysis</li>
              <li>Blacklist & threat‑intelligence monitoring</li>
              <li>Manual review for suspicious activity</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Telecom Compliance</h2>
            <p className="text-neutral-300">
              Redatacom works with licensed telecom aggregators and operators worldwide.
              All routing, delivery, and operator integrations follow regional telecom
              regulations.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Payment Compliance</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>PCI‑DSS compliant payment processing</li>
              <li>3‑D Secure authentication where required</li>
              <li>Encrypted card tokenization</li>
              <li>Secure dispute handling</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Regulatory Compliance</h2>
            <p className="text-neutral-300">
              Redatacom complies with applicable data‑protection, telecom, and financial
              regulations in supported regions.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>POPIA (South Africa)</li>
              <li>GDPR (EU customers)</li>
              <li>Local telecom routing rules</li>
              <li>Financial record‑keeping requirements</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">7. Contact Security Team</h2>
            <p className="text-neutral-300">
              For security concerns or reports, contact:
            </p>
            <p className="mt-2 font-medium text-purple-300 text-lg">
              security@redatacom.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
