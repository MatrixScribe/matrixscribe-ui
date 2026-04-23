"use client";

export function ProductGrid({
  products,
  onSelect,
}: {
  products: any[];
  onSelect: (p: any) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className="rounded-xl border border-slate-300 dark:border-slate-700 
                     bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center 
                     hover:border-emerald-400/70 transition"
        >
          <div className="text-sm font-medium text-center">{p.name}</div>
          <div className="text-xs text-slate-500 mt-1">${p.amount}</div>
        </button>
      ))}
    </div>
  );
}
