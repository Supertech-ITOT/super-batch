import StatsCards from "@/components/stats-card";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Building, Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { columns } from "./area/columns";
import DataTable from "./area/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAreaById } from "../../hooks/use-areas";
import { useGetUnitsByAreaId } from "../../hooks/use-units";
import { format } from "date-fns";



export default function AreaView({ id }: { id: number }) {
    const { data: area, isLoading: areaIsLoading } = useGetAreaById(id);
    const { data: units, isLoading: unitsIsLoading } = useGetUnitsByAreaId(id);
    const loading = unitsIsLoading || areaIsLoading || !area || !units
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
                        <Building className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{area.name}</span>
                            <StatusBadge status={area.status} />
                        </div>
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
                    >
                        <PenLineIcon className="w-4 h-4 text-foreground" />
                        <span className="text-foreground">Edit</span>
                    </Button>

                    <Button
                        variant="outline"
                        className="bg-card! w-full sm:w-auto min-w-30"
                    >
                        <Trash2 className="w-4 h-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                    </Button>
                </div>
            </div>
            <Separator />
            <div className="flex gap-4 my-4 overflow-x-auto overflow-y-hidden scrollbar-none pb-2 w-full">
                <StatsCards Icon={Boxes} title="Unit" value={area.totalUnit} clr="#2a922e" subtitle="Total Unit" />
                <StatsCards Icon={Cpu} title="Equipment" value={area.totalEquipment} clr="#fcb765" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable columns={columns} data={units} />
            </div>
        </div>
    )
} 