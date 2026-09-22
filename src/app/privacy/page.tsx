"use client";

export default function PrivacyPage() {
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
          <img src="/logo-privacy.png" alt="Redatacom" className="h-10 opacity-90" />
          Privacy Notice
        </h1>

        {/* SUBTITLE */}
        <p className="text-neutral-400 text-xs mb-10">
          Updated: {new Date().toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
            <p>
              Redatacom respects your privacy and is committed to protecting your personal
              information. This Privacy Notice explains how we collect, use, store, and
              safeguard your data when you use our website, mobile services, or any related
              platform (“Services”).
            </p>
            <p className="mt-2">
              By using Redatacom, you agree to the practices described in this Privacy
              Notice.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Who We Are</h2>
            <p>
              Redatacom is a global digital platform that enables users to send prepaid
              mobile Airtime, Data Bundles & other digital top‑ups worldwide.
            </p>

            <p className="mt-2">
              For the limited information we collect directly (such as phone numbers and
              transaction details), we act as a <strong>data controller</strong>.
              For payment card information, our payment partner acts as an independent
              controller and we never see or store your full card details.
            </p>

            <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
              <img src="/logo-ar.png" alt="Redatacom" className="h-10 opacity-90" />
              <li>3 Narmada Street, Crown North</li>
              <li>Johannesburg, Gauteng</li>
              <li>Republic of South Africa</li>
              <li>2024/ 101 823 /07</li>
              <li>support@redatacom.com</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. What Information We Collect</h2>
            <p>
              We intentionally collect only the minimum information required to complete
              your recharge and operate our Services.
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Recharge details:</strong> recipient phone number, selected country,
                operator, and product (airtime/data/bundle).
              </li>
              <li>
                <strong>Transaction details:</strong> transaction reference, amount,
                currency, operator, timestamps, and status (success/failed).
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser type, device
                information, and basic usage data used for security, fraud prevention, and
                service reliability.
              </li>
              <li>
                <strong>Support interactions:</strong> messages you send to us (for example
                via email or support forms).
              </li>
            </ul>

            <p className="mt-2">
              We do <strong>not</strong> collect or store your full payment card number,
              CVV, or 3‑D Secure authentication data. This is handled securely by our
              payment partner.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. How We Collect Your Data</h2>
            <p>We collect data in the following ways:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Information you provide directly:</strong> when you enter a phone
                number, select a country/operator/product, or contact support.
              </li>
              <li>
                <strong>Information collected automatically:</strong> IP address, device
                and usage data for security, analytics, and reliability.
              </li>
              <li>
                <strong>Information from third‑party partners:</strong> payment status
                updates and delivery confirmations from our recharge partners.
              </li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. How We Use Your Data</h2>
            <p>We use your personal data to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Process and deliver mobile top‑ups to the correct phone number.</li>
              <li>Send confirmations, receipts, and service notifications.</li>
              <li>Provide customer support and resolve issues.</li>
              <li>Improve platform reliability and user experience.</li>
              <li>Prevent fraud and secure our systems.</li>
              <li>Comply with legal and regulatory obligations.</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Legal Basis for Processing</h2>
            <p>We process your data based on:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Performance of a contract (processing your recharge).</li>
              <li>Legitimate interests (fraud prevention, service improvement).</li>
              <li>Legal obligations (financial compliance, record‑keeping).</li>
              <li>Your consent (where required by law).</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">7. Sharing Your Data</h2>
            <p>We share your data only with trusted partners where necessary:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Payment processors:</strong> handle payments securely and act as
                independent controllers for card data.
              </li>
              <li>
                <strong>Recharge partners & mobile operators:</strong> deliver airtime/data
                to the correct number.
              </li>
              <li>
                <strong>Fraud prevention providers:</strong> protect our platform from
                abuse.
              </li>
              <li>
                <strong>Customer support tools:</strong> manage support requests.
              </li>
              <li>
                <strong>Regulators or law enforcement:</strong> when legally required.
              </li>
            </ul>

            <p className="mt-2">We never sell your personal data.</p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">8. International Transfers</h2>
            <p>
              Some partners may operate outside your country. When this happens, we ensure
              your data is protected using encryption, access controls, and contractual
              safeguards.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">9. Data Security</h2>
            <p>
              We use industry‑standard security measures to protect your data from
              unauthorized access, loss, or misuse. However, no online service can be
              completely secure, and you should take care when sharing information online.
            </p>
          </section>

          {/* SECTION 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">10. Data Retention</h2>
            <p>
              We keep your data only as long as necessary to provide our Services, comply
              with legal and regulatory requirements, and resolve disputes. After that, we
              delete, anonymize, or securely archive it.
            </p>
          </section>

          {/* SECTION 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">11. Your Rights</h2>
            <p>You may have the right to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request corrections to inaccurate or incomplete data.</li>
              <li>Request deletion of your data (where applicable).</li>
              <li>Object to certain types of processing.</li>
              <li>Request data portability.</li>
              <li>Withdraw consent (where applicable).</li>
            </ul>

            <p className="mt-2">
              You can exercise these rights by contacting us. We may need to verify your
              identity before responding.
            </p>
          </section>

          {/* SECTION 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">12. Contact Us</h2>
            <p>For privacy questions, concerns, or requests, contact:</p>
            <p className="mt-2 font-medium text-purple-300 text-lg">
              privacy@redatacom.com
            </p>
          </section>

          {/* SECTION 13 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">13. Updates to This Notice</h2>
            <p>
              We may update this Privacy Notice from time to time. When we do, we will
              update the “Last Updated” date at the top of this page. We encourage you to
              review this page periodically to stay informed about how we protect your
              data.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
