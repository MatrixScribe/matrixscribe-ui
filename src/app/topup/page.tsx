"use client";

import { Suspense } from "react";
import TopupPageInner from "./TopupPageInner";

export default function TopupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <TopupPageInner />
    </Suspense>
  );
}
