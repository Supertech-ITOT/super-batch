"use client"
import { Button } from "@/common/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { Boxes, Building, Cpu, Factory, Plus } from "lucide-react";
import { useState } from "react";
import { DialogType } from "../types/plant-hierarchy.types";
import TreeDialogs from "./tree-dialogs";


export default function PlantMenu() {
    const [dialog, setDialog] = useState<DialogType>({ type: null, mode: null, node: null });
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-12 gap-2 bg-card hover:bg-card shadow rounded-lg!" >
                        <div className="bg-primary/20 rounded-md p-2">
                            <Plus className="w-4! h-4! text-primary" />
                        </div>
                        <span className="text-primary">Add Entity</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Choose Entity</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setDialog({ mode: "create", type: "plant", node: null })}>
                            <Factory className="text-primary w-4 h-4" />
                            <span className="text-inherit!">Plant</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialog({ mode: "create", type: "area", node: null })}>
                            <Building className="text-primary w-4 h-4" />
                            <span>Area</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialog({ mode: "create", type: "unit", node: null })}>
                            <Boxes className="text-primary w-4 h-4" />
                            <span>Unit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDialog({ mode: "create", type: "equipment", node: null })}>
                            <Cpu className="text-primary w-4 h-4" />
                            <span>Equipment</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <TreeDialogs dialog={dialog} onClose={() => setDialog({ type: null, mode: null, node: null, })} />
        </>
    );
}