export interface Plant {
    id: number;
    name: string;
}


export type PlantNodeType =
    | "plant"
    | "area"
    | "unit"
    | "equipment";

export type PlantHierarchyResponse = {
    id: string;
    name: string;
    type: PlantNodeType;
    children?: PlantHierarchyResponse[];
};