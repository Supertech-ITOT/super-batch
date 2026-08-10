"use client";
import { getPlantNodeIcon, PlantHierarchyResponse } from "../../types/plant-hierarchy.types";
import { showApiError } from "@/common/lib/show-api-error";
import { useDeleteArea } from "../../../area/hooks/use-areas";
import { useDeleteEquipment } from "../../../equipment/hooks/use-equipment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeletePlant } from "../../../plant/hooks/use-plants";
import { useDeleteUnit } from "../../../unit/hooks/use-units";
import ConfirmDialog from "@/common/components/form/confirm-dialog";

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
    const NodeIcon = getPlantNodeIcon(node?.type);
    return (
        <ConfirmDialog
            description={`Are you sure you want to delete "${node?.name}" ? This action cannot be undone.`}
            open={open}
            onClose={onClose}
            onConfirm={handleDelete}
            loading={loading}
            icon={NodeIcon}
            dialogVariant="destructive"
            title={`Delete ${plantType}`}
            confirmText="Delete"
        />
    );
}