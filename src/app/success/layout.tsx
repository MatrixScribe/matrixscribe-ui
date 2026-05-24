"use client";

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="client-boundary">
      {children}
    </div>
  );
}
