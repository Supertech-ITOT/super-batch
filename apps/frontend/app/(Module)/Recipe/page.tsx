import RecipeView from "@/features/recipe/recipe/components/recipe-view";

export default function RecipeHeaderPage() {
    return (
        <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
            <RecipeView />
        </div>
    )
}