import { toast } from "sonner";
import { useDeleteRecipeHeader, useGetRecipeHeaderById } from "../hooks/use-recipe-header";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";

type Props = { open: boolean; onClose: () => void; recipeHeaderId?: number };
export default function DeleteRecipeHeaderDialog({ open, onClose, recipeHeaderId }: Props) {
    const { mutateAsync: deleteRecipe, isPending: deleteRecipeIsPending } = useDeleteRecipeHeader();
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeHeaderById(recipeHeaderId);
    const loading = deleteRecipeIsPending || recipeIsLoading || !recipe;
    const handleDelete = async () => {
        if (!recipe || !recipeHeaderId) return;
        try {
            const res = await deleteRecipe(recipeHeaderId);
            toast.success(res.message ?? `${recipe.name} deleted successfully.`);
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {recipe?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete user "${recipe?.name} - [${recipe?.description}]"?`}
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