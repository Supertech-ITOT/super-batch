"use client";
import DeleteDialog from "./menu-dialog/delete-dialog";
import CreateUnitDialog from "./menu-dialog/create-unit-dialog";
import UpdateUnitDialog from "./menu-dialog/update-unit-dialog";
import CreatePlantDialog from "./menu-dialog/create-plant-dialog";
import UpdatePlantDialog from "./menu-dialog/update-plant-dialog";
import CreateAreaDialog from "./menu-dialog/create-area-dialog";
import UpdateAreaDialog from "./menu-dialog/update-area-dialog";
import CreateEquipmentDialog from "./menu-dialog/create-equipment-dialog";
import UpdateEquipmentDialog from "./menu-dialog/update-equipment-dialog";
import { DialogType } from "../types/plant-hierarchy.types";

type Props = { dialog: DialogType, onClose: () => void; redirect?: boolean };
export default function TreeDialogs({ dialog, onClose, redirect }: Props) {
    const node = dialog.node;

    if (dialog.mode === "delete") {
        return (
            <DeleteDialog open onClose={onClose} node={node || undefined} redirect={redirect} />
        );
    }

    switch (dialog.type) {
        case "plant":
            return dialog.mode === "create"
                ? <CreatePlantDialog open onClose={onClose} />
                : <UpdatePlantDialog open onClose={onClose} plantId={node?.id} />

        case "area":
            return dialog.mode === "create"
                ? <CreateAreaDialog open onClose={onClose} plantId={node?.id} />
                : <UpdateAreaDialog open onClose={onClose} areaId={node?.id} />


        case "unit":
            return dialog.mode === "create"
                ? <CreateUnitDialog open onClose={onClose} areaId={node?.id} />
                : <UpdateUnitDialog open onClose={onClose} unitId={node?.id} />


        case "equipment":
            return dialog.mode === "create"
                ? <CreateEquipmentDialog open onClose={onClose} unitId={node?.id} />
                : <UpdateEquipmentDialog open onClose={onClose} equipmentId={node?.id} />


        default:
            return null;
    }
}