import StatsCards from "@/common/components/stats-card";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { Boxes, Building, Cpu, PenLineIcon, Trash2 } from "lucide-react";
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
import DataTable from "./data-table";
import { columns } from "./columns";

export default function AreaView({ id }: { id: number }) {
    const { data: area, isLoading: areaIsLoading } = useGetAreaById(id);
    const { data: units, isLoading: unitsIsLoading } = useGetUnitsByAreaId(id);
    const [dialog, setDialog] = useState<DialogType & { redirect?: boolean }>({ type: null, mode: null, node: null, redirect: false });
    const loading = unitsIsLoading || areaIsLoading || !area || !units
    if (loading) {
        return (
            <Skeleton className="h-full" />
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
        <div className=" flex justify-between rounded-lg shadow hover:shadow-lg border flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Building className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl">{area.name}</h1>
                        <h1 className="text-muted-foreground text-sm ">Area Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.areaType}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.plantName}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{area.description}</span>
                        </h1>
                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Created At: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(area.createdAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Last Updated: {" "}
                                <span className="font-semibold text-sm text-foreground">{format(area.updatedAt, "dd MMM yy hh:mm a")}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full xl:w-auto">
                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "area", mode: "edit", node: { id: area.id, name: area.name, type: "area" }, redirect: false })}
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                        onClick={() => setDialog({ type: "area", mode: "delete", node: { id: area.id, name: area.name, type: "area" }, redirect: true })}
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                    <TreeDialogs dialog={dialog} redirect={dialog.redirect} onClose={() => setDialog({ type: null, mode: null, node: null, redirect: false })} />
                </div>
            </div>
            <Separator className="my-4" />
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
            <Separator className="my-4" />

            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns({ setDialog })}
                    data={units}
                />
            </div>
        </div>
    )
} 