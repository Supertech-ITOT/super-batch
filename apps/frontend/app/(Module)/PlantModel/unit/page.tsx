"use client";
import UnitView from "@/features/plant/unit/components/unit-view";
import { useSearchParams } from "next/navigation";

export default function UnitPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex h-full overflow-hidden p-4">
            <UnitView id={id} />
        </div>
    );
}