"use client";

import { Suspense } from "react";
import ProfileInner from "./ProfileInner";

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileInner />
    </Suspense>
  );
}
