export interface Entity {
  id: string;
  slug: string;
  name: string;
  type: string;
  region?: string;

  sentiment: number;
  confidence: number;
  sources: number;
  updatedAt: string;

  sentiment_7d_avg: number;
  sentiment_30d_avg: number;
  sentiment_volatility: number;
  sentiment_zscore: number;

  article_count_24h: number;
  article_count_7d: number;
  velocity: number;
  publisher_diversity_score: number;

  sparkline: number[];

  timeline: {
    date: string;
    value: number;
    volume: number;
    anomaly: boolean;
    label?: string;
  }[];

  timeline_confidence: {
    lower: number;
    upper: number;
  }[];

  publishers: {
    name: string;
    sentiment: number;
    sentiment_change_7d: number;
    bias_score: number;
    reliability_score: number;
    articles: number;
  }[];

  top_articles: {
    title: string;
    url: string;
    sentiment: number;
    timestamp: string;
    publisher: string;
  }[];

  related_entities: {
    id: string;
    name: string;
    sentiment: number;
    strength: number;
  }[];

  topics: string[];

  sentiment_drivers: {
    positive: { keyword: string; weight: number }[];
    negative: { keyword: string; weight: number }[];
  };

  topic_heatmap: {
    topic: string;
    intensity: number;
  }[];

  event_timeline: {
    date: string;
    event: string;
    impact: number;
  }[];

  article_tone: {
    positive: number;
    neutral: number;
    negative: number;
  };

  risk_indicators: {
    policy_risk: number;
    market_risk: number;
    reputational_risk: number;
  };

  forecast: {
    next_7d: { date: string; value: number }[];
    confidence: number;
  };

  publisher_bias: {
    name: string;
    bias: number;
    reliability: number;
  }[];

  source_geography: {
    local: number;
    regional: number;
    international: number;
  };

  entity_comparison: {
    id: string;
    name: string;
    sentiment: number;
  }[];

  alerts: {
    message: string;
    timestamp: string;
    severity: string;
    severity_score: number;
    triggers: { type: string; value: number; threshold: number }[];
  }[];

  ingestedAt: string;
  pipelineVersion: string;
  missing_sources?: string[];
}
