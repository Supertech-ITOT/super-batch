"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BatchView from "@/features/batch/components/batch-view";
import Loading from "@/common/components/loading";

function ViewPageContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <BatchView id={id} />
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ViewPageContent />
    </Suspense>
  );
}
