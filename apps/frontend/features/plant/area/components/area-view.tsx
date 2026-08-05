import StatsCards from "@/common/components/stats-card";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { Boxes, Building, Cpu, PenLineIcon, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/common/components/ui/skeleton";
import { format } from "date-fns";
import { useState } from "react";
import { useGetAreaById } from "@/features/plant/area/hooks/use-areas";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import TreeDialogs from "../../common/components/tree-dialogs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { useGetUnitsByAreaId } from "../../unit/hooks/use-units";
import { columns } from "./columns";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { DataTable } from "@/common/components/data-table/data-table";

export default function AreaView({ id }: { id: number }) {
    const { data: area, isLoading: areaIsLoading } = useGetAreaById(id);
    const { data: units, isLoading: unitsIsLoading } = useGetUnitsByAreaId(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = unitsIsLoading || areaIsLoading || !area || !units
    if (loading) {
        return (
            <div className="sm:flex-1 flex flex-col rounded-2xl border shadow sm:h-full bg-card p-2 sm:p-4">
                {/* Header */}
                <div className="flex justify-between flex-wrap gap-2 my-4">
                    <div className="flex gap-3">
                        <Skeleton className="size-28 rounded-md shrink-0" />

                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-56" />
                            <Skeleton className="h-4 w-72" />
                            <Skeleton className="h-4 w-80" />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-28" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Stats */}
                <div className="flex gap-4 overflow-hidden">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-28 w-72 rounded-lg shrink-0"
                        />
                    ))}
                </div>

                <Separator className="my-4" />

                {/* Table */}
                <div className="flex-1 min-h-0">
                    <Skeleton className="h-full w-full rounded-lg" />
                </div>
            </div>
        );
    }

    const stats = [

        {
            title: "Unit",
            subtitle: "Total Unit",
            value: area.totalUnit ?? 0,
            Icon: Boxes,
            clr: "#2a922e",
        },
        {
            title: "Equipment",
            subtitle: "Total Equipment",
            value: area.totalEquipment ?? 0,
            Icon: Cpu,
            clr: "#D97706",
        }

    ]

    return (
        <div className="sm:flex-1 flex flex-col rounded-2xl border shadow sm:h-full bg-card p-2 sm:p-4">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <Building className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">{area.name}</h1>
                        <h1 className="text-muted-foreground text-sm ">Area Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.areaType}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.plantName}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.description}</span>
                        </h1>
                        <h1 className="text-sm text-muted-foreground">
                            Last Modified:{" "}
                            <span className="font-semibold text-foreground">
                                {format(area.updatedAt ?? area.createdAt, "dd MMM yy hh:mm a")}
                            </span>
                        </h1>

                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full sm:w-100">
                    <Button
                        variant="outline"
                        className="bg-card! flex-1"
                        onClick={() => setDialog({ type: "area", mode: "edit", node: { id: area.id, name: area.name, type: "area" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! flex-1"
                        onClick={() => setDialog({ type: "area", mode: "delete", node: { id: area.id, name: area.name, type: "area" }, redirect: true })}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator className="my-2" />
            <Carousel opts={{ align: "start", dragFree: true, }} className="w-full">
                <CarouselContent>
                    {stats.map((item) => (
                        <CarouselItem
                            key={item.title}
                            className="basis-auto"
                        >
                            <StatsCards
                                Icon={item.Icon}
                                clr={item.clr}
                                subtitle={item.subtitle}
                                title={item.title}
                                value={item.value}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <Separator className="my-2" />

            <div className="flex-1 min-h-0">
                <DataTable
                    columns={columns(setDialog)}
                    data={units}
                    pageSize={10}
                    toolbar={(table) => (
                        <div className="flex items-center gap-2">
                            <DataTableSearch table={table} column="name" placeholder="Search units..." />
                            <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ type: "unit", mode: "create", node: { id: area.id, name: area.name, type: "area" }, redirect: false })}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Unit
                            </Button>
                        </div>
                    )}
                />
            </div>
        </div>
    )
} 