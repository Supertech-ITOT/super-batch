"use client";
import AreaView from "@/features/plant/area/components/area-view";
import { useSearchParams } from "next/navigation";

export default function AreaPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex h-full overflow-hidden p-4">
            <AreaView id={id} />
        </div>
    );
}