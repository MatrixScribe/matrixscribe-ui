"use client";

import Link from "next/link";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside
      className={`
        fixed z-40 inset-y-0 left-0 w-64 bg-surface border-r border-surface-border shadow-subtle
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="h-14 flex items-center px-4 border-b border-surface-border">
        <span className="font-medium text-charcoal">MatrixScribe</span>
      </div>

      <nav className="p-4 space-y-2 text-sm">
        <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Dashboard
        </Link>
        <Link href="/explorer" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Explorer
        </Link>
        <Link href="/entity" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Entities
        </Link>
        <Link href="/alerts" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Alerts
        </Link>
        <Link href="/datasets" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Datasets
        </Link>
        <Link href="/sources" className="block px-3 py-2 rounded hover:bg-surface-muted">
          Sources
        </Link>
      </nav>
    </aside>
  );
}
