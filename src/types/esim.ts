export type NormalizedBundle = {
  id: string;
  name: string;
  type: "fixed" | "unlimited";
  scope: "country" | "region" | "global";

  data_mb: number | null;
  validity_days: number;

  price_usd: number;
  price_sar: number;
  currency: string;
  quantity: number;

  supports_topup: boolean;
  fair_usage?: string | null;

  available_networks: string[];

  coverage: {
    country_code: string;
    country_name: string;
    flag?: string;
    networks: string[];
  }[];

  coverage_count: number;

  country?: {
    iso: string;
    name: string;
    flag?: string;
  };

  country_name?: string;
  region?: string | null;
  region_code?: string | null;
  global_code?: string | null;

  destination_code?: string;
  destination_name?: string;

  socials?: Record<string, { ios: boolean; android: boolean }>;

  minutes?: number | null;
  sms?: number | null;

  updated_at?: string;
  object?: string;

  finalPriceUsd?: number;
  finalPriceFx?: number;
  markupApplied?: boolean;

  original?: any;
};
