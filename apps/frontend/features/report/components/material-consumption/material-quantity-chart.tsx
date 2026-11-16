import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/common/hooks/use-mobile";
import { MaterialQuantityChartData } from "../../types/report.types";

type prop = {
  data: MaterialQuantityChartData[];
};

export default function MaterialQuantityChart({ data }: prop) {
  const isMobile = useIsMobile(640);
  const FloatingBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const gap = 6;
    return <rect x={x} y={y} width={width} height={Math.max(0, height - gap)} rx={4} ry={4} fill={fill} />;
  };
  return (
    <div
      className={`w-full min-h-62.5 ${isMobile ? "flex-none" : "flex-1 h-full!"}`}
      style={isMobile ? { height: Math.max(250, data.length * 65 + 80) } : { height: 350 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={isMobile ? "vertical" : "horizontal"}
          margin={{ top: 10, right: isMobile ? 30 : 20, left: isMobile ? 0 : 10, bottom: 5 }}
          barGap={isMobile ? 2 : 4}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} horizontal={isMobile} stroke="currentColor" strokeOpacity={0.08} />
          <XAxis
            type={isMobile ? "number" : "category"}
            dataKey={isMobile ? undefined : "materialCode"}
            tick={{ fontSize: 12, fontWeight: 500, fill: "currentColor" }}
            hide={false}
          />
          <YAxis
            type={isMobile ? "category" : "number"}
            dataKey={isMobile ? "materialCode" : undefined}
            width={isMobile ? 75 : 50}
            label={isMobile ? undefined : { value: "Quantity (KG)", angle: -90, position: "insideLeft" }}
            tick={{ fontSize: 12, fontWeight: 500, fill: "currentColor" }}
          />
          <Legend align="center" verticalAlign="top" iconType="square" height={45} wrapperStyle={{ fontSize: 12, fontWeight: 500 }} />
          <Bar dataKey="stdQty" name="Standard Quantity" fill="var(--primary-light)" shape={<FloatingBar />} isAnimationActive={false}>
            <LabelList
              dataKey="stdQty"
              position={isMobile ? "right" : "top"}
              style={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }}
              formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
            />
          </Bar>
          <Bar dataKey="actQty" name="Actual Quantity" fill="var(--primary)" shape={<FloatingBar />} isAnimationActive={false}>
            <LabelList
              dataKey="actQty"
              position={isMobile ? "right" : "top"}
              style={{ fontSize: 12, fontWeight: 600, fill: "currentColor" }}
              formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
