import { memo, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";

export interface SearchableSelectOption {
    value: number;
    label: string;
}

interface SearchableSelectProps {
    value?: number;
    onChange: (value: number) => void;
    options: SearchableSelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
}

function SearchableSelect({ value, onChange, options, placeholder = "Select", searchPlaceholder = "Search...", emptyText = "No results found.", disabled, className, }: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const selected = useMemo(
        () => options.find((o) => o.value === value),
        [options, value]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between font-normal bg-card!",
                        !selected && "text-muted-foreground",
                        className
                    )}
                >
                    <span className="flex-1 truncate text-left">
                        {selected?.label ?? placeholder}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="start"
                className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-0">
                <Command className="overflow-hidden">
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList className="max-h-72 overflow-y-auto">
                        <CommandEmpty>{emptyText}</CommandEmpty>
                        {options.map((option) => (
                            <CommandItem key={option.value} value={option.label} onSelect={() => { onChange(option.value); setOpen(false); }}>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        option.value === value ? "opacity-100 text-primary" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}

                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default memo(SearchableSelect);