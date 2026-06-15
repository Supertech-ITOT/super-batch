import { Button } from "@/common/components/ui/button";
import RecipeFilter from "./recipe-filter";
import { PlusIcon } from "lucide-react";

export default function RecipeView() {
    return (
        <div className="bg-card h-full border rounded-lg flex flex-col p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Recipes</h1>
                <Button>
                    <PlusIcon />
                    <span>New Recipe</span>
                </Button>
            </div>
            <RecipeFilter />
        </div>
    );
}