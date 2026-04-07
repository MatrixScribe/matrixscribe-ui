import React from "react";

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface p-4 rounded-md shadow-subtle ${className}`}>
      {children}
    </div>
  );
}
