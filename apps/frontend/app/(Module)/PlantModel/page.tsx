import PlantMenu from "@/features/plant/common/components/plant/plant-menu";
import PlantTab from "@/features/plant/common/components/plant/plant-tab";
import PlantTreeView from "@/features/plant/common/components/plant/plant-tree-view";
import { Boxes } from "lucide-react";


export default function PlantModelPage() {
    return (
        <div className="flex flex-1 min-h-0 h-full min-w-0 flex-col gap-1 p-1 sm:p-2">
            <div className="flex items-center justify-between gap-2">
                <PlantTab />
                <PlantMenu />
            </div>
            <div className="flex flex-1 min-h-0 gap-2 flex-col sm:flex-row">
                {/* Tree */}
                <div className="h-full flex-1 sm:min-h-0 rounded-2xl border bg-card p-1 sm:p-2 flex overflow-hidden">
                    <PlantTreeView />
                </div>
                {/* Details */}
                <div className="h-full flex-4 items-center justify-center rounded-2xl border bg-card p-6 hidden sm:flex overflow-hidden">
                    <div className="flex max-w-sm flex-col items-center text-center">
                        <div className="mb-4 rounded-full border bg-muted p-6">
                            <Boxes className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            No Entity Selected
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground leading-4">
                            Select a plant, area, unit, or equipment from the hierarchy panel
                            to view detailed information and manage configurations.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}