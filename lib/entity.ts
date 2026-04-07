import { Entity } from "./types";

export async function getEntity(id: string): Promise<Entity | null> {
  if (id !== "sarb") return null;

  return {
    id: "sarb",
    name: "South African Reserve Bank",
    type: "Institution",
    region: "South Africa",

    sentiment: 0.12,
    confidence: 0.87,
    sources: 48,
    updatedAt: "2026-03-30T14:32:00Z",

    sentiment_7d_avg: 0.11,
    sentiment_30d_avg: 0.09,
    sentiment_volatility: 0.042,
    sentiment_zscore: 1.21,

    article_count_24h: 19,
    article_count_7d: 86,
    velocity: 1.34,
    publisher_diversity_score: 0.78,

    sparkline: [0.08, 0.1, 0.09, 0.11, 0.13, 0.12, 0.12],

    timeline: [
      { date: "2026-03-24", value: 0.08, volume: 9, anomaly: false },
      { date: "2026-03-25", value: 0.10, volume: 11, anomaly: false },
      { date: "2026-03-26", value: 0.09, volume: 10, anomaly: false },
      { date: "2026-03-27", value: 0.11, volume: 13, anomaly: true, label: "Repo rate speculation" },
      { date: "2026-03-28", value: 0.13, volume: 15, anomaly: false },
      { date: "2026-03-29", value: 0.12, volume: 14, anomaly: false },
      { date: "2026-03-30", value: 0.12, volume: 14, anomaly: false }
    ],

    timeline_confidence: [
      { lower: 0.06, upper: 0.10 },
      { lower: 0.08, upper: 0.12 },
      { lower: 0.07, upper: 0.11 },
      { lower: 0.09, upper: 0.13 },
      { lower: 0.11, upper: 0.15 },
      { lower: 0.10, upper: 0.14 },
      { lower: 0.10, upper: 0.14 }
    ],

    publishers: [
      {
        name: "News24",
        sentiment: 0.14,
        sentiment_change_7d: +0.03,
        bias_score: 0.12,
        reliability_score: 0.91,
        articles: 12
      },
      {
        name: "Business Day",
        sentiment: 0.09,
        sentiment_change_7d: -0.01,
        bias_score: 0.18,
        reliability_score: 0.88,
        articles: 8
      },
      {
        name: "Daily Maverick",
        sentiment: 0.03,
        sentiment_change_7d: -0.04,
        bias_score: 0.22,
        reliability_score: 0.84,
        articles: 5
      }
    ],

    top_articles: [
      {
        title: "SARB signals cautious stance ahead of inflation print",
        url: "https://news24.com/sarb-inflation-stance",
        sentiment: 0.16,
        timestamp: "2026-03-30T09:12:00Z",
        publisher: "News24"
      },
      {
        title: "Analysts divided on timing of next repo rate move",
        url: "https://businessday.co.za/repo-rate-debate",
        sentiment: 0.07,
        timestamp: "2026-03-29T17:40:00Z",
        publisher: "Business Day"
      },
      {
        title: "Monetary policy committee faces pressure as rand weakens",
        url: "https://dailymaverick.co.za/rand-pressure",
        sentiment: -0.02,
        timestamp: "2026-03-28T12:55:00Z",
        publisher: "Daily Maverick"
      }
    ],

    related_entities: [
      { id: "national-treasury", name: "National Treasury", sentiment: 0.05, strength: 0.82 },
      { id: "imf", name: "IMF", sentiment: 0.03, strength: 0.61 },
      { id: "stats-sa", name: "Stats SA", sentiment: 0.11, strength: 0.57 }
    ],

    topics: [
      "inflation",
      "repo rate",
      "monetary policy",
      "rand volatility",
      "economic outlook"
    ],

    sentiment_drivers: {
      positive: [
        { keyword: "inflation outlook", weight: 0.32 },
        { keyword: "monetary stability", weight: 0.21 },
        { keyword: "repo rate confidence", weight: 0.18 }
      ],
      negative: [
        { keyword: "rand volatility", weight: -0.27 },
        { keyword: "economic pressure", weight: -0.19 },
        { keyword: "market uncertainty", weight: -0.14 }
      ]
    },

    topic_heatmap: [
      { topic: "inflation", intensity: 0.82 },
      { topic: "repo rate", intensity: 0.74 },
      { topic: "rand volatility", intensity: 0.68 },
      { topic: "economic outlook", intensity: 0.55 },
      { topic: "monetary policy", intensity: 0.49 }
    ],

    event_timeline: [
      { date: "2026-03-27", event: "Repo rate speculation spike", impact: 0.11 },
      { date: "2026-03-25", event: "Inflation expectations report", impact: 0.07 },
      { date: "2026-03-22", event: "Rand volatility alert", impact: -0.05 }
    ],

    article_tone: {
      positive: 34,
      neutral: 41,
      negative: 25
    },

    risk_indicators: {
      policy_risk: 0.41,
      market_risk: 0.52,
      reputational_risk: 0.33
    },

    forecast: {
      next_7d: [
        { date: "2026-03-31", value: 0.12 },
        { date: "2026-04-01", value: 0.11 },
        { date: "2026-04-02", value: 0.10 },
        { date: "2026-04-03", value: 0.11 },
        { date: "2026-04-04", value: 0.12 },
        { date: "2026-04-05", value: 0.13 },
        { date: "2026-04-06", value: 0.14 }
      ],
      confidence: 0.78
    },

    publisher_bias: [
      { name: "News24", bias: 0.12, reliability: 0.91 },
      { name: "Business Day", bias: 0.18, reliability: 0.88 },
      { name: "Daily Maverick", bias: 0.22, reliability: 0.84 }
    ],

    source_geography: {
      local: 72,
      regional: 18,
      international: 10
    },

    entity_comparison: [
      { id: "national-treasury", name: "National Treasury", sentiment: 0.05 },
      { id: "imf", name: "IMF", sentiment: 0.03 },
      { id: "rand", name: "ZAR (Rand)", sentiment: -0.12 }
    ],

    alerts: [
      {
        message: "Sentiment spike linked to repo rate speculation.",
        timestamp: "2026-03-27T15:22:00Z",
        severity: "medium",
        severity_score: 0.54,
        triggers: [
          { type: "sentiment_spike", value: 0.11, threshold: 0.09 },
          { type: "volume_surge", value: 13, threshold: 10 }
        ]
      }
    ],

    ingestedAt: "2026-03-30T14:31:00Z",
    pipelineVersion: "1.4.2",
    missing_sources: ["Reuters Africa"]
  };
}
