"use client";

export default function CookiesPage() {
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
          
          Cookie Policy
        </h1>

        <p className="text-neutral-400 text-xs mb-10">
          How we use cookies • Why they matter • Your choices
        </p>

        {/* CONTENT */}
        <div className="space-y-10 leading-relaxed">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. What Are Cookies?</h2>
            <p className="text-neutral-300">
              Cookies are small text files stored on your device to help websites function
              properly, improve user experience, and enhance security.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. How Redatacom Uses Cookies</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li>Remembering your preferences</li>
              <li>Improving platform performance</li>
              <li>Enhancing security and fraud detection</li>
              <li>Analyzing usage patterns</li>
              <li>Supporting essential site functionality</li>
            </ul>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Types of Cookies We Use</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-neutral-300">
              <li><strong>Essential Cookies:</strong> Required for core functionality.</li>
              <li><strong>Performance Cookies:</strong> Improve speed and reliability.</li>
              <li><strong>Security Cookies:</strong> Detect fraud and protect accounts.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand usage trends.</li>
            </ul>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Managing Cookies</h2>
            <p className="text-neutral-300">
              You can disable cookies in your browser settings. However, some features may
              not function correctly without essential cookies.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Updates to This Policy</h2>
            <p className="text-neutral-300">
              We may update this Cookie Policy from time to time. Continued use of the
              platform means you accept the updated policy.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
