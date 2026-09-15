"use client";

import { Suspense } from "react";
import OtpInner from "./OtpInner";

export default function OtpPage() {
  return (
    <Suspense>
      <OtpInner />
    </Suspense>
  );
}
