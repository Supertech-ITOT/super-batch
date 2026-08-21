"use client";

import { memo, useCallback, useMemo } from "react";
import { ArrowRight } from "lucide-react";

import { Label } from "@/common/components/ui/label";
import SearchableSelect from "@/common/components/form/searchable-select";
import { EquipmentMappingResponse } from "../types/control-recipe.types";

type Option = {
    value: number;
    label: string;
};

type Props = {
    value: EquipmentMappingResponse[];
    onChange: (value: EquipmentMappingResponse[]) => void;
    executionEquipments: Option[];
    loading?: boolean;
};

type RowProps = {
    item: EquipmentMappingResponse;
    allMappings: EquipmentMappingResponse[];
    executionEquipments: Option[];
    loading?: boolean;
    onUpdate: (recipeEquipmentId: number, executionEquipmentId: number) => void;
};

const EquipmentRow = memo(function EquipmentRow({ item, allMappings, executionEquipments, loading, onUpdate, }: RowProps) {
    const availableOptions = useMemo(() => {
        const selectedIds = new Set<number>();
        for (const mapping of allMappings) {
            if (mapping.equipmentId !== item.equipmentId && mapping.mappedEquipmentId != null) {
                selectedIds.add(mapping.mappedEquipmentId);
            }
        }
        return executionEquipments.filter(
            (option) => option.value === item.mappedEquipmentId || !selectedIds.has(option.value)
        );
    }, [allMappings, executionEquipments, item]);

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-1">
            <Label className={`truncate ${item.autoMapped ? "font-semibold text-primary" : "font-medium"}`}>
                {item.equipmentName}
            </Label>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="w-38">
                <SearchableSelect
                    value={item.mappedEquipmentId ?? undefined}
                    onChange={(v) => onUpdate(item.equipmentId, Number(v))}
                    options={availableOptions}
                    placeholder="Select Equipment"
                    searchPlaceholder="Search Equipment..."
                    disabled={loading || item.autoMapped}
                />
            </div>
        </div>
    );
});

export default memo(function EquipmentMapping({ value, onChange, executionEquipments, loading, }: Props) {
    const sortedMappings = useMemo(() => {
        return [...value].sort((a, b) => {
            // Auto mapped first
            if (a.autoMapped !== b.autoMapped) {
                return a.autoMapped ? -1 : 1;
            }
            // Then alphabetically
            return a.equipmentName.localeCompare(b.equipmentName);
        });
    }, [value]);

    const handleUpdate = useCallback(
        (recipeEquipmentId: number, executionEquipmentId: number) => {
            onChange(
                value.map((item) =>
                    item.equipmentId === recipeEquipmentId ? { ...item, mappedEquipmentId: executionEquipmentId, } : item
                )
            );
        },
        [value, onChange]
    );

    return (
        <div className="space-y-0.5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b pb-2 text-sm font-semibold">
                <div>Recipe Equipment</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div>Execution Equipment</div>
            </div>

            {sortedMappings.map((item) => (
                <EquipmentRow
                    key={item.equipmentId}
                    item={item}
                    allMappings={value}
                    executionEquipments={executionEquipments}
                    loading={loading}
                    onUpdate={handleUpdate}
                />
            ))}
        </div>
    );
});