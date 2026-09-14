"use client";

import { Suspense } from "react";
import ConfirmPinInner from "./ConfirmPinInner";

export default function ConfirmPinPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ConfirmPinInner />
    </Suspense>
  );
}
