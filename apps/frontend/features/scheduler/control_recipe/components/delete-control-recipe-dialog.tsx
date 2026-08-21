"use client";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteControlRecipe, useGetControlRecipeById } from "../hooks/use-control-recipe";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; controlRecipeId?: number; redirect?: boolean };
export default function DeleteControlRecipeDialog({ open, onClose, controlRecipeId, redirect }: Props) {
    const { mutateAsync: deleteControlRecipe, isPending: deleteControlRecipeIsPending } = useDeleteControlRecipe();
    const { data: controlRecipe, isLoading: controlRecipeIsLoading } = useGetControlRecipeById(controlRecipeId);
    const router = useRouter();
    const loading = deleteControlRecipeIsPending || controlRecipeIsLoading;
    const handleDelete = async () => {
        if (!controlRecipe || !controlRecipeId) return;
        try {
            const res = await deleteControlRecipe(controlRecipeId);
            toast.success(res.message ?? `${controlRecipe.name} deleted successfully.`);
            if (redirect) {
                router.push("/Scheduler");
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
            icon={CalendarClock}
            dialogVariant="destructive"
            title="Delete Schedule"
            description={`Are you sure you want to delete "Schedule of batch ${controlRecipe?.batchNo ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );

}