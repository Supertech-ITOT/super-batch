"use client";

import { memo, useMemo, useState } from "react";
import { ChevronsUpDown, LucideIcon } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/common/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { cn } from "@/common/lib/utils";
import { Label } from "../ui/label";

type SearchableSelectValue = number | string;

export interface SearchableSelectOption<T extends SearchableSelectValue> {
  value: T;
  label: string;
}

interface SearchableSelectProps<T extends SearchableSelectValue> {
  value?: T | T[];
  emptyValue?: T;
  onChange: (value?: T | T[]) => void;
  options: SearchableSelectOption<T>[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  label?: string;
  multiSelect?: boolean;
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
  multiSelect = false,
}: SearchableSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedValues = useMemo(() => (Array.isArray(value) ? value : value === undefined ? [] : [value]), [value]);

  const selectedLabels = useMemo(
    () => options.filter((option) => selectedValues.some((selected) => String(selected) === String(option.value))).map((option) => option.label),
    [options, selectedValues],
  );

  const isSelected = (optionValue: T) => selectedValues.some((selected) => String(selected) === String(optionValue));

  const handleSelect = (optionValue: T) => {
    if (multiSelect) {
      const nextValues = isSelected(optionValue)
        ? selectedValues.filter((selected) => String(selected) !== String(optionValue))
        : [...selectedValues, optionValue];

      onChange(nextValues);
      return;
    }

    onChange(isSelected(optionValue) ? emptyValue : optionValue);
    setOpen(false);
  };

  return (
    <div className="space-y-1">
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn("w-full justify-between bg-card font-normal", selectedValues.length === 0 && "text-muted-foreground", className)}
          >
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}

              <span className="truncate">
                {multiSelect ? (selectedLabels.length === 0 ? placeholder : selectedLabels.join(", ")) : (selectedLabels[0] ?? placeholder)}
              </span>
            </div>

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) p-0">
          <Command className="overflow-hidden">
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList className="max-h-72 overflow-y-auto">
              <CommandEmpty>{emptyText}</CommandEmpty>

              {options.map((option) => {
                const checked = isSelected(option.value);

                return (
                  <CommandItem key={String(option.value)} value={option.label} data-checked={checked} onSelect={() => handleSelect(option.value)}>
                    <span className="truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default memo(SearchableSelect) as typeof SearchableSelect;
