"use client";
import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetControlRecipeById, useTransferControlRecipe } from "../hooks/use-control-recipe";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; controlRecipeId?: number; redirect?: boolean };
export default function TransferControlRecipeDialog({ open, onClose, controlRecipeId, redirect }: Props) {
    const { mutateAsync: transferControlRecipe, isPending: transferControlRecipeIsPending } = useTransferControlRecipe();
    const { data: controlRecipe, isLoading: controlRecipeIsLoading } = useGetControlRecipeById(controlRecipeId);
    const router = useRouter();
    const loading = transferControlRecipeIsPending || controlRecipeIsLoading;
    const handleDelete = async () => {
        if (!controlRecipe || !controlRecipeId) return;
        try {
            const res = await transferControlRecipe(controlRecipeId);
            toast.success(res.message ?? `${controlRecipe.batchNo} transfered successfully.`);
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
            dialogVariant="default"
            title="Transfer Batch"
            description={`Are you sure you want to transfer batch "${controlRecipe?.batchNo}"? After the transfer, the Control Recipe will be locked and cannot be modified. You will still be able to view the Control Recipe and its details.`}
            confirmText="Transfer"
        />
    );

}