"use client";

import { useState } from "react";

export function useProductSelector() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productType, setProductType] = useState<"airtime" | "data" | "utilities">("airtime");

  function openSelector() {
    setOpen(true);
  }

  function closeSelector() {
    setOpen(false);
  }

  function chooseProduct(p: any) {
    setSelectedProduct(p);
    setOpen(false);
  }

  function resetProduct() {
    setSelectedProduct(null);
  }

  return {
    open,
    selectedProduct,
    productType,
    setProductType,
    openSelector,
    closeSelector,
    chooseProduct,
    resetProduct,
  };
}
