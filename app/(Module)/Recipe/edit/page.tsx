"use client";
import RecipeView from "@/features/recipe/recipe/components/recipe-view";
import { useSearchParams } from "next/navigation";

export default function RecipePage() {
    const searchParams = useSearchParams();
    const id = Number(searchParams.get("id"));
    return (
        <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
            <RecipeView id={id} />
        </div>
    );
}