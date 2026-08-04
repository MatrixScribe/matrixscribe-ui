"use client";

import QRCode from "react-qr-code";

type QRCodeModalProps = {
  open: boolean;
  onClose: () => void;
  activationCode: string;
};

export function QRCodeModal({ open, onClose, activationCode }: QRCodeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Scan eSIM QR Code</h2>

        <div className="bg-white p-4 rounded-xl shadow">
          <QRCode value={activationCode} size={180} />
        </div>

        <p className="text-xs text-neutral-600 mt-3">
          Activation Code: {activationCode}
        </p>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-xl bg-purple-600 text-white font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
