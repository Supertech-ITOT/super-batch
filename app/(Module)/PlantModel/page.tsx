import PlantMenu from "@/features/plant/components/plant-menu";
import PlantTree from "@/features/plant/components/plant-tree";
import { Factory } from "lucide-react";

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
                <div className="flex justify-end">
                    <PlantMenu />
                </div>
                <PlantModelClient />
            </div>
        </div>
    );
}