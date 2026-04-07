interface SentimentTimelineProps {
  data: { date: string; value: number; anomaly?: boolean; label?: string }[];
  confidence?: { lower: number; upper: number }[];
  width?: number;
  height?: number;
}

export default function SentimentTimeline({
  data,
  confidence,
  width = 600,
  height = 200,
}: SentimentTimelineProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-charcoal-light text-sm">
        No timeline data available
      </div>
    );
  }

  const min = -1;
  const max = 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / (max - min)) * height;
    return { x, y };
  });

  // Weighted trend
  let trend: "up" | "down" | "flat" = "flat";
  if (data.length > 1) {
    const values = data.map((d) => d.value);
    const weights = values.map((_, i) => Math.pow(1.2, i));
    const weightedAvg =
      values.reduce((sum, v, i) => sum + v * weights[i], 0) /
      weights.reduce((a, b) => a + b, 0);

    const last = values[values.length - 1];

    if (last > weightedAvg + 0.02) trend = "up";
    else if (last < weightedAvg - 0.02) trend = "down";
    else trend = "flat";
  }

  const strokeColor =
    trend === "up"
      ? "#16A34A"
      : trend === "down"
      ? "var(--color-critical)"
      : "var(--color-charcoal-mid)";

  // Smooth cubic Bézier path
  const path = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, "");

  // Confidence band path
  let bandPath = "";
  if (confidence && confidence.length === data.length) {
    const upper = confidence.map((c, i) => {
      const x = (i / (confidence.length - 1)) * width;
      const y = height - ((c.upper - min) / (max - min)) * height;
      return { x, y };
    });

    const lower = confidence.map((c, i) => {
      const x = (i / (confidence.length - 1)) * width;
      const y = height - ((c.lower - min) / (max - min)) * height;
      return { x, y };
    });

    const upperPath = upper
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
      .join(" ");

    const lowerPath = lower
      .map((p) => `L ${p.x},${p.y}`)
      .join(" ");

    bandPath = `${upperPath} ${lowerPath} Z`;
  }

  return (
    <div className="w-full">
      <svg width={width} height={height} className="overflow-visible">

        {/* Confidence band */}
        {bandPath && (
          <path
            d={bandPath}
            fill="var(--color-sandstone)"
            fillOpacity="0.25"
            stroke="none"
          />
        )}

        {/* Main sentiment line */}
        <path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Anomaly markers */}
        {data.map((d, i) =>
          d.anomaly ? (
            <circle
              key={i}
              cx={points[i].x}
              cy={points[i].y}
              r={5}
              fill="var(--color-charcoal)"
              stroke="var(--color-sandstone)"
              strokeWidth="2"
            />
          ) : null
        )}
      </svg>
    </div>
  );
}
