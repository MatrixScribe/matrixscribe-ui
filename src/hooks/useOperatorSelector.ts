"use client";

import { useState } from "react";

export function useOperatorSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<any>(null);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function setOperator(op: any) {
    setSelectedOperator(op);
    setIsOpen(false);
  }

  function resetOperator() {
    setSelectedOperator(null);
  }

  return {
    isOpen,
    open,
    close,
    selectedOperator,
    setOperator,
    resetOperator,
  };
}
