// src/utils/topup.ts
export function getCountryCode(c: any): string | null {
  if (!c) return null;

  // Signup countries ONLY have "code"
  // Topup countries have iso2
  // eSIM countries may have iso3 or countryCode
  return (
    c.code ||        // Signup (ZA)
    c.iso2 ||        // Topup (ZA, KR, NG)
    c.iso ||         // Some APIs return iso
    c.countryCode || // eSIM backend
    c.iso3 ||        // eSIM backend
    c.id ||          // Some operator APIs use numeric IDs
    null
  );
}
