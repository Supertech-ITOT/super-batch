"use client";
import { Button } from "@/common/components/ui/button";
import AreaView from "@/features/plant/components/view/area/area-view";
import { ChevronLeft, Factory } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AreaPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    const router = useRouter();
    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-4 flex gap-4 items-end">

                <Button onClick={() => router.back()} variant="outline" className=" size-12 hover:scale-110 transition-all duration-200 bg-card! shadow  rounded-full border">
                    <ChevronLeft className="w-6! h-6!" />
                </Button>
                <div className="flex flex-col">

                    <div className="flex gap-2 items-center">
                        <Factory className="w-6 h-6" />
                        <h1 className="text-xl font-bold">
                            Area
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Design, manage and visualize your area.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex min-h-0 p-4">
                <div className="flex flex-1 min-h-0 rounded-sm border bg-card p-3">
                    <AreaView id={id} />
                </div>
            </div>
        </div>
    );
}