"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Database,
  Globe,
  Bell,
  Layers,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const nav = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Entity Explorer", href: "/explorer", icon: Search },
    { label: "Entities", href: "/entities", icon: Layers },
    { label: "Alerts", href: "/alerts", icon: Bell },
    { label: "Datasets", href: "/datasets", icon: Database },
    { label: "Sources", href: "/sources", icon: Globe },
  ];

  return (
    <aside
      className={`
        fixed md:static z-40 inset-y-0 left-0
        ${collapsed ? "w-20" : "w-64"}
        bg-surface border-r border-surface-border shadow-subtle
        transform transition-all duration-200
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-surface-border">
        {!collapsed && (
          <span className="font-medium text-charcoal">MatrixScribe</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-charcoal-light hover:text-charcoal transition"
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 text-sm flex-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded transition
                ${
                  active
                    ? "bg-surface-muted text-charcoal font-medium"
                    : "hover:bg-surface-muted text-charcoal-light"
                }
              `}
            >
              <Icon size={18} />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout pinned bottom */}
      <div className="p-4 border-t border-surface-border">
        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded text-sm
              text-charcoal-light hover:text-charcoal hover:bg-surface-muted
            `}
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </form>
      </div>
    </aside>
  );
}
