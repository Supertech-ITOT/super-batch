"use client";

import { useState } from "react";
import PlantTree from "./plant-tree";
import { PlantHierarchyResponse, } from "../types/plant-hierarchy.types";
import PlantView from "./view/plant-view";
import AreaView from "./view/area-view";
import UnitView from "./view/unit-view";
import EquipmentView from "./view/equipment-view";
import { Boxes } from "lucide-react";

export default function PlantModelClient() {
    const [selected, setSelected] = useState<PlantHierarchyResponse | null>(null);

    return (
        <div className="flex flex-1 min-h-0 gap-2">

            {/* Tree */}
            <div className="h-full min-w-80 rounded-sm border bg-card p-3">
                <PlantTree onSelect={setSelected} />
            </div>

            {/* Details */}

            {!selected ? (
                <div className="flex h-full flex-1 items-center justify-center rounded-xl border bg-card p-6">
                    <div className="flex max-w-sm flex-col items-center text-center">
                        <div className="mb-4 rounded-full border bg-muted p-4">
                            <Boxes className="h-10 w-10 text-muted-foreground" />
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight">
                            No Entity Selected
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Select a plant, area, unit, or equipment from the hierarchy panel
                            to view detailed information and manage configurations.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="h-full flex-1 rounded-sm border bg-card p-3">
                    {selected.type === "plant" && (
                        <PlantView id={selected.id} />
                    )}
                    {selected.type === "area" && (
                        <AreaView id={selected.id} />
                    )}
                    {selected.type === "unit" && (
                        <UnitView id={selected.id} />
                    )}
                    {selected.type === "equipment" && (
                        <EquipmentView id={selected.id} />
                    )}
                </div>

            )}

        </div>
    );
}