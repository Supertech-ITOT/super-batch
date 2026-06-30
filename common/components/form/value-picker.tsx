import { memo, useMemo, useState } from "react";
import { Check, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";

export interface PickerOption {
    id: number;
    name: string;
    uom: string;
}

export interface PickerValue {
    id: number;
    value: number;
}

interface ValuePickerProps {
    label: string;
    placeholder?: string;
    valueLabel?: string;
    options: PickerOption[];
    value: PickerValue[];
    onChange: (value: PickerValue[]) => void;
}

function ValuePicker({ label, placeholder = "Search...", valueLabel = "Value", options, value, onChange, }: ValuePickerProps) {
    const [open, setOpen] = useState(false);
    const selectedIds = useMemo(() => new Set(value.map((v) => v.id)), [value]);
    const available = useMemo(() => options.filter((o) => !selectedIds.has(o.id)),
        [options, selectedIds]
    );

    function add(option: PickerOption) {
        onChange([...value, { id: option.id, value: 0, }]);
        setOpen(false);
    }
    function remove(id: number) {
        onChange(value.filter((v) => v.id !== id));
    }
    function update(id: number, next: number) {
        onChange(value.map((v) => v.id === id ? { ...v, value: next, } : v)
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="font-medium">{label}</span>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline" className="w-24">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                        <Command className="max-h-72">
                            <CommandInput placeholder={placeholder} />
                            <CommandList>
                                <CommandEmpty> No Result</CommandEmpty>
                                <CommandGroup>
                                    {available.map((option) => (
                                        <CommandItem
                                            key={option.id}
                                            value={option.name}
                                            onSelect={() => add(option)}
                                        >
                                            <Check className="mr-2 h-4 w-4 opacity-0" />
                                            {option.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="space-y-2">
                {value.length === 0 && (
                    <div className="rounded-md border p-4 text-center text-sm text-muted-foreground">
                        No {label.toLowerCase()} selected
                    </div>
                )}

                {value.map((item, idx) => {
                    const option = options.find((o) => o.id === item.id);
                    return (
                        <div key={item.id} className="flex items-center gap-3 rounded-md border p-2">
                            <span className="text-sm">{idx + 1}.</span>
                            <div className="flex-1 truncate">{option?.name}{" "}({option?.uom}) </div>
                            <Input
                                type="number"
                                value={item.value}
                                placeholder={valueLabel}
                                className="w-28"
                                onChange={(e) => update(item.id, Number(e.target.value))}
                            />
                            <Button size="icon" variant="ghost" onClick={() => remove(item.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default memo(ValuePicker);