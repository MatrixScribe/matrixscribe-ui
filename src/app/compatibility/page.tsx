"use client";

const brands = [
  "Apple",
  "Samsung",
  "Google",
  "Huawei",
  "Xiaomi",
  "Oppo",
  "Motorola",
  "Sony",
  "Microsoft",
  "Lenovo",
  "HP",
  "Dell",
  "Nothing",
  "Fairphone",
  "Honor",
];

export default function CompatibilityPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0f] text-neutral-200 px-6 py-10 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 transition"
          >
            <img src="/favicon.ico" className="h-10 w-10 object-contain" />
          </button>

          <button
            onClick={() => (window.location.href = "/topup")}
            className="px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl text-white text-sm hover:bg-purple-700 transition"
          >
            Recharge
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-300 mb-2">
          eSIM Compatibility
        </h1>

        <p className="text-neutral-400 text-xs mb-10">
          These brands manufacture devices that commonly support eSIM technology.
        </p>

        {/* BRAND GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="
                bg-white/5 border border-white/10 rounded-xl p-4 
                backdrop-blur-xl shadow flex flex-col items-center 
                hover:bg-purple-900/20 hover:border-purple-400 
                transition
              "
            >
              <p className="text-sm font-medium text-white">{brand}</p>
            </div>
          ))}
        </div>

        {/* DISCLAIMER */}
        <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl">
          <p className="text-neutral-300 text-xs leading-relaxed">
            <strong className="text-white">Disclaimer:</strong>  
            Device compatibility varies by model, region, and carrier.  
            This list represents brands that commonly manufacture eSIM‑capable devices,  
            but <span className="text-red-300">we cannot guarantee that every device from these brands supports eSIM</span>.  
            Please check your device settings or manufacturer documentation for confirmation.
          </p>
        </div>

      </div>
    </main>
  );
}
