"use client";

type QRCodeModalProps = {
  open: boolean;
  onClose: () => void;
  qrBase64: string;
};

export function QRCodeModal({ open, onClose, qrBase64 }: QRCodeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">

        <h2 className="text-lg font-semibold mb-4">Scan eSIM QR Code</h2>

        <div className="bg-white p-4 rounded-xl shadow">
          <img
            src={`data:image/png;base64,${qrBase64}`}
            className="w-48 h-48 mx-auto"
          />
        </div>

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
