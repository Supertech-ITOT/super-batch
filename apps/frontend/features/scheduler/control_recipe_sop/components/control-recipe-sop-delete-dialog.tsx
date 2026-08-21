"use client";
import { showApiError } from "@/common/lib/show-api-error";
import { toast } from "sonner";
import { useDeleteControlRecipeSOP, useGetControlRecipeSOPById } from "../hooks/use-control-recipe-sop";
import { Hash } from "lucide-react";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; id: number; controlRecipeId: number };
export default function ControlRecipeSOPDeleteDialog({ open, onClose, id, controlRecipeId }: Props) {
    const { data: controlRecipeSOP, isLoading: controlRecipeSOPIsLoading } = useGetControlRecipeSOPById(id);
    const { mutateAsync: deleteControlRecipeSOP, isPending: deleteControlRecipeSOPIsPending } = useDeleteControlRecipeSOP();
    const loading = deleteControlRecipeSOPIsPending || controlRecipeSOPIsLoading;
    const handleDelete = async () => {
        try {
            if (!controlRecipeSOP || !controlRecipeId || !id) return;
            const res = await deleteControlRecipeSOP({ id: id, controlRecipeId: controlRecipeId });
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
            description={`Are you sure you want to delete "Step ${controlRecipeSOP?.stepNo ?? "0"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}