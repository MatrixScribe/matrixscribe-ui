export type Country = {
  name: string;
  code?: string;
  iso2?: string;
  dialCode: string;
  flag: string;
};

export type PhoneRules = {
  minLength: number;
  maxLength: number;
  regex?: string;
};

export type Operator = {
  operatorId: number | string;
  name: string;
  logo?: string | null;
};

export type Product = {
  id: string | number;
  label?: string;
  name?: string;
  kind?: string;
  baseCurrency?: string;
  baseAmount?: number;
  customAmount?: number;
  validity?: string | null;
  description?: string | null;
  minBaseAmount?: number;
  maxBaseAmount?: number;
  amount?: number;
  currency?: string;
};
