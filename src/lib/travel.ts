export function classifyTravelSlug(slug: string) {
  const lower = slug.toLowerCase();

  const isAirport = lower.includes("airport");
  const isEsim = lower.includes("esim");

  // Extract location name
  const location = lower
    .replace("-airport", "")
    .replace("-esim", "")
    .replace(/-/g, " ")
    .trim();

  return {
    isAirport,
    isEsim,
    location,
  };
}
