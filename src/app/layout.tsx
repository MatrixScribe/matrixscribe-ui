import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Redatacom Global Recharge",
  description: "Instant global airtime & data top-ups",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f0f" />

        {/* iOS PWA Support */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        />
        <Script id="ga-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>
      </head>

      <body>
        {children}

        {/* Service Worker Registration */}
        <Script id="sw-register">
          {`
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker.register("/service-worker.js")
                .catch(err => console.log("SW registration failed:", err));
            }
          `}
        </Script>
      </body>
    </html>
  );
}
