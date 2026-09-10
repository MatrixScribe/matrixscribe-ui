"use client";

import { createContext, useContext, useState } from "react";

type PreferredCurrencyContextType = {
  preferredCurrency: string | null;
  preferredRate: number | null;
  setPreferredCurrency: (code: string, rate: number) => void;
};

const PreferredCurrencyContext = createContext<PreferredCurrencyContextType>({
  preferredCurrency: null,
  preferredRate: null,
  setPreferredCurrency: () => {},
});

export function PreferredCurrencyProvider({ children }: { children: React.ReactNode }) {
  const [preferredCurrency, setPreferredCurrencyCode] = useState<string | null>(null);
  const [preferredRate, setPreferredRate] = useState<number | null>(null);

  const setPreferredCurrency = (code: string, rate: number) => {
    setPreferredCurrencyCode(code);
    setPreferredRate(rate);
  };

  return (
    <PreferredCurrencyContext.Provider
      value={{
        preferredCurrency,
        preferredRate,
        setPreferredCurrency,
      }}
    >
      {children}
    </PreferredCurrencyContext.Provider>
  );
}

export function usePreferredCurrency() {
  return useContext(PreferredCurrencyContext);
}
