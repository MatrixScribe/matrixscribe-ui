"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (product: any) => void;
  productType: string;
}

export function ProductSelectorModal({ open, onClose, onSelect, productType }: Props) {
  if (!open) return null;

  const products = {
    airtime: [
      { name: "Airtime $5", amount: 5 },
      { name: "Airtime $10", amount: 10 },
      { name: "Airtime $20", amount: 20 },
    ],
    data: [
      { name: "1GB Data", amount: 3 },
      { name: "3GB Data", amount: 7 },
      { name: "5GB Data", amount: 10 },
    ],
    utilities: [
      { name: "Electricity Token $10", amount: 10 },
      { name: "Electricity Token $20", amount: 20 },
    ],
  };

  const list = products[productType] || [];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center z-50">
      <div className="w-full md:max-w-md bg-neutral-100 rounded-t-2xl md:rounded-2xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-700">
            Select {productType.charAt(0).toUpperCase() + productType.slice(1)}
          </h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
            ✕
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {list.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                onSelect(p);
                onClose();
              }}
              className="w-full flex items-center justify-between bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm hover:bg-neutral-200 transition"
            >
              <span className="text-neutral-800">{p.name}</span>
              <span className="text-neutral-500">${p.amount}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
