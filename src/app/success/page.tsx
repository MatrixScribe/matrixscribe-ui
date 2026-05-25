"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import jsPDF from "jspdf";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("reference");

  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  /* ------------------------------
      CONFETTI ON MOUNT
  ------------------------------ */
  useEffect(() => {
    const duration = 1500;
    const end = Date.now() + duration;

    function frame() {
      const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];
      const confettiCount = 12;

      for (let i = 0; i < confettiCount; i++) {
        const div = document.createElement("div");
        div.className = "confetti";
        div.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        div.style.left = Math.random() * 100 + "vw";
        div.style.animationDuration = 0.8 + Math.random() * 0.7 + "s";
        document.body.appendChild(div);

        setTimeout(() => div.remove(), 1200);
      }

      if (Date.now() < end) requestAnimationFrame(frame);
    }

    frame();
  }, []);

  /* ------------------------------
      GOLD SPARKLE BURST
  ------------------------------ */
  const spawnSparkles = () => {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      const offsetX = (Math.random() - 0.5) * 140;
      const offsetY = (Math.random() - 0.5) * 90;
      s.style.left = `50vw`;
      s.style.top = `45vh`;
      s.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  };

  /* ------------------------------
      RATING LOGIC
  ------------------------------ */
  const handleRate = (value: number) => {
    setRating(value);
    setSubmitted(true);
    spawnSparkles();

    setTimeout(() => {
      setDelivered(true);
    }, 600);

    setTimeout(() => {
      if (value >= 4) {
        window.location.href = "https://g.page/r/PLACEHOLDER/review";
      }
    }, 1200);
  };

  /* ------------------------------
      HELPER: LOAD LOGO AS DATA URL
  ------------------------------ */
  const loadLogoDataUrl = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context not available"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    });
  };

  /* ------------------------------
      PDF INVOICE DOWNLOAD (jsPDF)
  ------------------------------ */
  const downloadInvoice = async () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;

    // Try to add logo
    try {
      const logoDataUrl = await loadLogoDataUrl("/logo.png");
      const logoWidth = 140; // medium size
      const logoHeight = 40;
      doc.addImage(logoDataUrl, "PNG", 40, y, logoWidth, logoHeight);

      // Company name + tagline on the right
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text("redatacom", pageWidth - 40, y + 18, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text("connectivity is power", pageWidth - 40, y + 34, {
        align: "right",
      });

      y += 60;
    } catch {
      // Fallback: no logo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("redatacom", 40, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text("connectivity is power", 40, y + 16);
      y += 50;
    }

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(40, y, pageWidth - 40, y);
    y += 25;

    // Invoice title + meta
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Invoice", 40, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Date: ${new Date().toLocaleString()}`, pageWidth - 40, y, {
      align: "right",
    });
    y += 30;

    // Summary card
    const cardX = 40;
    const cardWidth = pageWidth - 80;
    const cardHeight = 110;
    doc.setDrawColor(235, 235, 235);
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(cardX, y, cardWidth, cardHeight, 6, 6, "FD");

    let innerY = y + 22;
    const labelX = cardX + 16;
    const valueX = cardX + cardWidth - 16;

    doc.setFontSize(11);
    doc.setTextColor(110, 110, 110);

    const rows: { label: string; value: string }[] = [
      { label: "Transaction Reference", value: ref || "-" },
      { label: "Status", value: "Completed" },
      { label: "Service", value: "Mobile Top-Up" },
      { label: "Note", value: "Network loading times may vary." },
    ];

    rows.forEach((row, index) => {
      doc.text(row.label, labelX, innerY);
      doc.text(row.value, valueX, innerY, { align: "right" });
      innerY += 20;
      if (index < rows.length - 1) {
        doc.setDrawColor(240, 240, 240);
        doc.line(cardX + 12, innerY - 12, cardX + cardWidth - 12, innerY - 12);
      }
    });

    y += cardHeight + 40;

    // Transaction timeline
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(40, 40, 40);
    doc.text("Transaction timeline", 40, y);
    y += 18;

    const steps = [
      "Payment initiated",
      "Processing payment",
      "Top-up sent to network",
      "Delivered to your number",
    ];

    const timelineX = 55;
    const textX = 80;
    let timelineY = y;

    doc.setLineWidth(1);
    doc.setDrawColor(16, 185, 129);

    steps.forEach((step, index) => {
      // Dot
      doc.setFillColor(16, 185, 129);
      doc.circle(timelineX, timelineY, 3, "F");

      // Line to next
      if (index < steps.length - 1) {
        doc.setDrawColor(200, 240, 225);
        doc.setLineWidth(1);
        doc.line(timelineX, timelineY + 3, timelineX, timelineY + 22);
      }

      // Text
      doc.setFont("helvetica", index === steps.length - 1 ? "bold" : "normal");
      doc.setFontSize(11);
      doc.setTextColor(
        index === steps.length - 1 ? 16 : 90,
        index === steps.length - 1 ? 185 : 90,
        index === steps.length - 1 ? 129 : 90
      );
      doc.text(step, textX, timelineY + 3);

      timelineY += 25;
    });

    y = timelineY + 30;

    // Footer
    doc.setDrawColor(235, 235, 235);
    doc.line(40, y, pageWidth - 40, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text("Thank you for using Redatacom.", 40, y);
    y += 14;
    doc.text("Support: support@redatacom.com", 40, y);
    y += 14;
    doc.text("Website: www.redatacom.com", 40, y);

    doc.save(`invoice-${ref || "transaction"}.pdf`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-b from-white to-emerald-50">
      {/* CSS */}
      <style>{`
        .confetti {
          position: fixed;
          top: -10px;
          width: 10px;
          height: 14px;
          opacity: 0.9;
          border-radius: 2px;
          animation: fall linear forwards;
          z-index: 40;
        }
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes floatCheck {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes glowRing {
          0% { box-shadow: 0 0 0px rgba(16,185,129,0.4); }
          50% { box-shadow: 0 0 25px rgba(16,185,129,0.6); }
          100% { box-shadow: 0 0 0px rgba(16,185,129,0.4); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* GOLD STAR STYLES */
        .gold-star {
          color: #facc15;
          text-shadow: 0 0 12px rgba(250, 204, 21, 0.8),
                       0 0 20px rgba(250, 204, 21, 0.6);
          transition: transform 0.2s ease, text-shadow 0.2s ease;
        }
        .gold-star-empty {
          color: #e5e7eb;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .gold-star:hover,
        .gold-star-empty:hover {
          color: #facc15;
          text-shadow: 0 0 15px rgba(250, 204, 21, 0.9),
                       0 0 25px rgba(250, 204, 21, 0.7);
          transform: scale(1.25) rotate(-3deg);
        }

        /* PULSATING BUTTONS */
        .pulse {
          animation: pulseAnim 1.8s infinite ease-in-out;
        }
        @keyframes pulseAnim {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        /* GOLD SPARKLES */
        .sparkle {
          position: fixed;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #facc15;
          box-shadow: 0 0 12px rgba(250, 204, 21, 0.9);
          animation: sparkleAnim 0.7s ease-out forwards;
          z-index: 50;
        }
        @keyframes sparkleAnim {
          0% { opacity: 1; transform: scale(0.6); }
          100% { opacity: 0; transform: scale(1.8) translateY(-20px); }
        }

        /* TIMELINE */
        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #10b981;
          box-shadow: 0 0 10px rgba(16,185,129,0.7);
          animation: dotPulse 1.8s infinite ease-in-out;
        }
        @keyframes dotPulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .timeline-line {
          width: 2px;
          flex: 1;
          background: linear-gradient(to bottom, rgba(16,185,129,0.2), rgba(16,185,129,0.8));
          animation: lineGlow 2.4s infinite ease-in-out;
        }
        @keyframes lineGlow {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Redatacom Logo"
        className="w-32 mb-10 opacity-90"
      />

      {/* Glowing Success Ring */}
      <div className="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center animate-[glowRing_2s_ease-in-out_infinite] shadow-lg">
        <span className="text-emerald-600 text-6xl font-bold animate-[floatCheck_2s_ease-in-out_infinite]">
          ✓
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-neutral-900 mt-6">
        Top-Up Completed!
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-500 mt-2 text-base text-center">
        Network loading times may vary.
      </p>

      {/* Reference */}
      <p className="text-neutral-400 mt-1 text-sm">
        Ref: <span className="font-medium">{ref}</span>
      </p>

      {/* Delivered ✓ after rating */}
      {delivered && (
        <div className="mt-3 flex items-center gap-2 text-emerald-600 animate-[fadeIn_0.5s_ease-out]">
          <span className="text-lg font-semibold">Delivered</span>
          <span className="text-xl">✓</span>
        </div>
      )}

      {/* PREMIUM GOLD RATING CARD */}
      <div className="mt-10 mb-6 w-full max-w-sm bg-white/70 backdrop-blur-md border border-yellow-300/60 rounded-2xl shadow-[0_0_25px_rgba(234,179,8,0.25)] p-6 animate-[fadeIn_0.6s_ease-out]">
        <h2 className="text-lg font-semibold text-neutral-800 text-center mb-4">
          Your Rating Matters
        </h2>

        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className={`text-5xl transition transform hover:scale-125 ${
                rating >= star ? "gold-star" : "gold-star-empty"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {submitted && (
          <div className="text-center mt-4 animate-[fadeIn_0.5s_ease-out]">
            <p className="text-emerald-600 font-semibold text-lg mb-1">
              Thank you!
            </p>
            <p className="text-neutral-500 text-sm">
              Processing your feedback…
            </p>
          </div>
        )}
      </div>

      {/* TRANSACTION TIMELINE (UI) */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl border border-emerald-100 shadow-sm p-4 mb-4 animate-[fadeIn_0.6s_ease-out]">
        <p className="text-sm font-semibold text-neutral-700 mb-3">
          Transaction timeline
        </p>
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="timeline-dot" />
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <div className="timeline-line" />
            <div className="timeline-dot" />
            <div className="timeline-line" />
            <div className="timeline-dot" />
          </div>
          <div className="flex flex-col gap-3 text-sm text-neutral-600">
            <div>Payment initiated</div>
            <div>Processing payment</div>
            <div>Top-up sent to network</div>
            <div className="text-emerald-600 font-medium">
              Delivered to your number
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS SIDE-BY-SIDE + PULSATING */}
      <div className="mt-2 flex gap-4 w-full max-w-sm justify-center">
        <button
          onClick={() => setShowInvoice(true)}
          className="pulse bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition text-sm"
        >
          View Invoice
        </button>

        <button
          onClick={downloadInvoice}
          className="pulse text-emerald-600 text-sm font-semibold underline px-4 py-2"
        >
          Download Invoice
        </button>
      </div>

      {/* INVOICE MODAL */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease-out] z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Invoice
            </h2>

            <p className="text-neutral-600 mb-2">
              <strong>Transaction Reference:</strong> {ref}
            </p>

            <p className="text-neutral-600 mb-2">
              <strong>Status:</strong> Completed
            </p>

            <p className="text-neutral-600 mb-2">
              <strong>Service:</strong> Mobile Top‑Up
            </p>

            <p className="text-neutral-600 mb-4">
              <strong>Date:</strong> {new Date().toLocaleString()}
            </p>

            <p className="text-neutral-500 text-xs mb-4">
              This is a summary view. Use &quot;Download Invoice&quot; for a
              full PDF copy.
            </p>

            <button
              onClick={() => setShowInvoice(false)}
              className="pulse w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-white px-6">
          <p className="text-neutral-500">Loading payment status…</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
