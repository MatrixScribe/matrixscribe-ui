"use client";

interface CurrencyBadgeProps {
  currency: string | null | undefined;
}

export default function CurrencyBadge({ currency }: CurrencyBadgeProps) {
  if (!currency) {
    return (
      <span className="
        px-2 py-1 text-[10px] rounded-md 
        bg-neutral-300 text-neutral-700 opacity-70
      ">
        N/A
      </span>
    );
  }

  return (
    <span
      className="
        px-2 py-1 text-[20px] font-bold
        bg-ffff opacity-90 text-green-300
      "
    >
      {currency}
    </span>
  );
}
