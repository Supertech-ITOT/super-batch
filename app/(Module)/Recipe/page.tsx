import RecipeView from "@/features/recipe/components/recipe-view";
import { BookOpenTextIcon } from "lucide-react";


export default function RecipePage() {

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 border-b p-6">
                <div className="flex gap-2 items-center">
                    <BookOpenTextIcon className="w-6 h-6" />
                    <h1 className="text-xl font-bold">
                        Recipe Engine
                    </h1>
                </div>

                <p className="text-sm text-muted-foreground">
                    Design, manage and visualize your plant hierarchy.
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-2">
                <RecipeView />
            </div>
        </div>
    );
}