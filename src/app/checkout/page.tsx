"use client";

import { Suspense } from "react";
import CheckoutPageInner from "./CheckoutPageInner";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <CheckoutPageInner />
    </Suspense>
  );
}
