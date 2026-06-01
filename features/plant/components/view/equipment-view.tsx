import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { useGetEquipmentById } from "../../hooks/use-equipment";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { DialogType } from "../../types/plant-hierarchy.types";
import TreeDialogs from "../tree-dialogs";
import { toDisplayText } from "@/lib/format-enum";



export default function EquipmentView({ id }: { id: number }) {
    const { data: equipment, isLoading: equipmentIsLoading } = useGetEquipmentById(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = equipmentIsLoading || !equipment
    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }
    return (
        <div className=" flex justify-between flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Cpu className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{equipment.name}</span>
                            <StatusBadge status={equipment.status} />
                        </div>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{equipment.description}</span>
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "equipment", mode: "edit", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "equipment", mode: "delete", node: { id: equipment.id, name: equipment.name, type: "equipment" }, redirect: true })}
                    >

                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4 border rounded-md p-4">
                <h1 className="text-md font-semibold">Equipment Detail</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">ID</p>
                        <p className="text-sm font-semibold">{equipment.id}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-semibold">{equipment.name}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Equipment Type</p>
                        <p className="text-sm font-semibold">
                            {toDisplayText(equipment.equipmentType)}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Status</p>

                        <StatusBadge status={equipment.status} />
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Parent Name</p>
                        <p className="text-sm font-semibold">{equipment.unitName}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Parent ID</p>
                        <p className="text-sm font-semibold">{equipment.unitId}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Tag Name</p>
                        <p className="font-mono text-sm font-semibold">
                            {equipment.tagName}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">UOM</p>
                        <p className="text-sm font-semibold">{equipment.uom}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Created At</p>
                        <p className="text-sm font-semibold">
                            {format(equipment.createdAt, "dd MMM yy hh:mm a")}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Last Updated</p>
                        <p className="text-sm font-semibold">
                            {format(equipment.updatedAt, "dd MMM yy hh:mm a")}
                        </p>
                    </div>

                </div>


            </div>
        </div>
    )
} 