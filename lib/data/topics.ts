import { TopicCluster } from "../types";

export const topics: Record<string, TopicCluster[]> = {
  sarb: [
    { topic: "interest rates", weight: 0.42, sentiment: 0.12 },
    { topic: "inflation", weight: 0.33, sentiment: -0.08 },
  ],
};
