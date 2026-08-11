"use client";
import { toast } from "sonner";
import { useDeleteTransition, useGetTransitionById } from "@/features/plant/transition/hooks/use-transitions";
import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";
import { ArrowRightLeft } from "lucide-react";

type Props = { open: boolean; onClose: () => void; transitionId?: number };
export default function DeleteTransitionDialog({ open, onClose, transitionId }: Props) {
    const { mutateAsync: deleteTransition, isPending: deleteTransitionIsPending } = useDeleteTransition();
    const { data: transition, isLoading: transitionIsLoading } = useGetTransitionById(transitionId);
    const loading = deleteTransitionIsPending || transitionIsLoading;
    const handleDelete = async () => {
        if (!transition || !transitionId) return;
        try {
            const res = await deleteTransition({ id: transitionId });
            toast.success(res.message ?? `${transition.name} deleted successfully.`);
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
            icon={ArrowRightLeft}
            dialogVariant="destructive"
            title="Delete Transition"
            description={`Are you sure you want to delete "${transition?.name ?? "-"}"? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}