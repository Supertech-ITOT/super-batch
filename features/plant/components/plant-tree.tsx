"use client";

import { useMemo, useState } from "react";
import TreeView from "@/components/tree-veiw";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PlantHierarchyResponse, PlantNodeType } from "../types/plant.types";
import { usePlantHierarchy } from "../hooks/use-plant-hierarchy";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteDialog from "./menu-dialog/delete-dialog";
import CreateUnitDialog from "./menu-dialog/create-unit-dialog";
import UpdateUnitDialog from "./menu-dialog/update-unit-dialog";
import CreatePlantDialog from "./menu-dialog/create-plant-dialog";
import UpdatePlantDialog from "./menu-dialog/update-plant-dialog";
import CreateAreaDialog from "./menu-dialog/create-area-dialog";
import UpdateAreaDialog from "./menu-dialog/update-area-dialog";
import CreateEquipmentDialog from "./menu-dialog/create-equipment-dialog";
import UpdateEquipmentDialog from "./menu-dialog/update-equipment-dialog";

export default function PlantTree() {
    const { data, isLoading, isError } = usePlantHierarchy();
    const [selected, setSelected] = useState<PlantHierarchyResponse | null>(null);
    const [dialog, setDialog] = useState<{ type: PlantNodeType | null; mode: "create" | "edit" | "delete" | null; node?: PlantHierarchyResponse | null; }>({ type: null, mode: null, node: null });
    const handleAdd = (node: PlantHierarchyResponse, type: PlantNodeType) => {
        setDialog({ type, mode: "create", node, });
    };
    const handleEdit = (node: PlantHierarchyResponse) => {
        setDialog({ type: node.type, mode: "edit", node, });
    };
    const handleDelete = (node: PlantHierarchyResponse) => {
        setDialog({ type: node.type, mode: "delete", node, });
    };
    const handleCloseDialog = () => {
        setDialog({ type: null, mode: null, node: null, });
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
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onAdd={(node) => {
                            if (node.type === "plant") handleAdd(node, "area");
                            if (node.type === "area") handleAdd(node, "unit");
                            if (node.type === "unit") handleAdd(node, "equipment");
                        }}
                    />
                )))}
            </div>

            {/* Dialogs */}
            {dialog.type === "plant" && dialog.mode === "create" && (
                <CreatePlantDialog
                    open={true}
                    onClose={handleCloseDialog}
                />
            )}

            {dialog.type === "plant" && dialog.mode === "edit" && (
                <UpdatePlantDialog
                    open={true}
                    onClose={handleCloseDialog}
                    plantId={dialog.node?.id}
                />
            )}
            {dialog.type === "area" && dialog.mode === "create" && (
                <CreateAreaDialog
                    open={true}
                    onClose={handleCloseDialog}
                    plantId={dialog.node?.id}
                />
            )}

            {dialog.type === "area" && dialog.mode === "edit" && (
                <UpdateAreaDialog
                    open={true}
                    onClose={handleCloseDialog}
                    areaId={dialog.node?.id}
                />
            )}

            {dialog.type === "unit" && dialog.mode === "create" && (
                <CreateUnitDialog
                    open={true}
                    onClose={handleCloseDialog}
                    areaId={dialog.node?.id}
                />
            )}

            {dialog.type === "unit" && dialog.mode === "edit" && (
                <UpdateUnitDialog
                    open={true}
                    onClose={handleCloseDialog}
                    unitId={dialog.node?.id}
                />
            )}

            {dialog.type === "equipment" && dialog.mode === "create" && (
                <CreateEquipmentDialog
                    open={true}
                    onClose={handleCloseDialog}
                    unitId={dialog.node?.id}
                />
            )}

            {dialog.type === "equipment" && dialog.mode === "edit" && (
                <UpdateEquipmentDialog
                    open={true}
                    onClose={handleCloseDialog}
                    equipmentId={dialog.node?.id}
                />
            )}

            {dialog.mode === "delete" && (
                <DeleteDialog
                    open={true}
                    onClose={handleCloseDialog}
                    node={dialog.node ?? undefined}
                />
            )}
        </div>
    );
}