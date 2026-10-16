import { DataTable } from "@/common/components/data-table/data-table";
import { useGetAllStepInfo } from "../hook/use-batch";
import batchStepsColumn from "./batch-steps-column";
import { BatchSOPStatus } from "../types/batch.types";

type Prop = {
  id: number;
};
export default function BatchStepsTable({ id }: Prop) {
  const { data } = useGetAllStepInfo(id);
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-xl space-y-2 overflow-y-auto">
      <DataTable
        columns={batchStepsColumn}
        data={data?.steps ?? []}
        rowClassName="h-15"
        isRowSelected={(r) => r.status === BatchSOPStatus.IN_PROGRESS}
        compact
      />
    </div>
  );
}
