import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { showApiError } from "@/common/lib/show-api-error";
import { toast } from "sonner";
import { useDeleteControlRecipeSOP, useGetControlRecipeSOPById } from "../hooks/use-control-recipe-sop";

type Props = { open: boolean; onClose: () => void; id: number; controlRecipeId: number };
export default function ControlRecipeSOPDeleteDialog({ open, onClose, id, controlRecipeId }: Props) {
    const { data: controlRecipeSOP, isLoading: controlRecipeSOPIsLoading } = useGetControlRecipeSOPById(id);
    const { mutateAsync: deleteControlRecipeSOP, isPending: deleteControlRecipeSOPIsPending } = useDeleteControlRecipeSOP();
    const loading = deleteControlRecipeSOPIsPending || controlRecipeSOPIsLoading || !controlRecipeSOP;
    const handleDelete = async () => {
        try {
            const res = await deleteControlRecipeSOP({ id: id, controlRecipeId: controlRecipeId });
            toast.success(res.message ?? "Step deleted successfully.");
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete Step</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete "Step ${controlRecipeSOP?.stepNo}"?`}
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