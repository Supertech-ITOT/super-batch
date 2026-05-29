import PlantMenu from "@/features/plant/components/plant-menu";
import PlantTab from "@/features/plant/components/plant-tab";
import PlantTree from "@/features/plant/components/plant-tree";
import { Boxes, Factory } from "lucide-react";


export default function PlantModelPage() {

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-6">
                <div className="flex gap-2 items-center">
                    <Factory className="w-6 h-6" />
                    <h1 className="text-xl font-bold">
                        Plant Model
                    </h1>
                </div>

                <p className="text-sm text-muted-foreground">
                    Design, manage and visualize your plant hierarchy.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <div className="flex justify-between">
                    <PlantTab />
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
        </div>
    );
}