import "./globals.css";

export const metadata = {
  title: "Redatacom Global Recharge",
  description: "Instant global airtime & data top-ups",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
