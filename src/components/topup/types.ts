// src/components/topup/types.ts

/* ------------------------------------------------------------
   COUNTRY
------------------------------------------------------------ */
export type Country = {
  name: string;
  code?: string;

  // backend returns "iso", UI sometimes expects "iso2"
  iso?: string;
  iso2?: string;

  dialCode: string;
  flag: string;
};

/* ------------------------------------------------------------
   OPERATOR (Step2Operator + useOperators)
------------------------------------------------------------ */
export type Operator = {
  id?: string;               // normalized operator ID
  operatorId?: string;       // backend sometimes uses operatorId
  name: string;
  logo?: string;
  logoUrls?: string[];
};

/* ------------------------------------------------------------
   PRODUCT (Step3Products cosmic version + useProducts)
------------------------------------------------------------ */
export type Product = {
  id: string;
  name: string;

  /* ---------------- RANGE PRODUCTS ---------------- */
  type?: "RANGE" | "FIXED";
  denominationType?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;

  /* RANGE custom fields (used in useProducts.ts) */
  kind?: string;               // "custom" or "fixed"
  minBaseAmount?: number;
  maxBaseAmount?: number;
  baseCurrency?: string;

  /* ---------------- FIXED PRODUCTS ---------------- */
  price?: number;              // operator price
  rawDescription?: string;     // bundle description

  /* ---------------- OPTIONAL BACKEND FIELDS ---------------- */
  label?: string;
  amount?: number;
  baseAmount?: number;
  baseCurrency?: string;
  description?: string;
  sell_rate?: number;
  updated_at?: string;

  /* ---------------- RANGE CUSTOM AMOUNT ---------------- */
  customAmount?: number;       // user-entered amount for RANGE
};

/* ------------------------------------------------------------
   PHONE RULES
------------------------------------------------------------ */
export type PhoneRules = {
  minLength: number;
  maxLength: number;
  regex?: string;
};
