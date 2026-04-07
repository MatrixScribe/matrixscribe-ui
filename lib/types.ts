// ---------- ALERT ----------
export type Alert = {
  id: string;
  severity: string;
  message: string;
  timestamp: string;
  triggers?: {
    type: string;
    value: number;
    threshold: number;
  }[];
};

// ---------- ARTICLE ----------
export type Article = {
  id: string;
  title: string;
  url: string;
  publisher: string;

  // Support both dataset + mock entity formats
  publishedAt?: string;   // used in /lib/data/articles.ts
  timestamp?: string;     // used in lib/entity.ts

  sentiment: number;
};

// ---------- TOPIC CLUSTER ----------
export type TopicCluster = {
  topic: string;
  weight: number;
  sentiment: number;
};

// ---------- TIMELINE POINT ----------
export type TimelinePoint = {
  date: string;

  // Support both dataset + mock entity formats
  sentiment?: number;   // used in /lib/data/timeline.ts
  value?: number;       // used in lib/entity.ts

  volume: number;

  // Additional fields used in mock entity
  anomaly?: boolean;
  label?: string;
};

// ---------- RELATED ENTITY ----------
export type RelatedEntity = {
  slug: string;
  name: string;
  sentiment: number;
};

// ---------- PUBLISHER STAT ----------
export type PublisherStat = {
  // dataset format
  publisher?: string;
  avgSentiment?: number;

  // mock entity format
  name?: string;
  sentiment?: number;
  sentiment_change_7d?: number;
  bias_score?: number;
  reliability_score?: number;

  // shared
  articles: number;
};

// ---------- FORECAST POINT ----------
export type ForecastPoint = {
  date: string;
  predictedSentiment: number;
};

// ---------- ENTITY ----------
export type Entity = {
  id: string;
  slug: string;
  name: string;
  type: string;

  // optional fields used in /lib/data/entities.ts
  sector?: string;
  country?: string;

  // optional fields used in full entity.ts mock
  region?: string;

  // optional because dataset entities.ts does not include them
  sentiment?: number;
  confidence?: number;
  sources?: number;
  updatedAt?: string;

  sentiment_7d_avg?: number;
  sentiment_30d_avg?: number;
  sentiment_volatility?: number;
  sentiment_zscore?: number;

  article_count_24h?: number;
  article_count_7d?: number;
  velocity?: number;
  publisher_diversity_score?: number;

  sparkline?: number[];

  timeline?: TimelinePoint[];
  timeline_confidence?: { lower: number; upper: number }[];

  publishers?: PublisherStat[];
  top_articles?: Article[];

  related_entities?: RelatedEntity[];
  topics?: string[];

  sentiment_drivers?: {
    positive: { keyword: string; weight: number }[];
    negative: { keyword: string; weight: number }[];
  };

  topic_heatmap?: { topic: string; intensity: number }[];

  event_timeline?: { date: string; event: string; impact: number }[];

  article_tone?: {
    positive: number;
    neutral: number;
    negative: number;
  };

  risk_indicators?: {
    policy_risk: number;
    market_risk: number;
    reputational_risk: number;
  };

  forecast?: {
    next_7d: { date: string; value: number }[];
    confidence: number;
  };

  publisher_bias?: { name: string; bias: number; reliability: number }[];

  source_geography?: {
    local: number;
    regional: number;
    international: number;
  };

  entity_comparison?: {
    id: string;
    name: string;
    sentiment: number;
  }[];

  alerts?: Alert[];

  ingestedAt?: string;
  pipelineVersion?: string;
  missing_sources?: string[];
};
