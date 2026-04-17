import React from "react";

export default function Grid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-12 gap-4 w-full ${className}`}>
      {children}
    </div>
  );
}
