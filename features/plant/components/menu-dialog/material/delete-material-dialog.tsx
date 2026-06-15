import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteMaterial, useGetMaterialById } from "@/features/plant/hooks/use-materials";
import { showApiError } from "@/common/lib/show-api-error";

type Props = { open: boolean; onClose: () => void; materialId?: number };
export default function DeleteMaterialDialog({ open, onClose, materialId }: Props) {
    const router = useRouter();
    const { mutateAsync: deleteMaterial, isPending: deleteMaterialIsPending } = useDeleteMaterial();
    const { data: material, isLoading: materialIsLoading } = useGetMaterialById(materialId);
    const loading = deleteMaterialIsPending || materialIsLoading || !material;
    const handleDelete = async () => {
        if (!material || !materialId) return;
        try {
            const res = await deleteMaterial({ id: materialId });
            toast.success(res.message ?? `${material?.name} deleted successfully.`);
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {material?.name}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete material "${material?.name} - ${material?.code}?`}
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