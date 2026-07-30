import { toast } from "sonner";
import { showApiError } from "@/common/lib/show-api-error";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteControlRecipe, useGetControlRecipeById, useTransferControlRecipe } from "../hooks/use-control-recipe";

type Props = { open: boolean; onClose: () => void; controlRecipeId?: number; redirect?: boolean };
export default function TransferControlRecipeDialog({ open, onClose, controlRecipeId, redirect }: Props) {
    const { mutateAsync: transferControlRecipe, isPending: transferControlRecipeIsPending } = useTransferControlRecipe();
    const { data: controlRecipe, isLoading: controlRecipeIsLoading } = useGetControlRecipeById(controlRecipeId);
    const router = useRouter();
    const loading = transferControlRecipeIsPending || controlRecipeIsLoading || !controlRecipe;
    const handleDelete = async () => {
        if (!controlRecipe || !controlRecipeId) return;
        try {
            const res = await transferControlRecipe(controlRecipeId);
            toast.success(res.message ?? `${controlRecipe.name} transfered successfully.`);
            if (redirect) {
                router.push("/Scheduler");
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
                    <DialogTitle>Transfer</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to transfer batch "${controlRecipe?.batchNo}"? After the transfer, the Control Recipe will be locked and cannot be modified. You will still be able to view the Control Recipe and its details.`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleDelete} variant="secondary" className="min-w-34 bg-primary!  text-white" disabled={loading}>{loading ? <Loader className="w-4 h-4 animate-spin text-white" /> : "Transfer"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}