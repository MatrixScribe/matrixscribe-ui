"use client";

import { useState } from "react";

export function useCountrySelector() {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  function openSelector() {
    setOpen(true);
  }

  function closeSelector() {
    setOpen(false);
  }

  function chooseCountry(country: any) {
    setSelectedCountry(country);
    setOpen(false);
  }

  return {
    open,
    selectedCountry,
    openSelector,
    closeSelector,
    chooseCountry,
  };
}
