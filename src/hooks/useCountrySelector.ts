"use client";

import { useState } from "react";

export function useCountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function setCountry(c: any) {
    setSelectedCountry(c);
    setIsOpen(false);
  }

  function resetCountry() {
    setSelectedCountry(null);
  }

  return {
    isOpen,
    open,
    close,
    selectedCountry,
    setCountry,
    resetCountry,
  };
}
