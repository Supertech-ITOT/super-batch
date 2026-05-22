export type PlantNodeType = "plant" | "area" | "unit" | "equipment";

export type PlantHierarchyResponse = {
    id: number;
    name: string;
    type: PlantNodeType;
    children?: PlantHierarchyResponse[];
};

export type ActionType = "create" | "edit" | "delete" | null;

export type DialogType = {
    type: PlantNodeType | null;
    mode: ActionType
    node?: PlantHierarchyResponse | null;
}