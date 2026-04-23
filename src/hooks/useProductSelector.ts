"use client";

import { useState } from "react";

export type ProductType = "airtime" | "data" | "utilities";

export function useProductSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productType, setProductType] = useState<ProductType>("airtime");

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function setProduct(p: any) {
    setSelectedProduct(p);
    setIsOpen(false);
  }

  function resetProduct() {
    setSelectedProduct(null);
  }

  return {
    isOpen,
    open,
    close,
    selectedProduct,
    setProduct,
    productType,
    setProductType,
    resetProduct,
  };
}
