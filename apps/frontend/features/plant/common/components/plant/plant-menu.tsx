"use client"
import { Button } from "@/common/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DialogType, getPlantNodeIcon, PlantNodeType } from "../../types/plant-hierarchy.types";
import TreeDialogs from "./plant-dialogs";


export default function PlantMenu() {
    const [dialog, setDialog] = useState<DialogType>({ type: null, mode: null, node: null });
    const entityOptions: { type: PlantNodeType; label: string; }[] = [
        { type: "plant", label: "Plant", },
        { type: "area", label: "Area", },
        { type: "unit", label: "Unit", },
        { type: "equipment", label: "Equipment", },
    ];
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-12 gap-2 bg-card hover:bg-card shadow! rounded-2xl! border!" >
                        <div className="bg-primary/20 rounded-2xl p-2">
                            <Plus className="w-4! h-4! text-primary" />
                        </div>
                        <span className="text-primary">Add Entity</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {entityOptions.map(({ type, label }) => {
                        const Icon = getPlantNodeIcon(type);
                        return (
                            <DropdownMenuItem
                                key={type}
                                className="text-primary"
                                onClick={() => setDialog({ mode: "create", type, node: null, })}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            <TreeDialogs dialog={dialog} onClose={() => setDialog({ type: null, mode: null, node: null, })} />
        </>
    );
}