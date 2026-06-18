"use client";
import EquipmentView from "@/features/plant/equipment/components/equipment-view";
import { useSearchParams } from "next/navigation";

export default function EquipmentPage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex h-full overflow-hidden p-4">
            <EquipmentView id={id} />
        </div>
    );
}