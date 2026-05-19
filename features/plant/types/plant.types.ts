export interface Plant {
    id: number;
    name: string;
}
export interface CreatePlantRequest {
    name: string;
}
export interface UpdatePlantRequest {
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