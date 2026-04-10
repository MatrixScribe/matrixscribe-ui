// ❌ NO "use client" HERE — this must be a Server Component

import ClientShell from "./ClientShell";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}
