"use client";

type QRCodeModalProps = {
  open: boolean;
  onClose: () => void;
  qrBase64: string; // can be URL or data:image/png;base64
};

export function QRCodeModal({ open, onClose, qrBase64 }: QRCodeModalProps) {
  if (!open) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrBase64;
    link.download = "esim-qr.png";
    link.click();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(qrBase64);
    alert("QR URL copied!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "eSIM QR Code",
        text: "Scan this QR to install your eSIM",
        url: qrBase64,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-neutral-900 rounded-2xl p-6 w-[90%] max-w-sm text-center border border-neutral-700 shadow-2xl">

        <h2 className="text-lg font-semibold mb-4 text-white">Scan eSIM QR Code</h2>

        {/* Metallic Frame */}
        <div className="relative mx-auto p-4 rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900 border border-neutral-600 shadow-xl">

          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl pointer-events-none" />

          {/* QR Image */}
          <img
            src={qrBase64}
            className="relative w-48 h-48 mx-auto rounded-xl border border-neutral-500 shadow-lg"
            alt="eSIM QR Code"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={handleDownload}
            className="w-full py-2 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Download QR
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-2 rounded-xl bg-neutral-700 text-white font-semibold hover:bg-neutral-600 transition"
          >
            Copy QR URL
          </button>

          <button
            onClick={handleShare}
            className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Share QR
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
