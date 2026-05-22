"use client";

import { useEffect, useRef } from "react";
import { Operator } from "./types";

type Props = {
  step1Done: boolean;
  operatorsLoading: boolean;
  displayOperators: Operator[];
  selectedOperator: Operator | null;
  setSelectedOperator: (op: Operator | null) => void;
  setStep2Done: (v: boolean) => void;
};

export function Step2Operator(props: Props) {
  const {
    step1Done,
    operatorsLoading,
    displayOperators,
    selectedOperator,
    setSelectedOperator,
    setStep2Done
  } = props;

  const dotColor = selectedOperator
    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
    : step1Done
    ? "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
    : "bg-neutral-300";

  // 3D tilt
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-3xl p-7 mb-10
        bg-gradient-to-br from-white/90 to-white/60
        backdrop-blur-2xl border border-white/40
        shadow-[0_20px_40px_rgba(0,0,0,0.06)]
        transition-all duration-500
        hover:shadow-[0_25px_50px_rgba(0,0,0,0.10)]
        ${step1Done ? "opacity-100" : "opacity-40 pointer-events-none"}
        ${selectedOperator ? "animate-[neonPulse_1.8s_ease-in-out_infinite]" : ""}
      `}
      style={{ transformStyle: "preserve-3d" }}
    >
      <style>{`
        @keyframes neonPulse {
          0% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
          50% { box-shadow: 0 0 25px rgba(168,85,247,0.45); }
          100% { box-shadow: 0 0 0px rgba(168,85,247,0.0); }
        }
      `}</style>

      {/* Floating Glow */}
      <div
        className="
          absolute inset-0 rounded-3xl pointer-events-none
          bg-gradient-to-br from-purple-500/10 to-transparent
          opacity-0 hover:opacity-100 transition duration-700
        "
      />

      {/* Step Dot */}
      <div
        className={`
          absolute top-5 right-5 h-3 w-3 rounded-full 
          transition-all duration-300
          ${dotColor}
        `}
      />

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
          Network Detection
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Choose the preferred network found with this phone number
        </p>
      </div>

      {/* AUTO-DETECTED OPERATOR */}
      {selectedOperator && (
        <div
          className="
            flex items-center gap-4 p-4 mb-6 rounded-2xl
            bg-white/70 backdrop-blur-xl border border-neutral-200
            shadow-[0_10px_25px_rgba(0,0,0,0.05)]
            transition-all duration-300
          "
        >
          {selectedOperator.logo && (
            <img
              src={selectedOperator.logo}
              className="h-10 w-auto object-contain drop-shadow-sm"
            />
          )}
          <span className="font-medium text-neutral-900 text-[15px]">
            {selectedOperator.name}
          </span>
        </div>
      )}

      {/* LOADING SKELETON */}
      {operatorsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-24 rounded-2xl bg-neutral-200/60 backdrop-blur-xl
                animate-pulse border border-neutral-300
              "
            />
          ))}
        </div>
      )}

      {/* DETECTING STATE */}
      {!operatorsLoading && displayOperators.length === 0 && (
        <div className="text-sm text-neutral-500 animate-pulse mt-2">
          Detecting operator do not close.....
        </div>
      )}

      {/* OPERATOR GRID */}
      {!operatorsLoading && displayOperators.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-2">
          {displayOperators.map((op) => {
            const isSelected = selectedOperator?.operatorId === op.operatorId;

            return (
              <button
                key={op.operatorId}
                onClick={() => {
                  setSelectedOperator(op);
                  setStep2Done(true);
                }}
                className={`
                  rounded-2xl px-4 py-5 transition-all duration-300
                  bg-white/70 backdrop-blur-xl border shadow-sm
                  flex flex-col items-center gap-3
                  ${
                    isSelected
                      ? "border-purple-500 shadow-[0_10px_25px_rgba(168,85,247,0.25)] bg-purple-50"
                      : "border-neutral-200 hover:border-purple-400 hover:shadow-md"
                  }
                  active:scale-[0.97]
                `}
              >
                {op.logo && (
                  <img
                    src={op.logo}
                    className="
                      h-10 w-auto object-contain drop-shadow-sm
                      transition-transform duration-300
                    "
                  />
                )}

                <span
                  className={`
                    text-center text-[14px] font-medium
                    ${isSelected ? "text-purple-700" : "text-neutral-800"}
                  `}
                >
                  {op.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
