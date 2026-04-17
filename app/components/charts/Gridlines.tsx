"use client";

import { CartesianGrid } from "recharts";

export default function Gridlines() {
  return (
    <>
      <CartesianGrid
        stroke="rgba(0,0,0,0.08)"
        strokeDasharray="3 3"
        vertical={false}
        className="gridline-fade"
      />

      <style jsx>{`
        .gridline-fade {
          opacity: 0;
          animation: gridFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes gridFadeIn {
          0% {
            opacity: 0;
            transform: translateY(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
