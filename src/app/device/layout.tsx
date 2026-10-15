export default function DeviceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#0b0b0f] text-neutral-200 relative">

      {/* Cosmic Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-72 w-72 
        bg-purple-500/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 py-10 max-w-5xl mx-auto">
        {children}
      </div>

    </section>
  );
}
