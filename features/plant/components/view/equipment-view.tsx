import StatusBadge from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Cpu, PenLineIcon, Trash2 } from "lucide-react";
import { StatusType } from "../../enum/status.enum";
import { EquipmentResponse } from "../../types/equipment.types";


const data: EquipmentResponse = {
    id: 34,
    name: "Temperature 101",
    description: "ghdfhgd",
    status: StatusType.ACTIVE,
    equipmentType: "Temperature",
    createdAt: "34435",
    unitName: "R101",
    unitId: 34,
    uom: "%",
    tagName: "TT101",
    updatedAt: "4543"
}
export default function EquipmentView() {
    return (
        <div className=" flex justify-between flex-col h-full w-full bg-card p-4 overflow-y-auto scrollbar-none">
            <div className="flex justify-between flex-wrap gap-2 my-4">
                <div className="flex gap-3 ">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <Cpu className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <div className="space-x-2 flex">
                            <span className="text-2xl font-bold">{data.name}</span>
                            <StatusBadge status={data.status} />
                        </div>
                        <h1 className="text-muted-foreground text-sm ">Description: {" "}
                            <span className="font-semibold text-sm text-foreground">{data.description}</span>
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
            <div className="flex-1 min-h-0 my-4 border rounded-md p-4">
                <h1 className="text-md font-semibold">Equipment Detail</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">ID</p>
                        <p className="text-sm font-semibold">{data.id}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Name</p>
                        <p className="text-sm font-semibold">{data.name}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Equipment Type</p>
                        <p className="text-sm font-semibold">
                            {data.equipmentType}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Status</p>

                        <StatusBadge status={data.status} />
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Parent Name</p>
                        <p className="text-sm font-semibold">{data.unitName}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Parent ID</p>
                        <p className="text-sm font-semibold">{data.unitId}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Tag Name</p>
                        <p className="font-mono text-sm font-semibold">
                            {data.tagName}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">UOM</p>
                        <p className="text-sm font-semibold">{data.uom}</p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Created At</p>
                        <p className="text-sm font-semibold">
                            {data.createdAt}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card p-4">
                        <p className="text-xs text-muted-foreground">Last Updated</p>
                        <p className="text-sm font-semibold">
                            {data.updatedAt}
                        </p>
                    </div>

                </div>


            </div>
        </div>
    )
} 