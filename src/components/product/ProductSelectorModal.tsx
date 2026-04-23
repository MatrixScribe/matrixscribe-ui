"use client";

import { ProductType } from "@/hooks/useProductSelector";
import { mockProducts } from "@/data/mockProducts";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (product: any) => void;
  productType: ProductType;
}

export default function ProductSelectorModal({
  open,
  onClose,
  onSelect,
  productType,
}: Props) {
  if (!open) return null;

  const list = mockProducts[productType] || [];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end md:items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Select Product</h2>

        <div className="space-y-2">
          {list.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className="w-full text-left px-4 py-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-neutral-500">${item.amount}</div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-xl bg-neutral-200 text-neutral-700 font-medium hover:bg-neutral-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
