"use client";

import { useEffect } from "react";
import { Country, Operator, PhoneRules } from "@/components/topup/types";
import { getCountryCode } from "@/utils/topup";

export function useAutoDetectOperator(params: {
  step1Done: boolean;
  phone: string;
  country: Country | null;
  phoneRules: PhoneRules | null;
  allOperators: Operator[];
  apiBase: string;
  setSelectedOperator: (op: Operator | null) => void;
  setDisplayOperators: (ops: Operator[]) => void;
  setStep2Done: (v: boolean) => void;
}) {
  const {
    step1Done,
    phone,
    country,
    phoneRules,
    allOperators,
    apiBase,
    setSelectedOperator,
    setDisplayOperators,
    setStep2Done
  } = params;

  useEffect(() => {
    if (!step1Done) return;
    if (!country) return;
    if (!phoneRules) return;

    // Normalize phone number
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = digits.substring(1);

    if (digits.length < phoneRules.minLength) return;
    if (digits.length > phoneRules.maxLength) return;

    const dial = country.dialCode?.replace("+", "") || "";
    if (!dial) return;

    const msisdn = `${dial}${digits}`;

    const timeout = setTimeout(async () => {
      try {
        const code = getCountryCode(country);
        if (!code) return;

        const res = await fetch(
          `${apiBase}/api/operators/auto-detect?phone=${msisdn}&country=${code}`
        );
        const data = await res.json();
        const detected = data.operator as Operator | null;
        if (!detected) return;

        // Set detected operator
        setSelectedOperator(detected);
        setStep2Done(true);

        // Build final list: detected + all operators for that country
        const countryOps = allOperators;

        const exists = countryOps.find(
          (op) => String(op.operatorId) === String(detected.operatorId)
        );

        if (exists) {
          setDisplayOperators([
            exists,
            ...countryOps.filter(
              (op) => String(op.operatorId) !== String(detected.operatorId)
            )
          ]);
        } else {
          setDisplayOperators([detected, ...countryOps]);
        }
      } catch (err) {
        console.error("Auto-detect failed:", err);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [
    step1Done,
    phone,
    country,
    phoneRules,
    allOperators,
    apiBase,
    setSelectedOperator,
    setDisplayOperators,
    setStep2Done
  ]);
}
