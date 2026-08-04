import { getFx } from "../../fx/fx.service.js";

/**
 * Convert USD → user's preferred currency using mid_rate
 */
export async function convertUsdToFx(usdAmount, preferredCurrency) {
  if (!preferredCurrency) return null;

  const fx = await getFx(preferredCurrency);
  if (!fx) return null;

  const midRate = Number(fx.mid_rate);
  const converted = usdAmount * midRate;

  // Round to 2 decimals
  return Number(converted.toFixed(2));
}
