"use client";
import { Button } from "@/components/ui/button";
import PlantMenu from "@/features/plant/components/plant-menu";
import PlantTree from "@/features/plant/components/plant-tree";
import PlantView from "@/features/plant/components/view/plant-view";
import { ChevronLeft, Factory } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PlantPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    const router = useRouter();
    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-6">
                <div className="flex gap-2 items-center">
                    <Factory className="w-6 h-6" />
                    <h1 className="text-xl font-bold">
                        Plant
                    </h1>
                </div>

                <p className="text-sm text-muted-foreground">
                    Design, manage and visualize your plant hierarchy.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <div className="flex justify-between items-center">
                    <Button onClick={() => router.replace("/PlantModel")} variant="outline" className=" size-12 hover:scale-110 transition-all duration-200 bg-card! shadow  rounded-full border">
                        <ChevronLeft className="w-6! h-6!" />
                    </Button>
                    <PlantMenu />
                </div>
                <div className="flex flex-1 min-h-0 gap-2">
                    {/* Tree */}
                    <div className="h-full min-w-80 rounded-sm border bg-card p-3">
                        <PlantTree />
                    </div>
                    {/* Details */}
                    <div className="h-full flex-1 rounded-sm border bg-card p-3">
                        <PlantView id={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}