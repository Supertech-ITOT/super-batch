import PlantMenu from "@/features/plant/common/components/plant-menu";
import PlantTab from "@/features/plant/common/components/plant-tab";
import PlantTree from "@/features/plant/common/components/plant-tree";
import { Boxes } from "lucide-react";


export default function PlantModelPage() {
    return (
        <div className="flex flex-col h-full p-4 gap-2">
            <div className="flex items-center gap-2 min-w-0">
                <div className="flex-1 min-w-0">
                    <PlantTab />
                </div>
                <PlantMenu />
            </div>
            <div className="flex flex-1 min-h-0 gap-2">
                {/* Tree */}
                <div className="h-full min-w-80 rounded-lg border bg-card p-3">
                    <PlantTree />
                </div>
                {/* Details */}
                <div className="flex h-full flex-1 items-center justify-center rounded-lg border bg-card p-6">
                    <div className="flex max-w-sm flex-col items-center text-center">
                        <div className="mb-4 rounded-full border bg-muted p-6">
                            <Boxes className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            No Entity Selected
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Select a plant, area, unit, or equipment from the hierarchy panel
                            to view detailed information and manage configurations.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}