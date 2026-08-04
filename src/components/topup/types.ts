export type Country = {
  name: string;
  code?: string;

  // ⭐ FIX: backend returns "iso", UI expects "iso2"
  iso?: string;
  iso2?: string;

  dialCode: string;
  flag: string;
};
