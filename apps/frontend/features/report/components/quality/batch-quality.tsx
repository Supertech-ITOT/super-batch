import { ClipboardCheck } from "lucide-react";
import QualityCheckStatCard from "./quality-check-stat-card";
import QualityCheckList from "./quality-check-list";
import { useGetQualityCheckByBatchId } from "../../hooks/use-report";
import { Skeleton } from "@/common/components/ui/skeleton";
import FeedbackState from "@/common/components/feedback-state";

type prop = {
  id: number;
};
export default function BatchQuality({ id }: prop) {
  const { data, isLoading, isError } = useGetQualityCheckByBatchId(id);
  if (isLoading) {
    return <Skeleton className="rounded-2xl border h-full" />;
  }
  if (isError) {
    return <FeedbackState variant="error" className="h-full" />;
  }
  if (!data) {
    return <FeedbackState variant="empty" className="h-full" />;
  }
  return (
    <div className="rounded-2xl border px-4 py-3 w-full min-h-0 flex flex-col flex-1 gap-2 h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-row gap-2 items-center">
          <ClipboardCheck className="text-primary size-4.5" />
          <strong className="text-sm font-semibold text-primary sm:text-lg">Batch Quality Check</strong>
        </div>
      </div>
      {/* Satatistics */}
      <QualityCheckStatCard data={data.statsData} />
      {/* Tab Content */}
      <div className="flex flex-1 min-h-0 min-w-0">
        <QualityCheckList data={data.list} />
      </div>
    </div>
  );
}
