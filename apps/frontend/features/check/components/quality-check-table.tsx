import { DataTable } from "@/common/components/data-table/data-table";
import { useGetBatchChecks } from "../hooks/use-check";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import qualityCheckTableColumn from "./quality-check-table-column";

type Prop = {
  id: number;
};
export default function QualityCheckTable({ id }: Prop) {
  const { data } = useGetBatchChecks(id);
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <DataTable
        columns={qualityCheckTableColumn}
        data={data ?? []}
        pageSize={10}
        emptyMessage="No check parameters added."
        toolbar={(table) => (
          <div className="flex items-center justify-between">
            <DataTableSearch table={table} column="name" placeholder="Search parameters..." />
          </div>
        )}
      />
    </div>
  );
}
