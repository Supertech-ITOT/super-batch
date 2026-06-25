import RecipeView from "@/features/recipe/recipe_header/components/recipe-header-view";
import { BookOpenText } from "lucide-react";

export default function Recipe() {
    return (
        <div className="flex overflow-hidden h-full flex-col">
            {/* Header */}
            <div>
                <div className="shrink-0 border-b p-6">
                    <div className="flex gap-2 items-center">
                        <BookOpenText className="w-6 h-6" />
                        <h1 className="text-xl font-bold">
                            Recipe
                        </h1>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Create, organize, and control batch recipes for consistent manufacturing execution.
                    </p>


                </div>
            </div>
            <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
                <RecipeView />
            </div>
        </div>
    )
}