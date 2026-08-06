"use client";
import PlantView from "@/features/plant/plant/components/plant-view";
import { useSearchParams } from "next/navigation";

export default function PlantPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <PlantView id={id} />
        </div>
    );
}