import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useDeleteAction, useGetActionById } from "@/features/plant/hooks/use-actions";
import { showApiError } from "@/common/lib/show-api-error";

type Props = { open: boolean; onClose: () => void; actionId?: number };
export default function DeleteActionDialog({ open, onClose, actionId }: Props) {
    const { mutateAsync: deleteAction, isPending: deleteActionIsPending } = useDeleteAction();
    const { data: action, isLoading: actionIsLoading } = useGetActionById(actionId);
    const loading = deleteActionIsPending || actionIsLoading || !action;
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
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {action?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete action "${action?.name}"?`}
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