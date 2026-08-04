"use client";

interface Tx {
  amount: number;
  currency: string;
  type: "topup" | "spend";
  timestamp: string;
  method?: string;
}

interface WalletHistoryProps {
  transactions: Tx[];
}

export function WalletHistory({ transactions }: WalletHistoryProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <p className="text-neutral-500 text-center">
        No wallet transactions yet.
      </p>
    );
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((tx, index) => {
        const isCredit = tx.type === "topup";

        return (
          <div
            key={index}
            className="
              p-4 rounded-2xl border border-neutral-300
              bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <p
                className={`text-lg font-semibold ${
                  isCredit ? "text-green-700" : "text-red-700"
                }`}
              >
                {isCredit ? "+" : "-"} {tx.currency} {tx.amount.toFixed(2)}
              </p>

              <p className="text-sm text-neutral-600">
                {new Date(tx.timestamp).toLocaleDateString()}
              </p>
            </div>

            <p className="text-sm text-neutral-700 mt-1 capitalize">
              {tx.type} — {tx.method || "system"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
