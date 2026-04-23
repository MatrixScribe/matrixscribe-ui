"use client";

export function OperatorGrid({
  operators,
  onSelect,
}: {
  operators: any[];
  onSelect: (op: any) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {operators.map((op) => (
        <button
          key={op.id}
          onClick={() => onSelect(op)}
          className="rounded-xl border border-slate-300 dark:border-slate-700 
                     bg-slate-100 dark:bg-slate-800 p-4 flex flex-col items-center 
                     hover:border-emerald-400/70 transition"
        >
          <div className="text-3xl mb-2">{op.logo}</div>
          <div className="text-sm font-medium text-center">{op.name}</div>
        </button>
      ))}
    </div>
  );
}
