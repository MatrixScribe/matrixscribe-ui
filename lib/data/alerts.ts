import { Alert } from "../types";

export const alerts: Record<string, Alert[]> = {
  sarb: [
    {
      id: "al1",
      severity: "high",
      message: "Spike in negative sentiment related to inflation concerns",
      timestamp: "2024-01-03T10:00:00Z",
      triggers: []
    }
  ],
};
