"use client";

import { useEffect, useState } from "react";
import { Country, Operator } from "@/components/topup/types";
import { getCountryCode } from "@/utils/topup";

export function useOperators(
  shouldLoad: boolean,
  country: Country | null,
  apiBase: string
) {
  const [allOperators, setAllOperators] = useState<Operator[]>([]);
  const [displayOperators, setDisplayOperators] = useState<Operator[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  useEffect(() => {
    console.log("=== useOperators TRIGGERED ===");
    console.log("shouldLoad =", shouldLoad);
    console.log("country =", country);

    if (!shouldLoad) {
      console.log("STOP → shouldLoad is FALSE");
      return;
    }

    if (!country) {
      console.log("STOP → country is NULL");
      return;
    }

    const code = getCountryCode(country);
    console.log("getCountryCode(country) =", code);

    if (!code) {
      console.log("STOP → NO COUNTRY CODE");
      return;
    }

    async function loadOperators() {
      try {
        setLoading(true);
        setSelectedOperator(null);
        setStep2Done(false);

        const url = `${apiBase}/api/operators?country=${code}`;
        console.log("FETCHING OPERATORS →", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("BACKEND RESPONSE =", data);

        const ops: Operator[] = data.operators || [];

        setAllOperators(ops);
        setDisplayOperators(ops);
      } catch (err) {
        console.error("Failed to load operators", err);
        setAllOperators([]);
        setDisplayOperators([]);
      } finally {
        setLoading(false);
      }
    }

    loadOperators();
  }, [shouldLoad, country, apiBase]);

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
