"use client"

import StatsCards from "@/components/stats-card";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Building, Cpu, Factory, PenLineIcon, Trash2 } from "lucide-react";
import { columns } from "./plant/columns";
import DataTable from "./plant/data-table";
import { useGetPlantById } from "../../hooks/use-plants";
import { useGetAreasByPlantId } from "../../hooks/use-areas";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import TreeDialogs from "../tree-dialogs";
import { useState } from "react";
import { DialogType } from "../../types/plant-hierarchy.types";


export default function PlantView({ id }: { id: number }) {
    const { data: plant, isLoading: plantIsLoading } = useGetPlantById(id);
    const { data: areas, isLoading: areasIsLoading } = useGetAreasByPlantId(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = plantIsLoading || areasIsLoading || !plant || !areas
    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }

    return (
        <div className="flex justify-between flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Factory className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{plant.name}</span>
                            <StatusBadge status={plant.status} />
                        </div>

                        <h1 className="text-muted-foreground text-sm ">Plant Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{plant.plantType}</span>
                        </h1>

                        <h1 className="text-muted-foreground text-sm ">Location: {" "}
                            <span className="font-semibold text-sm text-foreground">{plant.location}</span>
                        </h1>

                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{plant.description}</span>
                        </h1>

                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Created At: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(plant.createdAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Last Updated: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(plant.updatedAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "plant", mode: "edit", node: { id: plant.id, name: plant.name, type: "plant" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "plant", mode: "delete", node: { id: plant.id, name: plant.name, type: "plant" }, redirect: true })}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator />
            <div className="flex gap-4 my-4 overflow-x-auto overflow-y-hidden scrollbar-none pb-2 w-full">
                <StatsCards Icon={Building} title="Area" value={plant.totalArea} clr="#3882fa" subtitle="Total Area " />
                <StatsCards Icon={Boxes} title="Unit" value={plant.totalUnit} clr="#2a922e" subtitle="Total Unit" />
                <StatsCards Icon={Cpu} title="Equipment" value={plant.totalEquipment} clr="#fcb765" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns({ setDialog })}
                    data={areas}
                />
            </div>

        </div>
    )
} 