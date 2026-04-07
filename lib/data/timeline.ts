import { TimelinePoint } from "../types";

export const timeline: Record<string, TimelinePoint[]> = {
  sarb: [
    { date: "2024-01-01", sentiment: 0.12, volume: 40 },
    { date: "2024-01-02", sentiment: 0.18, volume: 55 },
    { date: "2024-01-03", sentiment: -0.05, volume: 70 },
  ],
};
