import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",   // ⭐ prevents build-time Google fetch
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",   // ⭐ prevents build-time Google fetch
});

export const metadata: Metadata = {
  title: "MatrixScribe",
  description: "Sentiment Intelligence Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
