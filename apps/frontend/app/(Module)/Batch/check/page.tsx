"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CheckView from "@/features/check/components/check-view";

function CheckPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <CheckView id={id} />
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense fallback={null}>
      <CheckPageContent />
    </Suspense>
  );
}
