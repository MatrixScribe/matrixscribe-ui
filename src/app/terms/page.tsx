"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-10">
      <div className="max-w-3xl mx-auto">

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
          <img src="/logo-terms.png" alt="Redatacom" className="h-20 opacity-90" />
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
              Welcome to Redatacom. By using our website, mobile services, or any related
              platform (“Services”), you agree to these Terms & Conditions. These terms
              exist to keep our platform safe, transparent, and fair for everyone.
            </p>
            <p className="mt-2">
              If you do not agree with these Terms, you should stop using Redatacom
              immediately.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">2. What Redatacom Provides</h2>
            <p>
              Redatacom enables users to send prepaid mobile airtime, data bundles, and
              digital top‑ups to supported operators worldwide. We act as a digital
              facilitator between you and global telecom networks.
            </p>
            <p className="mt-2">
              Redatacom does not own or operate any mobile networks. All value delivered
              is fulfilled by the respective mobile operator.
            </p>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">3. Eligibility</h2>
            <p>
              You must be at least 18 years old to use Redatacom. By using our Services,
              you confirm that all information you provide is accurate and lawful.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">4. Your Responsibility</h2>
            <p>
              You are responsible for ensuring that the mobile number, operator, country,
              and product you select are correct. Once a top‑up is delivered, it cannot be
              reversed or refunded.
            </p>
            <p className="mt-2">
              Redatacom is not responsible for losses caused by incorrect details entered
              during checkout.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">5. Pricing & Fees</h2>
            <p>
              All prices shown include operator costs, FX conversion, and applicable
              service fees. Final charges are displayed before payment. Prices may vary
              based on exchange rates or operator adjustments.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">6. Payments</h2>
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
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">7. Refund Policy</h2>
            <p>
              Because top‑ups are delivered instantly and cannot be retrieved once applied
              to a mobile number, all successful transactions are final and non‑refundable.
            </p>
            <p className="mt-2">
              Refunds may only be issued if a transaction fails and the operator confirms
              that no value was delivered.
            </p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">8. Service Availability</h2>
            <p>
              Redatacom aims to provide 24/7 service, but we cannot guarantee uninterrupted
              access due to maintenance, operator outages, or external network issues.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">9. Fraud & Security</h2>
            <p>
              Redatacom monitors transactions for fraud. Suspicious activity may result in
              temporary holds, verification requests, or account restrictions.
            </p>
          </section>

          {/* SECTION 10 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">10. Acceptable Use</h2>
            <p>You agree not to use Redatacom for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Illegal or fraudulent activity</li>
              <li>Abusive or harmful behavior</li>
              <li>Interfering with or disrupting our systems</li>
              <li>Submitting false or misleading information</li>
            </ul>
          </section>

          {/* SECTION 11 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">11. Limitation of Liability</h2>
            <p>
              Redatacom is not liable for indirect or consequential damages, including
              losses caused by incorrect numbers, operator delays, or third‑party system
              failures.
            </p>
            <p className="mt-2">
              Our total liability is limited to the amount paid for the affected
              transaction.
            </p>
          </section>

          {/* SECTION 12 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">12. Changes to These Terms</h2>
            <p>
              Redatacom may update these Terms at any time. Continued use of the platform
              after changes are published means you accept the updated terms.
            </p>
          </section>

          {/* SECTION 13 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">13. Contact Us</h2>
            <p>
              For support or questions, contact Redatacom Support:
            </p>
            <p className="mt-2 font-medium text-purple-700">
              support@redatacom.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
