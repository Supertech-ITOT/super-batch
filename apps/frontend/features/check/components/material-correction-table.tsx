import { DataTable } from "@/common/components/data-table/data-table";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import materialCorrectionColumns from "./material-correction-column";
import { useGetMaterialCorrection } from "../hooks/use-check";

type Prop = {
  id: number;
};
export default function MaterialCorrectionTable({ id }: Prop) {
  const { data } = useGetMaterialCorrection(id);
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <DataTable
        columns={materialCorrectionColumns}
        data={data ?? []}
        pageSize={10}
        emptyMessage="No material correction added."
        toolbar={(table) => (
          <div className="flex items-center justify-between">
            <DataTableSearch table={table} column="name" placeholder="Search materials..." />
          </div>
        )}
      />
    </div>
  );
}
