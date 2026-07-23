"use client";
import ControlRecipeSOPView from "@/features/scheduler/control_recipe_sop/components/control-recipe-sop-view";
import { useSearchParams } from "next/navigation";

export default function ControlRecipeSOPPage() {
    const searchParams = useSearchParams();
    const controlRecipeId = Number(searchParams.get("id"));
    return (
        <div className="flex-1 flex-col min-h-0 gap-2 flex h-full overflow-hidden p-4">
            <ControlRecipeSOPView controlRecipeId={controlRecipeId} />
        </div>
    );
}