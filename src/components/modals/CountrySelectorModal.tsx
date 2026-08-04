"use client";

export function CountrySelectorModal({ open, onClose, onSelectCountry }) {
  if (!open) return null;

  const countries = [
    { name: "South Africa", iso2: "ZA", flag: "🇿🇦" },
    { name: "United Arab Emirates", iso2: "AE", flag: "🇦🇪" },
    { name: "Qatar", iso2: "QA", flag: "🇶🇦" },
    { name: "United States", iso2: "US", flag: "🇺🇸" },
    { name: "United Kingdom", iso2: "GB", flag: "🇬🇧" },
    { name: "Singapore", iso2: "SG", flag: "🇸🇬" },
  ];

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white/90 rounded-3xl shadow-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Select Country</h2>

        <div className="flex flex-col gap-2">
          {countries.map((c) => (
            <button
              key={c.iso2}
              onClick={() => onSelectCountry(c)}
              className="flex items-center gap-3 p-3 rounded-xl border hover:bg-purple-50"
            >
              <span className="text-xl">{c.flag}</span>
              <span className="font-medium">{c.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-xl bg-neutral-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
