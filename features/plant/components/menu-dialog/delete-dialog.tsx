import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { PlantHierarchyResponse } from "../../types/plant.types";
import { showApiError } from "@/lib/show-api-error";
import { useDeleteArea } from "../../hooks/use-areas";
import { useDeletePlant } from "../../hooks/use-plants";
import { useDeleteUnit } from "../../hooks/use-units";
import { useDeleteEquipment } from "../../hooks/use-equipment";
import { toast } from "sonner";

type Props = { open: boolean; onClose: () => void; node?: PlantHierarchyResponse };
export default function DeleteDialog({ open, onClose, node }: Props) {
    const plantType = node ? node.type.charAt(0).toUpperCase() + node.type.slice(1).toLowerCase() : "";
    const { mutateAsync: deletePlant, isPending: deletePlantIsPending } = useDeletePlant();
    const { mutateAsync: deleteArea, isPending: deleteAreaIsPending } = useDeleteArea();
    const { mutateAsync: deleteUnit, isPending: deleteUnitIsPending } = useDeleteUnit();
    const { mutateAsync: deleteEquipment, isPending: deleteEquipmentIsPending } = useDeleteEquipment();
    const loading = deletePlantIsPending || deleteAreaIsPending || deleteUnitIsPending || deleteEquipmentIsPending;
    const handleDelete = async () => {
        if (!node) return;
        try {
            switch (node.type) {
                case "plant": {
                    const res = await deletePlant({ id: node.id });
                    toast.success(res.message ?? "Plant deleted successfully.");
                    break;
                }
                case "area": {
                    const res = await deleteArea({ id: node.id });
                    toast.success(res.message ?? "Area deleted successfully.");
                    break;
                }
                case "unit": {
                    const res = await deleteUnit({ id: node.id });
                    toast.success(res.message ?? "Unit deleted successfully.");
                    break;
                }
                case "equipment": {
                    const res = await deleteEquipment({ id: node.id });
                    toast.success(res.message ?? "Equipment deleted successfully.");
                    break;
                }
                default:
                    return;
            }
            onClose();
        } catch (error) {
            showApiError(error);
        }
    };


    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) onClose() }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {plantType}</DialogTitle>
                    <DialogDescription>
                        {`Are you sure you want to delete "${node?.name}" ${plantType}?`}
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