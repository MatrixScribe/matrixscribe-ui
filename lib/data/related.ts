import { RelatedEntity } from "../types";

export const related: Record<string, RelatedEntity[]> = {
  sarb: [
    { slug: "treasury", name: "National Treasury", sentiment: 0.05 },
    { slug: "imf", name: "IMF", sentiment: -0.12 },
  ],
};
