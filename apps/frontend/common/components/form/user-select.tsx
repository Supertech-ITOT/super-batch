import { memo, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import { getColorByText } from "@/common/utils/color.util";

export interface UserSelectOption {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserSelectProps {
    value?: number;
    onChange: (value: number) => void;
    options: UserSelectOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
}

function getInitials(name: string) {
    return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function UserSelect({ value, onChange, options, placeholder = "Select User", searchPlaceholder = "Search user...", emptyText = "No users found.", disabled, className, }: UserSelectProps) {
    const [open, setOpen] = useState(false);
    const selected = useMemo(
        () => options.find((option) => option.id === value),
        [options, value]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={disabled}
                    className={cn(
                        "w-full justify-between px-2 bg-card",
                        className
                    )}
                >
                    {selected ? (
                        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                            <div className={` ${getColorByText(selected.name)} flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold`}>
                                {getInitials(selected.name)}
                            </div>

                            <div className="min-w-0 text-left">
                                <div className="truncate text-xs font-medium leading-4">
                                    {selected.name}
                                </div>
                                <div className="truncate text-[11px] leading-3 text-primary">
                                    {selected.role}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <span className="truncate text-muted-foreground">
                            {placeholder}
                        </span>
                    )}

                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-0"
            >
                <Command shouldFilter className="overflow-hidden rounded-md">
                    <CommandInput
                        placeholder={searchPlaceholder}
                        className="h-9"
                    />

                    <CommandList className="max-h-64">
                        <CommandEmpty>{emptyText}</CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.id}
                                    value={`${option.name} ${option.email} ${option.role}`}
                                    onSelect={() => {
                                        onChange(option.id);
                                        setOpen(false);
                                    }}
                                    className="flex cursor-pointer items-center gap-2 px-3 py-2"
                                >
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${getColorByText(option.name)}`}>
                                        {getInitials(option.name)}
                                    </div>

                                    <div className="min-w-0 flex-1 leading-tight">
                                        <div className="truncate text-sm font-medium">
                                            {option.name}
                                        </div>

                                        <div className="truncate text-xs text-muted-foreground">
                                            {option.email}
                                        </div>

                                        <div className="truncate text-[11px] text-primary">
                                            {option.role}
                                        </div>
                                    </div>

                                    <Check
                                        className={cn(
                                            "h-4 w-4 shrink-0",
                                            option.id === value
                                                ? "opacity-100 text-primary"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default memo(UserSelect);