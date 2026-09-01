"use client";

import { Suspense } from "react";
import EquipmentView from "@/features/plant/equipment/components/equipment-view";
import { useSearchParams } from "next/navigation";

function EquipmentPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <EquipmentView id={id} />
    </div>
  );
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={null}>
      <EquipmentPageContent />
    </Suspense>
  );
}
