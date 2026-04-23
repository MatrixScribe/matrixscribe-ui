"use client";

import { useState } from "react";

export function useOperatorSelector() {
  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);

  function openSelector() {
    setOpen(true);
  }

  function closeSelector() {
    setOpen(false);
  }

  function chooseOperator(op: any) {
    setSelectedOperator(op);
    setOpen(false);
  }

  function resetOperator() {
    setSelectedOperator(null);
  }

  return {
    open,
    selectedOperator,
    openSelector,
    closeSelector,
    chooseOperator,
    resetOperator,
  };
}
