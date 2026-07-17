"use client";
import RecipeSOPView from "@/features/recipe/recipe_sop/components/recipe-sop-view";
import { useSearchParams } from "next/navigation";

export default function RecipePage() {
    const searchParams = useSearchParams();
    const recipeId = Number(searchParams.get("id"));
    return (
        <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
            <RecipeSOPView recipeId={recipeId} />
        </div>
    );
}