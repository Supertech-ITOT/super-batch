"use client";
import PlantView from "@/features/plant/plant/components/plant-view";
import { useSearchParams } from "next/navigation";

export default function PlantPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <PlantView id={id} />
        </div>
    );
}