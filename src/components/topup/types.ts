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
  id?: string;
  operatorId?: string;
  name: string;
  logo?: string;
  logoUrls?: string[];
};

/* ------------------------------------------------------------
   PRODUCT (Step3Products cosmic version)
   Matches EXACTLY how your current Step3 uses it.
------------------------------------------------------------ */
export type Product = {
  id: string;
  name: string;

  // RANGE detection
  type?: string;               // "RANGE"
  denominationType?: string;   // sometimes backend uses this

  // RANGE amounts
  minAmount?: number;
  maxAmount?: number;
  currency?: string;

  // FIXED bundles
  price?: number;              // operator price
  rawDescription?: string;     // bundle description

  // Optional extras (Reloadly sometimes sends these)
  label?: string;
  amount?: number;
  baseAmount?: number;
  baseCurrency?: string;
  description?: string;
  sell_rate?: number;
  updated_at?: string;

  // Custom amount for RANGE when user enters value
  customAmount?: number;
};
