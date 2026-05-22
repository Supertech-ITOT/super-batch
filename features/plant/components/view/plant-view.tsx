import StatsCards from "@/components/stats-card";
import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Boxes, Building, Cpu, Factory, PenLineIcon, Trash2 } from "lucide-react";
import { columns } from "./plant/columns";
import DataTable from "./plant/data-table";


const data = {
    name: "Plant A",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, repudiandae!",
    location: "Lorem ipsum dolor sit amet,",
    status: "ACTIVE",
    plantType: "Chemical Plant",
    totalArea: 12,
    totalUnit: 25,
    totalEquipment: 100,
    updatedAt: "02 May 26 12:23 PM"
}
export const Tdata = [
    {
        id: 1,
        areaName: "Mixing Room",
        areaType: "Production",
        areaStatus: "Active",
        totalUnits: 4,
        totalEquipment: 12,
    },
    {
        id: 201,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 3,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 4,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 5,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 6,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 7,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 8,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 9,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 10,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 11,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 12,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 13,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
    {
        id: 14,
        areaName: "Storage Zone",
        areaType: "Warehouse",
        areaStatus: "Maintenance",
        totalUnits: 2,
        totalEquipment: 5,
    },
];
export default function PlantView() {
    return (
        <div className=" flex justify-between flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="flex justify-center items-center p-4 border rounded-md shadow aspect-square shrink-0 w-26">
                        <Factory className="h-16 w-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{data.name}</span>
                            <StatusBadge status={data.status} />
                        </div>

                        <h1 className="text-muted-foreground text-sm ">Plant Type: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.plantType}</span>
                        </h1>

                        <h1 className="text-muted-foreground text-sm ">Location: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.location}</span>
                        </h1>

                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.description}</span>
                        </h1>

                        <h1 className="text-muted-foreground text-sm ">Last Updated: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.updatedAt}</span>
                        </h1>
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
                <StatsCards Icon={Building} title="Area" value={data.totalArea} clr="#3882fa" subtitle="Total Area " />
                <StatsCards Icon={Boxes} title="Unit" value={data.totalArea} clr="#2a922e" subtitle="Total Unit" />
                <StatsCards Icon={Cpu} title="Equipment" value={data.totalArea} clr="#fcb765" subtitle="Total Equipment" />
            </div>
            <Separator />
            <div className="flex-1 min-h-0 my-4">
                <DataTable columns={columns} data={Tdata} />
            </div>
        </div>
    )
} 