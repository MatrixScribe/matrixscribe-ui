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
              mobile airtime, data bundles, and digital top‑ups worldwide.
            </p>
            <p className="mt-2">
              We act as a data controller for the information we collect.  
              <br />
              <strong>You will fill in your company details here:</strong>
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
              <li>Registered business name</li>
              <li>Registered address</li>
              <li>Company registration number</li>
              <li>Data protection contact email</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">3. What Information We Collect</h2>
            <p>We may collect the following types of personal data:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Contact details:</strong> name, email, phone number</li>
              <li><strong>Payment details:</strong> cardholder name, masked card info, billing address</li>
              <li><strong>Transaction details:</strong> amounts, operators, timestamps</li>
              <li><strong>Device data:</strong> IP address, browser type, device identifiers</li>
              <li><strong>Usage data:</strong> pages visited, actions taken, preferences</li>
              <li><strong>Support interactions:</strong> messages, complaints, feedback</li>
              <li><strong>Recipient details:</strong> mobile number or email of the person receiving a top‑up</li>
            </ul>

            <p className="mt-2">
              We only collect the minimum information required to deliver our Services.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">4. How We Collect Your Data</h2>
            <p>We collect data in three ways:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Information you provide directly (e.g., during checkout)</li>
              <li>Information collected automatically (e.g., device and usage data)</li>
              <li>Information from third‑party partners (e.g., payment processors)</li>
            </ul>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">5. How We Use Your Data</h2>
            <p>We use your personal data to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Process and deliver mobile top‑ups</li>
              <li>Send confirmations and receipts</li>
              <li>Provide customer support</li>
              <li>Improve our platform and user experience</li>
              <li>Prevent fraud and secure our systems</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">6. Legal Basis for Processing</h2>
            <p>We process your data based on:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Performance of a contract (processing your top‑up)</li>
              <li>Legitimate interests (fraud prevention, service improvement)</li>
              <li>Legal obligations (financial compliance, record‑keeping)</li>
              <li>Your consent (where required)</li>
            </ul>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">7. Sharing Your Data</h2>
            <p>We may share your data with:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Mobile operators and telecom partners</li>
              <li>Payment processors</li>
              <li>Fraud prevention and security providers</li>
              <li>Customer support tools</li>
              <li>Regulators or law enforcement (when legally required)</li>
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
              your data is protected using appropriate safeguards such as encryption and
              contractual protections.
            </p>
          </section>

          {/* SECTION 9 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">9. Data Security</h2>
            <p>
              We use industry‑standard security measures to protect your data from
              unauthorized access, loss, or misuse. However, no online service can be
              completely secure.
            </p>
          </section>

          {/* SECTION 10 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">10. Data Retention</h2>
            <p>
              We keep your data only as long as necessary to provide our Services and meet
              legal requirements. After that, we delete, anonymize, or securely archive it.
            </p>
          </section>

          {/* SECTION 11 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">11. Your Rights</h2>
            <p>You may have the right to:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Request corrections</li>
              <li>Request deletion (where applicable)</li>
              <li>Object to certain processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>

            <p className="mt-2">
              You can exercise these rights by contacting us.
            </p>
          </section>

          {/* SECTION 12 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">12. Contact Us</h2>
            <p>
              For privacy questions or requests, contact:
            </p>
            <p className="mt-2 font-medium text-purple-700">
              privacy@redatacom.com
            </p>
            <p className="text-sm mt-1">
              (You will fill in your official address and DPO details here.)
            </p>
          </section>

          {/* SECTION 13 */}
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">13. Updates to This Notice</h2>
            <p>
              We may update this Privacy Notice from time to time. When we do, we will
              update the “Last Updated” date at the top of this page.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
