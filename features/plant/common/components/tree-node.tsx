"use client";
import { ChevronRight, ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/common/components/ui/button";
import { ActionType, PlantHierarchyResponse } from "@/features/plant/common/types/plant-hierarchy.types";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/common/components/ui/context-menu";
import { TREE_CONFIG } from "@/features/plant/common/constants/tree-config";
import { cn } from "@/common/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    node: PlantHierarchyResponse;
    level?: number;
    selectedNodeKey: string | null;
    onSelect: (node: PlantHierarchyResponse) => void;
    onAction: (action: ActionType, node: PlantHierarchyResponse) => void
};

function TreeNode({ node, level = 0, onSelect, onAction, selectedNodeKey }: Props) {
    const [open, setOpen] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeId = searchParams.get("id");
    const segments = pathname.split("/").filter(Boolean);
    const currentType = segments[segments.length - 1];
    const nodeKey = `${node.type}-${node.id}`;
    const isRouteActive = activeId === String(node.id) && currentType === node.type;
    const isContextActive = selectedNodeKey === nodeKey;
    const isActive = isRouteActive || isContextActive;
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
                        <Button
                            variant="ghost"
                            onClick={() => router.push(`/PlantModel/${node.type}?id=${node.id}`)}
                            onContextMenu={() => onSelect(node)}
                            className={cn(
                                "flex h-8 flex-1 items-center justify-start gap-2 rounded-md text-primary px-2 transition-all",
                                "hover:bg-muted",
                                isActive && "bg-primary/5"
                            )}
                        >
                            <Icon className={`w-4! h-4! ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                            <span className={`text-sm ${isActive ? "text-primary" : "text-muted-foreground"}`}>{node.name}</span>
                        </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuLabel>Action</ContextMenuLabel>
                        {config.addLabel && (<ContextMenuItem onClick={() => onAction("create", node)}>{config.addLabel}</ContextMenuItem>)}
                        {node.type === "unit" && (
                            <>
                                <ContextMenuItem onClick={() => onAction("assign", node)}>
                                    Assign Equipment
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => onAction("unassign", node)}>
                                    Unassign Equipment
                                </ContextMenuItem>
                            </>
                        )}
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
                        <TreeNode key={`${child.type}-${child.id}`} node={child} level={level + 1} onSelect={onSelect} onAction={onAction} selectedNodeKey={selectedNodeKey} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(TreeNode);