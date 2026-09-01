"use client";

import { Suspense } from "react";
import PlantView from "@/features/plant/plant/components/plant-view";
import { useSearchParams } from "next/navigation";

function PlantPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <PlantView id={id} />
    </div>
  );
}

export default function PlantPage() {
  return (
    <Suspense fallback={null}>
      <PlantPageContent />
    </Suspense>
  );
}
