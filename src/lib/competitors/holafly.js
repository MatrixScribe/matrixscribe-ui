export async function fetchHolaflyPackages(countrySlug) {
  const url = `https://holafly.com/esim/${countrySlug}/`;

  // Use CORS proxy to avoid browser blocking
  const html = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ).then(r => r.text());

  // Extract the JSON inside __NEXT_DATA__
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);

  if (!match) return [];

  const json = JSON.parse(match[1]);

  // Holafly stores products in: json.props.pageProps.product
  const product = json?.props?.pageProps?.product;

  if (!product || !product.variants) return [];

  return product.variants.map(v => ({
    id: v.id,
    name: v.name,
    price_usd: v.price?.usd || v.price?.amount || null,
    data_gb: v.data || null,
    validity: v.days || null,
  }));
}
