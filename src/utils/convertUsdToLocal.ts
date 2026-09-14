export function convertUsdToLocal(
  usd: number,
  fx_rate: number | null | undefined,
  fx_markup: number | null | undefined
): number {
  if (!fx_rate) return usd;

  const rate = fx_rate * (1 + (fx_markup || 0));
  return usd * rate;
}
