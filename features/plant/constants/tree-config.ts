import {
    Factory,
    Building,
    Boxes,
    Cpu,
} from "lucide-react";

export const TREE_CONFIG = {
    plant: {
        icon: Factory,
        addLabel: "Add Area",
        childType: "area",
    },

    area: {
        icon: Building,
        addLabel: "Add Unit",
        childType: "unit",
    },

    unit: {
        icon: Boxes,
        addLabel: "Add Equipment",
        childType: "equipment",
    },

    equipment: {
        icon: Cpu,
        addLabel: null,
        childType: null,
    },
} as const;

export type TreeConfigType = typeof TREE_CONFIG;