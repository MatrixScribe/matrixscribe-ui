"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/app/context/WorkspaceContext";

type ContextMenuState = {
  x: number;
  y: number;
  tabId: string | null;
} | null;

export default function WorkspaceTabs() {
  const {
    tabs,
    active,
    setActive,
    closeTab,
    setTabs,
    togglePin,
    saveSnapshot,
    loadSnapshot,
    listSnapshots,
  } = useWorkspace();

  const router = useRouter();

  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [hoverTabId, setHoverTabId] = useState<string | null>(null);

  const pinned = tabs.filter((t) => t.pinned);
  const unpinned = tabs.filter((t) => !t.pinned);

  // Simple local metadata for previews (replace with real data later)
  const entityMeta: Record<
    string,
    { sentiment: string; lastUpdated: string; risk: string }
  > = {
    "entity-israel": { sentiment: "Mixed", lastUpdated: "5m ago", risk: "Elevated" },
    "entity-iran": { sentiment: "Negative", lastUpdated: "12m ago", risk: "High" },
    "entity-south-africa": { sentiment: "Mixed", lastUpdated: "30m ago", risk: "Moderate" },
  };

  const datasetMeta: Record<
    string,
    { rows: string; lastRefresh: string; sample: string }
  > = {
    "dataset-global-news": {
      rows: "1.2M rows",
      lastRefresh: "10m ago",
      sample: "title, source, country, sentiment, timestamp",
    },
    "dataset-mena-risk": {
      rows: "240k rows",
      lastRefresh: "1h ago",
      sample: "country, actor, risk_score, category, timestamp",
    },
  };

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData("text/plain", id);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, targetId: string) {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId || sourceId === targetId) return;

    const current = [...tabs];
    const fromIndex = current.findIndex((t) => t.id === sourceId);
    const toIndex = current.findIndex((t) => t.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = current.splice(fromIndex, 1);
    current.splice(toIndex, 0, moved);
    setTabs(current);
  }

  function handleContextMenu(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId: id,
    });
  }

  function closeContextMenu() {
    setContextMenu(null);
  }

  function openInNewWindow(tabId: string) {
    const t = tabs.find((x) => x.id === tabId);
    if (!t) return;
    if (typeof window !== "undefined") {
      window.open(t.href, "_blank", "noopener,noreferrer");
    }
  }

  function handleSaveSnapshot() {
    const name = typeof window !== "undefined" ? window.prompt("Snapshot name") : null;
    if (!name) return;
    saveSnapshot(name);
  }

  function handleLoadSnapshot() {
    const snaps = listSnapshots();
    if (!snaps.length) {
      if (typeof window !== "undefined") {
        window.alert("No snapshots saved yet.");
      }
      return;
    }
    const names = snaps.map((s) => s.name).join(", ");
    const name =
      typeof window !== "undefined"
        ? window.prompt(`Load snapshot (available: ${names})`)
        : null;
    if (!name) return;
    loadSnapshot(name);
  }

  function renderPreview(t: any) {
    const isEntity = t.type === "entity";

    return (
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-64 bg-surface border border-surface-border rounded-md shadow-lg p-3 text-xs text-charcoal-light z-40">
        <div className="font-medium text-charcoal mb-1">
          {isEntity ? "Entity preview" : "Dataset preview"}
        </div>

        <div className="truncate mb-1">{t.label}</div>

        {isEntity ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <span>Sentiment</span>
              <span className="text-[11px]">
                {entityMeta[t.id]?.sentiment ?? "Unknown"}
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden mb-1">
              <div className="h-full w-2/3 bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500" />
            </div>

            <div className="flex items-center justify-between text-[11px] opacity-70">
              <span>Risk: {entityMeta[t.id]?.risk ?? "Unknown"}</span>
              <span>Updated: {entityMeta[t.id]?.lastUpdated ?? "Unknown"}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <span>Rows</span>
              <span className="text-[11px]">
                {datasetMeta[t.id]?.rows ?? "Unknown"}
              </span>
            </div>

            <div className="flex items-center justify-between mb-1 text-[11px] opacity-80">
              <span>Last refresh</span>
              <span>{datasetMeta[t.id]?.lastRefresh ?? "Unknown"}</span>
            </div>

            <div className="mt-1 text-[11px] opacity-80">
              {datasetMeta[t.id]?.sample ?? "Sample fields will appear here."}
            </div>
          </>
        )}
      </div>
    );
  }

  function renderTab(t: any) {
    const isActive = active === t.id;

    return (
      <div
        key={t.id}
        draggable
        onDragStart={(e) => handleDragStart(e, t.id)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, t.id)}
        onContextMenu={(e) => handleContextMenu(e, t.id)}
        onMouseEnter={() => setHoverTabId(t.id)}
        onMouseLeave={() => setHoverTabId((prev) => (prev === t.id ? null : prev))}
        className={`
          relative flex items-center justify-between px-3 py-2 text-sm cursor-pointer
          ${
            isActive
              ? "bg-surface-muted text-charcoal"
              : "text-charcoal-light hover:bg-surface-muted"
          }
        `}
        onClick={() => {
          setActive(t.id);
          router.push(t.href);
        }}
      >
        <span className="truncate">
          {t.pinned ? "📌 " : ""}
          {t.label}
        </span>

        {!t.pinned && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(t.id);
            }}
            className="text-charcoal-light hover:text-charcoal"
          >
            ✕
          </button>
        )}

        {hoverTabId === t.id && renderPreview(t)}
      </div>
    );
  }

  return (
    <>
      <div className="w-48 bg-surface border-r border-surface-border flex flex-col">
        <div className="px-3 py-2 text-xs font-medium text-charcoal-light border-b border-surface-border flex items-center justify-between">
          <span>Workspace</span>
          <button
            className="text-[11px] text-charcoal-light hover:text-charcoal"
            onClick={handleSaveSnapshot}
          >
            Save
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {pinned.length > 0 && (
            <div className="pb-1 border-b border-surface-border mb-1">
              {pinned.map(renderTab)}
            </div>
          )}
          {unpinned.map(renderTab)}
        </div>

        <div className="px-3 py-2 border-t border-surface-border text-[11px] text-charcoal-light flex items-center justify-between">
          <span>Snapshots</span>
          <button
            className="hover:text-charcoal"
            onClick={handleLoadSnapshot}
          >
            Load
          </button>
        </div>
      </div>

      {contextMenu && contextMenu.tabId && (
        <div
          className="fixed inset-0 z-50"
          onClick={closeContextMenu}
        >
          <div
            className="absolute bg-surface border border-surface-border rounded-md shadow-lg text-sm text-charcoal-light"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="block w-full text-left px-3 py-2 hover:bg-surface-muted"
              onClick={() => {
                togglePin(contextMenu.tabId!);
                closeContextMenu();
              }}
            >
              Toggle pin
            </button>

            <button
              className="block w-full text-left px-3 py-2 hover:bg-surface-muted"
              onClick={() => {
                openInNewWindow(contextMenu.tabId!);
                closeContextMenu();
              }}
            >
              Open in new window
            </button>

            <button
              className="block w-full text-left px-3 py-2 hover:bg-surface-muted"
              onClick={() => {
                closeTab(contextMenu.tabId!);
                closeContextMenu();
              }}
            >
              Close
            </button>

            <button
              className="block w-full text-left px-3 py-2 hover:bg-surface-muted"
              onClick={() => {
                const keep = tabs.find((t) => t.id === contextMenu.tabId);
                if (keep) {
                  setTabs([keep]);
                }
                closeContextMenu();
              }}
            >
              Close others
            </button>

            <button
              className="block w-full text-left px-3 py-2 hover:bg-surface-muted"
              onClick={() => {
                setTabs([]);
                closeContextMenu();
              }}
            >
              Close all
            </button>
          </div>
        </div>
      )}
    </>
  );
}
