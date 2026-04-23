"use client";

import Link from "next/link";

import { useCountrySelector } from "@/hooks/useCountrySelector";
import CountrySelectorModal from "@/components/country/CountrySelectorModal";

import { useOperatorSelector } from "@/hooks/useOperatorSelector";
import OperatorSelectorModal from "@/components/operator/OperatorSelectorModal";

import { useProductSelector } from "@/hooks/useProductSelector";
import ProductSelectorModal from "@/components/product/ProductSelectorModal";

import { useTopupStore } from "@/store/topupStore";
import { useWalletStore } from "@/store/walletStore";

export default function Home() {
  const {
    country,
    operator,
    product,
    amount,
    setCountry,
    setOperator,
    setProduct,
    setAmount,
  } = useTopupStore();

  const { balance } = useWalletStore();

  // COUNTRY SELECTOR
  const {
    isOpen: countryOpen,
    open: openCountrySelector,
    close: closeCountrySelector,
    setCountry: chooseCountry,
  } = useCountrySelector();

  // OPERATOR SELECTOR
  const {
    isOpen: operatorOpen,
    open: openOperatorSelector,
    close: closeOperatorSelector,
    setOperator: chooseOperator,
  } = useOperatorSelector();

  // PRODUCT SELECTOR
  const {
    isOpen: productOpen,
    open: openProductSelector,
    close: closeProductSelector,
    setProduct: chooseProduct,
    productType,
    setProductType,
  } = useProductSelector();

  function handleCountrySelect(c: any) {
    setCountry(c);
    chooseCountry(c);
    setOperator(null);
    setProduct(null);
  }

  function handleOperatorSelect(o: any) {
    setOperator(o);
    chooseOperator(o);
    setProduct(null);
  }

  function handleProductSelect(p: any) {
    setProduct(p);
    chooseProduct(p);
  }

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <span className="text-lg font-semibold tracking-tight">
              MatrixScribe Topup
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/wallet"
              className="rounded-full bg-white px-3 py-1 border border-neutral-300 text-xs hover:bg-neutral-100 transition"
            >
              Wallet:{" "}
              <span className="font-semibold text-emerald-600">
                ${balance.toFixed(2)}
              </span>
            </Link>
          </div>
        </header>

        {/* Hero + flow */}
        <section className="grid gap-8 md:grid-cols-[1.3fr,1fr] items-start">
          {/* Left */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              Global airtime & data,{" "}
              <span className="text-emerald-600">from one wallet</span>.
            </h1>

            <p className="text-neutral-600 mb-6 max-w-xl">
              Top up phones in 150+ countries with a single balance. Fast,
              transparent, and built for daily cashflow.
            </p>

            <ol className="space-y-3 text-sm text-neutral-600">
              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold">
                  1
                </span>
                <div>
                  <div className="font-medium">Choose country & operator</div>
                  <div className="text-xs text-neutral-500">
                    We surface live operators and products for that destination.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold">
                  2
                </span>
                <div>
                  <div className="font-medium">Pick airtime, data, or utilities</div>
                  <div className="text-xs text-neutral-500">
                    Flexible amounts or curated bundles.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold">
                  3
                </span>
                <div>
                  <div className="font-medium">Confirm & send instantly</div>
                  <div className="text-xs text-neutral-500">
                    Wallet debits, ledger updates, and delivery receipts.
                  </div>
                </div>
              </li>
            </ol>
          </div>

          {/* Right: Start Topup Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Start a topup
            </div>

            <div className="space-y-4">
              {/* Country Selector */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Destination country
                </label>

                <button
                  onClick={openCountrySelector}
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-left text-sm flex items-center justify-between hover:border-emerald-500 transition"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-neutral-300 flex items-center justify-center">
                      {country?.flag || ""}
                    </span>
                    <span>{country?.name || "Select country"}</span>
                  </span>
                  <span className="text-xs text-neutral-500">Change</span>
                </button>
              </div>

              {/* Operator Selector */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Mobile operator
                </label>

                <button
                  onClick={openOperatorSelector}
                  disabled={!country}
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-left text-sm flex items-center justify-between hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {operator?.name ||
                      (country ? "Select operator" : "Choose country first")}
                  </span>
                  <span className="text-xs text-neutral-500">Browse</span>
                </button>
              </div>

              {/* Product Selector */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Product
                </label>

                <div className="flex gap-2 text-xs mb-2">
                  {["airtime", "data", "utilities"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setProductType(type as any)}
                      className={`flex-1 rounded-full py-1.5 font-medium ${
                        productType === type
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-200"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={openProductSelector}
                  disabled={!operator}
                  className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-left text-sm flex items-center justify-between hover:border-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {product?.name ||
                      (operator ? "Select product" : "Choose operator first")}
                  </span>
                  <span className="text-xs text-neutral-500">Browse</span>
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium mb-1">
                  Amount
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={amount ?? ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder={product?.amount || "10.00"}
                    className="flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-neutral-500 px-2 py-1 rounded-full border border-neutral-300">
                    USD
                  </span>
                </div>
              </div>

              {/* Continue */}
              <Link
                href="/checkout"
                className="mt-2 w-full block text-center rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition"
              >
                Continue to checkout
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <CountrySelectorModal
        open={countryOpen}
        onClose={closeCountrySelector}
        onSelect={handleCountrySelect}
      />

      <OperatorSelectorModal
        open={operatorOpen}
        onClose={closeOperatorSelector}
        onSelect={handleOperatorSelect}
        country={country}
      />

      <ProductSelectorModal
        open={productOpen}
        onClose={closeProductSelector}
        onSelect={handleProductSelect}
        productType={productType}
      />
    </main>
  );
}
