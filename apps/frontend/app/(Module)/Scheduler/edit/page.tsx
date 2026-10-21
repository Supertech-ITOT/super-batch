"use client";

import { Suspense } from "react";
import ControlRecipeSOPView from "@/features/scheduler/control_recipe_sop/components/control-recipe-sop-view";
import { useSearchParams } from "next/navigation";
import Loading from "@/common/components/loading";

function ControlRecipeSOPPageContent() {
  const searchParams = useSearchParams();
  const controlRecipeId = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <ControlRecipeSOPView controlRecipeId={controlRecipeId} />
    </div>
  );
}

export default function ControlRecipeSOPPage() {
  return (
     <Suspense fallback={<Loading />}>
      <ControlRecipeSOPPageContent />
    </Suspense>
  );
}
