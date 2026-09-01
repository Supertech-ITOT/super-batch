"use client";

import { Suspense } from "react";
import AreaView from "@/features/plant/area/components/area-view";
import { useSearchParams } from "next/navigation";

function AreaPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <AreaView id={id} />
    </div>
  );
}

export default function AreaPage() {
  return (
    <Suspense fallback={null}>
      <AreaPageContent />
    </Suspense>
  );
}
