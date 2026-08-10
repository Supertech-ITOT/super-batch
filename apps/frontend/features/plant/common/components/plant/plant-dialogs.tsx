"use client";
import DeleteDialog from "./delete-dialog";
import CreateUnitDialog from "../../../unit/components/create-unit-dialog";
import UpdateUnitDialog from "../../../unit/components/update-unit-dialog";
import CreatePlantDialog from "../../../plant/components/create-plant-dialog";
import UpdatePlantDialog from "../../../plant/components/update-plant-dialog";
import CreateAreaDialog from "../../../area/components/create-area-dialog";
import UpdateAreaDialog from "../../../area/components/update-area-dialog";
import CreateEquipmentDialog from "../../../equipment/components/create-equipment-dialog";
import UpdateEquipmentDialog from "../../../equipment/components/update-equipment-dialog";
import AssignEquipmentDialog from "../../../equipment/components/assign-equipment-dialog";
import UnAssignEquipmentDialog from "../../../equipment/components/unassign-equipment-dialog";
import { DialogType } from "../../types/plant-hierarchy.types";

type Props = {
    dialog: DialogType;
    onClose: () => void;
    redirect?: boolean;
};

export default function PlantDialogs({ dialog, onClose, redirect, }: Props) {
    const { type, mode, node } = dialog;

    if (mode === "delete") {
        return <DeleteDialog open onClose={onClose} node={node || undefined} redirect={redirect} />;
    }

    switch (type) {
        case "plant":
            return mode === "create"
                ? <CreatePlantDialog open onClose={onClose} />
                : <UpdatePlantDialog open onClose={onClose} plantId={node?.id} />;

        case "area":
            return mode === "create"
                ? <CreateAreaDialog open onClose={onClose} plantId={node?.id} />
                : <UpdateAreaDialog open onClose={onClose} areaId={node?.id} />;

        case "unit":
            if (mode === "create")
                return <CreateUnitDialog open onClose={onClose} areaId={node?.id} />;
            if (mode === "edit")
                return <UpdateUnitDialog open onClose={onClose} unitId={node?.id} />;
            if (mode === "assign")
                return <AssignEquipmentDialog open onClose={onClose} unitId={node?.id!} />;
            return null;

        case "equipment":
            if (mode === "create")
                return <CreateEquipmentDialog open onClose={onClose} unitId={node?.id} />;
            if (mode === "edit")
                return <UpdateEquipmentDialog open onClose={onClose} equipmentId={node?.id} />;
            if (mode === "unassign")
                return <UnAssignEquipmentDialog open onClose={onClose} unitId={node?.unitId!} equipmentId={node?.id!} />;
            return null;

        default:
            return null;
    }
}