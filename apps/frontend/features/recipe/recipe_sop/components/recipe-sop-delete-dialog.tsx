"use client";
import { Hash } from "lucide-react";
import { showApiError } from "@/common/lib/show-api-error";
import { toast } from "sonner";
import { useDeleteRecipeSOP, useGetRecipeSOPById } from "../hooks/use-recipe-sop";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; id: number; recipeId: number };
export default function RecipeSOPDeleteDialog({ open, onClose, id, recipeId }: Props) {
    const { data: recipeSOP, isLoading: recipeSOPIsLoading } = useGetRecipeSOPById(id);
    const { mutateAsync: deleteRecipeSOP, isPending: deleteRecipeSOPIsPending } = useDeleteRecipeSOP();
    const loading = deleteRecipeSOPIsPending || recipeSOPIsLoading;
    const handleDelete = async () => {
        try {
            if (!recipeSOP || !recipeId || !id) return;
            const res = await deleteRecipeSOP({ id: id, recipeId: recipeId });
            toast.success(res.message ?? "Step deleted successfully.");
            onClose();
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
            icon={Hash}
            dialogVariant="destructive"
            title="Delete Step"
            description={`Are you sure you want to delete "Step ${recipeSOP?.stepNo ?? "0"}"? This action cannot be undone.`}
            confirmText="Delete"
        />


    );
}