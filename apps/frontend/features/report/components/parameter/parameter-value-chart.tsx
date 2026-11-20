import { useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useIsMobile } from "@/common/hooks/use-mobile";
import { ParameterValueData } from "../../types/report.types";
import { format, parseISO } from "date-fns";

type Props = {
  data: ParameterValueData[];
  unit: string;
};

export default function ParameterValueChart({ data, unit }: Props) {
  const isMobile = useIsMobile(640);
  const { yDomain, yTicks } = useMemo(() => {
    const values = data.flatMap(({ stdVal, actVal }) => [stdVal, actVal].filter((v): v is number => v != null && Number.isFinite(v)));
    if (!values.length) return { yDomain: [0, 10], yTicks: [0, 2, 4, 6, 8, 10] };
    const min = Math.min(...values);
    const max = Math.max(...values);
    const step = 10 ** Math.floor(Math.log10((max - min || Math.abs(max || 1) * 0.2) / 6));
    const niceStep = [1, 2, 5, 10].find((n) => n * step >= (max - min || Math.abs(max || 1) * 0.2) / 6)! * step;
    const start = Math.floor(min / niceStep) * niceStep;
    const end = Math.ceil(max / niceStep) * niceStep;
    const yTicks = Array.from({ length: Math.round((end - start) / niceStep) + 1 }, (_, i) => Number((start + i * niceStep).toPrecision(12)));
    return { yDomain: [start, end], yTicks };
  }, [data]);

  return (
    <div
      className={`w-full min-h-0 ${isMobile ? "flex-none" : "flex-1 h-full!"}`}
      style={{
        height: isMobile ? "min(300px, 45vh)" : 350,
        minHeight: isMobile ? 250 : undefined,
        maxHeight: isMobile ? 300 : undefined,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 15, right: isMobile ? 15 : 25, left: isMobile ? 5 : 15, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.08} />
          <XAxis
            dataKey="dateTime"
            type="category"
            tick={{ fontSize: 11, fontWeight: 500, fill: "currentColor" }}
            interval="preserveStartEnd"
            minTickGap={30}
            tickFormatter={(value) => format(new Date(value), "hh:mm a")}
          />
          <YAxis
            type="number"
            domain={yDomain}
            width={65}
            ticks={yTicks}
            tickLine={false}
            axisLine={false}
            allowDecimals
            tick={{ fontSize: 12, fontWeight: 500, fill: "currentColor" }}
            label={{
              value: `Value (${unit})`,
              angle: -90,
              position: "insideLeft",
            }}
            tickFormatter={(value) => Number(value).toFixed(1)}
          />
          <Tooltip
            labelFormatter={(value) => format(parseISO(String(value)), "dd MMM, hh:mm a")}
            formatter={(value, name) => [typeof value === "number" ? `${value.toFixed(2)} ${unit}` : "-", name]}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--card-foreground)",
            }}
          />
          <Legend align="center" verticalAlign="top" height={45} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 500 }} />
          <Line
            type="monotone"
            dataKey="stdVal"
            name="Standard Value"
            stroke="var(--primary-light)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            connectNulls={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="actVal"
            name="Actual Value"
            stroke="var(--primary)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
