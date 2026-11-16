import { BookOpenText, Boxes, Calendar, ClipboardList, Clock, Hash, Info, ListCheck, ListOrdered, Package, Scale, User } from "lucide-react";
import { useGetBatchInfoById, useGetBatchSopByBatchId } from "../../hooks/use-report";
import { format } from "date-fns";
import { minutesToADuration } from "@/common/utils/duration.util";
import { Skeleton } from "@/common/components/ui/skeleton";
import FeedbackState from "@/common/components/feedback-state";
import { DataTable } from "@/common/components/data-table/data-table";
import batchSopsColumns from "./batch-sops-columns";

type prop = {
  id: number;
};
export default function BatchOverview({ id }: prop) {
  const { data: batch, isLoading: batchLoading, isError: batchError } = useGetBatchInfoById(id);
  const { data: sops, isLoading: sopsLoading, isError: sopsError } = useGetBatchSopByBatchId(id);
  const loading = batchLoading || sopsLoading;
  const error = batchError || sopsError;
  const headerInfo = [
    { value: batch?.batchNo ?? "-", label: "Batch Number", icon: Hash },
    { value: batch?.unit ? `${batch.unit.name ?? "-"} (${batch.unit.code ?? "-"})` : "-", label: "Unit", icon: Boxes },
    { value: batch?.product ? `${batch.product.name ?? "-"} (${batch.product.code ?? "-"})` : "-", label: "Product", icon: Package },
    { value: batch?.masterRecipeName ?? "-", label: "Master Recipe", icon: BookOpenText },
    { value: batch?.controlRecipeName ?? "-", label: "Control Recipe", icon: ClipboardList },
    { value: batch?.startDateTime ? format(new Date(batch.startDateTime), "dd MMM yyyy, hh:mm a") : "-", label: "Start Date", icon: Calendar },
    { value: batch?.endDateTime ? format(new Date(batch.endDateTime), "dd MMM yyyy, hh:mm a") : "-", label: "End Date", icon: Calendar },
    { value: batch?.standardTime != null ? minutesToADuration(batch.standardTime) : "-", label: "Standard Time", icon: Clock },
    { value: batch?.actualTime != null ? minutesToADuration(batch.actualTime) : "-", label: "Actual Time", icon: Clock },
    { value: batch?.varianceTime != null ? minutesToADuration(batch.varianceTime) : "-", label: "Variance Time", icon: Clock },
    { value: batch?.standardSize != null ? `${batch.standardSize.toFixed(2)} KG` : "-", label: "Standard Size", icon: Scale },
    { value: batch?.actualSize != null ? `${batch.actualSize.toFixed(2)} KG` : "-", label: "Actual Size", icon: Scale },
    { value: batch?.varianceSize != null ? `${batch.varianceSize.toFixed(2)} KG` : "-", label: "Variance Size", icon: Scale },
    { value: batch?.totalSteps ?? "-", label: "Total Steps", icon: ListOrdered },
    { value: batch?.completedSteps ?? "-", label: "Completed Steps", icon: ListCheck },
    { value: batch?.shiftIncharge ?? "-", label: "Shift Incharge", icon: User },
  ];

  if (loading) {
    return <Skeleton className="rounded-2xl border h-full" />;
  }
  if (error) {
    return <FeedbackState variant="error" className="h-full" />;
  }
  if (!batch || !sops) {
    return <FeedbackState variant="empty" className="h-full" />;
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 h-full gap-2">
      <div className="rounded-2xl border px-4 py-3 w-full min-h-50 space-y-2">
        <div className="flex flex-row gap-2 items-center">
          <Info className="text-primary size-4.5" />
          <strong className="text-sm font-semibold text-primary sm:text-lg">Batch Information</strong>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border border-border/50">
          {headerInfo.map((info, idx) => {
            const Icon = info.icon;

            return (
              <div className="flex items-center gap-1.5 p-1.5 border border-border/50 min-w-0" key={`${info.label}_${idx}`}>
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex flex-col min-w-0 flex-1 leading-tight">
                  <span className="text-[10px] text-muted-foreground">{info.label}</span>
                  <strong className="block w-full overflow-x-auto whitespace-nowrap font-bold text-xs scrollbar-none">{info.value}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border px-4 py-3 w-full flex-1 min-h-0 flex flex-col space-y-2 overflow-hidden">
        <div className="flex flex-row gap-2 items-center shrink-0">
          <ListOrdered className="text-primary size-4.5" />
          <strong className="text-sm font-semibold text-primary sm:text-lg">SOP Execution Details</strong>
        </div>
        <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
          <DataTable compact data={sops} columns={batchSopsColumns} tableClassName="min-h-0!" rowClassName="h-8" />
        </div>
      </div>
    </div>
  );
}
