"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import CommandPalette from "@/app/components/CommandPalette";
import UserMenu from "@/app/components/UserMenu";
import ThemeToggle from "@/app/components/ThemeToggle";
import HelpPanel from "@/app/components/HelpPanel";
import NotificationsTray from "@/app/components/NotificationsTray";
import QuickActionsBar from "@/app/components/QuickActionsBar";
import WorkspaceTabs from "@/app/components/WorkspaceTabs";

import EntityQuickSwitcher from "@/app/components/EntityQuickSwitcher";
import DatasetQuickSwitcher from "@/app/components/DatasetQuickSwitcher";

import { WorkspaceProvider, useWorkspace } from "@/app/context/WorkspaceContext";

function ShellInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [entitySwitchOpen, setEntitySwitchOpen] = useState(false);
  const [datasetSwitchOpen, setDatasetSwitchOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const workspace = useWorkspace();

  // Auto-add tabs on navigation
  useEffect(() => {
    if (!pathname) return;

    if (pathname.startsWith("/entity/")) {
      const slug = pathname.split("/")[2];
      workspace.addTab({
        id: `entity-${slug}`,
        label: `Entity: ${slug}`,
        href: pathname,
        type: "entity",
      });
    }

    if (pathname.startsWith("/datasets/")) {
      const id = pathname.split("/")[2];
      workspace.addTab({
        id: `dataset-${id}`,
        label: `Dataset: ${id}`,
        href: pathname,
        type: "dataset",
      });
    }
  }, [pathname]);

  // Keyboard shortcuts
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      // Cmd+K / Ctrl+K → Command Palette
      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }

      // Cmd+Shift+E → Entity Quick Switcher
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === "e") {
        e.preventDefault();
        setEntitySwitchOpen(true);
        return;
      }

      // Cmd+Shift+D → Dataset Quick Switcher
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === "d") {
        e.preventDefault();
        setDatasetSwitchOpen(true);
        return;
      }

      // F1 → Help Panel
      if (e.key === "F1") {
        e.preventDefault();
        setHelpOpen(true);
        return;
      }

      // G then X navigation
      if (key === "g") {
        let next = true;

        const listener = (ev: KeyboardEvent) => {
          if (!next) return;
          next = false;

          const k = ev.key.toLowerCase();
          if (k === "d") router.push("/dashboard");
          if (k === "e") router.push("/explorer");
          if (k === "a") router.push("/alerts");
          if (k === "m") router.push("/datasets");
          if (k === "s") router.push("/sources");

          window.removeEventListener("keydown", listener);
        };

        window.addEventListener("keydown", listener);
      }

      // Ctrl+Tab → Next tab
      if (e.ctrlKey && !e.shiftKey && key === "tab") {
        e.preventDefault();
        const idx = workspace.tabs.findIndex((t) => t.id === workspace.active);
        const next = workspace.tabs[(idx + 1) % workspace.tabs.length];
        if (next) router.push(next.href);
      }

      // Ctrl+Shift+Tab → Previous tab
      if (e.ctrlKey && e.shiftKey && key === "tab") {
        e.preventDefault();
        const idx = workspace.tabs.findIndex((t) => t.id === workspace.active);
        const prev =
          workspace.tabs[(idx - 1 + workspace.tabs.length) % workspace.tabs.length];
        if (prev) router.push(prev.href);
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [workspace, router]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <WorkspaceTabs />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="h-14 flex items-center px-4 border-b border-surface-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-charcoal-light hover:text-charcoal"
          >
            ☰
          </button>

          <span className="ml-4 text-charcoal font-medium">MatrixScribe</span>

          <div className="ml-auto flex items-center gap-3">
            <NotificationsTray />
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        <main className="p-6">{children}</main>
      </div>

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
      <QuickActionsBar />

      <EntityQuickSwitcher
        open={entitySwitchOpen}
        onClose={() => setEntitySwitchOpen(false)}
      />

      <DatasetQuickSwitcher
        open={datasetSwitchOpen}
        onClose={() => setDatasetSwitchOpen(false)}
      />
    </div>
  );
}

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <ShellInner>{children}</ShellInner>
    </WorkspaceProvider>
  );
}
