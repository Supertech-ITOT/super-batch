"use client";
import AreaView from "@/features/plant/area/components/area-view";
import { useSearchParams } from "next/navigation";

export default function AreaPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col p-1 sm:h-full sm:overflow-hidden sm:p-2 gap-1">
            <AreaView id={id} />
        </div>
    );
}