"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Boxes, Building, Cpu, Factory, Plus } from "lucide-react";
import { useState } from "react";
import PlantDialog from "./menu-dialog/plant-dialog";
import AreaDialog from "./menu-dialog/area-dialog";
import UnitDialog from "./menu-dialog/unit-dialog";
import EquipmentDialog from "./menu-dialog/equipment-dialog";
import { PlantNodeType } from "../types/plant.types";



export default function PlantMenu() {
    const [dialogType, setDialogType] = useState<PlantNodeType | null>(null);
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-12 gap-2 bg-card hover:bg-card shadow" >
                        <div className="bg-primary/20 rounded-md p-2">
                            <Plus className="w-4! h-4! text-primary" />
                        </div>
                        <span className="text-primary">Add Entity</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Choose Entity</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDialogType("plant")}>
                            <Factory className="text-primary w-4 h-4" />
                            <span className="text-inherit!">Plant</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialogType("area")}>
                            <Building className="text-primary w-4 h-4" />
                            <span>Area</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialogType("unit")}>
                            <Boxes className="text-primary w-4 h-4" />
                            <span>Unit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialogType("equipment")}>
                            <Cpu className="text-primary w-4 h-4" />
                            <span>Equipment</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <PlantDialog open={dialogType === "plant"} onClose={() => setDialogType(null)} isEdit={false} />
            <AreaDialog open={dialogType === "area"} onClose={() => setDialogType(null)} isEdit={false} />
            <UnitDialog open={dialogType === "unit"} onClose={() => setDialogType(null)} isEdit={false} />
            <EquipmentDialog open={dialogType === "equipment"} onClose={() => setDialogType(null)} isEdit={false} />

        </>
    );
}