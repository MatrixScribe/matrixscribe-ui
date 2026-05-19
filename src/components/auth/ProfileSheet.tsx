"use client";

import { useAuthStore } from "@/store/authStore";
import { useWalletStore } from "@/store/walletStore";
import { useState } from "react";

export default function ProfileSheet({ open, onClose }) {
  const { user, connectedSince } = useAuthStore();
  const { walletId } = useWalletStore();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!open) return null;

  const copy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1200);
  };

  const formatTimestamp = (ts: number | null) => {
    if (!ts) return "Unknown";
    return new Date(ts).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[360px]">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

        <div className="space-y-4 text-sm">

          {/* Username */}
          <div>
            <span className="font-medium">Username:</span>
            <div>{user?.username}</div>
          </div>

          {/* Email */}
          <div>
            <span className="font-medium">Email:</span>
            <div>{user?.email}</div>
          </div>

          {/* Country */}
          <div>
            <span className="font-medium">Country:</span>
            <div>{user?.country}</div>
          </div>

          {/* Mobile */}
          <div>
            <span className="font-medium">Mobile:</span>
            <div>{user?.mobile}</div>
          </div>

          {/* ⭐ USER ID + COPY */}
          <div>
            <span className="font-medium">User ID:</span>
            <div className="flex items-center gap-2">
              <div className="text-neutral-600 text-xs break-all flex-1">
                {user?.id}
              </div>
              <button
                onClick={() => copy(user?.id ?? "", "userId")}
                className="px-2 py-1 text-xs bg-neutral-200 rounded"
              >
                {copiedField === "userId" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* ⭐ WALLET ID + COPY */}
          <div>
            <span className="font-medium">Wallet ID:</span>
            <div className="flex items-center gap-2">
              <div className="text-neutral-600 text-xs break-all flex-1">
                {walletId ?? "Not loaded"}
              </div>
              {walletId && (
                <button
                  onClick={() => copy(walletId, "walletId")}
                  className="px-2 py-1 text-xs bg-neutral-200 rounded"
                >
                  {copiedField === "walletId" ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          </div>

          {/* ⭐ CONNECTED SINCE */}
          <div>
            <span className="font-medium">Connected Since:</span>
            <div className="text-neutral-600 text-xs">
              {formatTimestamp(connectedSince)}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
