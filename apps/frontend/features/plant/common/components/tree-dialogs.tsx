"use client";
import DeleteDialog from "./delete-dialog";
import CreateUnitDialog from "../../unit/components/create-unit-dialog";
import UpdateUnitDialog from "../../unit/components/update-unit-dialog";
import CreatePlantDialog from "../../plant/components/create-plant-dialog";
import UpdatePlantDialog from "../../plant/components/update-plant-dialog";
import CreateAreaDialog from "../../area/components/create-area-dialog";
import UpdateAreaDialog from "../../area/components/update-area-dialog";
import CreateEquipmentDialog from "../../equipment/components/create-equipment-dialog";
import UpdateEquipmentDialog from "../../equipment/components/update-equipment-dialog";
import { DialogType } from "../types/plant-hierarchy.types";
import AssignEquipmentDialog from "../../equipment/components/assign-equipment-dialog";
import UnAssignEquipmentDialog from "../../equipment/components/unassign-equipment-dialog copy";

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

            if (dialog.mode === "create") {
                return (
                    <CreateUnitDialog
                        open
                        onClose={onClose}
                        areaId={node?.id}
                    />
                );
            }

            if (dialog.mode === "edit") {
                return (
                    <UpdateUnitDialog
                        open
                        onClose={onClose}
                        unitId={node?.id}
                    />
                );
            }

            if (dialog.mode === "assign") {
                return (
                    <AssignEquipmentDialog
                        open
                        onClose={onClose}
                        unitId={node?.id!}
                    />
                );
            }

            if (dialog.mode === "unassign") {
                return (
                    <UnAssignEquipmentDialog
                        open
                        onClose={onClose}
                        unitId={node?.id!}
                    />
                );
            }

            return null;


        case "equipment":
            return dialog.mode === "create"
                ? <CreateEquipmentDialog open onClose={onClose} unitId={node?.id} />
                : <UpdateEquipmentDialog open onClose={onClose} equipmentId={node?.id} />


        default:
            return null;
    }
}