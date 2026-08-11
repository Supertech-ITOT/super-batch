"use client";
import { MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { useDeleteMessage, useGetMessageById } from "@/features/plant/message/hooks/use-messages";
import { showApiError } from "@/common/lib/show-api-error";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

type Props = { open: boolean; onClose: () => void; messageId?: number };
export default function DeleteMessageDialog({ open, onClose, messageId }: Props) {
    const { mutateAsync: deleteMessage, isPending: deleteMessageIsPending } = useDeleteMessage();
    const { data: message, isLoading: messageIsLoading } = useGetMessageById(messageId);
    const loading = deleteMessageIsPending || messageIsLoading;
    const handleDelete = async () => {
        if (!message || !messageId) return;
        try {
            const res = await deleteMessage({ id: messageId });
            toast.success(res.message ?? `${message?.name} deleted successfully.`);
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
            icon={MessageSquareQuote}
            dialogVariant="destructive"
            title="Delete Message"
            description={`Are you sure you want to delete this message ? This action cannot be undone.`}
            confirmText="Delete"
        />
    );
}