import { DataTable } from "@/common/components/data-table/data-table";
import materialQuantityCoulumns from "./material-quantity-columns";
import { MaterialQuantityTableData } from "../../types/report.types";

type prop = {
  data: MaterialQuantityTableData[];
};
export default function MaterialQuantityTable({ data }: prop) {
  return (
    <div className="min-h-0 min-w-0">
      <DataTable data={data} columns={materialQuantityCoulumns} rowClassName="h-11" />
    </div>
  );
}
