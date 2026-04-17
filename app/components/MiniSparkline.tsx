interface MiniSparklineProps {
  data: number[];
  windowSize?: number; // default 7
}

export default function MiniSparkline({ data, windowSize = 7 }: MiniSparklineProps) {
  // Normalize to fixed window size
  let normalized = [...data];

  if (normalized.length > windowSize) {
    normalized = normalized.slice(normalized.length - windowSize);
  } else if (normalized.length < windowSize) {
    const padValue = normalized.length > 0 ? normalized[0] : 0;
    const missing = windowSize - normalized.length;
    normalized = Array(missing).fill(padValue).concat(normalized);
  }

  const width = 120;
  const height = 32;

  // Absolute sentiment scale: -1 to +1
  const min = -1;
  const max = 1;

  const points = normalized.map((value, index) => {
    const x = (index / (windowSize - 1)) * width;
    const y = height - ((value - min) / (max - min)) * height;
    return { x, y };
  });

  // Weighted trend detection
  let trend: "up" | "down" | "flat" = "flat";
  if (normalized.length > 1) {
    const weights = normalized.map((_, i) => Math.pow(1.2, i));
    const weightedAvg =
      normalized.reduce((sum, v, i) => sum + v * weights[i], 0) /
      weights.reduce((a, b) => a + b, 0);

    const last = normalized[normalized.length - 1];

    if (last > weightedAvg + 0.02) trend = "up";
    else if (last < weightedAvg - 0.02) trend = "down";
    else trend = "flat";
  }

  const strokeColor =
    trend === "up"
      ? "#16A34A" // green-600
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

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
