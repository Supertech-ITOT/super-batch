"use client";
import ControlRecipeSOPView from "@/features/scheduler/control_recipe_sop/components/control-recipe-sop-view";
import { useSearchParams } from "next/navigation";

export default function ControlRecipeSOPPage() {
    const searchParams = useSearchParams();
    const controlRecipeId = Number(searchParams.get("id"));
    return (
        <div className="flex flex-col gap-1 p-1 sm:p-2 min-h-full">
            <ControlRecipeSOPView controlRecipeId={controlRecipeId} />
        </div>
    );
}