"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import jsPDF from "jspdf";
import { useAuthStore } from "@/store/authStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ref = searchParams.get("reference");
  const token = useAuthStore((s) => s.token);

  const [wallet, setWallet] = useState<any>(null);
  const [loadingWallet, setLoadingWallet] = useState(true);

  /* ------------------------------
     FETCH UPDATED WALLET BALANCE
  ------------------------------ */
  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await fetch("/api/wallet", {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        setWallet(json);
      } catch (err) {
        console.error("Failed to load wallet:", err);
      } finally {
        setLoadingWallet(false);
      }
    }

    if (token) fetchWallet();
  }, [token]);

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
     PDF INVOICE DOWNLOAD — FIXED
  ------------------------------ */
  const downloadInvoice = async () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();

    /* TITANIUM HEADER BAR */
    doc.setFillColor(30, 30, 35);
    doc.rect(0, 0, pageWidth, 80, "F");

    /* LOGO */
    try {
      const logoDataUrl = await loadLogoDataUrl("/logo.png");
      doc.addImage(logoDataUrl, "PNG", 40, 20, 120, 40);
    } catch {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text("REDATACOM", 40, 50);
    }

    /* HEADER TEXT */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Invoice", pageWidth - 40, 45, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("connectivity is power", pageWidth - 40, 62, { align: "right" });

    let y = 120;

    /* COSMIC ACCENT LINE */
    doc.setDrawColor(140, 90, 255);
    doc.setLineWidth(1.2);
    doc.line(40, y, pageWidth - 40, y);
    y += 30;

    /* INVOICE CARD */
    const cardX = 40;
    const cardWidth = pageWidth - 80;

    doc.setFillColor(245, 245, 245);
    doc.roundedRect(cardX, y, cardWidth, 180, 10, 10, "F");

    y += 30;

    const rows = [
      { label: "Transaction Reference", value: ref || "-" },
      { label: "Status", value: "Completed" },
      { label: "Service", value: "Global Recharge" },
      { label: "Date", value: new Date().toLocaleString() },
      {
        label: "New Wallet Balance",
        value: wallet ? `USD ${wallet.usd_balance.toFixed(2)}` : "-",
      },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);

    rows.forEach((row, index) => {
      doc.text(row.label, cardX + 20, y);
      doc.text(row.value, cardX + cardWidth - 20, y, { align: "right" });

      y += 22;

      if (index < rows.length - 1) {
        doc.setDrawColor(220, 220, 220);
        doc.line(cardX + 15, y - 12, cardX + cardWidth - 15, y - 12);
      }
    });

    /* FOOTER */
    y += 40;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(
      "Thank you for using Redatacom — global connectivity at your fingertips.",
      pageWidth / 2,
      y,
      { align: "center" }
    );

    doc.save(`invoice-${ref || "transaction"}.pdf`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-b from-white to-emerald-50">
      
      {/* Logo */}
      <img src="/logo.png" alt="Redatacom Logo" className="w-auto h-16 mb-5 opacity-100" />

      {/* Success Ring */}
      <div className="h-32 w-32 rounded-full bg-emerald-100 flex items-center justify-center animate-[glowRing_2s_ease-in-out_infinite] shadow-lg">
        <span className="text-emerald-600 text-6xl font-bold animate-[floatCheck_2s_ease-in-out_infinite]">
          ✓
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-neutral-900 mt-6">
        Top‑Up Completed!
      </h1>

      <p className="text-neutral-400 mt-1 text-sm">
        Ref: <span className="font-medium">{ref}</span>
      </p>

      {wallet && (
        <p className="text-neutral-600 mt-3 text-lg font-semibold">
          New Balance: USD {wallet.usd_balance.toFixed(2)}
        </p>
      )}

      {/* INLINE INVOICE DETAILS — TITANIUM COSMIC */}
      <div className="
        mt-10 w-full max-w-md 
        rounded-2xl 
        p-6 
        bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-700/40
        border border-white/10 
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        backdrop-blur-xl
        text-white
      ">
        <h2 className="text-2xl font-bold mb-4 
                       bg-gradient-to-r from-purple-300 via-white to-purple-300 
                       bg-clip-text text-transparent">
          Invoice Details
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-neutral-300">Transaction Reference</span>
            <span className="font-semibold">{ref}</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-neutral-300">Status</span>
            <span className="font-semibold text-emerald-400">Completed</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-neutral-300">Service</span>
            <span className="font-semibold">Global Recharge</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-neutral-300">Date</span>
            <span className="font-semibold">{new Date().toLocaleString()}</span>
          </div>

          
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-purple-700 transition"
        >
          Go to Dashboard
        </button>

        <button
          onClick={downloadInvoice}
          className="w-full text-emerald-600 font-semibold underline py-2"
        >
          Download Invoice
        </button>
      </div>
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
