"use client";

interface Country {
  name: string;
  iso2: string;
  flag: string;
  dialCode?: string;
}

interface CountrySelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  countries: Country[];
}

export function CountrySelectorModal({
  open,
  onClose,
  onSelect,
  countries,
}: CountrySelectorModalProps) {
  if (!open) return null;

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
          {countries.map((c: Country) => (
            <button
              key={c.iso2}
              onClick={() => onSelect(c)}
              className="flex items-center gap-3 p-3 rounded-xl border hover:bg-purple-50"
            >
              <img src={c.flag} className="h-6 w-6 rounded-md" />
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
