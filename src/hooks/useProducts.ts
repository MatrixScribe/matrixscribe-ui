"use client";

import { useEffect, useState } from "react";
import { Country, Operator, Product } from "@/components/topup/types";
import { getCountryCode } from "@/utils/topup";

export function useProducts(
  step2Done: boolean,
  operator: Operator | null,
  country: Country | null,
  type: "airtime" | "data",
  apiBase: string
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step3Done, setStep3Done] = useState(false);

  useEffect(() => {
    if (!step2Done || !operator || !country) return;

    async function loadProducts() {
      try {
        setLoading(true);
        setSelectedProduct(null);
        setStep3Done(false);

        const code = getCountryCode(country);

        const res = await fetch(
          `${apiBase}/api/products?operatorId=${operator?.operatorId ?? ""}`
        );

        const data = await res.json();

        // -----------------------------
        // RANGE (AIRTIME)
        // -----------------------------
        if (data.type === "RANGE") {
          const p: Product = {
            id: `${operator.operatorId}-custom`,
            name: "Custom Airtime",
            label: "Airtime Amount",
            kind: "custom",
            baseCurrency: data.currency,
            minBaseAmount: data.min,
            maxBaseAmount: data.max
          };

          setProducts([p]);
          return;
        }

        // -----------------------------
        // FIXED (DATA / PIN)
        // -----------------------------
        if (data.type === "FIXED" && Array.isArray(data.bundles)) {
          const mapped: Product[] = data.bundles.map((b: any) => ({
            id: b.id,
            name: b.name,
            label: b.name,
            kind: "fixed",
            baseAmount: b.price,
            baseCurrency: data.currency,
            description: b.rawDescription || null
          }));

          setProducts(mapped);
          return;
        }

        // Fallback
        setProducts([]);
      } catch (err) {
        console.error("Failed to load products", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [step2Done, operator, country, type, apiBase]);

  return {
    products,
    groupedProducts: {}, // no grouping needed anymore
    loading,
    selectedProduct,
    setSelectedProduct,
    step3Done,
    setStep3Done
  };
}
