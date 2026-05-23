import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Redatacom Global Recharge",
  description: "Instant global airtime & data top-ups",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
