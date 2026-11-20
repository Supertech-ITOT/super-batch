import { QualityCheckStatisticsData } from "../../types/report.types";

type prop = {
  data: QualityCheckStatisticsData[];
};

export default function QualityCheckStatCard({ data }: prop) {
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

          <strong className={`font-bold text-lg sm:text-xl ${s.isPassed === true ? "text-primary" : s.isPassed === false ? "text-destructive" : ""}`}>
            {s.value.toFixed(2)}
            {s.label === "Pass Rate" ? "%" : ""}
          </strong>
        </div>
      ))}
    </div>
  );
}
