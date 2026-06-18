"use client";
import PlantView from "@/features/plant/plant/components/plant-view";
import { useSearchParams } from "next/navigation";

export default function PlantPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex h-full overflow-hidden p-4">
            <PlantView id={id} />
        </div>
    );
}