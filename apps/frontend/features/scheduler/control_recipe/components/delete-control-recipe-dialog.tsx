import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteControlRecipe, useGetControlRecipeById } from "../hooks/use-control-recipe";

type Props = { open: boolean; onClose: () => void; controlRecipeId?: number; redirect?: boolean };
export default function DeleteControlRecipeDialog({ open, onClose, controlRecipeId, redirect }: Props) {
    const { mutateAsync: deleteControlRecipe, isPending: deleteControlRecipeIsPending } = useDeleteControlRecipe();
    const { data: controlRecipe, isLoading: controlRecipeIsLoading } = useGetControlRecipeById(controlRecipeId);
    const router = useRouter();
    const loading = deleteControlRecipeIsPending || controlRecipeIsLoading || !controlRecipe;
    const handleDelete = async () => {
        if (!controlRecipe || !controlRecipeId) return;
        try {
            const res = await deleteControlRecipe(controlRecipeId);
            toast.success(res.message ?? `${controlRecipe.name} deleted successfully.`);
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
                        {`Are you sure you want to delete recipe "${controlRecipe?.name}"?`}
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