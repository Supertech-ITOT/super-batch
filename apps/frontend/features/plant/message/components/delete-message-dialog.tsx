import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useDeleteMessage, useGetMessageById } from "@/features/plant/message/hooks/use-messages";
import { showApiError } from "@/common/lib/show-api-error";

type Props = { open: boolean; onClose: () => void; messageId?: number };
export default function DeleteMessageDialog({ open, onClose, messageId }: Props) {
    const { mutateAsync: deleteMessage, isPending: deleteMessageIsPending } = useDeleteMessage();
    const { data: message, isLoading: messageIsLoading } = useGetMessageById(messageId);
    const loading = deleteMessageIsPending || messageIsLoading || !message;
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
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Message</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete message "${message?.name}" ?`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} variant="destructive" className="min-w-34 bg-destructive!  text-white" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Delete"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}