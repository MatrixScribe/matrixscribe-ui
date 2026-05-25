"use client";

export default function PrivacyPage() {
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
        <h1 className="text-xl font-bold text-purple-900 mb-1 flex items-center gap-2">
          <img src="/logo-privacy.png" alt="Redatacom" className="h-10 opacity-90" />
        </h1>

        {/* SUBTITLE */}
        <div className="mb-6">
          <p className="text-neutral-600 text-xs md:text-[10px] mt-0.5 flex items-center gap-1">
            <span className="text-emerald-500 font-semibold animate-pulse">
              Global
            </span>
            <span>Airtime | Data | Bundles | PIN</span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">1. Introduction</h2>
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">2. Who We Are</h2>
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">3. What Information We Collect</h2>
            <p>We intentionally collect only the minimum information required to complete your recharge and operate our Services.</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Recharge details:</strong> recipient phone number, selected country, operator, and product (airtime/data/bundle).
              </li>
              <li>
                <strong>Transaction details:</strong> transaction reference, amount, currency, operator, timestamps, and status (success/failed).
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser type, device information, and basic usage data used for security, fraud prevention, and service reliability.
              </li>
              <li>
                <strong>Support interactions:</strong> messages you send to us (for example via email or support forms).
              </li>
            </ul>

            <p className="mt-2">
              We do <strong>not</strong> collect or store your full payment card number, CVV, or 3‑D Secure authentication data. This is handled securely by our payment partner.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">4. How We Collect Your Data</h2>
            <p>We collect data in the following ways:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Information you provide directly:</strong> for example, when you enter a phone number, select a country/operator/product, or contact support.
              </li>
              <li>
                <strong>Information collected automatically:</strong> such as IP address, device and usage data for security, analytics, and service reliability.
              </li>
              <li>
                <strong>Information from third‑party partners:</strong> such as payment status updates from our payment processor and delivery status from our recharge partners.
              </li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">5. How We Use Your Data</h2>
            <p>We use your personal data to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Process and deliver mobile top‑ups to the correct phone number and operator.</li>
              <li>Send confirmations, receipts, and relevant service notifications.</li>
              <li>Provide customer support and resolve issues.</li>
              <li>Improve our platform, reliability, and user experience.</li>
              <li>Prevent fraud, abuse, and secure our systems.</li>
              <li>Comply with legal, regulatory, and accounting obligations.</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">6. Legal Basis for Processing</h2>
            <p>We process your data based on:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Performance of a contract (processing your top‑up and delivering the service).</li>
              <li>Legitimate interests (fraud prevention, service improvement, security).</li>
              <li>Legal obligations (financial compliance, record‑keeping, regulatory requirements).</li>
              <li>Your consent (where required by law, for example certain marketing or cookies).</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">7. Sharing Your Data</h2>
            <p>We share your data only with trusted partners where necessary to provide the Service:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <strong>Payment processors:</strong> to handle payments securely. They receive payment details directly from you and act as independent controllers for card data.
              </li>
              <li>
                <strong>Recharge partners and mobile operators:</strong> to deliver airtime and data to the correct phone number and network.
              </li>
              <li>
                <strong>Fraud prevention and security providers:</strong> to protect our platform and users from abuse and fraud.
              </li>
              <li>
                <strong>Customer support tools:</strong> to manage and respond to your support requests.
              </li>
              <li>
                <strong>Regulators or law enforcement:</strong> when we are legally required to do so.
              </li>
            </ul>

            <p className="mt-2">
              We never sell your personal data.
            </p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">8. International Transfers</h2>
            <p>
              Some partners may operate outside your country. When this happens, we ensure
              your data is protected using appropriate safeguards such as encryption,
              access controls, and contractual protections.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">9. Data Security</h2>
            <p>
              We use industry‑standard security measures to protect your data from
              unauthorized access, loss, or misuse. However, no online service can be
              completely secure, and you should take care when sharing information online.
            </p>
          </section>

          {/* SECTION 10 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">10. Data Retention</h2>
            <p>
              We keep your data only as long as necessary to provide our Services, comply
              with legal and regulatory requirements, and resolve disputes. After that, we
              delete, anonymize, or securely archive it.
            </p>
          </section>

          {/* SECTION 11 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">11. Your Rights</h2>
            <p>You may have the right to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request corrections to inaccurate or incomplete data.</li>
              <li>Request deletion of your data (where applicable).</li>
              <li>Object to certain types of processing.</li>
              <li>Request data portability (where applicable).</li>
              <li>Withdraw consent (where processing is based on consent).</li>
            </ul>

            <p className="mt-2">
              You can exercise these rights by contacting us using the details below. We may
              need to verify your identity before responding to your request.
            </p>
          </section>

          {/* SECTION 12 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">12. Contact Us</h2>
            <p>
              For privacy questions, concerns, or requests, contact:
            </p>
            <p className="mt-2 font-medium text-purple-700">
              privacy@redatacom.com
            </p>
          </section>

          {/* SECTION 13 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">13. Updates to This Notice</h2>
            <p>
              We may update this Privacy Notice from time to time. When we do, we will
              update the “Last Updated” date at the top of this page. We encourage you to
              review this page periodically to stay informed about how we protect your data.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
