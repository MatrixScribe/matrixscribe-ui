// app/lib/types.ts

export interface TimelinePoint {
  date: string;
  avg_score: number | null;
}

export interface Article {
  id: number;
  content: string;
  source: string;
  created_at: string;
}

export interface TopicCount {
  name: string;
  count: string | number;
}

export interface TagCount {
  tag: string;
  count: string | number;
}

export interface RiskBucket {
  sentiment: number | null;
  count: string | number;
  avg_score: number | null;
}

export interface Entity {
  id: number;
  name: string;
  slug: string;
  type: string | null;
  region: string | null;
  description?: string | null;
  normalized_name?: string;

  // Backend → UI mapped fields
  timeline?: TimelinePoint[];
  top_articles?: Article[];
  publishers?: any[];
  related_entities?: any[];
  topics?: TopicCount[];
  tags?: TagCount[];
  risk?: {
    sentiment: RiskBucket[];
  };

  alerts?: any[];
  forecast?: any[];
  events?: any[];
  comparison?: any[];
  insights?: any[];

  // Optional metrics used by UI components
  sentiment?: number | null;
  sentiment_7d_avg?: number | null;
  sentiment_30d_avg?: number | null;
  sentiment_volatility?: number | null;
  sentiment_zscore?: number | null;

  article_count_24h?: number | null;
  article_count_7d?: number | null;
  velocity?: number | null;
  publisher_diversity_score?: number | null;

  sparkline?: number[] | null;
  timeline_confidence?: number | null;

  updatedAt?: string;
  sources?: any[];
}
