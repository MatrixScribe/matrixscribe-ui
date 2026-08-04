"use client";

import { useState, useEffect, useRef } from "react";

// Someone Else components
import { Step1Recipient } from "@/components/topup/Step1Recipient";
import { Step2Operator } from "@/components/topup/Step2Operator";
import { Step3Products } from "@/components/topup/Step3Products";
import { Step4Review } from "@/components/topup/Step4Review";

// Recharge Myself components
import AutoDetectSelf from "@/components/topup/self/AutoDetectSelf";
import ProductsSelf from "@/components/topup/self/ProductsSelf";
import ReviewSelf from "@/components/topup/self/ReviewSelf";

export default function TopUpSection({
  user,
  wallet,
  simCards,
  countries,
  countriesLoading
}) {
  // ⭐ Use SAME shape as LocalSimSection / DashboardAutoDetect
  const sim = simCards?.[0] || null;

  const myPhone = sim?.phone || user?.phone || "";
  const myCountryName = sim?.country || user?.country || "";
  const myFlag = sim?.flag || user?.country_flag || "";

  const myCountry = {
    name: myCountryName,
    flag: myFlag,
  };

  const [mode, setMode] = useState<"self" | "other" | null>(null);

  // shared state
  const [operatorsLoading, setOperatorsLoading] = useState(false);
  const [displayOperators, setDisplayOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [step3Done, setStep3Done] = useState(false);

  // someone else state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  // ⭐ Load operators for "Recharge Someone Else"
  useEffect(() => {
    if (!step1Done || !selectedCountry) return;

    setOperatorsLoading(true);

    fetch(
      `https://redatacom-end.onrender.com/api/operators?country=${selectedCountry.code}`
    )
      .then((r) => r.json())
      .then((data) => {
        setDisplayOperators(data.operators || []);
      })
      .catch(() => setDisplayOperators([]))
      .finally(() => setOperatorsLoading(false));
  }, [step1Done, selectedCountry]);

  // ⭐ Load products when Step 2 is done (Recharge Someone Else)
  useEffect(() => {
    if (!step2Done || !selectedOperator) return;

    setProductsLoading(true);

    fetch(
      `https://redatacom-end.onrender.com/api/products?operatorId=${selectedOperator.operatorId}`
    )
      .then((r) => r.json())
      .then((res) => {
        if (res?.bundles || res?.type === "FIXED") {
          setProducts(res.bundles || []);
        } else if (res?.type === "RANGE") {
          setProducts([res]); // range product
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, [step2Done, selectedOperator]);

  // ⭐ Particle Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* -------------------------------------------
     PARTICLES FOR TOP-UP HEADER STRIPE
  ------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.8,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col gap-5">

      {/* ⭐ HEADER — Titanium + Particle Stripe */}
      <div className="
        relative rounded-3xl p-6 shadow-2xl
        bg-gradient-to-br from-neutral-900 via-neutral-800 to-black
        text-white border border-neutral-600
        overflow-hidden
      ">
        {/* Brushed Metal */}
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-60 mix-blend-overlay" />

        {/* Holographic Shine */}
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        {/* Soft Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

        {/* Particle Stripe */}
        <div className="absolute top-0 left-0 w-full h-14 overflow-hidden border-b border-ffff">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-400/40 to-orange-400 opacity-80" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

          <div className="absolute inset-0 flex items-center justify-between px-4">
            <img src="/logogrey.png" className="h-6 opacity-80" />
            <h2 className="text-lrg font-bold tracking-tight drop-shadow-lg">
            Airtime • Data • Bundles • PIN
          </h2>
          </div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 mt-10">

          <p className="text-sm opacity-90 mb-2"></p>

          {/* ⭐ CLEAN WALLET BALANCE */}
          <p className="text-xl font-extrabold drop-shadow-xl">
            ${Number(wallet?.usd_balance || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* MODE SELECT */}
      {mode === null && (
        <div className="
          bg-gradient-to-br from-neutral-900 via-neutral-800 to-purple-300
          text-white rounded-2xl p-6 shadow-xl border border-neutral-700
          relative overflow-hidden
        ">
          {/* Brushed Metal */}
          <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-20 mix-blend-overlay" />

          {/* Shine */}
          <div className="absolute inset-0 pointer-events-none shine-effect" />

          <div className="relative z-10">
            <h2 className="text-xl font-semibold">Start Here</h2>

            <button
              onClick={() => setMode("self")}
              className="w-full py-4 rounded-xl bg-white/10 text-purple-200 font-semibold hover:bg-white/20 transition mt-4"
            >
              Recharge Myself
            </button>

            <button
              onClick={() => setMode("other")}
              className="w-full py-4 rounded-xl bg-white/10 text-purple-200 font-semibold hover:bg-white/20 transition"
            >
              Recharge Someone Else
            </button>
          </div>
        </div>
      )}

      {/* RECHARGE MYSELF */}
      {mode === "self" && (
        <>
          <AutoDetectSelf
            userCountry={myCountry}
            userPhone={myPhone}
            setSelectedOperator={setSelectedOperator}
            setDisplayOperators={setDisplayOperators}
          />

          <ProductsSelf
            selectedOperator={selectedOperator}
            productsLoading={productsLoading}
            setProductsLoading={setProductsLoading}
            products={products}
            setProducts={setProducts}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            setStep3Done={setStep3Done}
          />

          <ReviewSelf
            userCountry={myCountry}
            userPhone={myPhone}
            selectedOperator={selectedOperator}
            selectedProduct={selectedProduct}
            wallet={wallet}
          />
        </>
      )}

      {/* RECHARGE SOMEONE ELSE */}
      {mode === "other" && (
        <>
          <Step1Recipient
            apiBase="https://redatacom-end.onrender.com/api"
            countries={countries}
            countriesLoading={countriesLoading}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={recipientPhone}
            setPhone={setRecipientPhone}
            phoneRules={null}
            isPhoneValid={recipientPhone.length > 5}
            step1Done={step1Done}
            setStep1Done={setStep1Done}
          />

          <Step2Operator
            step1Done={step1Done}
            operatorsLoading={operatorsLoading}
            displayOperators={displayOperators}
            selectedOperator={selectedOperator}
            setSelectedOperator={setSelectedOperator}
            setStep2Done={setStep2Done}
          />

          <Step3Products
            step2Done={step2Done}
            productsLoading={productsLoading}
            products={products}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            step3Done={step3Done}
            setStep3Done={setStep3Done}
          />

          <Step4Review
            step3Done={step3Done}
            selectedCountry={selectedCountry}
            phone={recipientPhone}
            selectedOperator={selectedOperator}
            selectedProduct={selectedProduct}
            topupType="airtime"
            onContinue={() => alert("Proceed to checkout")}
          />
        </>
      )}
    </div>
  );
}
