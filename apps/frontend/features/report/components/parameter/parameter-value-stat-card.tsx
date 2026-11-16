import { ParameterValueStatisticsData } from "../../types/report.types";

type prop = {
  data: ParameterValueStatisticsData[];
};
export default function ParameterValueStatCard({ data }: prop) {
  return (
    <div className="border-y grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 p-3 ">
      {data.map((s, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center flex-col
              ${idx % 2 !== 0 ? "border-l" : ""}
              ${idx % 4 !== 0 ? "sm:border-l" : "sm:border-l-0"}
            `}
        >
          <p className="text-muted-foreground text-xs sm:text-sm">{s.label}</p>
          <strong
            className={`font-bold text-lg sm:text-xl ${s.highlight ? (s.value < 0 ? "text-primary" : s.value > 0 ? "text-destructive" : "") : ""}`}
          >
            {`${s.highlight ? (s.value > 0 ? "+" : "") : ""} 
              ${s.value.toFixed(2)} 
              ${s.unit}`}
          </strong>
        </div>
      ))}
    </div>
  );
}
