"use client";
import { toast } from "sonner";
import { useDeleteRecipe, useGetRecipeById } from "../hooks/use-recipe";
import { showApiError } from "@/common/lib/show-api-error";
import { BookOpenText } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; recipeId?: number; redirect?: boolean };
export default function DeleteRecipeDialog({ open, onClose, recipeId, redirect }: Props) {
    const { mutateAsync: deleteRecipe, isPending: deleteRecipeIsPending } = useDeleteRecipe();
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const router = useRouter();
    const loading = deleteRecipeIsPending || recipeIsLoading;
    const handleDelete = async () => {
        if (!recipe || !recipeId) return;
        try {
            const res = await deleteRecipe(recipeId);
            toast.success(res.message ?? `${recipe.name} deleted successfully.`);
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
            dialogVariant="destructive"
            title="Delete Recipe"
            description={`Are you sure you want to delete "Recipe ${recipe?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );

}