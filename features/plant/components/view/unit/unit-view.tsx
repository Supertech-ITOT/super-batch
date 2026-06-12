import StatsCards from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { useGetUnitById } from "@/features/plant/hooks/use-units";
import { useGetEquipmentsByUnitId } from "@/features/plant/hooks/use-equipment";
import { DialogType } from "@/features/plant/types/plant-hierarchy.types";
import { columns } from "./columns";
import DataTable from "./data-table";
import TreeDialogs from "../../tree-dialogs";


export default function UnitView({ id }: { id: number }) {
    const { data: unit, isLoading: unitIsLoading } = useGetUnitById(id);
    const { data: equipments, isLoading: equipmentsIsLoading } = useGetEquipmentsByUnitId(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = unitIsLoading || equipmentsIsLoading || !unit || !equipments
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
                        <Boxes className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl">{unit.name}</h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.areaName}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.description}</span>
                        </h1>
                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Code: {" "}
                                <span className="font-semibold text-sm text-foreground">{unit.code}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Capacity: {" "}
                                <span className="font-semibold text-sm text-foreground">{unit.capacity}</span>
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Created At: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(unit.createdAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Last Updated: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(unit.updatedAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "unit", mode: "edit", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "unit", mode: "delete", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: true })}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator />
            <div className="gap-4 my-4 overflow-x-auto overflow-y-hidden scrollbar-none grid md:grid-cols-2 xl:grid-cols-4 ">
                <StatsCards Icon={Cpu} title="Equipment" value={unit.totalEquipment} clr="#D97706" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns({ setDialog })}
                    data={equipments}
                    setDialog={setDialog}
                    node={{ id: unit.id, name: unit.name, type: "unit" }}
                />
            </div>
        </div>
    )
} 