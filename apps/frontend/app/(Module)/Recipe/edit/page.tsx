"use client";
import RecipeSOPView from "@/features/recipe/recipe_sop/components/recipe-sop-view";
import { useSearchParams } from "next/navigation";

export default function RecipePage() {
    const searchParams = useSearchParams();
    const recipeId = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <RecipeSOPView recipeId={recipeId} />
        </div>
    );
}