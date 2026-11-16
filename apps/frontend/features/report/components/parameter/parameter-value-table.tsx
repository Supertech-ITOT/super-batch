import { DataTable } from "@/common/components/data-table/data-table";
import { ParameterValueData } from "../../types/report.types";
import parameterValueCoulumns from "./parameter-value-columns";

type prop = {
  data: ParameterValueData[];
};
export default function ParameterValueTable({ data }: prop) {
  return (
    <div className="min-h-0 min-w-0">
      <DataTable data={data} columns={parameterValueCoulumns} rowClassName="h-11" />
    </div>
  );
}
