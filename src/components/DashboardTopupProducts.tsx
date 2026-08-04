"use client";

import { useEffect, useMemo, useState, useRef } from "react";

const API_BASE = "https://redatacom-end.onrender.com/api";

type RangeProduct = {
  operatorId: number;
  operatorName: string;
  type: "RANGE";
  currency: string;
  min: number;
  max: number;
};

type FixedBundle = {
  id: string;
  price: number;
  currency: string;
  name: string;
  rawDescription?: string | null;
};

type FixedProduct = {
  operatorId: number;
  operatorName: string;
  type: "FIXED";
  currency: string;
  bundles: FixedBundle[];
};

type ProductResponse =
  | RangeProduct
  | FixedProduct
  | { type: "UNKNOWN"; operatorId: number; operatorName: string };

type Props = {
  operatorId: number | null;
  operatorName: string | null;
  onSelectProduct?: (payload: any) => void;
};

export function DashboardTopupProducts({
  operatorId,
  operatorName,
  onSelectProduct,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductResponse | null>(null);
  const [amount, setAmount] = useState<string>("");

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!operatorId) {
      setData(null);
      return;
    }
    setLoading(true);
    fetch(`${API_BASE}/products?operatorId=${operatorId}`)
      .then((r) => r.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [operatorId]);

  const sortedBundles = useMemo(() => {
    if (!data || data.type !== "FIXED") return [];

    const bundles = [...data.bundles];

    // ⭐ Smart sorting: Best value first
    return bundles.sort((a, b) => a.price - b.price);
  }, [data]);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const cardWidth = el.children[0]?.clientWidth || 1;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setActiveIndex(index);
  };

  if (!operatorId) return null;

  return (
    <section className="w-full max-w-3xl mx-auto bg-ffff border border-neutral-200 rounded-2xl p-5 shadow-md backdrop-ffff">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
          <img src="/icon-airtime.png" className="w-auto h-10 opacity-100" />
          </p>
          <p className="text-sm font-semibold text-neutral-900">
            {operatorName || "Selected operator"}
          </p>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-xs text-neutral-500">Fetching the best deals…</p>
      )}

      {/* NO DATA */}
      {!loading && !data && (
        <p className="text-xs text-neutral-500">
          No product information available for this operator.
        </p>
      )}

      {/* RANGE PRODUCT */}
      {!loading && data && data.type === "RANGE" && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-600">
            Enter any amount between{" "}
            <span className="font-semibold">
              {data.min} {data.currency}
            </span>{" "}
            and{" "}
            <span className="font-semibold">
              {data.max} {data.currency}
            </span>
            .
          </p>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={`${data.min} - ${data.max}`}
          />

          {/* LIVE PREVIEW */}
          {amount && Number(amount) >= data.min && Number(amount) <= data.max && (
            <div className="text-xs text-neutral-700 bg-purple-50 border border-purple-200 rounded-xl p-3">
              You’re about to recharge{" "}
              <span className="font-semibold">
                {amount} {data.currency}
              </span>
              . Great choice!
            </div>
          )}

          <button
            disabled={
              !amount ||
              Number(amount) < data.min ||
              Number(amount) > data.max
            }
            onClick={() => {
              if (!onSelectProduct) return;
              const value = Number(amount);
              if (isNaN(value)) return;
              onSelectProduct({
                type: "RANGE",
                operatorId: data.operatorId,
                operatorName: data.operatorName,
                amount: value,
                currency: data.currency,
              });
            }}
            className="w-full mt-2 py-3 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Recharge {amount || "..."} {data.currency}
          </button>
        </div>
      )}

      {/* FIXED BUNDLES */}
      {!loading && data && data.type === "FIXED" && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-600">
            Choose a bundle — we’ve sorted them for best value.
          </p>

          {/* CAROUSEL */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="
              flex gap-4 overflow-x-auto snap-x snap-mandatory
              scrollbar-hide py-3
            "
          >
            {sortedBundles.map((b, index) => {
              const isActive = index === activeIndex;

              // ⭐ Smart tags
              const tag =
                index === 0
                  ? "Best Value"
                  : b.name.toLowerCase().includes("unlimited")
                  ? "Unlimited"
                  : b.name.toLowerCase().includes("social")
                  ? "Social"
                  : null;

              return (
                <button
                  key={b.id}
                  onClick={() => {
                    if (!onSelectProduct) return;
                    onSelectProduct({
                      type: "FIXED",
                      operatorId: data.operatorId,
                      operatorName: data.operatorName,
                      bundle: b,
                    });
                  }}
                  className={`
                    snap-center shrink-0 w-48 h-35 rounded-2xl border px-4 py-3
                    flex flex-col justify-between text-left transition
                    ${
                      isActive
                        ? "border-purple-600 bg-purple-50 shadow-md scale-100"
                        : "border-neutral-200 bg-white hover:border-purple-400 scale-95 opacity-80"
                    }
                  `}
                >
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">
                      {b.name}
                    </p>
                    <p className="text-[11px] text-purple-700 mt-1 line-clamp-2">
                      {b.rawDescription || "Instant recharge bundle"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-black">
                      {b.price} {b.currency}
                    </p>

                    {tag && (
                      <span className="inline-block mt-1 text-[10px] px-2 py-1 rounded-full bg-purple-600 text-white">
                        {tag}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* UNKNOWN */}
      {!loading && data && data.type === "UNKNOWN" && (
        <p className="text-xs text-neutral-500">
          This operator type is not supported yet.
        </p>
      )}
    </section>
  );
}
