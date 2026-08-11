"use client";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { useDeleteAction, useGetActionById } from "@/features/plant/action/hooks/use-actions";
import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; actionId?: number };
export default function DeleteActionDialog({ open, onClose, actionId }: Props) {
    const { mutateAsync: deleteAction, isPending: deleteActionIsPending } = useDeleteAction();
    const { data: action, isLoading: actionIsLoading } = useGetActionById(actionId);
    const loading = deleteActionIsPending || actionIsLoading;
    const handleDelete = async () => {
        if (!action || !actionId) return;
        try {
            const res = await deleteAction({ id: actionId });
            toast.success(res.message ?? `${action.name} deleted successfully.`);
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
            icon={Play}
            dialogVariant="destructive"
            title="Delete Action"
            description={`Are you sure you want to delete "${action?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}