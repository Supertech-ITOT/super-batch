import CheckInfoCard from "./check-info-card";
import MaterialCorrection from "./material-correction";
import QualityCheck from "./quality-check-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import QualityCheckView from "./quality-check-view";

export default function CheckView({ id }: { id: number }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col gap-2 overflow-hidden">
      {/* Check Information */}
      <div className="shrink-0">
        <CheckInfoCard id={id} />
      </div>

      {/* Check Tabs */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border bg-card">
        <Tabs defaultValue="quality-check" className="flex h-full min-h-0 flex-col">
          <div className="shrink-0 border-b px-3 pt-3">
            <TabsList className="h-9 bg-muted/50">
              <TabsTrigger value="quality-check" className="rounded-xl px-4">
                Quality Check
              </TabsTrigger>

              <TabsTrigger value="material-correction" className="rounded-xl px-4">
                Material Correction
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="quality-check" className="m-0 min-h-0 flex-1 overflow-auto p-3">
            <QualityCheckView />
          </TabsContent>

          <TabsContent value="material-correction" className="m-0 min-h-0 flex-1 overflow-auto p-3">
            <MaterialCorrection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
