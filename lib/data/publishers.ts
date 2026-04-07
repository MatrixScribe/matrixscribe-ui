import { PublisherStat } from "../types";

export const publishers: Record<string, PublisherStat[]> = {
  sarb: [
    { publisher: "BusinessDay", articles: 12, avgSentiment: 0.18 },
    { publisher: "News24", articles: 8, avgSentiment: 0.05 },
  ],
};
