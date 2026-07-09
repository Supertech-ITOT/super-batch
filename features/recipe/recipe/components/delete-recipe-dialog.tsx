import { toast } from "sonner";
import { useDeleteRecipe, useGetRecipeById } from "../hooks/use-recipe";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = { open: boolean; onClose: () => void; recipeId?: number; redirect?: boolean };
export default function DeleteRecipeDialog({ open, onClose, recipeId, redirect }: Props) {
    const { mutateAsync: deleteRecipe, isPending: deleteRecipeIsPending } = useDeleteRecipe();
    const { data: recipe, isLoading: recipeIsLoading } = useGetRecipeById(recipeId);
    const router = useRouter();
    const loading = deleteRecipeIsPending || recipeIsLoading || !recipe;
    const handleDelete = async () => {
        if (!recipe || !recipeId) return;
        try {
            const res = await deleteRecipe(recipeId);
            toast.success(res.message ?? `${recipe.name} deleted successfully.`);
            if (redirect) {
                router.push("/Recipe");
            } else {
                onClose();
            }
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete recipe "${recipe?.name}"?`}
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