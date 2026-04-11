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
  // Ensure data is ALWAYS an array
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-charcoal-light text-sm">
        No timeline data available
      </div>
    );
  }

  const min = -1;
  const max = 1;

  // Avoid divide-by-zero when only one point exists
  const denom = safeData.length > 1 ? safeData.length - 1 : 1;

  const points = safeData.map((d, i) => {
    const value = typeof d.value === "number" ? d.value : 0;
    const x = (i / denom) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return { x, y };
  });

  // Weighted trend
  let trend: "up" | "down" | "flat" = "flat";
  if (safeData.length > 1) {
    const values = safeData.map((d) =>
      typeof d.value === "number" ? d.value : 0
    );
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

  // Confidence band
  let bandPath = "";
  const safeConfidence =
    Array.isArray(confidence) && confidence.length === safeData.length
      ? confidence
      : null;

  if (safeConfidence) {
    const upper = safeConfidence.map((c, i) => {
      const upperVal = typeof c.upper === "number" ? c.upper : 0;
      const x = (i / denom) * width;
      const y = height - ((upperVal - min) / (max - min)) * height;
      return { x, y };
    });

    const lower = safeConfidence.map((c, i) => {
      const lowerVal = typeof c.lower === "number" ? c.lower : 0;
      const x = (i / denom) * width;
      const y = height - ((lowerVal - min) / (max - min)) * height;
      return { x, y };
    });

    const upperPath = upper
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
      .join(" ");

    const lowerPath = lower.map((p) => `L ${p.x},${p.y}`).join(" ");

    bandPath = `${upperPath} ${lowerPath} Z`;
  }

  return (
    <div className="w-full">
      <svg width={width} height={height} className="overflow-visible">
        {bandPath && (
          <path
            d={bandPath}
            fill="var(--color-sandstone)"
            fillOpacity="0.25"
            stroke="none"
          />
        )}

        <path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {safeData.map((d, i) =>
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
