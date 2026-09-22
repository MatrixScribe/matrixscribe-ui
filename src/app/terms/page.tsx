"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10">
      <div className="max-w-3xl mx-auto">

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
            <img
              src="/favicon.ico"
              alt="Home"
              className="h-10 w-10 object-contain"
            />
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
          <img src="/logo-terms.png" alt="Redatacom" className="h-10 opacity-90" />
          Terms of Service
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
              Welcome to Redatacom (“we”, “our”, “us”). These Terms of Service govern your
              use of our website, mobile services, eSIM marketplace, wallet system, and
              international top‑up platform (“Services”). By accessing or using Redatacom,
              you agree to these Terms.
            </p>
            <p className="mt-2">
              If you do not agree, you must stop using Redatacom immediately.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. What Redatacom Provides</h2>
            <p>
              Redatacom enables users to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Purchase and activate eSIM plans</li>
              <li>Send prepaid mobile airtime and data bundles globally</li>
              <li>Use a secure wallet to store balance for future transactions</li>
              <li>Access telecom services across 150+ countries and 700+ operators</li>
            </ul>
            <p className="mt-2">
              Redatacom acts as a digital facilitator. All value delivered is fulfilled by
              the respective mobile operator or eSIM provider.
            </p>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Eligibility</h2>
            <p>
              You must be at least 18 years old to use Redatacom. By using our Services,
              you confirm that all information you provide is accurate, lawful, and not
              fraudulent.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Your Responsibility</h2>
            <p>
              You are responsible for ensuring that the mobile number, eSIM device,
              operator, country, and product you select are correct. Once a top‑up or eSIM
              activation is delivered, it cannot be reversed or refunded.
            </p>
            <p className="mt-2">
              Redatacom is not responsible for losses caused by incorrect details entered
              during checkout.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Pricing & Fees</h2>
            <p>
              All prices shown include operator costs, FX conversion, and applicable
              service fees. Final charges are displayed before payment. Prices may vary
              based on exchange rates, operator adjustments, or regional restrictions.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Payments</h2>
            <p>
              Payments are processed securely through trusted third‑party providers.
              Redatacom does not store full card details or sensitive payment information.
            </p>
            <p className="mt-2">
              By completing a transaction, you authorize Redatacom and its payment
              partners to charge your selected payment method.
            </p>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">7. Refund Policy</h2>
            <p>
              Because top‑ups and eSIM activations are delivered instantly and cannot be
              retrieved once applied, all successful transactions are final and
              non‑refundable.
            </p>
            <p className="mt-2">
              Refunds may only be issued if a transaction fails and the operator confirms
              that no value was delivered.
            </p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">8. Wallet Usage</h2>
            <p>
              Your Redatacom Wallet allows you to store balance for future purchases. Wallet
              funds are non‑withdrawable and may only be used within Redatacom.
            </p>
            <p className="mt-2">
              Fraudulent wallet activity may result in account suspension or verification
              requirements.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">9. Service Availability</h2>
            <p>
              Redatacom aims to provide 24/7 service, but we cannot guarantee uninterrupted
              access due to maintenance, operator outages, or external network issues.
            </p>
          </section>

          {/* SECTION 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">10. Fraud & Security</h2>
            <p>
              Redatacom monitors transactions for fraud. Suspicious activity may result in
              temporary holds, verification requests, or account restrictions.
            </p>
            <p className="mt-2">
              We reserve the right to refuse service if misuse is detected.
            </p>
          </section>

          {/* SECTION 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">11. Acceptable Use</h2>
            <p>You agree not to use Redatacom for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Illegal or fraudulent activity</li>
              <li>Abusive or harmful behavior</li>
              <li>Interfering with or disrupting our systems</li>
              <li>Submitting false or misleading information</li>
              <li>Attempting to reverse‑engineer or misuse the platform</li>
            </ul>
          </section>

          {/* SECTION 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">12. Limitation of Liability</h2>
            <p>
              Redatacom is not liable for indirect or consequential damages, including
              losses caused by incorrect numbers, operator delays, device incompatibility,
              or third‑party system failures.
            </p>
            <p className="mt-2">
              Our total liability is limited to the amount paid for the affected
              transaction.
            </p>
          </section>

          {/* SECTION 13 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">13. Changes to These Terms</h2>
            <p>
              Redatacom may update these Terms at any time. Continued use of the platform
              after changes are published means you accept the updated terms.
            </p>
          </section>

          {/* SECTION 14 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">14. Contact Us</h2>
            <p>
              For support or questions, contact Redatacom Support:
            </p>
            <p className="mt-2 font-medium text-purple-300">
              support@redatacom.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
