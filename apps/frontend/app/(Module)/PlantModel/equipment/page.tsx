"use client";
import EquipmentView from "@/features/plant/equipment/components/equipment-view";
import { useSearchParams } from "next/navigation";

export default function EquipmentPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <EquipmentView id={id} />
        </div>
    );
}