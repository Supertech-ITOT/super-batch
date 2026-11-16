import { ChartColumnBig, LucideIcon, Package, Table2 } from "lucide-react";
import MaterialStataCard from "./material-stat-card";
import MaterialQuantityChart from "./material-quantity-chart";
import { useMemo, useState } from "react";
import MaterialQuantityTable from "./material-quantity-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { useGetMaterialQuantityByBatchId } from "../../hooks/use-report";
import { Skeleton } from "@/common/components/ui/skeleton";
import FeedbackState from "@/common/components/feedback-state";

type MaterialTab = {
  value: string;
  label: string;
  component: React.ReactNode;
  icon: LucideIcon;
};

type prop = {
  id: number;
};
export default function BatchMaterials({ id }: prop) {
  const { data, isLoading, isError } = useGetMaterialQuantityByBatchId(id);
  const [activeTab, setActiveTab] = useState("chart");
  const tabOptions = useMemo<MaterialTab[]>(
    () => [
      { value: "chart", label: "Chart", component: <MaterialQuantityChart data={data?.chartData ?? []} />, icon: ChartColumnBig },
      { value: "table", label: "Table", component: <MaterialQuantityTable data={data?.tableData ?? []} />, icon: Table2 },
    ],
    [data?.chartData, data?.tableData],
  );
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="rounded-2xl border px-4 py-3 w-full min-h-0 flex flex-col flex-1 gap-2 h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Package className="text-primary size-4.5" />
          <strong className="text-sm font-semibold text-primary sm:text-lg">Batch Material Consumption</strong>
        </div>
        <TabsList className="grid h-auto w-full grid-cols-2 bg-background! sm:flex sm:w-auto">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <Icon className="size-5" />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
      {/* Satatistics */}
      <MaterialStataCard data={data?.statsData ?? []} />
      {/* Tab Content */}
      <div className="flex flex-1 min-h-0 min-w-0">
        {tabOptions.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-0 w-full min-w-0 flex-1 data-[state=inactive]:hidden">
            {tab.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
