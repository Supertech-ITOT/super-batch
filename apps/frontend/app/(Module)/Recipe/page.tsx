import RecipeView from "@/features/recipe/recipe/components/recipe-view";

export default function RecipeHeaderPage() {
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <RecipeView />
        </div>
    )
}