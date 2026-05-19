"use client";

import { Country, Operator, Product } from "./types";
import { isoToEmoji, getCountryCode } from "@/utils/topup";

type Props = {
  step3Done: boolean;
  selectedCountry: Country | null;
  phone: string;
  selectedOperator: Operator | null;
  selectedProduct: Product | null;
  topupType: "airtime" | "data";
  onContinue: () => void;
};

export function Step4Review(props: Props) {
  const {
    step3Done,
    selectedCountry,
    phone,
    selectedOperator,
    selectedProduct,
    topupType,
    onContinue
  } = props;

  const step4Ready =
    step3Done && !!selectedCountry && !!selectedOperator && !!selectedProduct;

  // Dot color logic
  const dotColor = step4Ready
    ? "bg-emerald-500 animate-pulse hover:animate-energy"
    : step3Done
    ? "bg-yellow-400"
    : "bg-neutral-300";

  return (
    <div
      className={`
        relative bg-white border rounded-2xl shadow-sm p-6 transition
        ${step3Done ? "opacity-100" : "opacity-40 pointer-events-none"}
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

      <h2 className="text-[15px] font-semibold mb-4">
        4. Review & Continue
      </h2>

      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between">
          <span className="text-neutral-500">Country</span>
          <span className="font-medium">
            {isoToEmoji(getCountryCode(selectedCountry))}
            {selectedCountry ? ` ${selectedCountry.name}` : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">Phone</span>
          <span className="font-medium">
            {selectedCountry?.dialCode} {phone}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">Operator</span>
          <span className="font-medium">{selectedOperator?.name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">Product</span>
          <span className="font-medium">
            {selectedProduct?.label ||
              selectedProduct?.name ||
              "Selected Product"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-neutral-500">Type</span>
          <span className="font-medium">
            {topupType === "airtime" ? "Airtime" : "Data"}
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          disabled={!step4Ready}
          className={`
            px-5 py-2.5 rounded-xl text-sm font-medium border transition shadow-sm
            ${
              !step4Ready
                ? "bg-neutral-100 border-neutral-300 text-neutral-400 cursor-not-allowed"
                : "bg-white border-neutral-300 text-neutral-800 hover:border-purple-500 hover:text-purple-600"
            }
          `}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
