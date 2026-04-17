"use client";

import { AuthProvider } from "@/lib/auth";
import ClientShell from "./ClientShell";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ClientShell>{children}</ClientShell>
    </AuthProvider>
  );
}
