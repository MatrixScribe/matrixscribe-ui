import { Country, Product } from "@/components/topup/types";

export function isoToEmoji(iso?: string | null) {
  if (!iso) return "";
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export function getCountryCode(c: Country | null): string | null {
  if (!c) return null;
  return (c.code || c.iso2 || "").toString() || null;
}

export function groupProducts(products: Product[]) {
  const groups: Record<string, Product[]> = {
    DATA: [],
    COMBO: [],
    SOCIAL: [],
    UNLIMITED: [],
    OTHER: []
  };

  products.forEach((p) => {
    if (p.kind === "custom") {
      groups.OTHER.push(p);
      return;
    }

    const k = (p.kind || "").toUpperCase();
    if (k.includes("DATA")) groups.DATA.push(p);
    else if (k.includes("COMBO")) groups.COMBO.push(p);
    else if (k.includes("SOCIAL")) groups.SOCIAL.push(p);
    else if (k.includes("UNLIMITED")) groups.UNLIMITED.push(p);
    else groups.OTHER.push(p);
  });

  return groups;
}
