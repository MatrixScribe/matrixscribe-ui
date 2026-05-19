"use client";

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

  // Dot color logic
  const dotColor = selectedOperator
    ? "bg-emerald-500 animate-pulse hover:animate-energy"
    : step1Done
    ? "bg-yellow-400"
    : "bg-neutral-300";

  return (
    <div
      className={`
        relative bg-white border rounded-2xl shadow-sm p-6 mb-6 transition
        ${step1Done ? "opacity-100" : "opacity-40 pointer-events-none"}
      `}
    >
      {/* Step Dot */}
      <div
        className={`
          absolute top-4 right-4 h-2.5 w-2.5 rounded-full 
          transition-all shadow-sm cursor-default
          ${dotColor}
        `}
      />

      <h2 className="text-[15px] font-semibold mb-4">2. Operator</h2>

      {/* AUTO-DETECTED OPERATOR */}
      {selectedOperator && (
        <div className="
          flex items-center gap-3 p-3 mb-4 border rounded-xl 
          bg-neutral-50 border-neutral-200 shadow-sm
        ">
          {selectedOperator.logo && (
            <img src={selectedOperator.logo} className="h-8 object-contain" />
          )}
          <span className="font-medium text-neutral-900">
            {selectedOperator.name}
          </span>
        </div>
      )}

      {/* LOADING STATE — PREMIUM SKELETONS */}
      {operatorsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-20 rounded-xl border border-neutral-200 bg-neutral-100 
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* DETECTING STATE */}
      {!operatorsLoading && displayOperators.length === 0 && (
        <div className="text-sm text-neutral-500 animate-pulse">
          Detecting operator…
        </div>
      )}

      {/* OPERATOR GRID */}
      {!operatorsLoading && displayOperators.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
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
                  border rounded-xl px-3 py-4 text-sm transition-all
                  shadow-sm hover:shadow-md
                  ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 shadow-md"
                      : "border-neutral-300 bg-white hover:border-neutral-400"
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  {op.logo && (
                    <img src={op.logo} className="h-10 object-contain" />
                  )}
                  <span className="text-center text-neutral-800 font-medium">
                    {op.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
