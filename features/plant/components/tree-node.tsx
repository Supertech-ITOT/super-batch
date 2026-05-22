"use client";
import { ChevronRight, ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionType, PlantHierarchyResponse } from "@/features/plant/types/plant-hierarchy.types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { TREE_CONFIG } from "@/features/plant/constants/tree-config";

type Props = {
    node: PlantHierarchyResponse;
    level?: number;
    onSelect: (node: PlantHierarchyResponse) => void;
    onAction: (action: ActionType, node: PlantHierarchyResponse) => void
};

function TreeNode({ node, level = 0, onSelect, onAction }: Props) {
    const [open, setOpen] = useState(true);
    const hasChildren = !!node.children?.length;
    const config = TREE_CONFIG[node.type];
    const Icon = config.icon;

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
                        {config.addLabel && (<ContextMenuItem onClick={() => onAction("create", node)}>{config.addLabel}</ContextMenuItem>)}
                        <ContextMenuItem onClick={() => onAction("edit", node)}>Edit</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem onClick={() => onAction("delete", node)} variant="destructive">Delete</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>

            {/* Children */}
            {open && hasChildren && (
                <div className="relative">
                    {/* Tree Line */}
                    <div className="absolute top-0 bottom-0 w-px bg-border" style={{ left: `${level * 20 + 25}px` }} />
                    {node.children?.map((child) => (
                        <TreeNode key={child.id} node={child} level={level + 1} onSelect={onSelect} onAction={onAction} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(TreeNode);