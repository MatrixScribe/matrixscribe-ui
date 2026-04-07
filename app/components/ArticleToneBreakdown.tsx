interface ArticleToneBreakdownProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export default function ArticleToneBreakdown({ data }: ArticleToneBreakdownProps) {
  if (!data) {
    return (
      <div className="h-32 flex items-center justify-center text-charcoal-light text-sm">
        No tone data available
      </div>
    );
  }

  const total = data.positive + data.neutral + data.negative;

  const pct = (value: number) =>
    total === 0 ? "0%" : `${Math.round((value / total) * 100)}%`;

  return (
    <div className="space-y-3 text-sm">

      {/* Positive */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-charcoal">Positive</span>
          <span className="text-green-600 font-medium">{pct(data.positive)}</span>
        </div>

        <div className="w-full h-2 bg-sandstone rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600"
            style={{ width: pct(data.positive) }}
          />
        </div>
      </div>

      {/* Neutral */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-charcoal">Neutral</span>
          <span className="text-charcoal-light font-medium">{pct(data.neutral)}</span>
        </div>

        <div className="w-full h-2 bg-sandstone rounded-full overflow-hidden">
          <div
            className="h-full bg-charcoal-mid"
            style={{ width: pct(data.neutral) }}
          />
        </div>
      </div>

      {/* Negative */}
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-charcoal">Negative</span>
          <span className="text-critical font-medium">{pct(data.negative)}</span>
        </div>

        <div className="w-full h-2 bg-sandstone rounded-full overflow-hidden">
          <div
            className="h-full bg-critical"
            style={{ width: pct(data.negative) }}
          />
        </div>
      </div>

    </div>
  );
}
