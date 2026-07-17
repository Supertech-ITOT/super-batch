import { Button } from "@/common/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Loader } from "lucide-react";
import { PlantHierarchyResponse } from "../types/plant-hierarchy.types";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteArea } from "../../area/hooks/use-areas";
import { useDeleteEquipment } from "../../equipment/hooks/use-equipment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeletePlant } from "../../plant/hooks/use-plants";
import { useDeleteUnit } from "../../unit/hooks/use-units";

type Props = { open: boolean; onClose: () => void; node?: PlantHierarchyResponse, redirect?: boolean };
export default function DeleteDialog({ open, onClose, node, redirect }: Props) {
    const router = useRouter();
    const plantType = node ? node.type.charAt(0).toUpperCase() + node.type.slice(1).toLowerCase() : "";
    const { mutateAsync: deletePlant, isPending: deletePlantIsPending } = useDeletePlant();
    const { mutateAsync: deleteArea, isPending: deleteAreaIsPending } = useDeleteArea();
    const { mutateAsync: deleteUnit, isPending: deleteUnitIsPending } = useDeleteUnit();
    const { mutateAsync: deleteEquipment, isPending: deleteEquipmentIsPending } = useDeleteEquipment();
    const loading = deletePlantIsPending || deleteAreaIsPending || deleteUnitIsPending || deleteEquipmentIsPending;
    const handleDelete = async () => {
        if (!node) return;
        try {
            let message = "";
            switch (node.type) {
                case "plant":
                    message = (await deletePlant({ id: node.id })).message;
                    break;
                case "area":
                    message = (await deleteArea({ id: node.id })).message;
                    break;
                case "unit":
                    message = (await deleteUnit({ id: node.id })).message;
                    break;
                case "equipment":
                    message = (await deleteEquipment({ id: node.id })).message;
                    break;
            }
            toast.success(message ?? `${plantType} deleted successfully.`);
            onClose();
            if (redirect) router.replace("/PlantModel");
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