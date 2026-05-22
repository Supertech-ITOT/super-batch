import { useMemo } from "react";
import { PlantHierarchyResponse, } from "../types/plant-hierarchy.types";

export function useFilterTree(data: PlantHierarchyResponse[] | undefined, search: string) {
    return useMemo(() => {
        if (!data) return [];
        const query = search.trim().toLowerCase();
        if (!query) return data;

        const filterTree = (nodes: PlantHierarchyResponse[]): PlantHierarchyResponse[] => {
            return nodes.reduce<PlantHierarchyResponse[]>((acc, node) => {
                const children = filterTree(node.children || []);
                const matched = node.name.toLowerCase().includes(query);
                if (matched || children.length) {
                    acc.push({ ...node, children });
                }
                return acc;
            }, []);
        };
        return filterTree(data);
    }, [data, search]);
}