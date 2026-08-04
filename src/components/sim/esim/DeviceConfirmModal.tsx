"use client";

type DeviceConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeviceConfirmModal({ open, onClose, onConfirm }: DeviceConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-neutral-900">
          Confirm eSIM Compatibility
        </h2>
        <p className="text-xs text-neutral-600 mt-2">
          Before continuing, please confirm that your device supports eSIM
          installation. If your device is not eSIM compatible, this purchase
          may not work.
        </p>

        <button
          onClick={() => {
            onConfirm();
          }}
          className="mt-4 w-full py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold"
        >
          I confirm my device is eSIM compatible
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2 rounded-xl bg-neutral-200 text-neutral-700 text-xs font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
