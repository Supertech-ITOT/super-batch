import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { BadgeInfo, Clock3, Cpu, Hash, Package, PenLineIcon, ScanLine, Trash2, Weight } from "lucide-react";
import { useGetEquipmentById } from "../hooks/use-equipment";
import { format } from "date-fns";
import { useState } from "react";
import { DialogType } from "../../common/types/plant-hierarchy.types";
import TreeDialogs from "../../common/components/plant/plant-dialogs";
import FeedbackState from "@/common/components/feedback-state";
import EquipmentSkeleton from "./equipment-skeleton";

export default function EquipmentView({ id }: { id: number }) {
    const { data: equipment, isLoading: equipmentIsLoading, isError: equipmentIsError } = useGetEquipmentById(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = equipmentIsLoading;
    const error = equipmentIsError;

    const equipmentDetails = [
        {
            label: "ID",
            value: equipment?.id ?? "-",
            icon: Hash,
        },
        {
            label: "Name",
            value: equipment?.name ?? "-",
            icon: BadgeInfo,
        },
        {
            label: "Assigned Units",
            value: equipment?.units?.length ?? 0,
            icon: Package,
        },
        {
            label: "Capacity",
            value:
                equipment?.capacity != null ? `${equipment.capacity} KG` : "-",
            icon: Weight,
        },
        {
            label: "Code",
            value: equipment?.code ?? "-",
            icon: ScanLine,
        },
        {
            label: "Last Modified",
            value:
                equipment?.updatedAt || equipment?.createdAt
                    ? format(
                        equipment?.updatedAt ?? equipment?.createdAt,
                        "dd MMM yy hh:mm a"
                    )
                    : "-",
            icon: Clock3,
        },
    ];
    if (loading) {
        return (<EquipmentSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!equipment || Object.keys(equipment).length === 0) {
        return <FeedbackState variant="empty" />;
    }

    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <Cpu className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">{equipment.name ?? "-"}</h1>
                        <h1 className="text-muted-foreground text-sm line-clamp-2 text-ellipsis ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground " title={equipment.description ?? "-"}>{equipment.description}</span>
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full sm:w-100">
                    <Button
                        variant="outline"
                        className="bg-card! flex-1"
                        onClick={() => setDialog({ type: "equipment", mode: "edit", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: false })}
                    ><PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="destructive"
                        className="flex-1 text-white"
                        onClick={() => setDialog({ type: "equipment", mode: "delete", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: true })}
                    >

                        <Trash2 className="w-4 h-4" />
                        Delete
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator className="my-2" />
            <div className="flex-1 space-y-2">
                <h1 className="text-md font-semibold">Equipment Detail</h1>
                <div className="grid gap-2 grid-cols-2">
                    {equipmentDetails.map(({ label, value, icon: Icon }) => (
                        <div key={label} className="rounded-2xl border bg-card p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-background shrink-0">
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{label}</p>
                                    <p className="text-sm font-semibold">{value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 