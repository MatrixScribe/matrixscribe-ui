"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Invoice {
  reference: string;
  operatorName: string;
  phone: string;
  amount: number;
  currency: string;
  serviceFee: number;
  totalUSD: number;
  date: string;
  pdfUrl: string;
}

export default function InvoicePage() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("reference");

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    async function loadInvoice() {
      const res = await fetch(
        `https://redatacom-end.onrender.com/api/invoice?reference=${ref}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setInvoice(data);
    }
    if (ref) loadInvoice();
  }, [ref]);

  if (!invoice) {
    return (
      <main className="p-10 text-center text-neutral-500">
        Loading invoice…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 flex justify-center">
      <div className="w-full max-w-md border rounded-2xl shadow p-6">

        <h1 className="text-xl font-bold text-purple-700 mb-4">
          Invoice
        </h1>

        <div className="space-y-3 text-sm">
          <p><strong>Reference:</strong> {invoice.reference}</p>
          <p><strong>Operator:</strong> {invoice.operatorName}</p>
          <p><strong>Phone:</strong> {invoice.phone}</p>
          <p><strong>Amount:</strong> {invoice.amount} {invoice.currency}</p>
          <p><strong>Service Fee:</strong> ${invoice.serviceFee}</p>
          <p><strong>Total Paid:</strong> ${invoice.totalUSD}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
        </div>

        <button
          onClick={() => window.open(invoice.pdfUrl, "_blank")}
          className="
            w-full mt-6 bg-purple-600 text-white py-3 rounded-xl
            font-semibold shadow hover:bg-purple-700 transition
          "
        >
          Download PDF
        </button>
      </div>
    </main>
  );
}
