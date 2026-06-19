import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { useGetEquipmentById } from "../hooks/use-equipment";
import { Skeleton } from "@/common/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { DialogType } from "../../common/types/plant-hierarchy.types";
import TreeDialogs from "../../common/components/tree-dialogs";
import { toDisplayText } from "@/common/lib/format-enum";
import { Badge } from "@/common/components/ui/badge";




export default function EquipmentView({ id }: { id: number }) {
    const { data: equipment, isLoading: equipmentIsLoading } = useGetEquipmentById(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = equipmentIsLoading || !equipment
    if (loading) {
        return (
            <div className="flex justify-between rounded-lg shadow border flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
                {/* Header */}
                <div className="flex justify-between flex-wrap gap-2 my-4">
                    <div className="flex gap-3">
                        <Skeleton className="size-28 rounded-md shrink-0" />

                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-80" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-28" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>

                <Separator />

                {/* Equipment Detail Section */}
                <div className="flex-1 my-4 border rounded-md p-4">
                    <Skeleton className="h-6 w-40 mb-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-xl border p-4"
                            >
                                <Skeleton className="h-3 w-20 mb-2" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className=" flex justify-between rounded-lg shadow hover:shadow-lg border flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Cpu className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">{equipment.name}</span>
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
            <div className="flex-1  my-4 border rounded-md p-4">
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
                        <p className="text-xs text-muted-foreground">
                            Assigned Units
                        </p>
                        <p className="text-sm font-semibold">
                            {equipment.units?.length ?? 0}
                        </p>
                    </div>


                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Capacity</p>
                        <p className="text-sm font-semibold">
                            {equipment.capacity}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Code</p>
                        <p className="text-sm font-semibold">
                            {equipment.code}
                        </p>
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