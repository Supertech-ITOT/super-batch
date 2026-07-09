import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { showApiError } from "@/common/lib/show-api-error";
import { toast } from "sonner";
import { useDeleteRecipeSOP, useGetRecipeSOPById } from "../hooks/use-recipe-sop";

type Props = { open: boolean; onClose: () => void; id: number; recipeId: number };
export default function RecipeSOPDeleteDialog({ open, onClose, id, recipeId }: Props) {
    const { data: recipeSOP, isLoading: recipeSOPIsLoading } = useGetRecipeSOPById(id);
    const { mutateAsync: deleteRecipeSOP, isPending: deleteRecipeSOPIsPending } = useDeleteRecipeSOP();
    const loading = deleteRecipeSOPIsPending || recipeSOPIsLoading || !recipeSOP;
    const handleDelete = async () => {
        try {
            const res = await deleteRecipeSOP({ id: id, recipeId: recipeId });
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
                        {`Are you sure you want to delete "Step ${recipeSOP?.stepNo}"?`}
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