"use client";

export function DeleteLocalSimModal({
  open,
  onClose,
  onConfirm,
  isPrimary,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPrimary: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div
        className="
          w-[90%] max-w-sm p-6 rounded-2xl
          bg-[#1a1a1a] border border-red-500/40
          text-white shadow-xl
        "
      >
        <h2 className="text-lg font-semibold mb-3">
          {isPrimary ? "Primary SIM Locked" : "Delete Local SIM"}
        </h2>

        <p className="text-sm text-neutral-300 mb-6">
          {isPrimary
            ? "This SIM is the primary number linked to your account and cannot be deleted."
            : "Are you sure you want to delete this Local SIM from your profile?"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl bg-white/10 text-white font-semibold"
          >
            Close
          </button>

          {!isPrimary && (
            <button
              onClick={onConfirm}
              className="w-1/2 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
