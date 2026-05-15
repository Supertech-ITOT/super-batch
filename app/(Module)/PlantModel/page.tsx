import { Button } from "@/components/ui/button";
import PlantMenu from "@/features/plant/components/plant-menu";
import PlantTree from "@/features/plant/components/plant-tree";
import { Plus } from "lucide-react";

export default function PlantModelPage() {

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-6">
                <h1 className="text-xl font-bold">
                    Plant Model
                </h1>

                <p className="text-sm text-muted-foreground">
                    Design, manage and visualize your plant hierarchy.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <div className="flex justify-end">
                    <PlantMenu />
                </div>
                <div className="flex-1 flex min-h-0 gap-2">
                    <div className="h-full min-w-80 overflow-y-auto rounded-sm border bg-card p-3 scrollbar-none">
                        <PlantTree />
                    </div>
                    <div className="h-full w-full rounded-sm border bg-card p-3">

                    </div>
                </div>

            </div>
        </div>
    );
}