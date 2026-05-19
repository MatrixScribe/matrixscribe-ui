"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthHydrator() {
  const hydrate = useAuthStore((s) => s.hydrate);
  const refreshUser = useAuthStore((s) => s.refreshUser);

  useEffect(() => {
    hydrate();
    refreshUser();
  }, [hydrate, refreshUser]);

  return null;
}
