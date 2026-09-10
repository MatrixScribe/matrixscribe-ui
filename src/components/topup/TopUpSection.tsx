"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Step1Recipient } from "@/components/topup/Step1Recipient";
import { Step2Operator } from "@/components/topup/Step2Operator";
import { Step3Products } from "@/components/topup/Step3Products";
import { Step4Review } from "@/components/topup/Step4Review";
import { Country, Operator, Product } from "@/components/topup/types";

import { usePreferredCurrency } from "@/components/context/PreferredCurrencyContext";

export default function TopUpSection() {
  const router = useRouter(); // ⭐ FIXED

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  const { preferredCurrency, preferredRate } = usePreferredCurrency();

  /* COUNTRIES */
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const data = await res.json();

        const normalized: Country[] = (data.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso2 || c.iso || c.countryCode || c.code,
          dialCode: c.dialCode,
          flag: c.flag,
        }));

        setCountries(normalized);
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }

    loadCountries();
  }, [API_BASE]);

  /* FLOW STATE */
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [operatorsLoading, setOperatorsLoading] = useState(false);
  const [displayOperators, setDisplayOperators] = useState<Operator[]>([]);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);

  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [recipientPhone, setRecipientPhone] = useState("");

  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);

  /* LOAD OPERATORS WHEN COUNTRY CHANGES */
  useEffect(() => {
    const iso = selectedCountry?.iso2;
    if (!iso) return;

    setOperatorsLoading(true);
    setDisplayOperators([]);
    setSelectedOperator(null);
    setSelectedProduct(null);
    setStep2Done(false);
    setStep3Done(false);

    fetch(`${API_BASE}/api/operators?country=${iso}`)
      .then((r) => r.json())
      .then((data) => {
        setDisplayOperators(data.operators || []);
      })
      .catch((err) => {
        console.error("Failed to load operators", err);
        setDisplayOperators([]);
      })
      .finally(() => setOperatorsLoading(false));
  }, [selectedCountry?.iso2, API_BASE]);

  /* LOAD PRODUCTS WHEN OPERATOR CHANGES */
  useEffect(() => {
    const opId = selectedOperator?.id || selectedOperator?.operatorId;
    if (!opId) return;

    setProductsLoading(true);
    setProducts([]);
    setSelectedProduct(null);
    setStep3Done(false);

    fetch(`${API_BASE}/api/products?operatorId=${opId}`)
      .then((r) => r.json())
      .then((res) => {
        if (res?.bundles || res?.type === "FIXED") {
          setProducts(res.bundles || []);
        } else if (res?.type === "RANGE") {
          setProducts([res]);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setProducts([]);
      })
      .finally(() => setProductsLoading(false));
  }, [selectedOperator?.id, selectedOperator?.operatorId, API_BASE]);

  return (
    <div className="flex flex-col gap-5" id="topup-section">
      {/* STEP 1 — COUNTRY */}
      <Step1Recipient
        countries={countries}
        countriesLoading={countriesLoading}
        selectedCountry={selectedCountry}
        setSelectedCountry={(c) => {
          setSelectedCountry(c);
          setStep1Done(false);
          setStep2Done(false);
          setStep3Done(false);
          setSelectedOperator(null);
          setSelectedProduct(null);
        }}
        step1Done={step1Done}
        setStep1Done={setStep1Done}
      />

      {/* STEP 2 — OPERATORS */}
      {step1Done && selectedCountry && (
        <Step2Operator
          operatorsLoading={operatorsLoading}
          displayOperators={displayOperators}
          selectedOperator={selectedOperator}
          setSelectedOperator={(op) => {
            if (!op) {
              setSelectedOperator(null);
              setStep2Done(false);
              return;
            }
            const normalizedId = op.id || op.operatorId;
            const normalized: Operator = {
              ...op,
              id: normalizedId,
              operatorId: normalizedId,
            };
            setSelectedOperator(normalized);
            setStep2Done(true);
          }}
          setStep2Done={setStep2Done}
        />
      )}

      {/* STEP 3 — PRODUCTS */}
      {step2Done && selectedOperator && (
        <Step3Products
          step2Done={step2Done}
          productsLoading={productsLoading}
          products={products}
          selectedProduct={selectedProduct}
          setSelectedProduct={(p) => {
            setSelectedProduct(p);
            setStep3Done(!!p);
          }}
          step3Done={step3Done}
          setStep3Done={setStep3Done}
        />
      )}

      {/* STEP 4 — PHONE + REVIEW */}
      {step3Done && selectedProduct && selectedOperator && selectedCountry && (
        <Step4Review
          step3Done={step3Done}
          selectedCountry={selectedCountry}
          phone={recipientPhone}
          setPhone={setRecipientPhone}
          selectedOperator={selectedOperator}
          selectedProduct={selectedProduct}
          topupType="airtime"
          preferredCurrency={preferredCurrency}
          preferredRate={preferredRate}
          onContinue={() => {
            const payload = {
              country: selectedCountry.iso2,
              countryName: selectedCountry.name,
              countryFlag: selectedCountry.flag,
              dialCode: selectedCountry.dialCode,

              operatorId: selectedOperator.id,
              operatorName: selectedOperator.name,
              operatorLogo: selectedOperator.logo,

              productId: selectedProduct.id,
              productName: selectedProduct.name,

              phone: recipientPhone,
              msisdn: `${selectedCountry.dialCode}${recipientPhone.replace(/\D/g, "")}`,

              amount: selectedProduct.customAmount ?? selectedProduct.price,
              currency: selectedProduct.currency,

              preferredCurrency,
              preferredRate,
              preferredAmount:
                preferredCurrency && preferredRate
                  ? (selectedProduct.customAmount
                      ? selectedProduct.customAmount / preferredRate
                      : selectedProduct.price / preferredRate)
                  : null,
            };

            const encoded = encodeURIComponent(JSON.stringify(payload));

            router.push(`/checkout?payload=${encoded}`); // ⭐ FIXED
          }}
        />
      )}
    </div>
  );
}
