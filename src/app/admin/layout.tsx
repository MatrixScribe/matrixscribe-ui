"use client";

import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 space-y-6">
        <div className="text-lg font-semibold tracking-tight">Admin Panel</div>

        <nav className="space-y-2 text-sm">
          <Link href="/admin" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Dashboard
          </Link>
          <Link href="/admin/operators" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Operators
          </Link>
          <Link href="/admin/products" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Products
          </Link>
          <Link href="/admin/fees" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Fee Engine
          </Link>
          <Link href="/admin/fx" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            FX Engine
          </Link>
          <Link href="/admin/transactions" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Transactions
          </Link>
          <Link href="/admin/ledger" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Wallet Ledger
          </Link>
          <Link href="/admin/refunds" className="block px-3 py-2 rounded-lg hover:bg-neutral-100">
            Refunds
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <section className="flex-1 p-10">{children}</section>
    </main>
  );
}
