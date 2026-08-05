"use client";
import UnitView from "@/features/plant/unit/components/unit-view";
import { useSearchParams } from "next/navigation";

export default function UnitPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <UnitView id={id} />
        </div>
    );
}