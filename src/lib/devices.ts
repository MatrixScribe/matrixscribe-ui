// /lib/devices.ts

export const devices: Record<string, string[]> = {
  apple: [
    "iphone-18",
    "iphone-18-pro",
    "iphone-18-pro-max",
    "iphone-17",
    "iphone-17-pro",
    "iphone-17-pro-max",
    "iphone-16",
    "iphone-16-pro",
    "iphone-15",
    "iphone-14"
  ],

  samsung: [
    "galaxy-s26",
    "galaxy-s26-ultra",
    "galaxy-s25",
    "galaxy-s25-ultra",
    "galaxy-s24",
    "galaxy-s24-ultra",
    "galaxy-fold-7",
    "galaxy-flip-7",
    "galaxy-fold-6",
    "galaxy-flip-6"
  ],

  google: [
    "pixel-10",
    "pixel-10-pro",
    "pixel-9",
    "pixel-9-pro",
    "pixel-8",
    "pixel-8-pro"
  ],

  xiaomi: ["mi-16", "mi-15"],
  huawei: ["p80", "p70"],
  oppo: ["find-x9", "find-x8"]
};

// Convert "iphone-18-pro-max" → "iPhone 18 Pro Max"
export function formatDeviceName(model: string): string {
  return model
    .split("-")
    .map((part) => {
      if (part.toLowerCase() === "iphone") return "iPhone";
      if (part.toLowerCase() === "galaxy") return "Galaxy";
      if (part.toLowerCase() === "pixel") return "Pixel";
      if (part.toLowerCase() === "fold") return "Fold";
      if (part.toLowerCase() === "flip") return "Flip";
      if (part.toLowerCase() === "pro") return "Pro";
      if (part.toLowerCase() === "max") return "Max";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

// Check if model exists in known list
export function isKnownModel(brand: string, model: string): boolean {
  return devices[brand]?.includes(model) ?? false;
}
