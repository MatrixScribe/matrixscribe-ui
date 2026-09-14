// src/components/topup/types.ts

/* ------------------------------------------------------------
   COUNTRY
------------------------------------------------------------ */
export type Country = {
  name: string;
  code?: string;

  iso?: string;
  iso2?: string;

  dialCode: string;
  flag: string;
};

/* ------------------------------------------------------------
   OPERATOR
------------------------------------------------------------ */
export type Operator = {
  id?: string;
  operatorId?: string;
  name: string;
  logo?: string;
  logoUrls?: string[];
};

/* ------------------------------------------------------------
   PRODUCT
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

  /* RANGE custom fields */
  kind?: string;               // "custom" or "fixed"
  minBaseAmount?: number;
  maxBaseAmount?: number;

  /* ---------------- FIXED PRODUCTS ---------------- */
  price?: number;
  rawDescription?: string;

  /* ---------------- OPTIONAL BACKEND FIELDS ---------------- */
  label?: string;
  amount?: number;
  baseAmount?: number;
  baseCurrency?: string;       // <-- KEEP ONLY THIS ONE
  description?: string;
  sell_rate?: number;
  updated_at?: string;

  /* ---------------- RANGE CUSTOM AMOUNT ---------------- */
  customAmount?: number;
};

/* ------------------------------------------------------------
   PHONE RULES
------------------------------------------------------------ */
export type PhoneRules = {
  minLength: number;
  maxLength: number;
  regex?: string;
};
