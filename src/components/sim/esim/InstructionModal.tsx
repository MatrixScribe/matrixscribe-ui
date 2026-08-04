"use client";

type InstructionModalProps = {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
};

export function InstructionModal({ open, onClose, onContinue }: InstructionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="w-[90%] max-w-sm p-6 rounded-2xl bg-white text-black shadow-xl">
        <img src="/esim-instructions.png" className="w-full rounded-xl mb-4" />
        <h2 className="text-lg font-semibold mb-2">Before You Begin</h2>
        <p className="text-sm text-neutral-600 mb-6">
          eSIMs allow instant activation without a physical SIM card.
          Make sure your device supports eSIM and is unlocked.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl bg-neutral-200 text-black font-semibold"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="w-1/2 py-3 rounded-xl bg-purple-600 text-white font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
