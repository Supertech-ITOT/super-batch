import StatsCards from "@/components/stats-card";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { columns } from "./unit/columns";
import DataTable from "./unit/data-table";
import { StatusType } from "../../enum/status.enum";
import { UnitResponse } from "../../types/unit.types";
import { EquipmentResponse } from "../../types/equipment.types";


const data: UnitResponse = {
    id: 4354574398,
    name: "Reactor 101",
    code: "R101",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, repudiandae!",
    status: StatusType.ACTIVE,
    areaId: 32434,
    areaName: "Area A",
    unitType: "Chemical Area",
    totalEquipment: 100,
    updatedAt: "02 May 26 12:23 PM",
    createdAt: "02 May 26 12:23 PM"
}
export const Tdata: EquipmentResponse[] = [
    {
        id: 343,
        name: "Temperture 201",
        description: "dssdsdd",
        equipmentType: "TEMPERATURE",
        createdAt: "434354354",
        updatedAt: "43545",
        status: StatusType.ACTIVE,
        tagName: "TT101",
        unitId: 12,
        unitName: "R101",
        uom: "%"
    },
    {
        id: 33,
        name: "Temperture 101",
        description: "dssdsdd",
        equipmentType: "TEMPERATURE",
        createdAt: "434354354",
        updatedAt: "43545",
        status: StatusType.ACTIVE,
        tagName: "TT101",
        unitId: 12,
        unitName: "R101",
        uom: "%"
    },

];
export default function UnitView() {
    return (
        <div className=" flex justify-between flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Boxes className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{data.name}</span>
                            <StatusBadge status={data.status} />
                        </div>
                        <h1 className="text-muted-foreground text-sm ">Unit Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.unitType}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Parent: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.areaName}</span>
                        </h1>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.description}</span>
                        </h1>
                        <div className="flex gap-2">
                            <h1 className="text-muted-foreground text-sm ">Created At: {" "}
                                <span className="font-semibold text-sm text-foreground">{data.createdAt}</span>
                            </h1>
                            <h1 className="text-muted-foreground text-sm ">Last Updated: {" "}
                                <span className="font-semibold text-sm text-foreground">{data.updatedAt}</span>
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
                <StatsCards Icon={Cpu} title="Equipment" value={data.totalEquipment} clr="#fcb765" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable columns={columns} data={Tdata} />
            </div>
        </div>
    )
} 