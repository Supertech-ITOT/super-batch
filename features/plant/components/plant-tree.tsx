"use client";

import { useMemo, useState } from "react";

import TreeView from "@/components/tree-veiw";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PlantHierarchyResponse, PlantNodeType } from "../types/plant.types";
import { usePlantHierarchy } from "../hooks/use-plant-hierarchy";
import { Skeleton } from "@/components/ui/skeleton";
import PlantDialog from "./menu-dialog/plant-dialog";
import AreaDialog from "./menu-dialog/area-dialog";
import UnitDialog from "./menu-dialog/update-unit-dialog";
import EquipmentDialog from "./menu-dialog/equipment-dialog";
import DeleteDialog from "./menu-dialog/delete-dialog";
import CreateUnitDialog from "./menu-dialog/create-unit-dialog";
import UpdateUnitDialog from "./menu-dialog/update-unit-dialog";

export default function PlantTree() {
    const [selected, setSelected] = useState<PlantHierarchyResponse | null>(null);
    const [editNode, setEditNode] = useState<PlantHierarchyResponse | null>(null);
    const [deleteNode, setDeleteNode] = useState<PlantHierarchyResponse | null>(null);
    const [parentNode, setParentNode] = useState<PlantHierarchyResponse | null>(null);
    const { data, isLoading, isError } = usePlantHierarchy();
    const [dialogType, setDialogType] = useState<PlantNodeType | null>(null);

    const handleAdd = (node: PlantHierarchyResponse, type: PlantNodeType) => {
        setParentNode(node);
        requestAnimationFrame(() => {
            setDialogType(type);
        });
    };

    // Search Logic
    const [search, setSearch] = useState("");
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!search.trim()) return data;
        const filterTree = (nodes: PlantHierarchyResponse[]): PlantHierarchyResponse[] => {
            return nodes.map((node) => {
                const children = node.children ? filterTree(node.children) : [];
                const matched = node.name.toLowerCase().includes(search.toLowerCase());
                if (matched || children.length > 0) {
                    return { ...node, children, };
                }
                return null;
            }).filter(Boolean) as PlantHierarchyResponse[];
        };
        return filterTree(data);
    }, [data, search]);

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
        <div>
            {/* Search */}
            <div className="relative mb-3">
                <Input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" placeholder="Search plant hierarchy..." />
                <Search className=" absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            {/* Tree */}
            <div className="space-y-1">
                {filteredData.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                        No matching nodes found.
                    </div>
                ) : (filteredData.map((node) => (
                    <TreeView
                        key={node.id}
                        node={node}
                        onSelect={setSelected}
                        onEdit={(node) => { setEditNode(node); setDialogType(node.type); }}
                        onAdd={(node) => {
                            if (node.type === "plant") handleAdd(node, "area");
                            if (node.type === "area") handleAdd(node, "unit");
                            if (node.type === "unit") handleAdd(node, "equipment");
                        }}
                        onNew={(nodeType) => setDialogType(nodeType)}
                        onDelete={(node) => setDeleteNode(node)}
                    />
                )))}
            </div>
            <PlantDialog open={dialogType === "plant"} onClose={() => { setDialogType(null); setEditNode(null); setParentNode(null); }} isEdit={!!editNode} plantId={editNode?.id} />
            <AreaDialog open={dialogType === "area"} onClose={() => { setDialogType(null); setEditNode(null); setParentNode(null); }} isEdit={!!editNode} areaId={editNode?.id} plantId={parentNode?.id} />
            <CreateUnitDialog open={dialogType === "unit"} onClose={() => { setDialogType(null); setEditNode(null); setParentNode(null); }} />
            <UpdateUnitDialog open={dialogType === "unit"} onClose={() => { setDialogType(null); setEditNode(null); setParentNode(null); }} unitId={editNode?.id} />
            <EquipmentDialog open={dialogType === "equipment"} onClose={() => { setDialogType(null); setEditNode(null); setParentNode(null); }} isEdit={!!editNode} equipmentId={editNode?.id} unitId={parentNode?.id} />
            <DeleteDialog open={!!deleteNode} onClose={() => setDeleteNode(null)} node={deleteNode ?? undefined} />
        </div>
    );
}