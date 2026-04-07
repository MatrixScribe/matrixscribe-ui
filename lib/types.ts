export interface Entity {
  id: string;       // UUID
  slug: string;     // public identifier
  name: string;
  type: string;
  sector?: string;
  country?: string;
}

export interface TimelinePoint {
  date: string;
  sentiment: number;
  volume: number;
}

export interface Article {
  id: string;
  title: string;
  url: string;
  publisher: string;
  publishedAt: string;
  sentiment: number;
}

export interface PublisherStat {
  publisher: string;
  articles: number;
  avgSentiment: number;
}

export interface TopicCluster {
  topic: string;
  weight: number;
  sentiment: number;
}

export interface RelatedEntity {
  slug: string;
  name: string;
  sentiment: number;
}

export interface ForecastPoint {
  date: string;
  predictedSentiment: number;
}

export interface Alert {
  id: string;
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
}
