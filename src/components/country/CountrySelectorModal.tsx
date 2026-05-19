"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (country: any) => void;
  countries: any[];
}

export function CountrySelectorModal({ open, onClose, onSelect, countries }: Props) {
  if (!open) return null;

  // Sort alphabetically
  const sorted = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      <div className="w-full md:max-w-md bg-neutral-100 rounded-t-2xl md:rounded-2xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-700">Select Country</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
            ✕
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {sorted.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onSelect(c);   // <-- returns full country object including dialCode
                onClose();
              }}
              className="w-full flex items-center justify-between bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm hover:bg-neutral-200 transition"
            >
              <span className="flex items-center gap-2">
                <img src={c.flag} className="h-5 w-5 rounded-sm" />
                <span className="text-neutral-800">{c.name}</span>
              </span>
              <span className="text-neutral-400">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
