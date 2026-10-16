import { devices } from "@/lib/devices";

export default async function sitemap() {
  const base = "https://redatacom.com";

  // Country pages
  const countries = ["ZA","AE","GB","US","NG","KE","TZ","UG","IN","PK","DE","FR","ES","IT"]; 
  // Ideally fetch from your API

  // Region pages
  const regions = ["afr","eu","mena","asia","latam","global"];

  // Device pages (known models only)
  const deviceUrls = Object.entries(devices).flatMap(([brand, models]) =>
    models.map((m) => `/device/${brand}/${m}`)
  );

  // Travel pages (seed list)
  const travelSeeds = [
    "johannesburg-airport-esim",
    "dubai-airport-esim",
    "heathrow-airport-esim",
    "south-africa-esim",
    "uae-esim",
    "london-esim"
  ];

  // Comparison pages (seed list)
  const compareSeeds = [
    "redatacom-vs-airalo",
    "redatacom-vs-holafly",
    "esim-vs-physical-sim",
    "esim-vs-roaming"
  ];

  return [
    // Static pages
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/faq`, lastModified: new Date() },
    { url: `${base}/support`, lastModified: new Date() },

    // Country pages
    ...countries.map((c) => ({
      url: `${base}/country/${c}`,
      lastModified: new Date(),
    })),

    // Region pages
    ...regions.map((r) => ({
      url: `${base}/region/${r}`,
      lastModified: new Date(),
    })),

    // Device pages
    ...deviceUrls.map((d) => ({
      url: `${base}${d}`,
      lastModified: new Date(),
    })),

    // Travel pages
    ...travelSeeds.map((t) => ({
      url: `${base}/travel/${t}`,
      lastModified: new Date(),
    })),

    // Comparison pages
    ...compareSeeds.map((t) => ({
      url: `${base}/compare/${t}`,
      lastModified: new Date(),
    })),
  ];
}
