"use client";

import { Suspense } from "react";
import PinInner from "./PinInner";

export default function PinPage() {
  return (
    <Suspense>
      <PinInner />
    </Suspense>
  );
}
