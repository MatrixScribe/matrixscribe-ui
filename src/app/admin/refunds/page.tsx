"use client";

export default function AdminRefunds() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Refunds</h1>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <label className="block text-sm font-medium">Transaction ID</label>
        <input
          type="text"
          placeholder="Enter transaction ID"
          className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none"
        />

        <button className="rounded-xl bg-red-500 text-white py-2.5 text-sm font-semibold hover:bg-red-400 transition">
          Process Refund
        </button>
      </div>
    </div>
  );
}
