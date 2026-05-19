"use client";

import { useEffect, useState } from "react";
import { Country, Operator } from "@/components/topup/types";
import { getCountryCode } from "@/utils/topup";

export function useOperators(
  step1Done: boolean,
  country: Country | null,
  apiBase: string
) {
  const [allOperators, setAllOperators] = useState<Operator[]>([]);
  const [displayOperators, setDisplayOperators] = useState<Operator[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  useEffect(() => {
    if (!step1Done || !country) return;

    const code = getCountryCode(country);
    if (!code) return;

    async function loadOperators() {
      try {
        setLoading(true);
        setSelectedOperator(null);
        setStep2Done(false);

        const res = await fetch(`${apiBase}/api/operators?country=${code}`);
        const data = await res.json();
        const ops: Operator[] = data.operators || [];

        // THIS MUST BE setAllOperators — NOT ssetAllOperators
        setAllOperators(ops);

        // Do NOT show operators yet — wait for auto-detect
        setDisplayOperators([]);
      } catch (err) {
        console.error("Failed to load operators", err);
        setAllOperators([]);
        setDisplayOperators([]);
      } finally {
        setLoading(false);
      }
    }

    loadOperators();
  }, [step1Done, country, apiBase]);

  return {
    allOperators,
    displayOperators,
    setDisplayOperators,
    selectedOperator,
    setSelectedOperator,
    loading,
    step2Done,
    setStep2Done
  };
}
