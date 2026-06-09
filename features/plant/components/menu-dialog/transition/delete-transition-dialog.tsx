import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTransition, useGetTransitionById } from "@/features/plant/hooks/use-transitions";
import { showApiError } from "@/lib/show-api-error";

type Props = { open: boolean; onClose: () => void; transitionId?: number };
export default function DeleteTransitionDialog({ open, onClose, transitionId }: Props) {
    const { mutateAsync: deleteTransition, isPending: deleteTransitionIsPending } = useDeleteTransition();
    const { data: transition, isLoading: transitionIsLoading } = useGetTransitionById(transitionId);
    const loading = deleteTransitionIsPending || transitionIsLoading || !transition;
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
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {transition?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete transition "${transition?.name} - ${transition?.code}"?`}
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