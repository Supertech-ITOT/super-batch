import { Activity, BookOpenText, Boxes, Hash, Package, RotateCcw, Search } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { ReportFilterRequest } from "../types/report.types";
import { DateRangeInput } from "@/common/components/form/date-range-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { BatchStatus } from "@/features/batch/types/batch.types";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { useGetRecipes } from "@/features/recipe/recipe/hooks/use-recipe";
import { TextInput } from "@/common/components/form/text-input";

type prop = {
  filter: ReportFilterRequest;
  onFilterChange: (filter: ReportFilterRequest) => void;
  onReset: () => void;
};
export default function ReportFilter({ filter, onFilterChange, onReset }: prop) {
  const { data: units } = useGetUnits();
  const { data: products } = useGetMaterials();
  const { data: recipes } = useGetRecipes();

  const updateFilter = <K extends keyof ReportFilterRequest>(key: K, value: ReportFilterRequest[K]) => {
    onFilterChange({ ...filter, [key]: value });
  };
  return (
    <div className="grid w-full grid-cols-1 gap-2 rounded-2xl border bg-card p-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 items-end">
      <TextInput
        label="Search"
        icon={Search}
        value={filter.search}
        placeholder="Search by batch, unit, product, recipe..."
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      <DateRangeInput
        label="Date Range"
        placeholder="Date Range"
        value={{ fromDate: filter.fromDate, toDate: filter.toDate }}
        allDateEnable
        onChange={({ fromDate, toDate }) => {
          onFilterChange({ ...filter, fromDate, toDate });
        }}
      />
      <SearchableSelect
        label="Batch Status"
        value={filter.batchStatus}
        icon={Activity}
        onChange={(value) => updateFilter("batchStatus", typeof value === "string" ? (value as BatchStatus) : undefined)}
        placeholder="All Status"
        options={[BatchStatus.COMPLETED, BatchStatus.ABORTED].map((status) => ({
          label: status,
          value: status,
        }))}
      />
      <SearchableSelect
        label="Processing Unit"
        value={filter.unitId}
        icon={Boxes}
        onChange={(value) => updateFilter("unitId", typeof value === "number" ? value : undefined)}
        placeholder="All Unit"
        options={
          units?.map((m) => ({
            label: m.name,
            value: m.id,
          })) ?? []
        }
      />
      <SearchableSelect
        label="Product"
        value={filter.productId}
        icon={Package}
        onChange={(value) => updateFilter("productId", typeof value === "number" ? value : undefined)}
        placeholder="All Product"
        options={
          products
            ?.filter((f) => f.materialType === MaterialType.FINISHED_PRODUCT)
            ?.map((m) => ({
              label: m.name,
              value: m.id,
            })) ?? []
        }
      />
      <SearchableSelect
        label="Master Recipe"
        value={filter.masterRecipeId}
        icon={BookOpenText}
        onChange={(value) => updateFilter("masterRecipeId", typeof value === "number" ? value : undefined)}
        placeholder="All Recipe"
        options={
          recipes?.map((m) => ({
            label: m.name,
            value: m.id,
          })) ?? []
        }
      />
      <Button variant="outline" onClick={onReset} type="button" className="bg-card hover:bg-card">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
