"use client";

import { Suspense } from "react";
import RecipeSOPView from "@/features/recipe/recipe_sop/components/recipe-sop-view";
import { useSearchParams } from "next/navigation";

function RecipePageContent() {
  const searchParams = useSearchParams();
  const recipeId = Number(searchParams.get("id"));

  return (
    <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
      <RecipeSOPView recipeId={recipeId} />
    </div>
  );
}

export default function RecipePage() {
  return (
    <Suspense fallback={null}>
      <RecipePageContent />
    </Suspense>
  );
}
