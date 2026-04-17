"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type WorkspaceTab = {
  id: string;
  label: string;
  href: string;
  type: "entity" | "dataset" | "explorer" | "alert";
  pinned?: boolean;
};

type WorkspaceSnapshot = {
  name: string;
  tabs: WorkspaceTab[];
  active: string | null;
};

type WorkspaceContextType = {
  tabs: WorkspaceTab[];
  active: string | null;
  addTab: (tab: WorkspaceTab) => void;
  closeTab: (id: string) => void;
  setActive: (id: string) => void;
  setTabs: (tabs: WorkspaceTab[]) => void;
  togglePin: (id: string) => void;
  saveSnapshot: (name: string) => void;
  loadSnapshot: (name: string) => void;
  listSnapshots: () => WorkspaceSnapshot[];
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

// Later, you can make this user-specific (e.g. include user id)
const PROFILE_KEY = "default-profile";
const STORAGE_KEY = `matrixscribe-workspace-tabs-${PROFILE_KEY}`;
const SNAPSHOT_KEY = `matrixscribe-workspace-snapshots-${PROFILE_KEY}`;

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabsState] = useState<WorkspaceTab[]>([]);
  const [active, setActive] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { tabs: WorkspaceTab[]; active: string | null };
      setTabsState(parsed.tabs || []);
      setActive(parsed.active || null);
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tabs, active })
    );
  }, [tabs, active]);

  function setTabs(next: WorkspaceTab[]) {
    setTabsState(next);
  }

  function addTab(tab: WorkspaceTab) {
    setTabsState((prev) => {
      if (prev.find((t) => t.id === tab.id)) return prev;
      return [...prev, tab];
    });
    setActive(tab.id);
  }

  function closeTab(id: string) {
    setTabsState((prev) => prev.filter((t) => t.id !== id));
    setActive((current) => {
      if (current !== id) return current;
      const remaining = tabs.filter((t) => t.id !== id);
      return remaining.length ? remaining[remaining.length - 1].id : null;
    });
  }

  function togglePin(id: string) {
    setTabsState((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, pinned: !t.pinned } : t
      )
    );
  }

  function listSnapshots(): WorkspaceSnapshot[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as WorkspaceSnapshot[];
    } catch {
      return [];
    }
  }

  function saveSnapshot(name: string) {
    if (!name) return;
    const existing = listSnapshots();
    const next: WorkspaceSnapshot[] = [
      ...existing.filter((s) => s.name !== name),
      { name, tabs, active },
    ];
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(next));
    }
  }

  function loadSnapshot(name: string) {
    const existing = listSnapshots();
    const snap = existing.find((s) => s.name === name);
    if (!snap) return;
    setTabsState(snap.tabs || []);
    setActive(snap.active || null);
  }

  return (
    <WorkspaceContext.Provider
      value={{
        tabs,
        active,
        addTab,
        closeTab,
        setActive,
        setTabs,
        togglePin,
        saveSnapshot,
        loadSnapshot,
        listSnapshots,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("WorkspaceContext missing");
  return ctx;
}
