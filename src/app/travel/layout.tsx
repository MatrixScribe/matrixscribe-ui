export default function TravelLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-[#0b0b0f] text-neutral-200">
      {children}
    </section>
  );
}
