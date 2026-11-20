import { ChartLine, Gauge, LucideIcon, Table2 } from "lucide-react";
import { useMemo, useState } from "react";
import ParameterValueStatCard from "./parameter-value-stat-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useGetParameters } from "@/features/plant/parameter/hooks/use-parameters";
import { Skeleton } from "@/common/components/ui/skeleton";
import FeedbackState from "@/common/components/feedback-state";
import ParameterValueChart from "./parameter-value-chart";
import ParameterValueTable from "./parameter-value-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { useGetParameterValueByBatchId } from "../../hooks/use-report";

type ParameterTab = {
  value: string;
  label: string;
  component: React.ReactNode;
  icon: LucideIcon;
};

type prop = {
  id: number;
};
export default function BatchParameters({ id }: prop) {
  const [activeTab, setActiveTab] = useState("chart");
  const [selectedParameter, setSelectedParameter] = useState<string>("");
  const { data: parameters, isLoading: parametersLoading, isError: parametersError } = useGetParameters();
  const { data: parametersValue, isLoading: parametersValueLoading, isError: parametersValueError } = useGetParameterValueByBatchId(id);
  const loading = parametersLoading || parametersValueLoading;
  const error = parametersError || parametersValueError;
  const activeParameter = selectedParameter || String(parametersValue?.statsData[0]?.parameterId ?? "");

  const filteredStats = useMemo(
    () => parametersValue?.statsData.filter((item) => item.parameterId === Number(activeParameter)) ?? [],
    [parametersValue, activeParameter],
  );

  const filteredData = useMemo(
    () => parametersValue?.data.filter((item) => item.parameterId === Number(activeParameter)) ?? [],
    [parametersValue, activeParameter],
  );

  const activeUnit = filteredStats?.[0]?.unit ?? "";

  const tabOptions: ParameterTab[] = [
    { value: "chart", label: "Chart", component: <ParameterValueChart data={filteredData} unit={activeUnit} />, icon: ChartLine },
    { value: "table", label: "Table", component: <ParameterValueTable data={filteredData} />, icon: Table2 },
  ];
  if (loading) {
    return <Skeleton className="rounded-2xl border h-full" />;
  }
  if (error) {
    return <FeedbackState variant="error" className="h-full" />;
  }
  if (!parameters || !parametersValue) {
    return <FeedbackState variant="empty" className="h-full" />;
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="rounded-2xl border px-4 py-3 w-full min-h-0 flex flex-col flex-1 gap-2 h-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Gauge className="text-primary size-4.5" />
          <strong className="text-sm font-semibold text-primary sm:text-lg">Step Wise Trend</strong>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Select value={activeParameter} onValueChange={setSelectedParameter} disabled={parameters?.length === 0}>
            <SelectTrigger className="w-full sm:w-55">
              <SelectValue placeholder="Select Parameter" />
            </SelectTrigger>
            <SelectContent>
              {parameters?.map((parameter) => (
                <SelectItem key={parameter.id} value={String(parameter.id)}>
                  {parameter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>
      {/* Statistics */}
      <ParameterValueStatCard data={filteredStats} />
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
