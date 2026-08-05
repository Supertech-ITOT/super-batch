"use client"
import StatsCards from "@/common/components/stats-card";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { Boxes, Building, Cpu, Factory, PenLineIcon, Plus, Trash2 } from "lucide-react";
import { columns } from "./columns";
import { format } from "date-fns";
import { useState } from "react";
import { useGetAreasByPlantId } from "@/features/plant/area/hooks/use-areas";
import { DialogType } from "@/features/plant/common/types/plant-hierarchy.types";
import TreeDialogs from "../../common/components/tree-dialogs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/common/components/ui/carousel";
import { useGetPlantById } from "../hooks/use-plants";
import PlantSkeleton from "./plant-skeleton";
import FeedbackState from "@/common/components/feedback-state";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { DataTable } from "@/common/components/data-table/data-table";
import { useRouter } from "next/navigation";


export default function PlantView({ id }: { id: number }) {
    const { data: plant, isLoading: plantIsLoading, isError: plantIsError } = useGetPlantById(id);
    const { data: areas, isLoading: areasIsLoading, isError: areasIsError } = useGetAreasByPlantId(id);
    const router = useRouter();
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = plantIsLoading || areasIsLoading;
    const error = plantIsError || areasIsError;
    if (loading) {
        return (<PlantSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!plant || Object.keys(plant).length === 0) {
        return <FeedbackState variant="empty" />;
    }

    const stats = [
        {
            title: "Area",
            subtitle: "Total Area",
            value: plant.totalArea ?? 0,
            Icon: Building,
            clr: "#3882fa",
        },
        {
            title: "Unit",
            subtitle: "Total Unit",
            value: plant.totalUnit ?? 0,
            Icon: Boxes,
            clr: "#2a922e",
        },
        {
            title: "Equipment",
            subtitle: "Total Equipment",
            value: plant.totalEquipment ?? 0,
            Icon: Cpu,
            clr: "#D97706",
        }

    ]

    return (
        <div className="sm:flex-1 flex flex-col rounded-2xl border shadow sm:h-full bg-card p-2 sm:p-4">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <Factory className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">{plant.name ?? "-"}</h1>
                        <h1 className="text-muted-foreground text-sm ">Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{plant.plantType ?? "-"}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Location: {" "}
                            <span className="font-semibold text-sm text-foreground">{plant.location ?? "-"}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm line-clamp-2 text-ellipsis ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground " title={plant.description ?? "-"}>{plant.description ?? "-"}</span>
                        </h1>
                        <h1 className="text-sm text-muted-foreground">
                            Last Modified:{" "}
                            <span className="font-semibold text-foreground">
                                {plant.updatedAt || plant.createdAt
                                    ? format(plant.updatedAt ?? plant.createdAt, "dd MMM yy hh:mm a")
                                    : "-"}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full sm:w-100">
                    <Button
                        variant="outline"
                        className="bg-card! flex-1"
                        onClick={() => setDialog({ type: "plant", mode: "edit", node: { id: plant.id, name: plant.name, type: "plant" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="destructive"
                        className="flex-1 text-white"
                        onClick={() => setDialog({ type: "plant", mode: "delete", node: { id: plant.id, name: plant.name, type: "plant" }, redirect: true })}
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


            <div className="flex-1 min-h-0">
                <DataTable
                    columns={columns(setDialog, router)}
                    data={areas ?? []}
                    pageSize={10}
                    toolbar={(table) => (
                        <div className="flex items-center gap-2">
                            <DataTableSearch table={table} column="name" placeholder="Search areas..." />
                            <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ type: "area", mode: "create", node: { id: plant.id, name: plant.name, type: "plant" }, redirect: false })}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Area
                            </Button>
                        </div>
                    )}
                />
            </div>

        </div>
    )
} 