import { Country } from "@/types/country";

export function normalizePlan(plan: any, countries: Country[]) {
  const countryIso = plan.country_code || "";

  const countryMeta = countries.find(
    (c) => c.iso?.toUpperCase() === countryIso?.toUpperCase()
  );

  const coverage = (plan.coverage || []).map((c: any) => {
    const flagCountry = countries.find(
      (cc) => cc.iso?.toUpperCase() === c.country_code?.toUpperCase()
    );

    return {
      country_code: c.country_code,
      country_name: c.country_name,
      flag: flagCountry?.flag,
      networks: c.networks || [],
    };
  });

  return {
    id: plan.id,
    name: plan.name,
    type: plan.type,
    scope: plan.scope,
    data_mb: plan.data_mb,
    validity_days: plan.validity_days,
    price_usd: plan.price_usd,
    price_sar: plan.price_sar,
    currency: plan.currency,
    quantity: plan.quantity,
    supports_topup: !!plan.supports_topup,
    fair_usage: plan.fair_usage,
    available_networks: plan.networks || [],
    coverage,
    coverage_count: plan.coverage_count || coverage.length,
    country: countryIso
      ? {
          iso: countryIso.toUpperCase(),
          name: plan.country_name || countryMeta?.name || "",
          flag: countryMeta?.flag,
        }
      : undefined,
    country_name: plan.country_name,
    region: plan.region_code,
    region_code: plan.region_code,
    global_code: plan.global_code,
    destination_code: plan.destination_code,
    destination_name: plan.destination_name,
    socials: plan.socials || {},
    minutes: plan.minutes,
    sms: plan.sms,
    updated_at: plan.updated_at,
    object: plan.object,
    finalPriceUsd: plan.finalPriceUsd ?? plan.price_usd,
    finalPriceFx: plan.finalPriceFx ?? plan.price_usd,
    markupApplied: !!plan.markupApplied,
    original: plan,
  };
}
