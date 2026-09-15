"use client";

import { Suspense } from "react";
import WelcomeInner from "./WelcomeInner";

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeInner />
    </Suspense>
  );
}
