import StatsCards from "@/components/stats-card";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { columns } from "./unit/columns";
import DataTable from "./unit/data-table";
import { useGetEquipmentsByUnitId } from "../../hooks/use-equipment";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUnitById } from "../../hooks/use-units";
import { format } from "date-fns";

export default function UnitView({ id }: { id: number }) {
    const { data: unit, isLoading: unitIsLoading } = useGetUnitById(id);
    const { data: equipments, isLoading: equipmentsIsLoading } = useGetEquipmentsByUnitId(id);
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
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{unit.name}</span>
                            <StatusBadge status={unit.status} />
                        </div>
                        <h1 className="text-muted-foreground text-sm ">Unit Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.unitType}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.areaName}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{unit.description}</span>
                        </h1>
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
                <StatsCards Icon={Cpu} title="Equipment" value={unit.totalEquipment} clr="#fcb765" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable columns={columns} data={equipments} />
            </div>
        </div>
    )
} 