"use client";

/* ENTITY COMPONENT */

import ChartContainer from "@/app/components/ChartContainer";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip } from "recharts";

interface PublisherReliabilityScatterProps {
  entity: any;
}

const safeArray = (v: any) => (Array.isArray(v) ? v : []);

export default function PublisherReliabilityScatter({
  entity,
}: PublisherReliabilityScatterProps) {
  const publishers = safeArray(
    entity?.publishers ||
      entity?.publisher_breakdown ||
      entity?.publisherBreakdown
  );

  const data =
    publishers.length > 0
      ? publishers.map((p: any, idx: number) => ({
          name: p.name || p.publisher || `P${idx + 1}`,
          reliability:
            typeof p.reliability === "number"
              ? p.reliability
              : typeof p.score === "number"
              ? p.score
              : Math.random(),
          bias:
            typeof p.bias === "number"
              ? p.bias
              : typeof p.position === "number"
              ? p.position
              : (Math.random() - 0.5) * 2,
        }))
      : [
          { name: "Source A", reliability: 0.9, bias: -0.2 },
          { name: "Source B", reliability: 0.7, bias: 0.1 },
          { name: "Source C", reliability: 0.5, bias: 0.4 },
        ];

  return (
    <div className="space-y-[var(--space-2)]">
      <div
        className="
          text-[11px]
          font-semibold
          tracking-wide
          text-charcoal-light
          uppercase
        "
      >
        Publisher reliability scatter
      </div>

      <ChartContainer height={220}>
        <ScatterChart>
          <XAxis
            type="number"
            dataKey="bias"
            name="Bias"
            domain={[-1, 1]}
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="number"
            dataKey="reliability"
            name="Reliability"
            domain={[0, 1]}
            tick={{
              fontSize: 11,
              fill: "#9ca3af",
              letterSpacing: "0.3px",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              padding: "6px 10px",
            }}
          />

          <Scatter data={data} fill="#0ea5e9" fillOpacity={0.8} />
        </ScatterChart>
      </ChartContainer>
    </div>
  );
}
