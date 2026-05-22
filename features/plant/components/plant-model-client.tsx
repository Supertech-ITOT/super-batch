"use client";

import { useState } from "react";
import PlantTree from "./plant-tree";
import { PlantHierarchyResponse, } from "../types/plant-hierarchy.types";
import PlantView from "./view/plant-view";

export default function PlantModelClient() {
    const [selected, setSelected] = useState<PlantHierarchyResponse | null>(null);

    return (
        <div className="flex flex-1 min-h-0 gap-2">

            {/* Tree */}
            <div className="h-full min-w-80 rounded-sm border bg-card p-3">
                <PlantTree onSelect={setSelected} />
            </div>

            {/* Details */}
            <div className="h-full flex-1 rounded-sm border bg-card p-3">
                <PlantView />
            </div>
        </div>
    );
}