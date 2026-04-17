import { Article } from "../types";

export const articles: Record<string, Article[]> = {
  sarb: [
    {
      id: "a1",
      title: "SARB holds interest rates steady",
      url: "https://example.com/sarb-rates",
      publisher: "BusinessDay",
      publishedAt: "2024-01-03",
      sentiment: 0.22,
    },
  ],
};
