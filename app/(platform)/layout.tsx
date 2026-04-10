// ❌ NO "use client" HERE — this must be a Server Component

import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import ClientShell from "./ClientShell";

export default function PlatformLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}
