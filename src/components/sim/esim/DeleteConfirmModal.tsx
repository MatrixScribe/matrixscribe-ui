"use client";

type DeleteConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Delete eSIM?</h2>

        <p className="text-sm text-neutral-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-2 rounded-xl bg-neutral-200 text-neutral-700 font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-1/2 py-2 rounded-xl bg-red-600 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
