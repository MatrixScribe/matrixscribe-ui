export async function fetchAiraloPackages(countrySlug) {
  const query = `
    query GetCountryPackages($slug: String!) {
      country(slug: $slug) {
        packages {
          id
          name
          price_usd
          data_gb
          validity
        }
      }
    }
  `;

  const res = await fetch("https://www.airalo.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { slug: countrySlug }
    })
  });

  const json = await res.json();
  return json.data?.country?.packages || [];
}
