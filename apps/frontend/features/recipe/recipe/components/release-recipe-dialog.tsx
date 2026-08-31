"use client";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { BookOpenText } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { useGetRecipeById, useReleaseRecipe } from "../hooks/use-recipe";

type Props = { open: boolean; onClose: () => void; recipeId?: number; redirect?: boolean };
export default function ReleaseRecipeDialog({ open, onClose, recipeId, redirect }: Props) {
    const { mutateAsync: releaseRecipe, isPending: transferControlRecipeIsPending } = useReleaseRecipe();
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const router = useRouter();
    const loading = transferControlRecipeIsPending || recipeIsLoading;
    const handleDelete = async () => {
        if (!recipe || !recipeId) return;
        try {
            const res = await releaseRecipe(recipeId);
            toast.success(res.message ?? `${recipe.name} released successfully.`);
            if (redirect) {
                router.push("/Recipe");
            } else {
                onClose();
            }
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <ConfirmDialog
            open={open}
            onClose={onClose}
            onConfirm={handleDelete}
            loading={loading}
            icon={BookOpenText}
            dialogVariant="default"
            title="Rlease Recipe"
            description={`Are you sure you want to release recipe "${recipe?.name}"?`}
            confirmText="Release"
        />
    );

}