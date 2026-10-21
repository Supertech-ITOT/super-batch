import CheckInfoCard from "./check-info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import QualityCheckDialog from "./quality-check-dialog";
import QualityCheckTable from "./quality-check-table";
import MaterialCorrectionDialog from "./material-correction-dialog";
import MaterialCorrectionTable from "./material-correction-table";

export default function CheckView({ id }: { id: number }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      {/* Top information card */}
      <div className="shrink-0">
        <CheckInfoCard id={id} />
      </div>

      {/* Remaining height */}
      <div className="flex min-h-0 flex-1 flex-col">
        <Tabs defaultValue="quality-check" className="flex min-h-0 flex-1 flex-col">
          <TabsList className="h-12! shrink-0 gap-1 rounded-xl bg-card border p-1.5">
            <TabsTrigger
              value="quality-check"
              className="h-10 rounded-xl px-5 text-sm font-medium transition-colors
      data-[state=active]:bg-primary
      data-[state=active]:text-primary-foreground
      data-[state=active]:shadow-sm"
            >
              Quality Check
            </TabsTrigger>

            <TabsTrigger
              value="material-correction"
              className="h-10 rounded-xl px-5 text-sm font-medium transition-colors
      data-[state=active]:bg-primary
      data-[state=active]:text-primary-foreground
      data-[state=active]:shadow-sm"
            >
              Material Correction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quality-check" className="m-0 flex min-h-0 flex-1 flex-col sm:flex-row gap-2">
            <div className="min-h-0 flex-1 overflow-auto">
              <QualityCheckDialog id={id} />
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <QualityCheckTable id={id} />
            </div>
          </TabsContent>

          <TabsContent value="material-correction" className="m-0 flex min-h-0 flex-1 flex-col sm:flex-row gap-2">
            <div className="min-h-0 flex-1 overflow-auto">
              <MaterialCorrectionDialog id={id} />
            </div>
            <div className="min-h-0 flex-1 overflow-auto">
              <MaterialCorrectionTable id={id} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
