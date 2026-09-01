"use client";

import { Suspense } from "react";
import UnitView from "@/features/plant/unit/components/unit-view";
import { useSearchParams } from "next/navigation";

function UnitPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <UnitView id={id} />
    </div>
  );
}

export default function UnitPage() {
  return (
    <Suspense fallback={null}>
      <UnitPageContent />
    </Suspense>
  );
}
