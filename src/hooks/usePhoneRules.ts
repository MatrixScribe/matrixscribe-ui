"use client";

import { useEffect, useState } from "react";
import { Country, PhoneRules } from "@/components/topup/types";
import { getCountryCode } from "@/utils/topup";

export function usePhoneRules(country: Country | null, apiBase: string) {
  const [rules, setRules] = useState<PhoneRules | null>(null);

  useEffect(() => {
    const code = getCountryCode(country);
    if (!code) {
      setRules(null);
      return;
    }

    async function loadRules() {
      try {
        const res = await fetch(`${apiBase}/api/country/${code}`);
        const data = await res.json();
        setRules(data.validation || null);
      } catch (err) {
        console.error("Failed to load phone rules", err);
        setRules(null);
      }
    }

    loadRules();
  }, [country, apiBase]);

  return rules;
}
