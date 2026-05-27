export type PlantNodeType = "plant" | "area" | "unit" | "equipment";

export type PlantHierarchyResponse = {
    id: number;
    name: string;
    type: PlantNodeType;
    children?: PlantHierarchyResponse[];

    plantId?: number;
    areaId?: number;
    unitId?: number;
};

export type ActionType = "create" | "edit" | "delete" | null;

export type DialogType = {
    type: PlantNodeType | null;
    mode: ActionType
    node?: PlantHierarchyResponse | null;
}

export const addParentIds = (
    nodes: PlantHierarchyResponse[],
    parents?: {
        plantId?: number;
        areaId?: number;
        unitId?: number;
    }
): PlantHierarchyResponse[] => {
    return nodes.map((node) => {
        const enrichedNode: PlantHierarchyResponse = {
            ...node,
            ...parents,
        };

        let nextParents = parents;

        switch (node.type) {
            case "plant":
                nextParents = {
                    plantId: node.id,
                };
                break;

            case "area":
                nextParents = {
                    ...parents,
                    areaId: node.id,
                };
                break;

            case "unit":
                nextParents = {
                    ...parents,
                    unitId: node.id,
                };
                break;
        }

        return {
            ...enrichedNode,
            children: node.children
                ? addParentIds(node.children, nextParents)
                : [],
        };
    });
};