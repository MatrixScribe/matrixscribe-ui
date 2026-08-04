export function convertUsdToLocal(usd, fx_rate, fx_markup) {
  if (!fx_rate) return usd;
  const rate = fx_rate * (1 + (fx_markup || 0));
  return usd * rate;
}
