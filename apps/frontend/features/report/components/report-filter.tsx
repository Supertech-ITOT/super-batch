import { Activity, BookOpenText, Boxes, Hash, Package, RotateCcw, Search, Settings } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { BatchesResponse, ReportFilterDetails, ReportFilterRequest } from "../types/report.types";
import { DateRangeInput } from "@/common/components/form/date-range-input";
import SearchableSelect from "@/common/components/form/searchable-select";
import { BatchStatus } from "@/features/batch/types/batch.types";
import { useGetUnits } from "@/features/plant/unit/hooks/use-units";
import { useGetMaterials } from "@/features/plant/material/hooks/use-materials";
import { MaterialType } from "@/features/plant/material/types/material.types";
import { useGetRecipes } from "@/features/recipe/recipe/hooks/use-recipe";
import { TextInput } from "@/common/components/form/text-input";
import { PDFDownloadButton } from "@/common/components/pdf/elements/PDFDownloadButton";
import BatchListPdf from "./production-report/batch-list-pdf";
import { showApiError } from "@/common/lib/show-api-error";
import { useGenerateProductionReport } from "../hooks/use-report-export";

type prop = {
  filter: ReportFilterRequest;
  onFilterChange: (filter: ReportFilterRequest) => void;
  onReset: () => void;
};
export default function ReportFilter({ filter, onFilterChange, onReset }: prop) {
  const { data: units } = useGetUnits();
  const { data: products } = useGetMaterials();
  const { data: recipes } = useGetRecipes();
  const { refetch: generateReport } = useGenerateProductionReport(filter);
  const prepareReport = async (): Promise<BatchesResponse[]> => {
    const result = await generateReport();
    if (result.isError || !result.data) {
      showApiError(result.error ?? new Error("Unable to generate batch report"));
      throw result.error ?? new Error("Unable to generate batch report");
    }
    return result.data;
  };

  const pdfFilterDetails: ReportFilterDetails = {
    fromDate: filter.fromDate,
    toDate: filter.toDate,
    batchStatus: filter.batchStatus,
    unitName: units?.find((u) => u.id === filter.unitId)?.name,
    productName: products?.find((p) => p.id === filter.productId)?.name,
    masterRecipeName: recipes?.find((r) => r.id === filter.masterRecipeId)?.name,
  };

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
      <div className="flex w-full gap-2">
        <Button variant="outline" className="h-9 w-9 shrink-0 px-0!">
          <RotateCcw className="size-4" />
        </Button>
        <PDFDownloadButton<BatchesResponse[]>
          title="Export"
          fileName="production-report.pdf"
          onPrepare={prepareReport}
          document={(batches) => <BatchListPdf detail={pdfFilterDetails} batches={batches} />}
          variant="primary"
          className="h-9 flex-2"
        />
        <Button variant="outline" className="h-9 w-9 shrink-0 px-0!">
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  );
}
