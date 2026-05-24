"use client";

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="success-wrapper">
      {children}
    </div>
  );
}
