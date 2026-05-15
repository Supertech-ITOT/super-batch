"use client";
import { ChevronRight, ChevronDown, Factory, Boxes, Cpu, Building, } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlantHierarchyResponse } from "@/features/plant/types/plant.types";

type Props = {
    node: PlantHierarchyResponse;
    level?: number;
    onSelect: (node: PlantHierarchyResponse) => void;
};

export default function TreeView({ node, level = 0, onSelect }: Props) {
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
                        className="flex items-center justify-center"
                    >
                        {open ? (
                            <ChevronDown className="w-4 h-4" />
                        ) : (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </Button>
                ) : (
                    <div className="w-4" />
                )}

                <Button variant="ghost" onClick={() => onSelect(node)} className="flex hover:bg-muted items-center justify-start gap-2 flex-1 rounded-sm px-1 py-1 cursor-pointer">
                    {/* Node Icon */}
                    <Icon className="w-4 h-4 text-primary" />
                    {/* Label */}
                    <span className="text-sm">
                        {node.name}
                    </span>
                </Button>
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
                        <TreeView key={child.id} node={child} level={level + 1} onSelect={onSelect} />
                    ))}
                </div>
            )}
        </div>
    );
}