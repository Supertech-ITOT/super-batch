import RecipeHeaderView from "@/features/recipe/recipe_header/components/recipe-header-view";
import { BookOpenText } from "lucide-react";

export default function RecipeHeaderPage() {
    return (
        <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
            <RecipeHeaderView />
        </div>
    )
}