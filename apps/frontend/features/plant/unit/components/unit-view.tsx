import StatsCards from "@/common/components/stats-card";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { Boxes, Cpu, PenLineIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useGetEquipmentsByUnitId } from "@/features/plant/equipment/hooks/use-equipment";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import { columns } from "./columns";
import TreeDialogs from "../../common/components/plant/plant-dialogs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { useGetUnitById } from "../hooks/use-units";
import UnitSkeleton from "./unit-skeleton";
import FeedbackState from "@/common/components/feedback-state";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { DataTable } from "@/common/components/data-table/data-table";
import { useRouter } from "next/navigation";

export default function UnitView({ id }: { id: number }) {
    const { data: unit, isLoading: unitIsLoading, isError: unitIsError } = useGetUnitById(id);
    const { data: equipments, isLoading: equipmentsIsLoading, isError: equipmentsIsError } = useGetEquipmentsByUnitId(id);
    const router = useRouter();
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = unitIsLoading || equipmentsIsLoading;
    const error = unitIsError || equipmentsIsError;
    if (loading) {
        return (<UnitSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!unit || Object.keys(unit).length === 0) {
        return <FeedbackState variant="empty" />;
    }

    const stats = [
        {
            title: "Area",
            subtitle: "Total Area",
            value: unit.totalEquipment ?? 0,
            Icon: Cpu,
            clr: "#D97706",
        }
    ]


    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <Boxes className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">{unit.name ?? "-"}</h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.areaName ?? "-"}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm line-clamp-2 text-ellipsis ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground " title={unit.description ?? "-"}>{unit.description ?? "-"}</span>
                        </h1>
                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Code: {" "}
                                <span className="font-semibold text-sm text-foreground">{unit.code ?? "-"}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Capacity: {" "}
                                <span className="font-semibold text-sm text-foreground">{unit.capacity ?? "-"}</span>
                            </h1>
                        </div>
                        <h1 className="text-sm text-muted-foreground">
                            Last Modified:{" "}
                            <span className="font-semibold text-foreground">
                                {unit.updatedAt || unit.createdAt
                                    ? format(unit.updatedAt ?? unit.createdAt, "dd MMM yy hh:mm a")
                                    : "-"}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full sm:w-100">
                    <Button
                        variant="outline"
                        className="bg-card! flex-1"
                        onClick={() => setDialog({ type: "unit", mode: "edit", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="destructive"
                        className="flex-1 text-white"
                        onClick={() => setDialog({ type: "unit", mode: "delete", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: true })}
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
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
            <DataTable
                columns={columns(setDialog, router)}
                data={equipments ?? []}
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="name" placeholder="Search equipments..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ type: "equipment", mode: "create", node: { id: unit.id, name: unit.name, type: "unit" }, redirect: false })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Equipments
                        </Button>
                    </div>
                )}
            />

        </div>
    )
} 