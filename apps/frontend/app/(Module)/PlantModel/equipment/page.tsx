"use client";
import EquipmentView from "@/features/plant/equipment/components/equipment-view";
import { useSearchParams } from "next/navigation";

export default function EquipmentPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <EquipmentView id={id} />
        </div>
    );
}