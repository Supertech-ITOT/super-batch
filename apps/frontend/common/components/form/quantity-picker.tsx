import { useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem, } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import ValuePicker from "./value-picker";

export type QuantityMode = "ABSOLUTE" | "PERCENTAGE";
export interface QuantityValue {
    id: number;
    value: number;
}

interface QuantityPickerProps<T extends { id: number; name: string }> {
    value: QuantityValue[];
    onChange: (value: QuantityValue[]) => void;
    items: T[];
    targetSize: number;
    label?: string;
    pickerLabel?: string;
    placeholder?: string;
    disabled?: boolean;
    limit?: number;
    excludeItem?: (item: T) => boolean;
    absoluteUnit?: string;
    percentageUnit?: string;
    defaultMode?: QuantityMode;
    onModeChange?: (mode: QuantityMode) => void;
}

export function QuantityPicker<T extends { id: number; name: string }>({
    value,
    onChange,
    items,
    targetSize,
    label = "Quantity Mode",
    pickerLabel = "Items",
    placeholder = "Search...",
    disabled = false,
    limit,
    excludeItem,
    absoluteUnit = "KG",
    percentageUnit = "%",
    defaultMode = "ABSOLUTE",
    onModeChange,
}: QuantityPickerProps<T>) {
    const [mode, setMode] = useState<QuantityMode>(defaultMode);
    const filteredItems = excludeItem ? items.filter((item) => !excludeItem(item)) : items;
    const handleModeChange = (newMode: QuantityMode) => {
        setMode(newMode);
        onModeChange?.(newMode);
    };
    const getDisplayValue = (absoluteValue: number) => {
        if (mode === "ABSOLUTE") {
            return absoluteValue;
        }

        if (targetSize <= 0) {
            return 0;
        }

        return (absoluteValue / targetSize) * 100;
    };
    const getAbsoluteValue = (displayValue: number) => {
        if (mode === "ABSOLUTE") {
            return displayValue;
        }

        if (targetSize <= 0) {
            return 0;
        }

        return (displayValue * targetSize) / 100;
    };

    return (
        <div className="space-y-4">
            <Label className="font-medium">{label} </Label>
            <RadioGroup
                disabled={disabled}
                value={mode}
                onValueChange={(value) => handleModeChange(value as QuantityMode)}
                className="flex gap-4"
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ABSOLUTE" id={`${pickerLabel}-absolute`} />
                    <Label htmlFor={`${pickerLabel}-absolute`}>Absolute ({absoluteUnit}) </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PERCENTAGE" id={`${pickerLabel}-percentage`} />
                    <Label htmlFor={`${pickerLabel}-percentage`}>Percentage ({percentageUnit})</Label>
                </div>
            </RadioGroup>
            <Separator />
            <ValuePicker
                label={pickerLabel}
                placeholder={placeholder}
                valueLabel={mode === "ABSOLUTE" ? `Std Qty (${absoluteUnit})` : `Std Qty (${percentageUnit})`}
                disabled={disabled}
                limit={limit}
                options={filteredItems.map((item) => {
                    const selected = value.find(
                        (selectedItem) => selectedItem.id === item.id
                    );

                    const absoluteValue = selected?.value ?? 0;

                    const percentageValue =
                        targetSize > 0
                            ? (absoluteValue / targetSize) * 100
                            : 0;

                    return {
                        id: item.id,
                        name: item.name,

                        uom:
                            mode === "ABSOLUTE"
                                ? `${percentageValue.toFixed(2)} ${percentageUnit}`
                                : `${absoluteValue.toFixed(2)} ${absoluteUnit}`,
                    };
                })}
                value={value.map((item) => ({ id: item.id, value: getDisplayValue(item.value), }))}
                onChange={(selectedItems) => {
                    onChange(
                        selectedItems.map((item) => ({
                            id: item.id,
                            value: getAbsoluteValue(item.value),
                        }))
                    );
                }}
            />
        </div>
    );
}

export default QuantityPicker;