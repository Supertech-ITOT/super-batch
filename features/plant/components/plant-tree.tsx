"use client";

import { useState } from "react";
import { ActionType, addParentIds, DialogType, PlantHierarchyResponse } from "../types/plant-hierarchy.types";
import { usePlantHierarchy } from "../hooks/use-plant-hierarchy";
import { Skeleton } from "@/common/components/ui/skeleton";
import TreeDialogs from "./tree-dialogs";
import TreeNode from "./tree-node";
import TreeSearch from "./tree-search";
import { useFilterTree } from "../hooks/use-filter-tree";
import { TREE_CONFIG } from "../constants/tree-config";

export default function PlantTree() {
    const { data, isLoading, isError } = usePlantHierarchy();
    const hierarchy = data ? addParentIds(data) : [];
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const filteredData = useFilterTree(hierarchy, search);
    const [dialog, setDialog] = useState<DialogType>({ type: null, mode: null, node: null });
    const handleAction = (action: ActionType, node: PlantHierarchyResponse) => {
        const type = action === "create" ? TREE_CONFIG[node.type].childType : node.type;
        if (!type) return;
        setDialog({ type, mode: action, node, });
    };


    if (isLoading) {
        return <Skeleton className="h-full" />
    }
    if (isError) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-destructive">
                Failed to load plant hierarchy.
            </div>
        );
    }
    if (!data || data.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No plant hierarchy found.
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden flex flex-col">
            {/* Search */}
            <TreeSearch onSearch={setSearch} />
            {/* Tree */}
            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none">
                {filteredData.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                        No matching nodes found.
                    </div>
                ) : (filteredData.map((node) => (
                    <TreeNode
                        key={`${node.type}-${node.id}`}
                        node={node}
                        selectedNodeKey={selectedNodeKey}
                        onSelect={(node) => {
                            setSelectedNodeKey(`${node.type}-${node.id}`);
                        }}
                        onAction={handleAction}
                    />
                )))}
            </div>
            <TreeDialogs dialog={dialog} onClose={() => setDialog({ type: null, mode: null, node: null, })} />
        </div>
    );
}