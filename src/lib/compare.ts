export function parseComparisonSlug(slug: string) {
  const lower = slug.toLowerCase();

  // Split "redatacom-vs-airalo"
  const parts = lower.split("-vs-");

  const left = parts[0]?.replace(/-/g, " ").trim();
  const right = parts[1]?.replace(/-/g, " ").trim();

  return {
    left,
    right,
    rawLeft: parts[0],
    rawRight: parts[1],
  };
}

export function formatName(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
