"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import jsPDF from "jspdf";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ref = searchParams.get("reference");

  const [wallet, setWallet] = useState<any>(null);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  /* ------------------------------
     FETCH UPDATED WALLET BALANCE
  ------------------------------ */
  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await fetch("/api/wallet", { cache: "no-store" });
        const json = await res.json();
        setWallet(json);
      } catch (err) {
        console.error("Failed to load wallet:", err);
      } finally {
        setLoadingWallet(false);
      }
    }

    fetchWallet();
  }, []);

  /* ------------------------------
     AUTO‑REDIRECT TO DASHBOARD
  ------------------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

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

    setTimeout(() => setDelivered(true), 600);

    setTimeout(() => {
      if (value >= 4) {
        window.location.href = "https://g.page/r/PLACEHOLDER/review";
      }
    }, 1200);
  };

  /* ------------------------------
     LOAD LOGO AS DATA URL
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
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = reject;
    });
  };

  /* ------------------------------
     PDF INVOICE DOWNLOAD
  ------------------------------ */
  const downloadInvoice = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;

    try {
      const logoDataUrl = await loadLogoDataUrl("/logo.png");
      doc.addImage(logoDataUrl, "PNG", 40, y, 140, 40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("redatacom", pageWidth - 40, y + 18, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("connectivity is power", pageWidth - 40, y + 34, {
        align: "right",
      });
      y += 60;
    } catch {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("redatacom", 40, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text("connectivity is power", 40, y + 16);
      y += 50;
    }

    doc.setDrawColor(220, 220, 220);
    doc.line(40, y, pageWidth - 40, y);
    y += 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Invoice", 40, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleString()}`, pageWidth - 40, y, {
      align: "right",
    });
    y += 30;

    const cardX = 40;
    const cardWidth = pageWidth - 80;
    const cardHeight = 110;

    doc.roundedRect(cardX, y, cardWidth, cardHeight, 6, 6, "FD");

    let innerY = y + 22;

    const rows = [
      { label: "Transaction Reference", value: ref || "-" },
      { label: "Status", value: "Completed" },
      { label: "Service", value: "Wallet Top‑Up" },
      {
        label: "New Wallet Balance",
        value: wallet ? `USD ${wallet.usd_balance.toFixed(2)}` : "-",
      },
    ];

    rows.forEach((row, index) => {
      doc.text(row.label, cardX + 16, innerY);
      doc.text(row.value, cardX + cardWidth - 16, innerY, { align: "right" });
      innerY += 20;
      if (index < rows.length - 1) {
        doc.line(cardX + 12, innerY - 12, cardX + cardWidth - 12, innerY - 12);
      }
    });

    doc.save(`invoice-${ref || "transaction"}.pdf`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-b from-white to-emerald-50">
      {/* Logo */}
      <img src="/logo.png" alt="Redatacom Logo" className="w-32 mb-10 opacity-90" />

      {/* Success Ring */}
      <div className="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center animate-[glowRing_2s_ease-in-out_infinite] shadow-lg">
        <span className="text-emerald-600 text-6xl font-bold animate-[floatCheck_2s_ease-in-out_infinite]">
          ✓
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-neutral-900 mt-6">
        Wallet Top‑Up Completed!
      </h1>

      <p className="text-neutral-500 mt-2 text-base text-center">
        Redirecting to your dashboard…
      </p>

      <p className="text-neutral-400 mt-1 text-sm">
        Ref: <span className="font-medium">{ref}</span>
      </p>

      {wallet && (
        <p className="text-neutral-600 mt-3 text-lg font-semibold">
          New Balance: USD {wallet.usd_balance.toFixed(2)}
        </p>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
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

      {/* Invoice Modal */}
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
              <strong>Service:</strong> Wallet Top‑Up
            </p>

            <p className="text-neutral-600 mb-4">
              <strong>New Balance:</strong>{" "}
              {wallet ? `USD ${wallet.usd_balance.toFixed(2)}` : "-"}
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
