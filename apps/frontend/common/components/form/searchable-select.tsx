import { memo, useMemo, useState } from "react";
import { Check, ChevronsUpDown, LucideIcon } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import { Label } from "../ui/label";

type SearchableSelectValue = number | string;

export interface SearchableSelectOption<T extends SearchableSelectValue> {
    value: T;
    label: string;
}

interface SearchableSelectProps<T extends SearchableSelectValue> {
    value?: T;
    emptyValue?: T;
    onChange: (value?: T) => void;
    options: SearchableSelectOption<T>[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
    icon?: LucideIcon;
    label?: string;

}

function SearchableSelect<T extends SearchableSelectValue>({
    icon: Icon,
    value,
    onChange,
    options,
    emptyValue,
    placeholder = "Select",
    searchPlaceholder = "Search...",
    emptyText = "No results found.",
    disabled,
    label,
    className,
}: SearchableSelectProps<T>) {

    const [open, setOpen] = useState(false);
    const selected = useMemo(
        () => options.find((o) => String(o.value) === String(value)),
        [options, value]
    );
    return (
        <div className="space-y-1">
            {label && (
                <Label className="text-sm font-medium">{label} </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        disabled={disabled}
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between font-normal bg-card",
                            !selected && "text-muted-foreground",
                            className
                        )}
                    >
                        <div className="flex flex-1 items-center gap-2 overflow-hidden">
                            {Icon && (
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            )}

                            <span className="truncate">
                                {selected?.label ?? placeholder}
                            </span>
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="start"
                    className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-0">
                    <Command className="overflow-hidden">
                        <CommandInput placeholder={searchPlaceholder} />
                        <CommandList className="max-h-72 overflow-y-auto">
                            <CommandEmpty>{emptyText}</CommandEmpty>
                            {options.map((option) => {
                                const isSelected = String(option.value) === String(value);
                                return (
                                    <CommandItem
                                        key={String(option.value)}
                                        value={String(option.value)}
                                        data-checked={option.value === value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                onChange(emptyValue);
                                            } else {
                                                onChange(option.value);
                                            }
                                            setOpen(false);
                                        }}>
                                        {option.label}
                                    </CommandItem>
                                )
                            })}

                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default memo(SearchableSelect) as typeof SearchableSelect;