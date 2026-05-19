import "./globals.css";

export const metadata = {
  title: "Redatacom Global Recharge",
  description: "Instant global airtime & data top-ups",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
