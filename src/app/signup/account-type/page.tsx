"use client";

import { Suspense } from "react";
import AccountTypeInner from "./AccountTypeInner";

export default function AccountType() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <AccountTypeInner />
    </Suspense>
  );
}
