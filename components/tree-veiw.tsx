"use client";
import { ChevronRight, ChevronDown, Factory, Boxes, Cpu, Building, } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlantHierarchyResponse, PlantNodeType } from "@/features/plant/types/plant.types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "./ui/context-menu";

type Props = {
    node: PlantHierarchyResponse;
    level?: number;
    onSelect: (node: PlantHierarchyResponse) => void;
    onEdit: (node: PlantHierarchyResponse) => void;
    onAdd: (node: PlantHierarchyResponse) => void;
    onDelete: (node: PlantHierarchyResponse) => void;
    onNew: (nodeType: PlantNodeType) => void;
};

export default function TreeView({ node, level = 0, onSelect, onEdit, onAdd, onNew, onDelete }: Props) {
    const [open, setOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const getIcon = () => {
        switch (node.type) {
            case "plant":
                return Factory;
            case "area":
                return Building;
            case "unit":
                return Boxes;
            case "equipment":
                return Cpu;
            default:
                return Factory;
        }
    };

    const getAddLabel = () => {
        switch (node.type) {
            case "plant":
                return "Add Area";

            case "area":
                return "Add Unit";

            case "unit":
                return "Add Equipment";

            default:
                return null;
        }
    };

    const Icon = getIcon();

    return (
        <div>
            {/* Row */}
            <div
                className=" flex items-center rounded-md cursor-pointer select-none"
                style={{ paddingLeft: `${level * 20 + 8}px` }}
            >
                {/* Expand Icon */}
                {hasChildren ? (
                    <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setOpen((prev) => !prev); }}
                        className="flex items-center justify-center w-8"
                    >
                        {open ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </Button>
                ) : (
                    <div className="w-8" />
                )}

                {/* Node Icon + Label */}
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <Button variant="ghost" onClick={() => onSelect(node)} className="flex hover:bg-muted items-center justify-start gap-2 flex-1 rounded-sm px-1 py-1 cursor-pointer">
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{node.name}</span>
                        </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuLabel>Action</ContextMenuLabel>
                        <ContextMenuItem onClick={() => onNew(node.type)}>New {node.type.charAt(0).toUpperCase() + node.type.slice(1).toLowerCase()}</ContextMenuItem>
                        {getAddLabel() && <ContextMenuItem onClick={() => onAdd(node)}>{getAddLabel()}</ContextMenuItem>}
                        <ContextMenuItem onClick={() => onEdit(node)}>Edit</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem onClick={() => onDelete(node)} variant="destructive">Delete</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>

            {/* Children */}
            {open && hasChildren && (
                <div className="relative">
                    {/* Tree Line */}
                    <div
                        className="absolute top-0 bottom-0 w-px bg-border"
                        style={{
                            left: `${level * 20 + 25}px`,
                        }}
                    />
                    {node.children?.map((child) => (
                        <TreeView key={child.id} node={child} level={level + 1} onSelect={onSelect} onEdit={onEdit} onAdd={onAdd} onNew={onNew} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}